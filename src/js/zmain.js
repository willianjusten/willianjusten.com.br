(function( $, window, undefined ) {

  // init highlight
  hljs.initHighlightingOnLoad();

  // Menu
  $("a#slide").click(function(){
    $("#sidebar,a#slide,#fade").addClass("slide");
    $("#open").hide();
    $("#search").hide();
    $("#close").show();
  });

  $("#fade").click(function(){
    $("#sidebar,a#slide,#fade").removeClass("slide");
    $("#open").show();
    $("#search").show();
    $("#close").hide();
  });

  // Search
  var bs = {
    close: $(".icon-remove-sign"),
    searchform: $(".search-form"),
    canvas: $("body"),
    dothis: $('.dosearch')
  };

  bs.dothis.on('click', function() {
    $('.search-wrapper').toggleClass('active');
    bs.searchform.toggleClass('active');
    bs.searchform.find('input').focus();
    bs.canvas.toggleClass('search-overlay');
    $('.search-field').simpleJekyllSearch();
  });

  function close_search() {
    $('.search-wrapper').toggleClass('active');
    bs.searchform.toggleClass('active');
    bs.canvas.removeClass('search-overlay');
  }

  bs.close.on('click', close_search);

  // Closing menu with ESC
  document.addEventListener('keyup', function(e){
      if(e.keyCode == 27 && $('.search-overlay').length) {
          close_search();
      }
  });
  if (document.getElementsByClassName('home').length >=1 ) {
      new AnimOnScroll( document.getElementById( 'grid' ), {
        minDuration : 0.4,
        maxDuration : 0.7,
        viewportFactor : 0.2
      } );
  }

  smoothScroll.init({
      selectorHeader: '.bar-header', // Selector for fixed headers (must be a valid CSS selector)
      speed: 500, // Integer. How fast to complete the scroll in milliseconds
      updateURL: false, // Boolean. Whether or not to update the URL with the anchor hash on scroll
  });

function scrollBanner() {
  var scrollPos;
  var headerText = document.querySelector('.header-post .content')
  scrollPos = window.scrollY;

  if (scrollPos <= 500) {
      headerText.style.transform =  "translateY(" + (-scrollPos/3) +"px" + ")";
      headerText.style.opacity = 1-(scrollPos/500);
  }
}

if (screen.width > 1024 && document.getElementsByClassName('header-post').length >=1) {
  window.addEventListener('scroll', scrollBanner);
}

})( Zepto, window );

function queroMeuCupom() {
  console.log("Para ganhar seu cupom, algumas charadas você vai ter que responder, como responder? Tente executar!\n\n");
  console.log("O que há em nenhuma parte mas em todos os lugares, exceto quando algo é?");
}

function nada() {
  console.log("Meus parabéns, a primeira charada você acertou, que tal outra?\n\n\n");
  console.log("Leve como uma pena, mas ninguém pode segurar por muito tempo. O que eu sou?");
}

function folego() {
  console.log("Está ficando bom, mas que tal outra?\n\n\n");
  console.log("O que não é nem café da manhã nem almoço?");
}

function jantar() {
  console.log("Muiiiito bem, só mais uma?\n\n\n");
  console.log("Insiste em me ignorar e finalmente quando me vou, você luta para me ter de volta. Quem eu sou?");
}

function tempo() {
  console.log("Pronto! Você passou por todas as charadas! Agora compartilhe um post meu (facebook ou twitter) me marcando e sem mencionar o jogo e darei a última charada!");
}

queroMeuCupom();