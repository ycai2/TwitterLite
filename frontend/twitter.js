const FollowToggle = require('./follow_toggle.js');
const UserSearch = require('./user_search.js');


$(function () {
  $('.follow-toggle').each(function(idx, el) {
    new FollowToggle(el);
  });

  $('.user-search').each(function(idx, el) {
    new UserSearch(el);
  });
});
