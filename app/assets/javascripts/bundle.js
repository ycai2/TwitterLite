/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const FollowToggle = __webpack_require__(1);
	const UserSearch = __webpack_require__(2);
	const TweetCompose = __webpack_require__(3);
	const InfiniteTweets = __webpack_require__(4);
	
	
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


/***/ },
/* 1 */
/***/ function(module, exports) {

	class FollowToggle {
	  constructor(el, options) {
	    this.$el = $(el);
	    this.userId = this.$el.data("user-id") || options.userId;
	    this.followState = this.$el.data("initial-follow-state") || options.followState;
	
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const FollowToggle = __webpack_require__(1);
	
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
	    }).error(() => {
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


/***/ },
/* 3 */
/***/ function(module, exports) {

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
	    this.$el.find(".mentioned-users").empty();
	    this.$el.find(".chars-left").html(140);
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
	    $(event.currentTarget).parent().remove();
	  }
	}
	
	module.exports = TweetCompose;


/***/ },
/* 4 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map