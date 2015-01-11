// Polyfill VH
window.viewportUnitsBuggyfill.init({hacks: window.viewportUnitsBuggyfillHacks});;
smoothScroll.init({
    updateURL: false
})

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
$(document).ready(function() {
      $('.search-field').simpleJekyllSearch({
          jsonFile : '/search.json',
          searchResults : '.search-results',
          template : '<li><article><a href="{url}">{title} <span class="entry-date"><time datetime="{date}">{date}</time></span></a></article></li>'
        });
  });
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
    });

      bs.close.on('click', function() {
        $('.search-wrapper').removeAttr( 'style' );
        bs.searchform.toggleClass('active');
        bs.canvas.removeClass('search-overlay');
    });
  })( jQuery, window );