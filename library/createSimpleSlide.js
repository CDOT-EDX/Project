
var Slide = function( options ){
	this["type"] = options["type"] || "simple"; // check which options are given and then assign a default
												// type maybe in constructor?
	this["options"] = options["options"];
	this.avatars = options.avatars;
}



SimpleSlide.prototype = {

  constructor: function(){
  	// check type of slide and run the proper initFunc
    if (type === "simple"){
      this._initSimple( this["options"] );
    } else {
      this._initHighlights();
    }
  },

  buildHighlights: function(){

  },

  buildModals: function(){

  },

  _initSimple: function(options){
	var avatars, content = [], audio = [];

  	var defaults = {
      showAvatars: false,
      showSlideControls: true,
      showStatus: true,
      showControls: true,
    };

    for (option in defaults){
      // if this key doesn't exist, init to default
      if(!options[option]){
        options[option] = defaults[option]
      }
    }

  },
  _initHighlights: function(){

  }
}

/**
  var newSlide = new Slide();
  newSlide.constructor();
**/