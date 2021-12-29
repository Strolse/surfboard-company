
  let map;

  const init = () =>{
    map = new ymaps.Map("map", {
      center: [55.751774, 37.593535],
      zoom: 14,
      controls: [
      ]
    });
  
    const myPlacemark = new ymaps.Placemark([55.749081, 37.604367], {}, {
      draggable: false,
      iconLayout: 'default#image',
      iconImageHref: './img/icons/marker.svg',
      iconImageSize: [58, 73],
      iconImageOffset: [-56, -70],
    });
  
    map.geoObjects.add(myPlacemark); 
    map.behaviors.disable('scrollZoom');
  }
  
  ymaps.ready(init);
  
  // function init(){
  //   // Создание карты.
  //   var myMap = new ymaps.Map("map", {
  //       // Координаты центра карты.
  //       // Порядок по умолчанию: «широта, долгота».
  //       // Чтобы не определять координаты центра карты вручную,
  //       // воспользуйтесь инструментом Определение координат.
  
  //       // Уровень масштабирования. Допустимые значения:
  //       // от 0 (весь мир) до 19.
  
  //   });
  // }

