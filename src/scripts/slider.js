
  const slider = $('.products').bxSlider({
    controls: false,
    pager: false,
  });
  
  $('#arrow-next').on('click', (e) =>{
    e.preventDefault();
    slider.goToNextSlide();
  });
  
  $('#arrow-prev').on('click', (e) =>{
    e.preventDefault();
    slider.goToPrevSlide();
  })

