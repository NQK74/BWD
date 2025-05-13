function toggleLike(button) {
  const likeText = button.querySelector('.like-text');
  const countSpan = button.querySelector('.like-count');
  let count = parseInt(button.dataset.count, 10) || 0;

  const isLiked = button.classList.toggle('liked');

  if (isLiked) {
    likeText.textContent = 'Liked';
    count++;
    button.style.color = '#e74c3c';
  } else {
    likeText.textContent = 'Like';
    count = Math.max(0, count - 1); // không để số âm
    button.style.color = '';
  }

  button.dataset.count = count;
  countSpan.textContent = count;
}
