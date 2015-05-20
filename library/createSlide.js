/***
  *   Custom library/framework to speed up content development
  *   for the edX Aviation project at CDOT
  *   created by: Pavlo Kuzhel
  *   May 12, 2015
  *   GitHub wiki: https://github.com/CDOT-EDX/Project/wiki/Slide-Creation-reference
  **/

/*jslint white: true*/
/*jslint nomen: true*/
/*jslint plusplus: true*/
var AVIATION = AVIATION || {};

AVIATION.common = {};

// begin a javascript class "Slide"
AVIATION.common.Slide = function (options, slideContent, audioFiles) {
  var md = new MobileDetect(window.navigator.userAgent);

  if(md){
    this.isMobile = md.mobile();
  } else {
    this.isMobile = false;
  }

  if(!options){
    options = {};
  }

  this.type = options.type || "simple"; // check which options are given and then assign a default
                                              // type maybe in constructor?
  this.options = options;

  this.activeIndex = options.activeIndex || 0;

  this.slideContent = slideContent || [
                                        { 
                                          title: "No Content Provided",
                                          content: "Check your slideContent object", 
                                          audio: 0
                                        }
                                      ];

  this.audioFiles = audioFiles; //["//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide2_Tom.mp3"];
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
    "use strict";
    // check type of slide and run the proper initFunc
    if (this.type === "simple"){
      console.log("simple type");
      console.log(this.options);
      this._initSimple( this.options );
    } else {
      console.log("not simple slide");
      this._initPanel( this.options );
    }
  },

  // method that initializes building of simple slides
  _initSimple: function(options){
    "use strict";
    var avatars, content = [], audio = [],
        defaults = {
          showAvatars: false,
          showSlideControls: true,
          showStatus: true,
          showControls: true,
          showBorder: true,
          autoplay: true,
          noAudio: false,
          avatars: {
            tom: {
              open: "//online.cdot.senecacollege.ca:25080/aviation/img/tomOpen.png",
              close: "//online.cdot.senecacollege.ca:25080/aviation/img/tomClose.png"
            },
            jane: {
              open: "//online.cdot.senecacollege.ca:25080/aviation/img/janeOpen.png",
              close: "//online.cdot.senecacollege.ca:25080/aviation/img/janeClose.png"
            }
          },
          continueId: "1970850cff004914997ec29c65850443",
        }, option;

    console.log("this initSimple:");
    console.log(this);

    if(!options){
      options = this.options || {};
    }

    for(option in defaults){
      if(defaults.hasOwnProperty(option)){
        // if this key doesn't exist, init to default
        if(typeof options[option] === 'undefined'){
             options[option] = defaults[option];
        }
      }
    }

    console.log("the options: ");
    console.log(options);

    this.avatars = options.avatars;

    this.options = options;

    console.log("run simple");
    console.log(this);    

    try {
      // if smth might cause an error....
      if(!this.container){
        throw "a container is required, thus provide an id";
      }
    } catch(error){
      console.log("error: ");
      console.debug(error);
      console.log("using a default id instead");
      // do something to continue running
      this.container = "#slideContainer";
    }

    this.buildSlide();

  },

  // build titles on the slide
  buildTitle: function(parent, content, callback, clearTitle){
    "use strict";
    var titleElement = $("#slideTitle");

    this.buildAvatars(parent, content.avatar, function(bsSize){
      if(content.title && content.title.html){
        var classes = "", newTitle;

        if(content.title.classes){
          classes = content.title.classes.join(" ");
        }

        newTitle = jQuery('<h3/>',{
          "id": "slideTitle",
          "class": "text-center " + classes,
          html: content.title.html || ""
        });

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
        callback(bsSize);
      }

    });
  },

  // method for invoking all build functions in one place and activating the slide
  buildSlide: function(){
    "use strict";
    this.buildContent();

    if(!this.options.noAudio){
      this.buildSlideAudios();
    } else {
      this.buildContent(true, this.activeIndex, this.activeIndex);
    }
    
    console.log("launching build controls");
    
    this.buildSlideControls();
    
    console.log("launching build course controls");
    
    this.buildCourseControls();

    this.initAudioEvents();

    // create events for audio/video interactions and a way to track them
    console.log("now reset slide");

    if(!this.options.noAudio){
      this.resetSlide();  
    }
    
    // finished thus activate the slide
    this.activateSlide();
  },

  // method for building avatars into the slide
  buildAvatars: function(parent, avatar, callback){
    "use strict";
    // callback will generate the title+content
    var avatarLeft = "", avatarRight = "", contentClass = 12, avatarElement, i, slide = this, 
        avatarLeftDiv = $("#avatarLeftDiv"), avatarRightDiv = $("#avatarRightDiv"), avatarArray = [];

    console.log("buidling avatars");

    function createAvatars( avatars ){
      var avatarSide = "", avatarClass = "", avatarDiv = "", avatarElement, tempImg, filename = "";

      console.log("AVATARS *** ");
      console.log(avatars);

      for(i = 0; i < avatars.length; i++){

        if(avatars[i] !== ""){

          if(i === 0){
            avatarSide = "Left";
            avatarClass = "pull-left";
            
          }

          if(i === 1){
            avatarSide = "Right";
            avatarClass = "pull-right";

          }

          avatarDiv = $("#avatar" + avatarSide + "Div");
          
          if(!avatarDiv || avatarDiv.length < 1){
            avatarDiv = jQuery('<div/>', {
              id: "avatar" + avatarSide + "Div",
              "class": "avatar col-lg-2 " + avatarClass + " " + avatars[i].character,
            });
            
            i === 0 ? avatarDiv.prependTo(parent.parent()) : avatarDiv.appendTo(parent.parent()) ; 
          }

          if(slide.avatars && slide.avatars[avatars[i].character]){
            for(avatarElement in slide.avatars[avatars[i].character]){
              if(slide.avatars[avatars[i].character].hasOwnProperty(avatarElement)){
                tempImg = $("#" + avatars[i].character + "_" + avatarElement);

                if(!tempImg || tempImg.length < 1){
                  if(slide.options.development){
                    filename = "https:" + slide.avatars[avatars[i].character][avatarElement];
                  } else {
                    filename = slide.avatars[avatars[i].character][avatarElement];
                  }
                    if(avatarElement === avatars[i].type){
                      // make this one visible
                      jQuery('<img/>',{
                        id: avatars[i].character + "_" + avatarElement,
                        "class": "img-responsive avatar" + avatarSide,
                        src: filename
                      }).appendTo(avatarDiv);
                    } else {
                      // make the rest hidden
                      jQuery('<img/>',{
                        id: avatars[i].character + "_" + avatarElement,
                        "class": "img-responsive avatar" + avatarSide,
                        "css" : {
                          "display" : "none"
                        },
                        src: filename
                      }).appendTo(avatarDiv);
                    }
                } else {
                  // switch between hiding/showing the proper avatar type
                  if(avatarElement === avatars[i].type){
                    $("#" + avatars[i].character + "_" + avatarElement).show();
                  } else {
                    $("#" + avatars[i].character + "_" + avatarElement).hide();
                  }
                }
              }
            }
          }
        }
      }
    }

    if(this.options.showAvatars && avatar && avatar.length > 0){
      for(i = 0; i < avatar.length; i++){
        if(avatar[i].position === "left"){
          avatarLeft = avatar[i];
          contentClass -= 2;
        } else if(avatar[i].position === "right"){
          avatarRight = avatar[i];
          contentClass -= 2;
        } 
      }

      /*
      if(avatarLeft && avatarLeft !== ""){
        avatarArray.push(avatarLeft);
      }

      if(avatarRight && avatarRight !== ""){
        avatarArray.push(avatarRight);
      }
      */
      createAvatars( [ avatarLeft, avatarRight] );
    }

    if(callback && typeof callback === "function" ){
      callback(contentClass);
    }
  },

  // method for building the content of the slide
  buildContent: function(correctAudio, index, outerIndex, clearContent){
    "use strict";
    var outerSlideContent = this.slideContent,
        activeIndex = index || this.activeIndex, contentContainer = $(".cdot_contentText"), setupInnerContent;

    outerIndex = this.activeIndex || 0;

    if(!contentContainer || contentContainer.length === 0){
      contentContainer = jQuery('<div/>', {
        "class": this.options.showAvatars ? "cdot_contentText col-lg-8" : "cdot_contentText col-xs-12"
      }).appendTo(this.container);
    }
    
    setupInnerContent = function(classSize){
      var closingTag = "", src = "", slideContent = outerSlideContent[activeIndex], slideInner = $(".slideInner"), 
          action, contentClasses = "", imageClasses = "", bsClass = classSize || 12, innerContent, innerImage,
          newSlideInner;

      if(!clearContent){
        if(slideContent.content){
          action = slideContent.content.action || "replace";
        } else {
          action = "replace";
        }

        newSlideInner = jQuery('<div/>', {
          id: "slideInner_" + outerIndex,
          "class": "slideInner col-xs-12",
        });

        if (slideContent.content && slideContent.content.html){
          if(slideContent.content.classes){
            contentClasses = slideContent.content.classes.join(" ");
          }

          innerContent = jQuery('<div/>',{
            id: "innerContent_" + outerIndex + "_" + activeIndex,
            "class": contentClasses,
            html: slideContent.content.html || ""
          });
        } 

        if (slideContent.image && slideContent.image.src) {
          if(slideContent.image.classes){
            imageClasses = slideContent.image.classes.join(" ");
          }

          innerImage = jQuery('<img/>',{
            id: "innerImage_" + outerIndex + "_" + activeIndex,
            "class": imageClasses,
            src: slideContent.image.src || ""
          });
        }

        if(action === "remove" || action === "replace"){
          console.log("removing");
          $(".slideInner").children().remove();
          $(".slideInner").remove();
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
      this.buildTitle( contentContainer, this.slideContent[activeIndex], setupInnerContent);
    } else if ( clearContent ){
      this.buildTitle( contentContainer, this.slideContent[activeIndex], setupInnerContent, clearContent);
    }
       
  },

  // build controls that go immediately after the slide (play/pause buttons)
  buildSlideControls: function(){
    "use strict";
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
      };

      this.insertLineBreak(slideControlsRow);

      this.initSlideButtonEvents();
    } else {
      this.insertLineBreak( $(this.container).parent() );
    }
  },

  insertLineBreak: function( parent ){
    "use strict";
    try {
      jQuery('<div/>', {
        "class": "col-xs-12",
        html: "<!----><br/>"
      }).appendTo(parent);
    } catch(error) {
      console.log("error: " + error);
      console.log("no parent provided, line break not added");
    }
  },

  buildSlideAudios: function(){
    "use strict";
    var slideObject = this;
 
    // check hasPlayer parameter if has been loaded/listend to previously
    // and if matches the # of audioFiles... if so set var to true and restrict pushing hasListened

    if(this.audioFiles){
      this.audioFiles.forEach( function(audio, a){
        // lets make sure that the filename provided is without the extension
        var split = audio.split("."), filename = "", tempArray = [], addedSlideAudio, source,
            extensions = [".mp3", ".wav", ".ogg"], types = [ "audio/mpeg", "audio/wav", "audio/ogg"], i;

            console.log("audio files here: " + audio); 
            console.log(split);

        try{
          // checking to make sure that the filename given is without an extension
          if(split.length === 2){
            // take only the first argument
            filename = split[0];
          } else if(split.length > 2){
            // lets join everything except for the extension
            for(i=0; i<split.length-1; i++){
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

        addedSlideAudio = jQuery('<audio/>',{
          id: "audio_" + a,
          html: "Your browser doesn't support audio"
        }).appendTo(slideObject.container);

        for(i=0; i<extensions.length; i++){
          source = jQuery('<source/>', {
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
      });
    }
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
        back: $("#btnB").data("action", "back"),
        "continue": $("#btnC").data("action", "continue")
      };

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
      if(continueId && continueId !== ""){
        $(this).on('click', function(){
          slideObject.redirectToPage(continueId); // any URL
        });
      }
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
            
            if(continueId && continueId !== ""){
              slideObject.redirectToPage(continueId);
              statusBar.text("Redirecting...");
            } else {
              statusBar.text("Error: continueId is undefined");
            }
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

  buttonOnClickEvents: function(){
    // check if there is a timer and reset if we click on a control button
    this.resetTimer();

  },

  initSlideButtonEvents: function(){
    // attach events to each button
    var buttons = this.slideElements.slideControls, slide = this;

    console.log("slidebutton events slide: ");
    console.log(slide);

    function initSlideBtn(e, button){
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
        }

    for(var button in buttons){
      if(buttons.hasOwnProperty(button)){
        buttons[button].on("click", initSlideBtn);
      }
    }
  },

  initCourseButtonEvents: function(){
   // attach events to each button
    var buttons = this.slideElements.courseControls, slide = this;

    console.log("coursebutton events slide: ");
    console.log(slide);

    function assignBtnAction(e, button){
      var action = $(this).data("action");
      switch(action){
        case "back":
          redirectToPage(slide.options.backId);
          break;

        case "continue":
          redirectToPage(slide.options.continueId);
          break;

        default:
          break;
      }
    }

    for( var button in buttons){
      if(buttons.hasOwnProperty(button)){
        buttons[button].on("click", assignBtnAction);
      }
    }


  },
  
  initAudioEvents: function(){
    var players = this.slideAudios, content = this.slideContent, hasListened = this.slideHasListened,
        slideObject = this;
    // let's set the generic "onPlay/onEnd" events


    players.forEach(function(player, p){
      var contentAtStart = "", callbackAtEnd = "";

      content.forEach(function(cont, c){
        
        if(content[c].audio === p){
        // audio matches the audio inside content
          if(content[c].second){
            players[p].cue(content[c].second, function(){
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
        if (contentAtStart !== ""){
          slideObject.buildContent(true, contentAtStart);
        }
      });

      players[p].on("ended", function(e){
        console.log("audio has ended: " + p);

        slideObject.checkSlideControlPlayButtonsState();

        if (callbackAtEnd !== ""){
          callbackAtEnd();
        }

        // start the next audio if it exists and autoplay is true
        if(players[p+1] && this.autoplay){
          slideObject.playNext();
        }

        hasListened[p] = true;

        // if it is last audio and no need for audioFirst
        if(!players[p+1] && !slideObject.options.audioFirst){
          slideObject.activeIndex++;

          if(slideObject.options.autoplay){
            // only activate the timer if the autplay is on
            slideObject.activateTimer(5, true);  
          } else {
            slideObject.statusBar('Click "Continue" when you are ready');
          }
          
          slideObject.checkSlideControlPlayButtons("end");
        }
        
        // if we need highlight control , call the function here

      });

    });

    //this.buildContent(true, this.activeIndex);
    // if no audio?
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

  // constrols the state of the Previous/Next 'player' buttons
  checkSlideControlPlayButtonsState: function(){
    var controls = this.slideElements.slideControls, active = this.activeIndex,
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
        console.log("active is before the last player");
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
        console.log("error: active is greater then players length? not doing anything");
      }
    }

  },

  // controls the state (enabled/disabled) of the Back/Continue buttons
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
    if(!this.options.noAudio){
      this.playCurrent();  
    }
  },

  resetSlide: function(){

    this.activeIndex = 0;
    console.log(this.slideElements.slideControls);
    this.checkSlideControlPlayButtons();

    if(this.options.noAudio){
      this.setStatus('Press "Continue" when ready');
    }

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