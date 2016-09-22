class TweetCompose {
  constructor(el) {
    this.$el = $(el);
    this.$el.on('submit', this.submit.bind(this));
    this.$el.on('input', 'textarea', this.counter.bind(this));
    this.$el.on('click', 'a.add-mentioned-user', this.addMentionedUser.bind(this));
    this.$el.on('click', 'a.remove-mentioned-user', this.removeMentionedUser.bind(this));
  }

  submit(e) {
    e.preventDefault();

    let submission = this.$el.serializeJSON();
    console.log(submission);

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: submission,
      dataType: "json",
      success: (data) => {
        this.handleSuccess(data);
      }
    });

    this.$el.find(':submit').prop('disabled', true);
  }

  clearInput() {
    this.$el.find("textarea").val("");
    this.$el.find("select").val($("option"));
  }

  handleSuccess(tweet) {
    this.clearInput();
    this.$el.find(':input').prop('disabled', false);
    this.insertTweet(tweet);
  }

  insertTweet(tweet) {
    const $li = $(`<li>${JSON.stringify(tweet)}</li>`);
    console.log($li);
    $(this.$el.data("tweets-ul")).prepend($li);
  }

  // Add logic for numChars < 0
  counter(){
    let numChars = this.$el.find("textarea").val().length;
    this.$el.find(".chars-left").html(140 - numChars);
  }

  addMentionedUser() {
    const $scriptTag = this.$el.find('script');
    $('.mentioned-users').append($scriptTag.html());
  }

  removeMentionedUser(event){
    console.log(event.currentTarget);
  }
}

module.exports = TweetCompose;
