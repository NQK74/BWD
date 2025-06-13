const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Định nghĩa schema cho User
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Họ tên không được để trống'],
        trim: true,
        minlength: [2, 'Họ tên phải có ít nhất 2 ký tự'],
        maxlength: [100, 'Họ tên không được quá 100 ký tự']
    },
    email: {
        type: String,
        required: [true, 'Email không được để trống'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email không hợp lệ']
    },
    password: {
        type: String,
        required: [true, 'Mật khẩu không được để trống'],
        minlength: [6, 'Mật khẩu phải có ít nhất 6 ký tự']
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true, // Tự động tạo createdAt và updatedAt
    toJSON: {
        virtuals: true,
        transform: function(doc, ret) {
            delete ret.password;
            delete ret.__v;
            return ret;
        }
    }
});

// Index cho tìm kiếm nhanh (xóa dòng email index vì đã có unique: true)
userSchema.index({ createdAt: -1 });

// Middleware pre-save để hash password
userSchema.pre('save', async function(next) {
    // Chỉ hash password khi password được thay đổi
    if (!this.isModified('password')) return next();
    
    try {
        // Hash password với salt rounds = 12
        const saltRounds = 12;
        this.password = await bcrypt.hash(this.password, saltRounds);
        next();
    } catch (error) {
        next(error);
    }
});

// Method để so sánh password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Static method để tìm user theo email
userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email: email.toLowerCase() });
};

// Static method để tạo user mới
userSchema.statics.createUser = async function(userData) {
    const user = new this(userData);
    return await user.save();
};

// Virtual để lấy thông tin user không có password
userSchema.virtual('publicInfo').get(function() {
    return {
        id: this._id,
        fullname: this.fullname,
        email: this.email,
        isActive: this.isActive,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
});

// Tạo model từ schema
const User = mongoose.model('User', userSchema);

module.exports = User;