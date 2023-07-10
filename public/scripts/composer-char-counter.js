$(document).ready(function() {
  $(".new-tweet textarea").on("input", function() {
    var textLength = $(this).val().length;
    var counter = $(this).siblings("div").find(".counter");
    var remainingChars = 140 - textLength;
    
    counter.text(remainingChars);
    
    if (remainingChars < 0) {
      counter.addClass("invalid");
    } else {
      counter.removeClass("invalid");
    }
  });
});
