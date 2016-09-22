const FollowToggle = require('./follow_toggle.js');
const UserSearch = require('./user_search.js');
const TweetCompose = require('./tweet_compose.js');
const InfiniteTweets = require('./infinite_tweets.js');


$(function () {
  $('.follow-toggle').each(function(idx, el) {
    new FollowToggle(el);
  });

  $('.user-search').each(function(idx, el) {
    new UserSearch(el);
  });

  $('.tweet-compose').each(function(idx, el) {
    new TweetCompose(el);
  });

  $('.infinite-tweets').each(function(idx, el){
    new InfiniteTweets(el);
  });
});
