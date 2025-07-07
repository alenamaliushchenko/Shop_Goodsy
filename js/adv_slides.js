const sliders = [ 
  {
    src: './img/Screenshot_1.png',
    link: 'https://silpo.ua/about/nacionalnyj-keshbek',
    sectionId: 'slide1'
  },
  {
    src: './img/Screenshot_2.png',
    link: 'https://silpo.ua/sets/znyzhka-do-30-na-prosekko-ta-ihrysti-vyna',
    sectionId: 'slide2'
  },
  {
    src: './img/Screenshot_6.png',
    link: 'https://silpo.ua/sets/ferma',
    sectionId: 'slide3'
  }
];



function renderSlider() {
  const advSliderRoot = document.getElementById('adv-slides');
  if (!advSliderRoot) {
    // Якщо контейнер ще не з'явився, пробуємо ще раз через 50мс
    setTimeout(renderSlider, 50);
    return;
  }
  // Очищаємо контейнер перед рендером
  advSliderRoot.innerHTML = '';
  const sliderContainer = document.createElement('div');
  sliderContainer.style.position = 'relative';
  sliderContainer.style.overflow = 'hidden';
  sliderContainer.style.height = '150px';
  sliderContainer.style.background = '#fff';
  sliderContainer.style.padding = '15px 20px';
  advSliderRoot.appendChild(sliderContainer);

  const track = document.createElement('div');
  track.style.display = 'flex';
  track.style.gap = '20px';
  track.style.position = 'absolute';
  track.style.left = '0';
  track.style.top = '15px';
  sliderContainer.appendChild(track);


  sliders.forEach(slide => {
    const img = document.createElement('img');
    img.src = slide.src;
    img.style.width = '200px';
    img.style.height = '120px';
    img.style.objectFit = 'contain';
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      window.open(slide.link, '_blank');
    });
    track.appendChild(img);
  });

  sliders.forEach(slide => {
    const img = document.createElement('img');
    img.src = slide.src;
    img.style.width = '200px';
    img.style.height = '120px';
    img.style.objectFit = 'contain';
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      window.open(slide.link, '_blank');
    });
    track.appendChild(img);
  });

  let position = 0;
  const speed = 1;

  const animate = () => {
    position += speed;
    if (position >= track.scrollWidth / 2) {
      position = 0;
    }
    track.style.transform = `translateX(-${position}px)`;
    requestAnimationFrame(animate);
  };
  animate();
}

document.addEventListener('DOMContentLoaded', renderSlider);



