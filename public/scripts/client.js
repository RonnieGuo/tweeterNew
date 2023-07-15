/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweet) {
  // Create HTML markup for the tweet article using template literals
  const $tweet = $(`
    <article class="tweet">
      <div class="user">
        <img class="avatar" src="${tweet.user.avatars}" alt="User Avatar">
        <span class="user-name">${tweet.user.name}</span>
      </div>
      <div class="tweet-content">${tweet.content.text}</div>
      <hr class="solid">
      <footer>
        <span class="timestamp">${tweet.created_at}</span>
        <div class="actions">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
  `);

  return $tweet;
};

// Test / driver code (temporary). Eventually will get this from the server.

const renderTweets = function(tweets) {
  const $tweetsContainer = $('#tweet-container'); 
  $tweetsContainer.empty(); // Empty the container before appending new tweets

  for (const tweet of tweets) {
    const $tweetElement = createTweetElement(tweet);
    $tweetsContainer.append($tweetElement);
  }
};


const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
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
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

$(document).ready(function() {
  renderTweets(data);
});
