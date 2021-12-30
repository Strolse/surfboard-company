;(function(){
  const whatWidth = (item) =>{
    let reqItemWidth = 0;
  
    const windowWidth = $(window).width();
    const container = item.closest('.products-menu');
    const titles = container.find('.products-menu__title');
    const titlesWidth = titles.width() * titles.length;
  
    const contentBlock = item.find('.products-menu__content-main');
  
    const paddingLeft = parseInt(contentBlock.css("padding-left"));
    const paddingRight = parseInt(contentBlock.css("padding-right"));
   
    
    const isMobile = window.matchMedia("(max-width: 850px)").matches;
    // const isMiniMobile = window.matchMedia("(max-width: 480px)").matches;
  //   const allItem = container.find('.products-menu');
  
  //   allItem.each((ndx, item)=>{
  //     if (isMiniMobile | !item.hasClass('active')){
  //     const titleHidden =  item.titles.toggleClass('products-menu__title hidden')
  //   }
  //   console.log (titleHidden);
  // });
  
    if(isMobile){
      reqItemWidth = windowWidth - titlesWidth;
    } else {
      reqItemWidth = 524;
    }
  
    return {
      container: reqItemWidth,
      content: reqItemWidth - paddingLeft - paddingRight
    }
  }
  
  const closeElems = (container) =>{
    const items = container.find('.products-menu__item');
    const content = container.find('.products-menu__content');
    items.removeClass('active');
    
    content.width(0);
  }
  
  const openElem = function(item) {
    const content = item.find('.products-menu__content');
    const textBlock = item.find('.products-menu__content-main');
  
    const needWidth = whatWidth(item);
  
    item.addClass('active');
  
    content.width(needWidth.container);
    textBlock.width(needWidth.content);
  
  }
  
  $('.products-menu__title').on('click', e=>{
    e.preventDefault();
  
    const currentElem = $(e.currentTarget);
    const item = currentElem.closest('.products-menu__item');
    const openedItem = item.hasClass('active');
    const container = item.closest('.products-menu');
  
    if(openedItem){
      closeElems(container)
    } else {
      closeElems(container)
      openElem(item)
    }
  
  });

})();