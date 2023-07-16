/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  // Function to create the HTML structure for a tweet
  const createTweetElement = function(tweet) {
    const $tweet = $(`
    <article class="tweet">
    <div class="user">
      <img src="${tweet.user.avatars}" alt="User Avatar">
      <span class="user-name">${tweet.user.name}</span>
      <span class="user-handle">${tweet.user.handle}</span>
    </div>
    <p class="tweet-text">${tweet.content.text}</p>
    <hr class="solid">
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

// Function to handle form submission
$('#tweet-form').submit(function(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  const $form = $(this);
  const formData = $form.serialize(); // Serialize the form data to a query string

  // Send the form data to the server using AJAX
  $.ajax({
    url: '/tweets',
    method: 'POST',
    data: formData,
    success: function(response) {
      loadTweets(); // Reload tweets after submitting the form
    },
    error: function(error) {
      console.log('Error submitting tweet:', error);
    }
  });
});
});
