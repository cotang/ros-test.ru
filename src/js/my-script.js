// window.$ = window.jQuery =  require('jquery');
// window.slick =              require('./vendor/bower/slick');
// window.knob =               require('./vendor/bower/jquery.knob');
// window.onscreen =           require('./vendor/bower/jquery.onscreen.min');
// window.mousewheel =         require('./vendor/bower/jquery.mousewheel.min');
// window.mwheelintent =       require('./vendor/bower/jquery.mwheelintent');
// window.jscrollpane =        require('./vendor/bower/jquery.jscrollpane');



jQuery(document).ready(function($){  

  /* Scroll customization */
  $('.step__list').jScrollPane({showArrows: true, alwaysShowScroll: true});

  /* Hamburger */
  $('.hamburger').click(function(e){
    e.preventDefault();
    $('.header .menu').toggle();
  }); 

  /* Dropdown menu level1 */
  $('.menu__link--closed').click(function(e){
    e.preventDefault();
    if($(this).next('.menu-submenu').is(":visible")) {
      $(this).next('.menu-submenu').hide();
      $(this).removeClass('menu__link--open');
    } else {
      $(this).closest('.menu__list').find('.menu-submenu').hide();
      $(this).siblings('.menu-submenu').show();
      $(this).closest('.menu__list').find('.menu__link--open').removeClass('menu__link--open');
      $(this).addClass('menu__link--open');
    }
  }); 
  /* Dropdown menu level2 */
  $('.menu-submenu__link--closed').click(function(e){
    e.preventDefault();
    if($(this).next('.menu-sub-submenu').is(":visible")) {
      $(this).next('.menu-sub-submenu').hide();
      $(this).removeClass('menu-submenu__link--open');
    } else {
      $(this).closest('.menu-submenu').find('.menu-sub-submenu').hide();
      $(this).siblings('.menu-sub-submenu').show();
      $(this).closest('.menu-submenu').find('.menu-submenu__link--open').removeClass('menu-submenu__link--open');
      $(this).addClass('menu-submenu__link--open');
    }
  }); 


  /* moving "search" down on cellphone */
  if ($(window).width() <= 540) {
    $('.search').appendTo('.nav');
  }  

    // Promo - tabs
  $('.promo__item').on('mouseenter', function() { 
    var id = $(this).attr('class');
    var id = id.replace(/\D/g, "");
    var idText = '.promo__text--' + id;
    $(this).closest('.promo').find($('.promo__text')).hide();   
    $(idText).show(); 
  }); 


  /* reasons - bars + circlechart */
  function progressBar(percent, $element) {
      var progressBarWidth = percent * $element.width() / 100;
      $element.find('.progress__bar').animate({ width: progressBarWidth }, 2000);
  }
  var ftek = function() {     // изменение числа документов в круге
    var dat0 = new Date(2016, 0, 1,0,0,1,0), now  = new Date(), now9 = new Date(), hr,k=0;
    var tek = 33050,    art =[1,1,2,3,2,3,2,1],kp=15, h9=9;
        now9.setHours(h9,0,1,0);   hr= now.getHours()-h9;
        if (hr>0 && hr<art.length) {  for (i=0;i<hr; i++) k+= art[i];  }
    return Math.floor( tek + k + kp * Math.floor( (now9-dat0)/3600/24/1000 )) 
  };

  $(".dial").knob();
    var kn=true;

  $('.reasons').onScreen({     // Меняем диаграммы при появлении на экране
      container: window,
      direction: 'vertical',
      doIn: function() {
      if (kn) {
        $({animatedVal: 0}).animate({animatedVal: ftek()}, {
          duration: 2000,
          easing: "swing",
          step: function () {
            $(".dial").val(Math.ceil(this.animatedVal)).trigger("change");
          }
        });
        kn=false;
      }
      progressBar(80, $('.progress--01' ));
      progressBar(85, $('.progress--02'));
      progressBar(70, $('.progress--03'));
      progressBar(80, $('.progress--04'));
      },
    doOut: function() {    },
    toggleClass: 'onScreen',
    debug: false
  });

  /* gallery "news" */
  if ($(window).width() <= 768) {
    $('.news-section__gallery').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '0'
    });
  } else if ($(window).width() <= 1024) {
    $('.news-section__gallery').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '0'
    });    
  } else {
    $('.news-section__gallery').slick({
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '0'
    });
  }

  /* Selection process */
  $('.step:not(.step--total) .step__item').on('click', function() { 
    $(this).siblings().removeClass('step__item--active');
    $(this).addClass('step__item--active');
    /* скрываем все списки всех шагов */
    $(this).closest('.step').nextAll('.step').find('.step__list').hide().siblings('.step__nothing').show();
    $(this).closest('.selection__table').find('.step--total').find('.step__list').hide().siblings('.step__nothing').show();
    /* открываем список следующего шага */
    $(this).closest('.step').next('.step').find('.step__nothing').hide().siblings('.step__list').show().jScrollPane({showArrows: true, alwaysShowScroll: true});
    $(this).closest('.step').next('.step').find('.step__item--active').removeClass('step__item--active');

    if ($(this).closest('.step').hasClass('step--04')) {
      $(this).closest('.selection__table').find('.step--total')
        .find('.step__nothing').hide()
        .siblings('.step__list--total').show().jScrollPane({showArrows: true, alwaysShowScroll: true});
    }
  }); 

  /* Sidebar services nav menu */
  $('.services__link').click(function(e){
    e.preventDefault();
    if($(this).next('.services-submenu').is(":visible")) {
      $(this).next('.services-submenu').hide();
    } else {
      $(this).closest('.services__list').find('.services-submenu').hide();
      $(this).next('.services-submenu').show();      
    }
  }); 


  /* Form in the modal window */
  $('.btn[data-form]').click( function(e){
    e.preventDefault(); 
    var suffix = $(this).data("form"); 
    $('body').css({"overflow":"hidden"});   
    $('.modal').show();
    var formClass = '.form--' + suffix;
    $('.modal').find(formClass).fadeIn();
    var dataType = $(this).data("type"); 
    if (dataType){
      $('.modal .form--application').find('.form__input[name="Необходимый документ"]').val(dataType);
    }
  });
  /* Close the modal window */
  $('.modal__overlay, .modal__close').click( function(e){ 
    e.preventDefault();
    $('body').css({"overflow":"auto"});
    // $(this).closest('.modal').find('input, textarea').val('');
    $(this).closest('.modal').find(".form").fadeOut();
    $(this).closest('.modal').fadeOut(400);
  }); 

  /* Запись типа и списка документов в блоке Selection в всплывающую форму application-advanced */
  $('.selection .step--total .btn').click(function(){
    var modalForm = $('.modal .form--application-advanced');
    var productType = $(this).closest('.selection__table').find('.step--03 .step__item--active').text();   
    modalForm.find('.form__input[name="Тип продукции"]').val('Тип продукции: ' + productType);

    var docItem = $(this).closest('.step--total').find('.step__item');    
    var textareaContent = '';
    $(docItem).each(function(indx, element){
      textareaContent+= $(this).text() + '; ';
    });
    modalForm.find('.form__textarea').text(textareaContent);
  });    
  
});


    