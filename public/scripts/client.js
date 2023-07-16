/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  // Function to create the HTML structure for a tweet
    const createTweetElement = function (tweet) {
    const $tweet = $(`
      <article class="tweet">
        <div class="user">
          <img src="${tweet.user.avatars}" alt="User Avatar">
          <span class="user-name">${tweet.user.name}</span>
          <span class="user-handle">${tweet.user.handle}</span>
        </div>
        <p class="tweet-text">${$("<div>").text(tweet.content.text).html()}</p>
        <footer>
          <span class="tweet-time">${timeago.format(tweet.created_at)}</span>
          <div class="tweet-icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `);
  
    return $tweet;
  };
  // Function to render tweets
    const renderTweets = function(tweets) {
    const $tweetsContainer = $('#tweet-container'); 
    $tweetsContainer.empty(); // Empty the container before appending new tweets
  
    // Reverse the tweets array to show the newest tweet on top
    tweets.reverse();

    for (const tweet of tweets) {
      const $tweetElement = createTweetElement(tweet);
      $tweetsContainer.append($tweetElement);
    }
  };
 // Function to fetch tweets from the server
 const loadTweets = function() {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    dataType: 'json',
    success: function(data) {
      renderTweets(data); // Call the renderTweets function with the fetched data
    },
    error: function(error) {
      console.log('Error fetching tweets:', error);
    }
  });
};

// Call the loadTweets function to fetch and render tweets on page load
loadTweets();

 // Event handler for form submission
 $('.new-tweet form').submit(function(event) {
  event.preventDefault();

  const tweetText = $("#tweet-text").val();
  const $errorMessage = $(".error-message");
  $errorMessage.slideUp(); // Hide error message before validation

  if (tweetText.trim().length === 0) {
    $errorMessage.text("Error: Tweet cannot be empty.");
    $errorMessage.slideDown();
  } else if (tweetText.length > 140) {
    $errorMessage.text("Error: Tweet exceeds 140 characters.");
    $errorMessage.slideDown();
  } else {
    $.ajax({
    url: '/tweets',
    method: 'POST',
    data: $(this).serialize(),
    success: function(response) {
      loadTweets(); // Reload tweets after successful submission
    },
    error: function(error) {
      //alert('Error submitting tweet. Please try again.');
      alert(error.name);
    }
  });
      // Clear the tweet text area
      $("#tweet-text").val("");
}
});
});