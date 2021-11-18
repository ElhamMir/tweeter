$(document).ready(function() {
    // --- our code goes here ---
    console.log('testing');
    const maxlength = 140;
      
    $("#tweet-text").on("input",function(tweet){
    
      const currentLength = $(this).val().length;
      const remainingChars = maxlength - currentLength;
      $('#counter').val(remainingChars);
      if(remainingChars < 0){
        $('#counter').css('color','red');
      } else{
        $('#counter').css('color','black');
      }
      
    }); 
   
  });
  