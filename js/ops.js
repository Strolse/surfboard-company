const sections = $('section');
const display = $('.maincontent');
const fixedMenu = $('.fixed-menu');

let inScroll = false;

sections.first().addClass("active"); 

const countPosition = (sectionNumber) => {
  return sectionNumber * -100;
}

const changeTheme = (sectionNumber) => {
  const currentSection = sections.eq(sectionNumber);
  const themeMenu = currentSection.attr("data-fixedmenu-theme");
  const activeClass = "fixed-menu--theme--dark";

  if(themeMenu == "dark"){
    fixedMenu.addClass(activeClass);

  } else {
    fixedMenu.removeClass(activeClass);
  }
}

const makeTransion = (sectionNumber) =>{
  if(inScroll == false) {
    inScroll = true;
    const position = countPosition(sectionNumber);
    display.css({transform:`translateY(${position}%)`});
    sections.eq(sectionNumber).addClass('active').siblings().removeClass('active');  
  
    changeTheme(sectionNumber);

    setTimeout(() => {
      inScroll = false;
      fixedMenu.find('.fixed-menu__item').eq(sectionNumber).addClass('fixed-menu__item--active').siblings().removeClass('fixed-menu__item--active');
    }, 1300);
  }
}

const defineSection = direction =>{
  const activeSection = sections.filter('.active');
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  if(direction == "next" && nextSection.length){
    makeTransion(nextSection.index())

  }

  if(direction == "prev" && prevSection.length){
    makeTransion(prevSection.index())
  }
}

$(window).on("wheel", e =>{
  const deltaY = e.originalEvent.deltaY;
  
  if(deltaY > 0){
    defineSection("next");
  }

  if(deltaY < 0){
    defineSection("prev");
  }
})

$(window).on("keydown", e =>{
  const tag = e.target.tagName.toLowerCase();
  const userTypingInInputs = tag == "input" || tag == "textarea";

  if(userTypingInInputs) return;{
    switch(e.keyCode){
      case 38:
        defineSection("prev");
      break;
  
      case 40:
        defineSection("next");
      break;
    }  
  }
})

$("[data-scroll-to]").on('click', e =>{
  e.preventDefault();
  const currentElem = $(e.currentTarget);
  const target = currentElem.attr("data-scroll-to");
  const needSection = $(`[data-section-id=${target}]`);

  makeTransion(needSection.index())
})


// https://github.com/mattbryson/TouchSwipe-Jquery-Plugin

  // $("body").swipe( {
  //   swipe: function(event, direction) 
  //   {
  //     alert(direction);
  //   }
  // });