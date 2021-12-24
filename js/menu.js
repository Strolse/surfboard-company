const openMenu = document.querySelector("#hamburger");
const fullscreenMenu = document.querySelector("#fullscreen-menu");
const menu = document.querySelector("#menu");
const close = document.querySelector("#fullscreen-menu__close");

openMenu.addEventListener("click", function(event){
  event.preventDefault();
  fullscreenMenu.style.display = "block";
  menu.style.display = "block";
  // console.log(fullscreenMenu);
})

close.addEventListener("click", function(event){
  event.preventDefault;
  fullscreenMenu.style.display = "none";
  menu.style.display = "none";
})


