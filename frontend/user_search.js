const FollowToggle = require('./follow_toggle.js');

class UserSearch {
  constructor(el) {
    this.$el = $(el);
    this.$input = this.$el.find('input');
    this.$ul = this.$el.find('ul');

    this.$el.on('input', this.handleInput.bind(this));
  }

  handleInput(event) {
    console.log(this.$input.val());
    $.ajax({
      method: "GET",
      url: "/users/search",
      data: {query: this.$input.val()},
      dataType: "json",
    }).success( (data) => {
      this.renderResults(data);
    }).error( ( ) => {
      console.log("Error");
    });
  }

  renderResults(users) {
    this.$ul.html("");
    for (let i = 0; i < users.length; i++) {
      this.$ul.append(this.userLink(users[i]));
    }
  }

  userLink(user){
    const $a = $(`<a href="${user.id}">${user.username}</a>`);
    const $followButton = $(`<button class="follow-toggle"></button>`);
    new FollowToggle($followButton, {
      userId: user.id,
      followState: this.followStateString(user)
    });
    const $li = $(`<li></li>`).append($a).append($followButton);
    return $li;
  }

  followStateString(user) {
    if (user.followed) {
      return "followed";
    } else {
      return "unfollowed";
    }
  }
}

module.exports = UserSearch;
