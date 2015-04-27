// best structure to control slide content
/*
var slideContent = [
  { 
    title: "This is some title",
    html: "This is some text",
    //image: "",
    //custom: ""
    audio: 0 // starting index at 0
    second: 1
  },
  {
    title: "Title number two",
    html: "We probably hit the 10th second of the first audio",
    second: 10,
    audio: 0
  },
  {
    title: "Starting audio two",
    html: "This is the text for the second audio followed by a picture",
    second: 0,
    audio: 1
  },
  {
    title: "Audio 2 Image",
    image: "someImage.png",
    second: 10,
    audio: 1
  }
];


// init all audios with mp3/wav/ogg

var audios = [
  "someAudio", "anotherAudio"
];

var options = {
  
};
*/

var AVIATION = AVIATION || {};

// begin a javascript class "Slide"
AVIATION.common = {};

AVIATION.common.Slide = function( options, slideContent, audioFiles ){
  var md = new MobileDetect(window.navigator.userAgent);

  if(md){
    this.isMobile = md.mobile();
  } else {
    this.isMobile = false;
  }

  if(!options){
    options = {};
  }

	this["type"] = options["type"] || "simple"; // check which options are given and then assign a default
												                      // type maybe in constructor?
	this["options"] = options["options"];
	this.avatars = options.avatars;

  this.activeIndex = options.activeIndex || 0;

  this.slideContent = slideContent || [{ title: "No Content Provided", html: "Check your slideContent object"}];

  this.audioFiles = audioFiles || [];
  this.slideAudios = []; // init an empty array to store audio (popcorn) elements in
  this.slideHasListened = []; // store which audios have been listened to

  this.slideElements = {}; // will have status bar / control buttons / title / content and so on

  console.log("this inside Slide:");
  console.log(this);

};

