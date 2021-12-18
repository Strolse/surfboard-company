const findDataPair = (data) => {
  return $('.reviews__item').filter((ndx, item) => {
    return $(item).attr('data-to-link') == data;
  })
}

$('.avatar-click__link').on('click', e => {
  e.preventDefault();

  const chosenLink = $(e.currentTarget);
  const needData = chosenLink.attr('data-open');
  const needItem = findDataPair(needData);
  const chosenItem = chosenLink.closest('.avatar-click');

  needItem.addClass('active').siblings().removeClass('active');
  chosenItem.addClass('active').siblings().removeClass('active');
})