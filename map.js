let provinceData = {};
const provinceColorData = {
  "An Giang": "#e57373", "Bà Rịa - Vũng Tàu": "#f06292", "Bạc Liêu": "#ba68c8",
  "Bắc Giang": "#9575cd", "Bắc Kạn": "#7986cb", "Bắc Ninh": "#64b5f6",
  "Bến Tre": "#4fc3f7", "Bình Dương": "#4dd0e1", "Bình Định": "#4db6ac",
  "Bình Phước": "#81c784", "Bình Thuận": "#aed581", "Cà Mau": "#dce775",
  "Cao Bằng": "#fff176", "Cần Thơ": "#ffd54f", "Đà Nẵng": "#ffb74d",
  "Đắk Lắk": "#ff8a65", "Đắk Nông": "#a1887f", "Điện Biên": "#90a4ae",
  "Đồng Nai": "#f44336", "Đồng Tháp": "#e91e63", "Gia Lai": "#9c27b0",
  "Hà Giang": "#673ab7", "Hà Nam": "#3f51b5", "Hà Nội": "#2196f3",
  "Hà Tĩnh": "#03a9f4", "Hải Dương": "#00bcd4", "Hải Phòng": "#009688",
  "Hậu Giang": "#4caf50", "Hòa Bình": "#8bc34a", "Hưng Yên": "#cddc39",
  "Khánh Hòa": "#ffeb3b", "Kiên Giang": "#ffc107", "Kon Tum": "#ff9800",
  "Lai Châu": "#ff5722", "Lạng Sơn": "#795548", "Lào Cai": "#9e9e9e",
  "Lâm Đồng": "#607d8b", "Long An": "#d32f2f", "Nam Định": "#c2185b",
  "Nghệ An": "#7b1fa2", "Ninh Bình": "#512da8", "Ninh Thuận": "#303f9f",
  "Phú Thọ": "#1976d2", "Phú Yên": "#0288d1", "Quảng Bình": "#0097a7",
  "Quảng Nam": "#00796b", "Quảng Ngãi": "#388e3c", "Quảng Ninh": "#689f38",
  "Quảng Trị": "#afb42b", "Sóc Trăng": "#fbc02d", "Sơn La": "#ffa000",
  "Tây Ninh": "#f57c00", "Thái Bình": "#e64a19", "Thái Nguyên": "#5d4037",
  "Thanh Hóa": "#616161", "Thừa Thiên Huế": "#455a64", "Tiền Giang": "#f44336",
  "Trà Vinh": "#e91e63", "Tuyên Quang": "#9c27b0", "Vĩnh Long": "#673ab7",
  "Vĩnh Phúc": "#3f51b5", "Yên Bái": "#2196f3", "Hồ Chí Minh": "#009688"
};

const tooltip = document.getElementById('tooltip');
const infoBox = document.getElementById('info-content');
const search = document.getElementById('search');
let currentActive = null;

document.addEventListener('mousemove', (e) => {
  tooltip.style.left = e.pageX + 10 + 'px';
  tooltip.style.top = e.pageY + 10 + 'px';
});

document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

