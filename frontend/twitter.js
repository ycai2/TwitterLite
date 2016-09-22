const FollowToggle = require('./follow_toggle.js');


$(function () {
  $('.follow-toggle').each(function(idx, el) {
    new FollowToggle(el);
  });
});