AVIATION.common.Slide.prototype = {

  // constructor which initiates the building process
  constructor: function(){
  	// check type of slide and run the proper initFunc
    if (this["type"] === "simple"){
      console.log("simple type");
      this._initSimple( this["options"] );
    } else {
      console.log("not simple slide");
      this._initPanel( this["options"] );
    }
  },

  // method that initializes building of simple slides
  _initSimple: function(options){
	  var avatars, content = [], audio = [];

  	var defaults = {
      showAvatars: false,
      showSlideControls: true,
      showStatus: true,
      showControls: true,
      showBorder: true
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
      if(!this.container) throw "a container is required, thus provide an id";
    } catch(error){
      console.log("error: ");
      console.debug(error);
    } finally {
      console.log("using a default id instead");
      // do something to continue running
      this.container = "#slideContainer";
    }

    // let's add some elements to our base div inside the slide
    //var container = $(this.container);

    if(options.showAvatars){
      this.buildAvatars();
    }

    this.buildContent();

    this.buildSlideControls();
    this.buildCourseControls();

    // create events for audio/video interactions and a way to track them
  },

  // build titles on the slide
  buildTitle: function(parent, title, callback){
    console.log("building titles");
    console.log("title: ")
    console.log(title);
    console.log(parent);
    console.log("inserting title...");
    if(title){
      var titleElement = jQuery('<h3/>',{
        "id": "slideTitle",
        "class": "text-center",
        html: title
      }).appendTo(parent);
    } else {
      // check if title exists and remove it or make it blank
    }

    if(callback){
      callback();
    }
  },

  // method for building avatars into the slide
  buildAvatars: function(){
    console.log("buidling avatars");
    var avatarLeft, avatarRight;


  },

  // method for building the content of the slide
  buildContent: function(){
    console.log("building content");
    console.log(this);
    var slideContent = this.slideContent,
        activeIndex = this.activeIndex;
    
    var setupInnerContent = function(){
      var closingTag = "", src = "", classes = slideContent[activeIndex].classes.join(" ") || "",
          html;

      if (slideContent[activeIndex].html){
        closingTag = '<div/>';
        html = slideContent[activeIndex].html || "";
      } else {
        
        closingTag = '<image/>';
        src = slideContent[activeIndex].image || "";
        html = "";
      }

      var innerContent = jQuery(closingTag, {
        "class": classes,
        src: src,
        html: html
      }).appendTo(content);


    };

    var content = jQuery('<div/>', {
      "class": "cdot_contentText col-xs-12"
    }).appendTo(this.container);

    this.buildTitle( content, slideContent[activeIndex].title, setupInnerContent);

       
  },

  // build controls that go immediately after the slide (play/pause buttons)
  buildSlideControls: function(){
    var slideControlsRow = jQuery('<div/>', {
      "class": "row",
    }).appendTo( $(this.container).parent() );

    this.insertLineBreak(slideControlsRow);

    var slideControlsContainer = jQuery('<div/>', {
      "id": "playerControls",
    }).appendTo(slideControlsRow);

    var slideControlsPrevious = jQuery('<div/>', {
      "id": "btnPDiv",
      html: '<a href="#" id="btnP" class="btn btn-default cdotBtn2" disabled role="button"></a>'
    }).appendTo(slideControlsContainer);

    var slideControlsPlay = jQuery('<div/>', {
      "id": "btnPlayDiv",
      html: '<a id="btnPlay" class="btn btn-default cdotBtn2" role="button"></a>' +
            '<a id="btnPause" class="btn btn-default cdotBtn2" role="button"></a>' +
            '<a id="btnR" class="btn btn-default cdotBtn2" role="button"></a>'
    }).appendTo(slideControlsContainer);

    var slideControlsNext = jQuery('<div/>', {
      "id": "btnNDiv",
      html: '<a href="#" id="btnN" class="btn btn-default cdotBtn2" disabled role="button"></a>'
    }).appendTo(slideControlsContainer);

    this.insertLineBreak(slideControlsRow);
  },

  insertLineBreak: function( parent ){
    try {
      var lineBreak = jQuery('<div/>', {
        "class": "col-xs-12",
        html: "<!----><br/>"
      }).appendTo(parent);
    } catch(error) {
      console.log("error: " + error);
      console.log("no parent provided, line break not added");
    }
  },

  buildSlideAudios: function(){
    var slideObject = this;
    // check hasPlayer parameter if has been loaded/listend to previously
    // and if matches the # of audioFiles... if so set var to true and restrict pushing hasListened

    this.audioFiles.forEach( function(audio, a){
      // lets make sure that the filename provided is without the extension
      var split = audio.split("."), filename = "", tempArray = [], 
          extensions = ["mp3", "wav", "ogg"], types = [ "audio/mpeg", "audio/wav", "audio/ogg"];

      if(split.length === 2){
        // take only the first argument
        filename = split[0]
      } else if(split.length > 2){
        // lets join everything except for the extension
        for(var i; i<split.length-1; i++){
          tempArray.push(split[i]);
        }
        filename = tempArray.join("");
      } else {
        // its probably the actual filename alone
        filename = audio;
      }

      var addedSlideAudio = jQuery('<audio/>',{
        id: audio + "_" + a,
        html: "Your browser doesn't support audio"
      }).appendTo(slideObject.container);

      for(var i; i<extensions.length; i++){
        jQuery('<source/>', {
          src: filename + extensions[i],
          type: types[i]
        }).appendTo(addedSlideAudio);
      }

      try {
        slideObject.slideAudios.push(Popcorn("#" + audio + "_" + a));
      } catch(error) {
        // was popcorn initialized ok?
        console.log("slide audio init error: ");
        console.log(error);
      } finally {
        // just added the added audio to the slideObject
        slideObject.slideAudios.push(addedSlideAudio);
      }

      // check var from the outside function to see if it is true
      // if so, we probably assigned the slideHasListened to the slideObject
      // already and thus do not need to push again
      slideObject.slideHasListened.push(false);
    })
  },

  // builds controls that go at the very bottom of the slide (back/continue) and status bar
  buildCourseControls: function(){
    var courseControlsRow = jQuery('<div/>', {
      "class": "row",
    }).appendTo( $(this.container).parent() );

    var statusBar = jQuery('<div/>', {
      "class": "col-xs-12",
      html: '<a href="#" id="statusBar"' + 
            'class="btn btn-default col-xs-offset-1 col-xs-10 col-sm-offset-2 col-sm-8 text-center" ' +
            'role="button">Slide Loading...</a>'
    }).appendTo(courseControlsRow);

    this.insertLineBreak(courseControlsRow);

    // TODO: make titles of buttons editable by allowing them to be a property inside options
    var courseControlsContainer = jQuery('<div/>', {
      "class": "col-xs-12",
      html: '<a href="#" id="btnB" class="btn btn-default col-xs-6 col-sm-4" role="button">&lt; Back</a>' + 
            '<a href="#" id="btnC" class="btn btn-default col-xs-6 col-sm-offset-4 col-sm-4" role="button">Continue &gt;</a>'
    }).appendTo(courseControlsRow);
  },

  /*
  buildHighlights: function(){

  },

  buildModals: function(){

  },
  */

  // start playback control methods
  activateTimer: function(seconds, isAuto){
    var timer = this.timer,
        counter = seconds, // duration of the timer (each 1 point is about a second)
        statusBar = this.slideElements.statusBar;

    if (!counter){
      counter = 5;
    }

    if (!timer){
      this.timer = "";
      timer = this.timer;
    }

    //statusBar.text("");
    
    var resetTimerOnClick = function(e){
      e.preventDefault();
      this.resetTimer(true);
      $(this).on('click', function(){
        redirectToPage(continueId); // any URL
      });
    };

    statusBar.on('click', resetTimerOnClick);
  
    if(isAuto) {
      statusBar.text("Continuing in " + counter.toString() + "... Click here to cancel");
    
      this.timer = setInterval( function(){
          counter--;
          if(counter < 0) {
            statusBar.text("Redirecting...");
            redirectToPage(continueId);
            clearInterval(timer);
          } else {
            statusBar.text("Continuing in " + counter.toString() + "... Click here to cancel");
          }
      }, 1000);
    } else {
      this.timer = null;
    }
  },

  resetTimer: function( manual ){
    if(this.timer){
      if(manual){
        statusBar.text("Continue when ready");
      }

      clearInterval(this.timer);  
    }
  },

  playCurrent: function(e){
    var active = activeIndex, players = this.slideAudios;

    this.checkSlideControlButtons("play");

    players[active].play();


  },
  
  pauseCurrent: function(e){
    
  },

  playPrevious: function(e){

  },

  playNext: function(e){

  },

  replayAll: function(e){

  },

  replayCurrent: function(e){

  },

  buttonOnClicks: function(){
    this.resetTimer();
  },

  initAudioEvents: function(){

  },

  checkSlideControlButtons: function( action ){
    switch(action) {
      // hide/show buttons based on action
      case "play":

        break;
      case "pause":

        break;
      case "replay":

        break;
      case "end"

        break;

      default:

        break;

      // disable/enable btns

    }
  },

};
/**
  var newSlide = new Slide();
  newSlide.constructor();
**/
/*
var testSlide = new Slide();
console.log("this is a test slide...");
console.log(testSlide);
*/
console.log("testing this class execution");