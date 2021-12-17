const openItem = function(item) {

const itemContainer = item.closest('.team__item');
const content = itemContainer.find('.team__content');
const contentMain = content.find('.team__content-main');
const needHeight = contentMain.outerHeight();
itemContainer.addClass('active');

content.height(needHeight);
};

const closeItem = function(itemStore){
  const items = itemStore.find('.team__content');
  items.height(0);
  const itemsStore = items.closest('.team__item');
  itemsStore.removeClass('active');
}

// const trianglePosition ()


$('.team__title').on('click', e =>{

  const chosenElem = $(e.currentTarget);
  const itemStore = chosenElem.closest('.team');
  const elemStore = chosenElem.closest('.team__item');
  const triangle = chosenElem.find('.team__title-svg-path');
  const triangleAll = itemStore.find('.team__title-svg-path');



  if(elemStore.hasClass('active')){
    closeItem(itemStore);
    triangle.attr('xlink:href', './sprite.svg#triangle-down')
  } else{
    closeItem(itemStore);
    openItem(chosenElem);
    triangleAll.attr('xlink:href', './sprite.svg#triangle-down');
    triangle.attr('xlink:href', './sprite.svg#triangle-up');

  }
})