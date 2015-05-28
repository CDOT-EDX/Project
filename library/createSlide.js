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

    this.initDefaults(options);

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
    //this.buildContent();

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
    var outerSlideContent = this.slideContent, checkSlideHighlights = this.checkSlideHighlights, slide = this,
        activeIndex = index || this.activeIndex, contentContainer = $(".cdot_contentText"), setupInnerContent;

    outerIndex = this.activeIndex || 0;

    if(!contentContainer || contentContainer.length === 0){
      contentContainer = jQuery('<div/>', {
        "class": this.options.showAvatars ? "cdot_contentText col-lg-8" : "cdot_contentText col-xs-12"
      }).appendTo(this.container);
    }
    
    this.buildHighlights(activeIndex);

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

        // lets take care of our highlights
        checkSlideHighlights(slideContent.highlights, slide);

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

  buildSlideAudios: function(modalAudios, parent, modalIndex){
    "use strict";
    var slideObject = this, localAudios, parentContainer;
 
    // check hasPlayer parameter if has been loaded/listend to previously
    // and if matches the # of audioFiles... if so set var to true and restrict pushing hasListened

    if(this.audioFiles || (modalAudios && parent) ){
      localAudios = modalAudios || this.audioFiles;
      parentContainer = parent || slideObject.container;

      // if modals, 2d array thus two itterations...
      localAudios.forEach( function(audio, a){
        // lets make sure that the filename provided is without the extension
        var split = audio.split("."), filename = "", tempArray = [], addedSlideAudio, source, 
            extensions = [".mp3", ".wav", ".ogg"], types = [ "audio/mpeg", "audio/wav", "audio/ogg"], i;

        console.log("audio files here: " + audio); 

        // make into a function ?
        try{
          // checking to make sure that the filename given is without an extension
          if(split.length === 2){
            // take only the first argument
            filename = split[0];
          } else if(split.length > 2){
            // lets join everything except for the extension
            for(i = 0; i < split.length-1; i++){
              tempArray.push(split[i]);
            }

            if(slideObject.options.development){
              filename = "https:" + tempArray.join(".");
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
        }).appendTo(parentContainer);

        for(i=0; i<extensions.length; i++){
          source = jQuery('<source/>', {
            src: filename + extensions[i],
            type: types[i]
          }).appendTo(addedSlideAudio);
        }

        if(modalAudios && parent){
          try {
            slideObject.modalData[modalIndex].modalAudios.push(Popcorn("#audio_" + a));
            slideObject.modalData[modalIndex].modalHasListened.push(false);
          } catch(error) {
            // was popcorn initialized ok?
            console.log("modal audio init error: ");
            console.log(error);
          }
        } else {
          try {
            slideObject.slideAudios.push(Popcorn("#audio_" + a));
            slideObject.slideHasListened.push(false);
          } catch(error) {
            // was popcorn initialized ok?
            console.log("slide audio init error: ");
            console.log(error);
          }
        }
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
  
  buildHighlights: function(index, modalHighlight){
    var slide = this, $highlight, modalInvoker, h, addOnClick = [];
    if(this.options.enableHighlights && this.highlights && this.highlights.length > 0){
      console.log("lets build highlights");
      for(h = 0; h < this.highlights.length; h++){
        $highlight = $("#" + this.highlights[h].id + "_highlight[h]");
        if( !$highlight || $highlight.length < 1 ){
          modalInvoker = jQuery('<div/>', {
              id: this.highlights[h].id + "_highlight[h]",
              href : "#" + this.highlights[h].id,
              role : "button",
              "class" : "clearClickable",
              style: "top:" + this.highlights[h].top + 
                     ";left:" + this.highlights[h].left +
                     ";width:" + this.highlights[h].width +
                     ";height:" + this.highlights[h].height +
                     (slide.options.hiddenHighlights ? ";cursor:default" : (";border:" + this.highlights[h].border) ) + 
                     ";position:absolute" + 
                     ";display:none;"
          }).appendTo(slide.container);            

          slide.slideElements.highlightElements.push(modalInvoker);
          addOnClick.push(false);
        }
      }

      // now lets add on clicks on the modals we need them in
      for(h=0; h<slide.slideContent[index].highlights.length; h++){
        if(typeof slide.slideContent[index].highlights[h] === "object" && 
            slide.slideContent[index].highlights[h].onclick &&
            typeof slide.slideContent[index].highlights[h].onclick === "function"){
          addOnClick[slide.slideContent[index].highlights[h].index] = slide.slideContent[index].highlights[h].onclick;
        }
      }

      for(h=0; h<addOnClick.length; h++){
        if(addOnClick[h]){
          slide.slideElements.highlightElements[h]
            .off();
          slide.slideElements.highlightElements[h]
            .on("click", addOnClick[h]);
        } else {
          slide.slideElements.highlightElements[h].off();
        }
      }

    }

  },

  buildModals: function(){
    // modals are basically slides with an extra option
    // build constrained inside a modal window
    if(this.options.enableModals){
      // itirate through modals and create each one with a unique id and launch the 
      // build content with the modified this.container id so that content gets appended to the modal
      // how do we handle audio though?
    }
  },
  
  resetStatusBar: function(){
    console.log("resetting status bar");
    this.slideElements.statusBar.off();
    this.slideElements.statusBar.prop("disabled", true);
  },

  activateTimer: function(seconds, isAuto){
    var timer = this._timer, slideObject = this, continueId = this.options.continueId,
        counter = seconds || 5, // duration of the timer (each 1 point is about a second)
        statusBar = this.slideElements.statusBar;

    if (!timer){
      this._timer = "";
      timer = this._timer;
    }

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
        // something that happens every time we press play (avatar opens mouth?)

      });

      // force it to only happen at the beginning of the audio
      players[p].cue(0, function(e){
        if (contentAtStart !== ""){
          slideObject.buildContent(true, contentAtStart);
        }
      });

      players[p].on("ended", function(e){
        // should we check for highlight callbacks as well?

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

    //this.buildContent(null, null, null, true);
  },

  redirectToPage: function( pageId ){
    var current = window.location.href, newUrl, tempSplit, splitter;

    splitter = "courseware";

    tempSplit = current.split(splitter);
          
    newUrl = tempSplit[0];
    window.location.assign(newUrl + "jump_to_id/" + pageId);
  },

  initDefaults: function(options){
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
          enableModals: false,
          enableHighlights: false,
          hiddenHighlights: false,
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
          highlights: 
          [
            { // #1
              id: "ai",
              orderNumber: 0,
              name: "Attitude Indicator (AI)",
              // image: "//online.cdot.senecacollege.ca/c4x/Seneca_College/M01S01_Test/asset/attitudeIndicator_wBg.png",
              // audio: [ "//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide2_Tom.mp3" ],
              // modalAudio: ["//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_ClickHighlights_Tom.mp3"],
              top : "9%",
              left : "36.2%",
              width : "26%",
              height: "30%",
              border : "7px ridge yellow",
            }, 
            { // #2
              id: "alt",
              orderNumber: 1,
              name: "Altimeter (ALT)",
              // image: "//online.cdot.senecacollege.ca/c4x/Seneca_College/M01S01_Test/asset/altimeter_wBg.png",
              // audio: [ "//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide4_Jane.mp3" ],
              // modalAudio: ["//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_ClickHighlights_Jane.mp3"],
              top : "9%",
              left : "62%",
              width : "26%",
              height: "30%",
              border : "7px ridge yellow",                            
            },
            { // #3
              id: "hi",
              orderNumber: 2,
              name: "Heading Indicator (HI)",
              // image: "//online.cdot.senecacollege.ca/c4x/Seneca_College/M01S01_Test/asset/headingIndicator_wBg.png",
              // audio: [ "//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide7_Tom.mp3" ],
              // modalAudio: ["//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_ClickHighlights_Tom.mp3"],
              top : "39%",
              left : "36.2%",
              width : "26%",
              height: "31%",
              border : "7px ridge yellow",                            
            },
            { // #4
              id: "asi",
              orderNumber: 3,
              name: "Airspeed Indicator (ASI)",
              // image: "//online.cdot.senecacollege.ca/c4x/Seneca_College/M01S01_Test/asset/airspeedIndicator_wBg.png",
              // audio: [ "//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide9_Jane.mp3" ],
              // modalAudio: ["//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_ClickHighlights_Jane.mp3"],
              top : "9%",
              left : "10.5%",
              width : "26%",
              height: "30%",
              border : "7px ridge yellow",                            
            },
            { // #5
              id: "vsi",
              orderNumber: 4,
              name: "Vertical Speed Indicator (VSI)",
              //image: "//online.cdot.senecacollege.ca/c4x/Seneca_College/M01S01_Test/asset/verticalSpeedIndicator_wBg.png",
              //audio: [ "//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide11_Tom.mp3" ],
              //modalAudio: ["//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_ClickHighlights_Tom.mp3"],
              top: "39%",
              left: "62%",
              width: "26%",
              height: "31%",
              border : "7px ridge yellow",
            },
            { // #6
              id: "tc",
              orderNumber: 5,
              name: "Turn Coordinator (TC)",
              //image: "//online.cdot.senecacollege.ca/c4x/Seneca_College/M01S01_Test/asset/turnCoordinator_wBg.png",
              //audio: [ "//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide14_Jane.mp3" ],
              //modalAudio: ["//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_ClickHighlights_Jane.mp3"],
              top : "39%",
              left : "10.5%",
              width : "26%",
              height: "31%",
              border : "7px ridge yellow",                            
              },
          ]}, option;

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

    // TODO: move this when neccessary, for testing and development only
    this.slideElements.highlightElements = [];

    this.avatars = options.avatars;
    this.highlights = options.highlights;
    this.options = options;

    this.container = "#slideContainer";

    /* error handling example
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
    */
  },

  checkSlideHighlights: function( showHighlights, slide ){
    "use strict";
    var i, j, toShow = [];
    // check the index/indices of highlights to show from the bank
    // and hide/show accordingly
    console.log("lets manage some highlights!");
    for(i=0; slide.highlights && i < slide.highlights.length; i++){
      toShow.push(false);
    }

    for(j=0; showHighlights && j < showHighlights.length; j++){
      if(typeof showHighlights[j] === "object"){
        toShow[showHighlights[j].index] = true;
      } else {
        toShow[showHighlights[j]] = true;  
      }
    }

    for(i=0; i < toShow.length; i++){
      if(toShow[i]){
        slide.slideElements.highlightElements[i].show();
      } else {
        slide.slideElements.highlightElements[i].hide();
      }
    }

  }
};
console.log("testing this class execution");