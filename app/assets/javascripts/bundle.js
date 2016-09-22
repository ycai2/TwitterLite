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
	
	
	$(function () {
	  $('.follow-toggle').each(function(idx, el) {
	    new FollowToggle(el);
	  });
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map