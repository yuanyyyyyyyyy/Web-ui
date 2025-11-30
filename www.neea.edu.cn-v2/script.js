(function(){
  const carousel = document.querySelector('.carousel');
  if(!carousel) return;

  const slides = carousel.querySelector('.slides');
  const images = slides.querySelectorAll('img');
  const total = images.length;
  
  if (total === 0) return;

  let currentIndex = 0;
  let timer = null;

  // 禁用 CSS 动画，完全由 JS 控制
  carousel.classList.add('js-enabled');
  
  // 简单直接的初始化
  function init() {
    // 设置容器宽度
    const containerWidth = carousel.clientWidth;
    slides.style.width = `${containerWidth * total}px`;
    
    // 设置每张图片宽度
    images.forEach(img => {
      img.style.width = `${containerWidth}px`;
      img.style.flexShrink = '0';
    });
    
    slides.style.display = 'flex';
    slides.style.transition = 'transform 0.5s ease';
    
    updatePosition();
    startAutoPlay();
  }

  function updatePosition() {
    const offset = -currentIndex * carousel.clientWidth;
    slides.style.transform = `translateX(${offset}px)`;
    
    // 更新指示点
    const dots = carousel.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function next() {
    currentIndex = (currentIndex + 1) % total;
    updatePosition();
  }

  function prev() {
    currentIndex = (currentIndex - 1 + total) % total;
    updatePosition();
  }

  function startAutoPlay() {
    timer = setInterval(next, 4000);
  }

  function stopAutoPlay() {
    clearInterval(timer);
  }

  // 事件监听
  carousel.addEventListener('mouseenter', stopAutoPlay);
  carousel.addEventListener('mouseleave', startAutoPlay);

  const nextBtn = carousel.querySelector('.carousel-btn.next');
  const prevBtn = carousel.querySelector('.carousel-btn.prev');
  
  if (nextBtn) nextBtn.addEventListener('click', next);
  if (prevBtn) prevBtn.addEventListener('click', prev);

  // 指示点点击
  const dots = carousel.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updatePosition();
    });
  });

  // 初始化
  window.addEventListener('load', init);
  window.addEventListener('resize', init);
})();