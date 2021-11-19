$(document).ready(function () {

  $( "#target" ).submit(function( event ) {
   // alert( "Handler for .submit() called." );
    event.preventDefault();
    let tweet1 = $('.tweet-text').val().length;
    //let tweet2 = $('.tweet-text').val()
    //console.log(tweet2,"tweet2")
    $('.err').text('');

    if(tweet1 === 0) {
      alert("the tweet is empty");
      return;
      

    }
    else if (tweet1 >140) {
      alert('Your tweet length is more than 140 :(');
      return;
    }
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: $(this).serialize(),
        success: function(){
          console.log(data);
          loadTweets(tweet2)
          $.ajax({
            url: "http://localhost:8080/",
            dataType: "script",
            success: function() {
              console.log("worked")
              $.ajax({
                url: "http://localhost:8080/",
                dataType: "script",
                success: success
              });
            }
          });
    
        },
        dataType: 'json'
      });
     // $( ".result" ).html( data );
     
   
    });
  
    function loadTweets() {
      $.ajax({
        type: "GET",
        url: "/tweets",
        data: $(this).serialize(),
        success: function(data){
          renderTweets(data);
         // window.location.reload()
         
          //console.log(data);
        },
        dataType: 'json'
      });
     }
  
  

    const data = [
        {
          "user": {
            "name": "Newton",
            "avatars": "https://i.imgur.com/73hZDYK.png"
            ,
            "handle": "@SirIsaac"
          },
          "content": {
            "text": "If I have seen further it is by standing on the shoulders of giants"
          },
          "created_at": 1461116232227
        },
        {
          "user": {
            "name": "Descartes",
            "avatars": "https://i.imgur.com/nlhLi3I.png",
            "handle": "@rd" },
          "content": {
            "text": "Je pense , donc je suis"
          },
          "created_at": 1461113959088
        }
      ]

const createTweetElement = function(tweet) {
  let name = tweet.user.name;
  let avatar = tweet.user.avatars;
  let username = tweet.user.handle
  let time = timeago.format(new Date(tweet.created_at))
  let tweetText = tweet.content.text;
  let $tweet = $(`
  <section id = "tweets-container1">
  <article class="tweet">
        <div>
        <div id="avatar"><img src=${avatar}></div>
        <div id="name">${name}</div>
        <div id="username">${username}</div>
        </div>
        <div id="tweetText">${tweetText}</div>
        <hr id="lineSpace">
        <footer>${time}
        <a> 
        <span id="icons"
        ><i class="fas fa-flag"></i>&nbsp;&nbsp; <i class="fas fa-retweet"></i>&nbsp;&nbsp;<i class="fas fa-heart"></i></span>
        <hr id="lineSpace2">
        </a>&nbsp;&nbsp;</footer>
      </article>
      </section>`);

      console.log(tweet)
    return $tweet;
  }

//createTweetElement(data)

const renderTweets = function(tweets) {
  $("#tweets-container").empty()
    for (let tweet of tweets) {
        console.log(tweet,"here")
        $("#tweets-container").append(createTweetElement(tweet));

    }
   
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
}



renderTweets(data);
loadTweets()
})
