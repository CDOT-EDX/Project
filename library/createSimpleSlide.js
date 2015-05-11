// best structure to control slide content
/*
var slideContent = [
  { 
    title: "This is some title",
    content: "This is some text",
    //image: "",
    callback: function(){}
    audio: 0 // starting index at 0
    second: 1,
  },
  {
    title: "Title number two",
    content: "We probably hit the 10th second of the first audio",
    second: 10,
    audio: 0
  },
  {
    title: "Starting audio two",
    content: "This is the text for the second audio followed by a picture",
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

AVIATION.common = {};

// begin a javascript class "Slide"
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
  this.options = options;
  this.avatars = options.avatars;

  this.activeIndex = options.activeIndex || 0;

  this.slideContent = slideContent || [
                                        { 
                                          title: "No Content Provided",
                                          content: "Check your slideContent object", 
                                          audio: 0
                                        }
                                      ];

  this.audioFiles = audioFiles || ["//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide2_Tom.mp3"];
  this.slideAudios = []; // init an empty array to store audio (popcorn) elements in
  this.slideHasListened = []; // store which audios have been listened to

  this.slideElements = {}; // will have status bar / control buttons / title / content and so on

  this.slideTimer = -1;

  console.log("this inside Slide:");
  console.log(this);

};

AVIATION.common.Slide.prototype = {

  // constructor which initiates the building process
  constructor: function(){
    // check type of slide and run the proper initFunc
    if (this["type"] === "simple"){
      console.log("simple type");
      console.log(this.options);
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
      showBorder: true,
      autoplay: true,
      continueId: "1970850cff004914997ec29c65850443",
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

    console.log("the options: ");
    console.log(options);

    this["options"] = options;

    console.log("run simple");
    console.log(this);    

    try {
      // if smth might cause an error....
      if(!this.container) throw "a container is required, thus provide an id";
    } catch(error){
      console.log("error: ");
      console.debug(error);
      console.log("using a default id instead");
      // do something to continue running
      this.container = "#slideContainer"
    }

    // let's add some elements to our base div inside the slide
    //var container = $(this.container);

    if(options.showAvatars){
      this.buildAvatars();
    }

    this.buildContent();

    this.buildSlideAudios();
    console.log("launching build controls");
    this.buildSlideControls();
    console.log("launching build course controls");
    this.buildCourseControls();

    this.initAudioEvents();

    // create events for audio/video interactions and a way to track them
    console.log("now reset slide");
    this.resetSlide();



    // finished thus activate the slide
    this.activateSlide();
  },

  // build titles on the slide
  buildTitle: function(parent, content, callback, clearTitle){
    var titleElement = $("#slideTitle");

    if(content.title && content.title.html){
      var classes = "";

      if(content.title.classes){
        classes = content.title.classes.join(" ");
      }

      var newTitle = jQuery('<h3/>',{
        "id": "slideTitle",
        "class": "text-center " + classes,
        html: content.title.html || ""
      })

      if(titleElement && titleElement.length > 0){
        titleElement.replaceWith(newTitle);
      } else {
        newTitle.appendTo(parent);
      }
    }

    if(content.title && content.title.action && titleElement){
      switch(content.title.action){
        case "remove":
          titleElement.remove();
          break;
      }
    } else if(clearTitle){
      titleElement.remove();
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
  buildContent: function(correctAudio, index, outerIndex, clearContent){
    var outerSlideContent = this.slideContent
        activeIndex = index || this.activeIndex,
        outerIndex = this.activeIndex || 0, contentContainer = $(".cdot_contentText.col-xs-12");

    if(!contentContainer || contentContainer.length === 0){
      contentContainer = jQuery('<div/>', {
        "class": "cdot_contentText col-xs-12"
      }).appendTo(this.container);
    }
    
    var setupInnerContent = function(){
      var closingTag = "", src = "", slideContent = outerSlideContent[activeIndex], slideInner = $(".slideInner"), 
          action, contentClasses = "", imageClasses = "";

      if(!clearContent){
        if(slideContent.content){
          action = slideContent.content.action || "replace";
        } else {
          action = "replace";
        }

        var newSlideInner = jQuery('<div/>', {
          id: "slideInner_" + outerIndex,
          "class": "slideInner",
        });

        if (slideContent.content && slideContent.content.html){
          if(slideContent.content.classes){
            contentClasses = slideContent.content.classes.join(" ");
          }

          var innerContent = jQuery('<div/>',{
            id: "innerContent_" + outerIndex + "_" + activeIndex,
            "class": contentClasses,
            html: slideContent.content.html || ""
          });
        } 

        if (slideContent.image && slideContent.image.src) {
          if(slideContent.image.classes){
            imageClasses = slideContent.image.classes.join(" ");
          }

          var innerImage = jQuery('<image/>',{
            id: "innerImage_" + outerIndex + "_" + activeIndex,
            "class": imageClasses,
            src: slideContent.image.src || ""
          });
        }

        if(action === "remove" || action === "replace"){
          console.log("removing")
          $(".slideInner").children().remove();
        }

        if(action === "append" || action === "replace"){
          console.log("appending");
          if(innerContent){
            innerContent.appendTo(newSlideInner);
          }
          if(innerImage){
            innerImage.appendTo(newSlideInner);
          }
          newSlideInner.appendTo(contentContainer);
        }
      } else {
        $(".slideInner").children().remove();
      }
    };

    if ( (!this.slideContent[activeIndex].second && !this.slideContent[activeIndex].audio) || correctAudio ){

      console.log("title now");
      console.log(this.slideContent);

      console.log("active index: " + activeIndex);

      this.buildTitle( contentContainer, this.slideContent[activeIndex], setupInnerContent);
    } else if ( clearContent ){
      this.buildTitle( contentContainer, { html: "" }, setupInnerContent, clearContent);
    }
       
  },

  // build controls that go immediately after the slide (play/pause buttons)
  buildSlideControls: function(){

    if(this.options.showSlideControls){
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

      this.slideElements.slideControls = {
        previous: $("#btnP").data("action", "previous"),
        play: $("#btnPlay").data("action", "play"),
        pause: $("#btnPause").data("action", "pause"),
        replay: $("#btnR").data("action", "replay"),
        next: $("#btnN").data("action", "next")
      }

      this.insertLineBreak(slideControlsRow);

      this.initSlideButtonEvents();
    }
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
          extensions = [".mp3", ".wav", ".ogg"], types = [ "audio/mpeg", "audio/wav", "audio/ogg"];

          console.log("audio files here: " + audio); 
          console.log(split);

      try{
        // checking to make sure that the filename given is without an extension
        if(split.length === 2){
          // take only the first argument
          filename = split[0]
        } else if(split.length > 2){
          // lets join everything except for the extension
          for(var i=0; i<split.length-1; i++){
            tempArray.push(split[i]);
          }

          if(slideObject.options.development){
            filename = "https:" + tempArray.join(".");
            console.log("filename: ");
            console.log(filename);
          } else {
            filename = tempArray.join(".");
          }
        } else {
          // its probably the actual filename alone
          filename = audio;
        }
      } catch(error){
        console.log("error: " + error);
        console.log("error while trying to parse audio filename");
      }

      var addedSlideAudio = jQuery('<audio/>',{
        id: "audio_" + a,
        html: "Your browser doesn't support audio"
      }).appendTo(slideObject.container);

      for(var i=0; i<extensions.length; i++){
        var source = jQuery('<source/>', {
          src: filename + extensions[i],
          type: types[i]
        }).appendTo(addedSlideAudio);
      }

      try {
        slideObject.slideAudios.push(Popcorn("#audio_" + a));
      } catch(error) {
        // was popcorn initialized ok?
        console.log("slide audio init error: ");
        console.log(error);
      }

      // check var from the outside function to see if it is true
      // if so, we probably assigned the slideHasListened to the slideObject
      // already and thus do not need to push again
      slideObject.slideHasListened.push(false);
    })
  },

  buildStatusBar: function(parent){
    if(this.options.showStatus){
      var statusBar = jQuery('<div/>', {
        "class": "col-xs-12",
        html: '<a href="#" id="statusBar"' + 
              'class="btn btn-default col-xs-offset-1 col-xs-10 col-sm-offset-2 col-sm-8 text-center" ' +
              'role="button">Slide Loading...</a>'
      }).appendTo(parent);

      this.slideElements.statusBar = $("#statusBar");  
    }
  },

  // builds controls that go at the very bottom of the slide (back/continue) and status bar
  buildCourseControls: function(){
    if(this.options.showControls){
      var courseControlsRow = jQuery('<div/>', {
        "class": "row",
      }).appendTo( $(this.container).parent() );

      this.buildStatusBar(courseControlsRow);

      this.insertLineBreak(courseControlsRow);

      // TODO: make titles of buttons editable by allowing them to be a property inside options
      var courseControlsContainer = jQuery('<div/>', {
        "class": "col-xs-12",
        html: '<a href="#" id="btnB" class="btn btn-default col-xs-6 col-sm-4" role="button">&lt; Back</a>' + 
              '<a href="#" id="btnC" class="btn btn-default col-xs-6 col-sm-offset-4 col-sm-4" role="button">Continue &gt;</a>'
      }).appendTo(courseControlsRow);

      this.slideElements.courseControls = {
        back: $("#btnB"),
        "continue": $("#btnC")
      }
    }
  },

  /*
  buildHighlights: function(){

  },

  buildModals: function(){

  },
  */

  resetStatusBar: function(){
    console.log("resetting status bar");
    this.slideElements.statusBar.off();
    this.slideElements.statusBar.prop("disabled", true);
  },

  activateTimer: function(seconds, isAuto){
    var timer = this._timer, slideObject = this, continueId = this.options.continueId,
        counter = seconds || 10, // duration of the timer (each 1 point is about a second)
        statusBar = this.slideElements.statusBar;

    if (!counter){
      counter = 5;
    }

    if (!timer){
      this._timer = "";
      timer = this._timer;
    }

    //statusBar.text("");
    
    var resetTimerOnClick = function(e){
      e.preventDefault();
      console.log("clicked reset on status bar");
      slideObject.resetTimer(true);
      $(this).on('click', function(){
        slideObject.redirectToPage(continueId); // any URL
      });
    };

    // enable the status bar because we need to accept clicks
    statusBar.prop("disabled", false);

    statusBar.on('click', resetTimerOnClick);
  
    if(isAuto) {
      statusBar.text("Continuing in " + counter.toString() + "... Click here to cancel");
    
      this._timer = setInterval( function(){
          counter--;
          if(counter < 0) {
            clearInterval(slideObject._timer);
            statusBar.text("Redirecting...");
            slideObject.redirectToPage(continueId);
          } else {
            statusBar.text("Continuing in " + counter.toString() + "... Click here to cancel");
          }
      }, 1000);
    } else {
      this._timer = null;
    }
  },

  resetTimer: function( manual ){
    if(this._timer){
      if(manual){
        this.slideElements.statusBar.text("Continue when ready");
      }

      clearInterval(this._timer);
    }
  },

  playCurrent: function(e){
    var active = this.activeIndex, players = this.slideAudios;

    this.checkSlideControlPlayButtons("play");
    console.log("playCurrent active: " + active);
    players[active].play();
    console.log("trying to play...");
  },
  
  pauseCurrent: function(e){
    var active = this.activeIndex, players = this.slideAudios;
    
    this.checkSlideControlPlayButtons("pause");

    if(players[active]){
      players[active].pause();  
    }
  },

  playPrevious: function(e){
    this.resetStatusBar();

    this.pauseCurrent();

    this.resetAudio();

    this.activeIndex--;

    this.playCurrent();
  },

  playNext: function(e){
    this.pauseCurrent();

    this.resetAudio();

    this.activeIndex++;
    console.log("playing next, whats the activeIndex now? " + this.activeIndex);
    this.playCurrent();
  },

  replayAll: function(e){
    this.resetStatusBar();

    this.resetSlide();

    this.playCurrent();
  },

  resetAudio: function(e){
    if(this.slideAudios[this.activeIndex]){
      this.slideAudios[this.activeIndex].currentTime(0);
    }
  },

  // do I need this? is it the same as playPrevious?
  //
  //replayCurrent: function(e){
  //  this.checkSlideControlPlayButtons("replay");
  //
  //  this.playCurrent();
  //},

  buttonOnClickEvents: function(){
    // check if there is a timer and reset if we click on a control button
    this.resetTimer();

  },

  initSlideButtonEvents: function(){
    // attach events to each button
    var buttons = this.slideElements.slideControls, slide = this;

    console.log("slidebutton events slide: ");
    console.log(slide);

    for(button in buttons){
      if(buttons.hasOwnProperty(button)){
        buttons[button].on("click", function(e, button){
          var action = $(this).data("action");
          switch(action){

            case "previous":
              console.log("clicked previous");
              slide.resetTimer();
              slide.playPrevious();
              break;

            case "play":
              console.log("clicked play");
              slide.playCurrent();
              break;

            case "pause":
              console.log("clicked pause");
              slide.pauseCurrent();
              break;

            case "replay":
              console.log("clicked replay");
              slide.resetTimer();
              slide.replayAll();
              break;

            case "next":
              console.log("clicked next");
              slide.playNext();
              break;

            default: 
              console.log("not sure what this button is!");
              console.log(button);
              console.log(buttons[button]);
              break;
          }
        });
      }
    }
  },

  initCourseButtonEvents: function(){

  },
  
  initAudioEvents: function(){
    var players = this.slideAudios, content = this.slideContent, hasListened = this.slideHasListened,
        slideObject = this;
    // let's set the generic "onPlay/onEnd" events


    players.forEach(function(player, p){
      var contentAtStart = "", callbackAtEnd = "";

      content.forEach(function(cont, c){
        
        console.log("audio and content *** audio: " + p + " *** content: " + c);
        
        if(content[c].audio === p){
        // audio matches the audio inside content

        console.log("audio and content match....");

        console.log(content[c].second);
          if(content[c].second){
            players[p].cue(content[c].second, function(){
              
              console.log("trying to cue this audio: " + p + " at this second: " + content[c].second);

              slideObject.buildContent(true, c);
              

              if(content[c].callback){
                // run the callback that should be cued
                content[c].callback();
              }
            });
          } else {
            contentAtStart = c;
            callbackAtEnd = content[c].callback || "";
          }
        }
      });
      
      players[p].on("playing", function(e){
        console.log("audio has started: " + p);

        /*
        for(c = 0; c < content.length && content[c].audio <= a; c++ ){
          console.log("looking for audio #: " + c + " and " + a);
        }
        */

        if (contentAtStart != ""){
          slideObject.buildContent(true, contentAtStart);
        }
        // make sure the state of the slide is correct at for this audio/second

        // disable whatever buttons / highlights / elements need to be disabled
      });

      players[p].on("ended", function(e){
        console.log("audio has ended: " + p);

        slideObject.checkSlideControlPlayButtonsState();

        if (callbackAtEnd != ""){
          console.log("calling the callback at the end of audio");
          callbackAtEnd();
        }

        // start the next audio if it exists and autoplay is true
        if(players[p+1] && this.autoplay){
          console.log("starting next audio... from end...");
          slideObject.playNext();
        }

        hasListened[p] = true;

        // if it is last audio and no need for audioFirst
        if(!players[p+1] && !slideObject.options.audioFirst){
          slideObject.activeIndex++;
          slideObject.activateTimer(5, true);
          slideObject.checkSlideControlPlayButtons("end");
          console.log("start redirect");
        }
        
        // perform callbacks/actions if any needed at the end of the audio
        // check buttons (disable/enable elements/highlights)

        // if we need highlight control , call the function here

      });

    });
  },

  checkSlideControlPlayButtons: function( action ){
    var controls = this.slideElements.slideControls;

    switch(action) {
      // hide/show buttons based on action
      case "play":
        controls.play.hide();
        controls.replay.hide();
        controls.pause.show();
        break;
      case "pause":
        controls.play.show();
        controls.replay.hide();
        controls.pause.hide();
        break;
      case "replay":
        controls.play.hide();
        controls.replay.hide();
        controls.pause.show();
        break;
      case "end":
        controls.play.hide();
        controls.replay.show();
        controls.pause.hide(); 
        break;
      default:
        this.slideElements.slideControls.pause.hide();
        this.slideElements.slideControls.replay.hide();
        break;
    }

    this.checkSlideControlPlayButtonsState();

    this.setStatus(action);

  },

  checkSlideControlPlayButtonsState: function(){
    var controls = this.slideElements.slideControls, active = this.activeIndex
        players = this.slideAudios;

    if(active < 1){
      console.log("first audio, no way back");
      controls.previous.prop("disabled", true);
      controls.previous.attr("disabled", true);
      if(this.slideHasListened[active]){
        controls.next.prop("disabled", false);
        controls.next.removeAttr("disabled");
      }
    } else {
      if (active < players.length - 1){
        console.log("active is before the last player")
        controls.previous.prop("disabled", false);
        controls.previous.removeAttr("disabled");
        if(this.slideHasListened[active]){
          controls.next.prop("disabled", false);
          controls.next.removeAttr("disabled");
        } else {
          controls.next.prop("disabled", true);
          controls.next.attr("disabled", true);
        }
      } else if (active === players.length - 1){
        console.log("active is the last players length");
        controls.previous.prop("disabled", false);
        controls.previous.removeAttr("disabled");
        controls.next.attr("disabled", true);
        controls.next.prop("disabled", true);
      } else {
        console.log("error: active is greater then players length?");
      }
    }

  },

  checkSlideControlNavButtons: function( action ){

  },

  setStatus: function(action){
    var status = this.slideElements.statusBar;

    switch(action){
      case "play":
      case "replay":
        status.text("Playing...");
        break;
      case "pause":
        status.text("Paused");
        break;
      case "end":
        break;
      default:
        status.text(action);
        break;      
    }
  },

  activateSlide: function(){
    this.playCurrent();
  },

  resetSlide: function(){

    this.activeIndex = 0;
    console.log(this.slideElements.slideControls);
    this.checkSlideControlPlayButtons();

    this.buildContent(null, null, null, true);
  },

  redirectToPage: function( pageId ){
    var current = window.location.href, newUrl, tempSplit, splitter;

    splitter = "courseware";

    tempSplit = current.split(splitter);
          
    newUrl = tempSplit[0];
    window.location.assign(newUrl + "jump_to_id/" + pageId);
  }

};

console.log("testing this class execution");