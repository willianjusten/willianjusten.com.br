// Scroll
smoothScroll.init({
    updateURL: false
})

// Menu
var slideButton = document.getElementById('slide'),
    sidebar     = document.getElementById('sidebar'),
    fade        = document.getElementById('fade'),
    open        = document.getElementById('open'),
    close       = document.getElementById('close'),
    search      = document.getElementById('search');

var slideItens = [slideButton, sidebar, fade];

slideButton.addEventListener('click', function(){
  for(var i = 0; i < slideItens.length; i++) {
    slideItens[i].classList.add('slide');
  }
  open.style.display = 'none';
  search.style.display = 'none';
  close.style.display = 'block';
});

fade.addEventListener('click', function(){
  for(var i = 0; i < slideItens.length; i++) {
    slideItens[i].classList.remove('slide');
  }
  open.style.display = 'block';
  search.style.display = 'block';
  close.style.display = 'none';
}); 

// Search
(function( $, window, undefined ) {

     var bs = {
          close: $(".icon-remove-sign"),
          searchform: $(".search-form"),
          canvas: $("body"),
          dothis: $('.dosearch')
      };

    bs.dothis.on('click', function() {
      $('.search-wrapper').css({ transform: "translateY(0)" });
      bs.searchform.toggleClass('active');
      bs.searchform.find('input').focus();
      bs.canvas.toggleClass('search-overlay');
      $('.search-field').simpleJekyllSearch();
    });

      bs.close.on('click', function() {
        $('.search-wrapper').removeAttr( 'style' );
        bs.searchform.toggleClass('active');
        bs.canvas.removeClass('search-overlay');
    });
  })( jQuery, window );
