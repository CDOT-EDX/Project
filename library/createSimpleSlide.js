var AVIATION = AVIATION || {};

// begin a javascript class "Slide"
AVIATION.common = {};

AVIATION.common.Slide = function( options ){
  if(!options){
    options = {};
  }

	this["type"] = options["type"] || "simple"; // check which options are given and then assign a default
												                      // type maybe in constructor?
	this["options"] = options["options"];
	this.avatars = options.avatars;

  console.log("this inside Slide:");
  console.log(this);
};

AVIATION.common.Slide.prototype = {

  constructor: function(){
  	// check type of slide and run the proper initFunc
    if (this["type"] === "simple"){
      console.log("simple type");
      this._initSimple( this["options"] );
    } else {
      console.log("not simple slide");
      this._initHighlights();
    }
  },
/*
  buildHighlights: function(){

  },

  buildModals: function(){

  },
*/
  _initSimple: function(options){
	  var avatars, content = [], audio = [];

  	var defaults = {
      //id: "#slideContainer",
      showAvatars: false,
      showSlideControls: true,
      showStatus: true,
      showControls: true,
    };

    console.log("this initSimple:");
    console.log(this);

    if(!options){
      options = this["options"] || {};
    }

    for (option in defaults){
      // if this key doesn't exist, init to default
      if(!options[option]){
        options[option] = defaults[option]
      }
    }

    this["options"] = options;

    console.log("run simple");
    console.log(this);    

    try {
      // if smth might cause an error....
      if(!this.id) throw "an id is required";
    } catch(error){
      console.log("error: ");
      console.debug(error);
    } finally {
      console.log("using a default id instead");
      // do something to continue running
      this["id"] = "#slideContainer";
    }

    // let's add some elements to our base div inside the slide
    var 

  }
};
/**
  var newSlide = new Slide();
  newSlide.constructor();
**/
console.log("before slide creation");

var testSlide = new Slide();
console.log("this is a test slide...");
console.log(testSlide);