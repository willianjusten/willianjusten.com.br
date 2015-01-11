window.viewportUnitsBuggyfill.init({hacks: window.viewportUnitsBuggyfillHacks});;
smoothScroll.init({
    updateURL: false
})

$("a#slide").click(function(){
    $("#sidebar,a#slide,#fade").addClass("slide");
    $("#open").hide();
    $("#close").show();
});

$("#fade").click(function(){
    $("#sidebar,a#slide,#fade").removeClass("slide");
    $("#open").show();
    $("#close").hide();
});