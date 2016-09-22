class InfiniteTweets {
  constructor(el) {
    this.$el = $(el);
    this.maxCreatedAt = null;
    this.fetchTweets();
    this.$el.on('click', '.fetch-more', this.fetchTweets.bind(this));
  }

  fetchTweets() {
    const sendData = {};
    if (this.maxCreatedAt === null) {
      this.maxCreatedAt = new Date().toString();
    }
    // debugger
    sendData.max_created_at = this.maxCreatedAt;

    $.ajax({
      method: "GET",
      url: "/feed",
      data: sendData,
      dataType: "json",
      success: (data) => {
        this.insertTweets(data);
        this.maxCreatedAt = data[data.length - 1].created_at;
      }
    });
  }

  insertTweets(tweets) {
    const $feed = $('ul#feed');
    for (let i = 0; i < tweets.length; i++) {
      const $li = $(`<li>${JSON.stringify(tweets[i])}</li>`);
      $feed.append($li);
    }
  }
}

module.exports = InfiniteTweets;
