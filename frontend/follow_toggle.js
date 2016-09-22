class FollowToggle {
  constructor(el) {
    this.$el = $(el);
    this.userId = this.$el.data("user-id");
    this.followState = this.$el.data("initial-follow-state");

    this.render();
    this.$el.on("click", this.handleClick.bind(this));
  }

  render() {
    if (this.followState === "following") {
      this.$el.prop('disabled', true);
      this.$el.html("Following...");
    } else if (this.followState === "unfollowing") {
      this.$el.prop('disabled', true);
      this.$el.html("Unfollowing...");
    } else {
      this.$el.prop('disabled', false);
      if (this.followState === "unfollowed" || this.followState === "unfollowing") {
        this.$el.html("Follow");
      }
      else if (this.followState === "followed" || this.followState === "following") {
        this.$el.html("Unfollow");
      }
      else {
        this.$el.html("Error");
      }
    }
  }

  handleClick(event) {
    event.preventDefault();

    $.ajax({
      method: this.handleClickMethod(),
      url: `/users/${this.userId}/follow`,
      dataType: "json"
    }).done(() => {
      this.toggleState();
      this.render();
    });

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
