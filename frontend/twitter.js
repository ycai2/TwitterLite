const FollowToggle = require('./follow_toggle.js');
const UserSearch = require('./user_search.js');
const TweetCompose = require('./tweet_compose.js');


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
});