Promise.all([
  fetch("provinceData.json").then(res => res.json()),
  fetch("vn_colored.svg").then(res => res.text())
]).then(([data, svgText]) => {
  provinceData = data;
  document.getElementById("left-pane").insertAdjacentHTML("beforeend", svgText);

  const svg = document.querySelector("svg");
  let isPanning = false, startX, startY, panX = 0, panY = 0, zoom = 1;

  svg.addEventListener("mousedown", e => {
    isPanning = true;
    startX = e.clientX - panX;
    startY = e.clientY - panY;
    svg.style.cursor = "grabbing";
  });
  svg.addEventListener("touchstart", e => {
  if (e.touches.length === 1) {
    isPanning = true;
    startX = e.touches[0].clientX - panX;
    startY = e.touches[0].clientY - panY;
  }
}, { passive: false });

  document.addEventListener("mouseup", () => {
    isPanning = false;
    svg.style.cursor = "grab";
  });
  document.addEventListener("mousemove", e => {
    if (!isPanning) return;
    panX = e.clientX - startX;
    panY = e.clientY - startY;
    svg.style.transform = `translate(${panX}px, ${panY}px) scale(${zoom})`;
  });
  document.addEventListener("touchmove", e => {
  if (!isPanning || e.touches.length !== 1) return;
  panX = e.touches[0].clientX - startX;
  panY = e.touches[0].clientY - startY;
  svg.style.transform = `translate(${panX}px, ${panY}px) scale(${zoom})`;
}, { passive: false });

document.addEventListener("touchend", () => {
  isPanning = false;
});

  svg.addEventListener("wheel", e => {
    e.preventDefault();
    zoom += e.deltaY > 0 ? -0.1 : 0.1;
    zoom = Math.min(Math.max(zoom, 0.5), 5);
    svg.style.transform = `translate(${panX}px, ${panY}px) scale(${zoom})`;
  });

  svg.querySelectorAll("path").forEach(path => {
    const name = path.getAttribute("title") || path.getAttribute("name") || path.getAttribute("id") || "Không rõ";
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("class", "province");

    const bbox = path.getBBox();
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", bbox.x + bbox.width / 2);
    text.setAttribute("y", bbox.y + bbox.height / 2);
    text.textContent = name;

    if (provinceColorData[name]) path.setAttribute("fill", provinceColorData[name]);

    path.parentNode.insertBefore(group, path);
    group.appendChild(path);
    group.appendChild(text);

    group.addEventListener("mouseover", () => {
      tooltip.textContent = name;
      tooltip.style.display = "block";
    });
    group.addEventListener("mouseout", () => {
      tooltip.style.display = "none";
    });

    group.addEventListener("click", () => {
      const data = provinceData[name];

      if (group === currentActive) {
        svg.querySelectorAll(".province").forEach(g => {
          g.classList.remove("active", "faded");
          g.style.transform = "translate(0, 0)";
        });
  

        currentActive = null;
        infoBox.innerHTML = "Nhấn vào tỉnh để xem thông tin chi tiết.";
        document.getElementById("tabs").style.display = "none";
        document.getElementById("tab-content").innerHTML = "";
        return;
      }                   

      svg.querySelectorAll(".province").forEach(g => {
        g.classList.remove("active");
        g.classList.add("faded");
        g.style.transform = "translate(0, 0)";
      });

      group.classList.remove("faded");
      group.classList.add("active");

      const bbox = group.getBBox();
      const svgHeight = svg.viewBox.baseVal.height || svg.getBoundingClientRect().height;
      let dx = 30;
      let dy = bbox.y + bbox.height > svgHeight * 0.8 ? -60 : -40;
      group.style.transform = `translate(${dx}px, ${dy}px)`;

      if (data) {
        infoBox.innerHTML = `
          <h3>${name}</h3>
        <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 10px;">
  ${(data.anh || []).map(url => `
    <img src="${url}" style="width: 100%; max-width: 100px; border-radius: 8px;">
  `).join('')}
</div>

          <p><strong>Dân số:</strong> ${data.danSo}</p>
          <p><strong>Diện tích:</strong> ${data.dienTich}</p>
 
   <div>
    <h4>Lễ hội</h4>
    <img src="${data.leHoi?.image}" style="width: 100%; max-width: 300px; border-radius: 8px;">
    <p>${data.leHoi?.text}</p>
  </div>
       <div>
    <h4>Ẩm thực</h4>
    <img src="${data.amThuc?.image}" style="width: 100%; max-width: 300px; border-radius: 8px;">
    <p>${data.amThuc?.text}</p>
  </div>
          <div>
    <h4>Lịch sử</h4>
    <img src="${data.lichSu?.image}" style="width: 100%; max-width: 300px; border-radius: 8px;">
    <p>${data.lichSu?.text}</p>
  </div>
        <p><strong>Mô tả:</strong></p>
<img src="${data.moTa?.image}" style="width: 100%; max-width: 300px; border-radius: 8px;">
<p>${data.moTa?.text}</p>


          <div style="margin-top: 20px;">
            <a href="https://vi.wikipedia.org/wiki/${encodeURIComponent(name)}"
               target="_blank"
               style="display: inline-block; padding: 8px 16px; background:rgb(232, 103, 10); color: white; text-decoration: none; border-radius: 4px;">
               Xem thêm thông tin
            </a>
          </div>
        `;
        document.getElementById("tabs").style.display = "block";
        document.getElementById("tab-content").innerHTML = `
          <p><strong>Lễ hội:</strong> ${data.leHoi || "Chưa có dữ liệu."}</p>
          <p><strong>Ẩm thực:</strong> ${data.amThuc || "Chưa có dữ liệu."}</p>
          <p><strong>Lịch sử:</strong> ${data.lichSu || "Chưa có dữ liệu."}</p>
        `;
        document.querySelectorAll("#tabs button").forEach(btn => {
          btn.onclick = () => {
            const tab = btn.dataset.tab;
            let content = "";
            switch (tab) {
              case "tongquan":
                content = `
                  <p><strong>Dân số:</strong> ${data.danSo}</p>
                  <p><strong>Diện tích:</strong> ${data.dienTich}</p>
                  <p>${data.moTa || ""}</p>`;
                break;
              case "lehoi":
                content = `<p><strong>Lễ hội:</strong> ${data.leHoi || "Chưa có dữ liệu."}</p>`; break;
              case "amthuc":
                content = `<p><strong>Ẩm thực:</strong> ${data.amThuc || "Chưa có dữ liệu."}</p>`; break;
              case "lichsu":
                content = `<p><strong>Lịch sử:</strong> ${data.lichSu || "Chưa có dữ liệu."}</p>`; break;
            }
            document.getElementById("tab-content").innerHTML = content;
          };
        });
      } else {
        infoBox.innerHTML = `<h3>${name}</h3><p>Chưa có dữ liệu.</p>`;
      }

      currentActive = group;
      // localStorage.setItem("tinhGanNhat", name);
    });
  });

  search.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const val = search.value.toLowerCase();
      const found = Array.from(svg.querySelectorAll(".province")).find(g =>
        g.querySelector("text").textContent.toLowerCase() === val
      );
      if (found) found.dispatchEvent(new Event("click"));
    }
  });

  // const lastProvince = localStorage.getItem("tinhGanNhat");
//   if (lastProvince) {
//     const found = Array.from(svg.querySelectorAll(".province")).find(g =>
//       g.querySelector("text").textContent === lastProvince
//     );
//     if (found) setTimeout(() => found.dispatchEvent(new Event("click")), 500);
//   }

 });
