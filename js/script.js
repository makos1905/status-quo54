//ФУНКЦИЯ ОПРЕДЕЛЕНИЯ ПОДДЕРЖКИ WEBP
function testWebP(callback) {

  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

  if (support == true) {
    document.querySelector('body').classList.add('webp');
  } else {
    document.querySelector('body').classList.add('no-webp');
  }
});

//Модальное окно
var
  modal = $('.modal'),
  btnCb = $('#btnCb'),
  btnClose = $('#btnClose');

btnCb.on('click', function () {
  modal.removeClass('hidden');
});
btnClose.on('click', function () {
  modal.addClass('hidden');
});
$(document).keydown(function (e) {
  if (e.which == 27) {
    modal.addClass('hidden');
  }
});
$(document).click(function (e) {
  if ($(e.target).is(modal)) {
    modal.addClass('hidden');
  }
});

//Отступ hero по высоте header
$(document).ready(function () {
  var heightHeaderForHero = $('header').innerHeight();
  var heroTopAll = $('.hero').css("padding-top", heightHeaderForHero);
  $(window).resize(function () {
    var heightHeaderForHero = $('header').height();
    var heroTopAll = $('.hero').css("padding-top", heightHeaderForHero);
  });
});