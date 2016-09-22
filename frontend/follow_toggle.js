class FollowToggle {
  constructor(el) {
    this.$el = $(el);
    this.userId = this.$el.data("user-id");
    this.followState = this.$el.data("initial-follow-state");

    this.render();
    this.$el.click(this.handleClick.bind(this));
  }

  render() {
    if (this.followState === "following" || this.followState === "unfollowing") {
      $('button.follow-toggle').prop('disabled', true);
      $("button.follow-toggle").html(this.followState);
    } else {
      $('button.follow-toggle').prop('disabled', false);
      if (this.followState === "unfollowed" || this.followState === "unfollowing") {
        $("button.follow-toggle").html("Follow");
      }
      else if (this.followState === "followed" || this.followState === "following") {
        $("button.follow-toggle").html("Unfollow");
      }
      else {
        $("button.follow-toggle").html("Error");
      }
    }
  }

  handleClick(e) {
    e.preventDefault();

    $.ajax({
      method: this.handleClickMethod(),
      url: `/users/${this.userId}/follow`,
      dataType: "json"
    }).done(() => {
      this.toggleState();
      this.render();
    });

    console.log("toggling state reached");
    this.togglingState();
    this.render();
  }

  handleClickMethod() {
    if (this.followState === "followed") {
      return "DELETE";
    } else {
      return "POST";
    }
  }

  toggleState() {
    if (this.followState === "unfollowing") {
      this.followState = "unfollowed";
    } else {
      this.followState = "followed";
    }
  }

  togglingState() {
    if (this.followState === "followed") {
      this.followState = "unfollowing";
    } else {
      this.followState = "following";
    }
  }
}

module.exports = FollowToggle;
