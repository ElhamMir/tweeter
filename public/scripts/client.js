function loadTweets() {
  $.ajax({
    type: "GET",
    url: "/tweets",
    data: $(this).serialize(),
    success: function(data) {
      renderTweets(data);
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
];


const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
      

const createTweetElement = function(tweet) {
  let name = tweet.user.name;
  let avatar = tweet.user.avatars;
  let username = tweet.user.handle;
  let time = timeago.format(new Date(tweet.created_at));
  let tweetText = tweet.content.text;
  let $tweet = $(`
  <section id = "tweets-container1">
  <article class="tweet">
        <div>
        <div id="avatar"><img src=${avatar}></div>
        <div id="name">${name}</div>
        <div id="username">${username}</div>
        </div>
        <div id="tweetText" style="width=50%; overflow-wrap: break-word;
        word-wrap: break-word;
        flex-direction: row;">${escape(tweetText)}</div>
        <hr id="lineSpace">
        <footer>${time}
        <a> 
        <span id="icons"
        ><i class="fas fa-flag"></i>&nbsp;&nbsp; <i class="fas fa-retweet"></i>&nbsp;&nbsp;<i class="fas fa-heart"></i></span>
      </article>
      </section>`);

  console.log(tweet);
  return $tweet;
};

const renderTweets = function(tweets) {
  $("#tweets-container").empty();
  for (let tweet of tweets) {
    $("#tweets-container").prepend(createTweetElement(tweet));

  }
};

$(document).ready(function() {
  loadTweets();
  $("#target").on("submit",function(event) {
    event.preventDefault();
    let tweet1 = $('.tweet-text').val().length;
    console.log("tweet1",tweet1);
    $('.err').text('');
    if (tweet1 === 0) {
      console.log("line 10");
      $('#empty-tweet').slideDown();
      $("#btn").click(function() {
        $('#empty-tweet').slideUp();
        $('#empty-tweet').hide();
      });
      return;
    }
    else if (tweet1 > 140) {
      $('#long-tweet').show("slow");
      $("#btn").click(function() {
        $('#long-tweet').hide();
      });
      return;
    }
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: $(this).serialize(),
      success: function() {
        console.log(data);
        loadTweets();
        $('#tweet-text').val('');
      }
    });
  });
});