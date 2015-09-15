/***
  *   Custom library/framework to speed up content development
  *   for the edX Aviation project at CDOT
  *   created by: Pavlo Kuzhel
  *   May 12, 2015
  *   GitHub wiki: https://github.com/CDOT-EDX/Project/wiki/Slide-Creation-reference
  *   createSlide.js
  **/

/* TO CHECK
  event libraries: https://github.com/fat/bean
  https://github.com/alexanderGugel/micro-events
  http://prototypejs.org/learn/event-delegation
  https://learn.jquery.com/events/introduction-to-custom-events/
*/

/*jslint white: true*/
/*jslint nomen: true*/
/*jslint plusplus: true*/
/*jslint todo: true*/
/*global $:false */
/*global jQuery:false */
/*global ResizeSensor:false */

// TODO: add a "skip" button to pages

var AVIATION = {};

AVIATION.common = {};

// make an abstract class to wrap any 'player' action
/*
AVIATION.common.Player = function(){
  "use strict";


};
*/
// begin a javascript class "Slide"
AVIATION.common.Slide = function (options, slideContent, mediaFiles, parentSlide) {
  "use strict";
  //var md = new MobileDetect(window.navigator.userAgent);

/*
  if(md){
    this.isMobile = md.mobile();
  } else {
    this.isMobile = false;
  }
*/

  if(!options){
    options = {};
  } else {
    if(slideContent && !options.slideContent){
      options.slideContent = slideContent;
    }

    if(mediaFiles && !options.mediaFiles){
      options.mediaFiles = mediaFiles;
    }

    console.log("options before constructor");
    this.options = options;
    this.parentSlide = parentSlide;
    //this.constructor(options);
  }

};

AVIATION.common.Slide.prototype = {
  version: "0.1",
  // constructor which initiates the building process
  constructor: function(options){
    "use strict";
    // check type of slide and run the proper initFunc
    //if (this.type === "simple"){
      console.log("simple type");
      console.log(options);
      this.options = options || this.options || {};

      this._initSimple( this.options );
  },

/*
  attachCustomEvent: function(eventName, eventFunction){
    "use strict";
  },
*/

  // global events which can control the slide object from within other plugins
  attachEvents: function(){
    "use strict";

    var events = {}, event, slide = this;

    events = {
      "continuePattern": function(e, data){

      },
      "correctAdvance": function(e, data){
        console.log("!* correctAdvance triggered");
        $(slide).trigger("next");
      },
      "wrongAdvance": function(e, data){
        console.log("!* wrong advance triggered");
        $(slide).trigger("pause");
        $(slide).trigger("reset");
        $(slide).trigger("playAltIndex", data);
      },
      "playAltIndex": function(e, data){
        var index = data.index, altPlayer = slide.altPlayers;

        console.log("!* playAltIndex triggered");

        slide.checkSlideControlPlayButtons("play");
        if(altPlayer[index] && altPlayer[index].player){
          altPlayer[index].player.play();          
        }
      }
      end: function(e, data){
        console.log("!* end event fired");
        console.log(data);
        // check if everything has stopped playing
        // advance with?
        slide.checkAdvanceWith({
          event: e,
          data: data
        });
      },
      altEnd: function(e, data){
        console.log("!* altEnd event fired");
        console.log(data);
      },
      play: function(e){
        console.log("!* play event fired");

        var active = this.activeIndex, players = slide.players;

        slide.checkSlideControlPlayButtons("play");
        console.log(players[active]);
        if(players[active] && players[active].player){
          players[active].player.play();  
        } else {
          // change to replay and run the redirect/timer to advance
        }
      },
      pause: function(e){
        console.log("!* pause event fired");

        var active = slide.activeIndex, players = slide.players;
        slide.checkSlideControlPlayButtons("pause");

        console.log(players[active]);
        if(players[active] && players[active].player){
          console.log("trying to pause ");
          players[active].player.pause();  
        }

      },
      stop: function(e){
        console.log("!* stop event fired");
        //slide.states.stopped = true;
        //slide.states.playing = false;
      },
      next: function(e){
        console.log("!* next event fired");
        // move on to the next track
        $(slide).trigger("pause");

        $(slide).trigger("reset");

        slide.activeIndex++;
        $(slide).trigger("play");
      },
      previous: function(e){
        console.log("!* previous event fired");
        // go to the previous track
        slide.resetStatusBar();

        $(slide).trigger("pause");

        $(slide).trigger("reset");

        slide.activeIndex--;

        $(slide).trigger("play");
      },
      replay: function(e){
        console.log("!* replay event fired");
        slide.resetStatusBar();

        slide.resetSlide();

        $(slide).trigger("play");
      },
      replayOne: function(e){
        console.log("!* replayOne event fired");
        $(slide).trigger("previous");
      },
      reset: function(e){
        console.log("!* reset event fired");

        if(slide.players[slide.activeIndex] && slide.players[slide.activeIndex].player){
          if(!slide.panelPause){
            slide.panelPause = true;
          }
          slide.players[slide.activeIndex].player.currentTime(0);
        }
      }
    };

    for(event in events){
      if(events.hasOwnProperty(event)){
        // bind each event to the current slide object
        $(this).on(event, events[event]);
      }
    }

    this.events = events;
  },

  // can be used by an object like so...
  // this.attachState.apply(someObject, arrayOfArgs);
  attachStates: function(state){
    "use strict";

    var states;

    states = {
      playing: false,
      paused: false ,
      stopped: false,
      ended: false,
      replayed: false
    };

    this.states = states[state];
  },



  // method that initializes building of simple slides
  _initSimple: function(options){
    "use strict";

    this.initDefaults(options);

    this.buildSlide();

  },

  create: function(options){
    "use strict";

    if(options){
      this.options = options;
    } else {
      this.options = {};
    }

    this.constructor();
  },

  destroy: function(){
    "use strict";

    $(this.container).empty();
    $(this.options.footerId).remove();

    return this.options;
  },


  // build titles on the slide
  buildHeader: function(parent, content, setupContent, clearTitle, callback){
    "use strict";
    var headerElement = $(this.headerId), slide = this,
        xButton;

    console.log("building the header");
    console.log(headerElement);
    console.log("whos the parent?");
    console.log(parent);

    this.buildAvatars(parent, content.avatar, function(bsSize){

      console.log("build avatars callback from HEADER");
      console.log(content);

      if(content.title || (content.title &&content.title.html) ){
        var classes = "", newHeader;

        if(content.title.classes){
          classes = content.title.classes.join(" ");
        }

        if(!slide.options.isModal){
          console.log("theres no header and not a modal, create it");
          newHeader = jQuery('<h3/>',{
            //TODO: find automatically generated title id/index
            "id": slide.headerId.split("#")[1],
            "class": "text-center " + classes,
            html: content.title.html || content.title || ""
          });
        } else {
          console.log("theres no header but a modal, create it");
          newHeader = jQuery('<div/>', {
            id: slide.headerId.split("#")[1],
            class : "modal-header",
          });

          xButton = jQuery('<button/>', {
            id: "xbtn_" + slide.headerId.split("#")[1],
            class : "close",
            type : "button",
            "data-dismiss" : "modal",
            "aria-hidden" : true,
            //"disabled" : true,
            html : "x"
          }).appendTo(newHeader);

          jQuery('<h4/>', {
            id: "title_" + slide.headerId.split("#")[1],
            class: "modal-title",
            //id: element.id + "_label",
            html: content.title.html || content.title || ""
          }).appendTo(newHeader);

          xButton.on('click', function(e){
            //closeModal();
            console.log("close the modal");
          });
        }
        
        if(headerElement && headerElement.length > 0){
          if($().pulse){
            headerElement.replaceWith(newHeader.pulse(slide.options.pulseProperties, slide.options.pulseSettings));
          }
          console.log("replace the header");
        } else {
          console.log("append the header");
          console.log(newHeader);
          console.log(parent);
          if($().pulse){
            newHeader.pulse(slide.options.pulseProperties, slide.options.pulseSettings).prependTo(slide.container);
          }
        }
      }

      if(content.title && content.title.action && headerElement){
        switch(content.title.action){
          case "remove":
            headerElement.remove();
            break;
        }
      } else if(clearTitle){
        headerElement.remove();
      }

      if(setupContent && typeof setupContent === 'function'){
        setupContent(bsSize, callback);
      }

    });
  },

  // method for invoking all build functions in one place and activating the slide
  buildSlide: function(){
    "use strict";

    console.log("building slide");

    var slide = this, callback, panelContainer = $(slide.options.panelId);

    this.attachEvents();
    this.attachStates();

    //console.log("no audio and building content! *** " + this.activeIndex);
    console.log(this);
    if(this.options.enablePanel && panelContainer && panelContainer.length < 1){
      jQuery("<div/>",{
        id: slide.options.instStatusId1.split("#")[1],
        class: "row",
      }).appendTo(slide.container);

      panelContainer = jQuery("<div/>", {
        id: slide.options.panelId.split("#")[1],
        class: "instruments " + (this.options.enableSlider ? "col-xs-8" : "col-xs-12"),
        html: '<div id="panelHighlightContainer"></div><div id="instRow1" class="row">'+
              '</div><div id="instRow2" class="row"></div>'
      }).appendTo(slide.container);

      jQuery("<div/>",{
        id: slide.options.instStatusId2.split("#")[1],
        class: "row",
      }).appendTo(slide.container);
    }
    this.buildContent(true, this.activeIndex, this.activeIndex, false, null, true);

    slide.initPanel(slide.options.panelType);
    
    callback = function(){
      slide.buildQuizContainer();
      slide.buildQuizzes();
      slide.buildFooter();
      slide.buildModals();
      slide.resetSlide();  
      // finished thus activate the slide
      slide.activateSlide();
  
    };

    console.log("inside build slide before init media");
    slide.initMedia(callback);
    
  },

  buildRetryModal: function(){
    "use strict";


  },  

  // method for building avatars into the slide
  buildAvatars: function(parent, avatar, callback){
    "use strict";
    // callback will generate the title+content
    var avatarLeft = "", avatarRight = "", contentClass = 12, i, slide = this;

    function createAvatars( avatars ){
      var avatarSide = "", avatarClass = "", avatarDiv = "", avatarElement, tempImg, filename = "";

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
            
            if(i === 0){
              avatarDiv.prependTo(parent.parent());
            } else {
              avatarDiv.appendTo(parent.parent());
            }
          }

          if(slide.avatars && slide.avatars[avatars[i].character]){
            for(avatarElement in slide.avatars[avatars[i].character]){
              if(slide.avatars[avatars[i].character].hasOwnProperty(avatarElement)){
                tempImg = $("#" + avatars[i].character + "_" + avatarElement);

                if(!tempImg || tempImg.length < 1){
                  filename = slide.options.apacheServerBaseUrl + slide.avatars[avatars[i].character][avatarElement];

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

      createAvatars( [ avatarLeft, avatarRight] );
    }

    if(callback && typeof callback === "function" ){
      callback(contentClass);
    }
  },

  // if content resizes, resize the throttle as well if neccessary
  checkForContentResize: function(){
    "use strict";

    var $body = $(this.bodyId), $sliderContainer = $(this.throttleContainer), $slider = $(this.throttleId), slide = this;

    if(this.options.enableSlider || this.options.enablePanel){

      console.log("body and slider... : ");

      console.log($body);
      console.log($slider);

      if(slide.options.enablePanel){

        $body = $(this.options.panelId);
        console.log("and body is... ");
        console.log($body);
      }

      ResizeSensor( $body , function(){
        console.log("resetting slider height!!");
        $sliderContainer.height( $body.height() );
        $slider.height( $body.height() - 22 );
        slide.instrumentResizer( $body.width() );
        console.log($slider.height() );
        console.log($sliderContainer.height() );
        console.log($body.height() );
      });

    }
  },

  // method for building the content of the slide
  buildContent: function(correctAudio, index, outerIndex, clearContent, cb, triggerCallback){
    "use strict";
    var outerSlideContent = this.slideContent, /*checkSlideHighlights = this.checkSlideHighlights*/ slide = this,
        highlightsAddOnClick = [], buttonsAddOnClick = [], /*checkSlideButtons = this.checkSlideButtons*/ localClass,
        activeIndex = index || this.activeIndex, contentContainer = $(this.container + " > " + this.bodyId), setupInnerContent;

    outerIndex = this.activeIndex || 0;

    // console.log("whats the container here?");
    // console.log(contentContainer);
    // console.log("and the modal option?");
    // console.log(this.options.isModal);

    if( !this.options.isModal && (!contentContainer || contentContainer.length === 0) ){

      this.initSlider(activeIndex);

      contentContainer = jQuery('<div/>', {
        id: this.bodyId.split("#")[1],
        "class": this.options.showAvatars || this.options.enableSlider ? "cdot_contentText col-xs-8" : "cdot_contentText col-xs-12"
      }).appendTo(this.container);
    } else if (this.options.isModal) {
      var dialogContainer = jQuery('<div/>', {
        "class": "modal-dialog modal-cdot"
      }).appendTo(this.container);

      contentContainer = jQuery('<div/>', {
        class: "modal-content"
      }).appendTo(dialogContainer);
      //contentContainer = $(this.container);
    }
    
    // console.log("and the contentainer after?");
    // console.log(contentContainer);
    // highlightsAddOnClick = this.initHighlights();
    // this.buildHighlights(activeIndex, highlightsAddOnClick);
    slide.initActionables();
    // buttonsAddOnClick = this.initButtons();
    // console.log("buttons ADD ON CLICK!");
    // console.log(buttonsAddOnClick);
    // this.buildButtons(activeIndex, buttonsAddOnClick);

    setupInnerContent = function(classSize, callback){
      var slideContent = outerSlideContent[activeIndex], slideInner = $(slide.container + " > .cdot_contentText > .slideInner"), 
          action, contentClasses = "", imageClasses = "", bsClass = classSize || 12, innerContent, innerImage,
          newSlideInner;// callback = c;b

      if(!clearContent){
        if(slideContent.content){
          action = slideContent.content.action || "replace";
        } else {
          action = "replace";
        }

        // lets take care of our highlights
        //checkHideShowActions(slideContent, slide);

        // and the buttons
        //checkSlideButtons(slideContent.buttons, slide);
        slide.checkHideShowActions(slideContent, slide);
        // let's switch the slider if needed
        slide.setSlider(slideContent);

        newSlideInner = jQuery('<div/>', {
          id: "slideInner_" + outerIndex,
          "class": "slideInner col-xs-12" + (slide.options.isModal ? " modal-body" : ""),
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


        // console.log("is there an inner image here?");
        if (slideContent.image && slideContent.image.src) {
          if(slideContent.image.classes){
            imageClasses = slideContent.image.classes.join(" ");
          }

          innerImage = jQuery('<img/>',{
            id: "innerImage_" + outerIndex + "_" + activeIndex,
            "class": imageClasses,
            src: slideContent.image.src || ""
          });

          // console.log("inner image is: ");
          // console.log(innerImage);
        }

        console.log("the inner elemnt is...");
        console.log(slideInner);

        if(action === "remove" || action === "replace"){
          slideInner.children().remove();
          slideInner.remove();
        }

        if(action === "append" || action === "replace"){
          if(innerContent){
            innerContent.appendTo(newSlideInner);
          }
          if(innerImage){
            innerImage.appendTo(newSlideInner);
          }
          if($().pulse){
            newSlideInner.appendTo(contentContainer)/*---------test-------------*/.pulse(slide.options.pulseProperties, slide.options.pulseSettings);
          }
        }
      } else {
        slideInner.children().remove();
      }

      if(callback && typeof callback === 'function'){
        callback();
      }

      console.log("trigger callback? ***");
      if(triggerCallback && slideContent.callback && typeof slideContent.callback === 'function'){
        console.log("triggering the callback! ****");
        slideContent.callback();
      }

    };

    if ( (!this.slideContent[activeIndex].second && !this.slideContent[activeIndex].audio) || correctAudio ){
      this.buildHeader( contentContainer, this.slideContent[activeIndex], setupInnerContent, false, triggerCallback);
    } else if ( clearContent ){
      this.buildHeader( contentContainer, this.slideContent[activeIndex], setupInnerContent, clearContent, triggerCallback);
    }
    
  },

  buildQuizContainer: function(){
    "use strict";

    var quiz = $(this.options.quizId);

    if(!quiz || quiz.length < 1){
      quiz = jQuery('<div/>', {
        id: this.options.quizId.split("#")[1],
        class: this.options.quizContainerClass
      });

      if(this.options.isModal){
        quiz.appendTo( this.container + " > .modal-dialog > .modal-content");
      } else {
        quiz.appendTo( $(this.container).parent() );  
      }
    }
  },

  buildFooter: function(){
    "use strict";

    var footer = $(this.options.footerId);

    if(!footer || footer.length < 1){

      footer = jQuery('<div/>', {
        id: this.options.footerId.split("#")[1],
        class: "slide_footer " + (this.options.isModal ? "modal-footer" : "row")
      });

      if(this.options.isModal){
        console.log("trying to find container");
        footer.appendTo( this.container + " > .modal-dialog > .modal-content");
        console.log( $(this.container + " > .modal-dialog > .modal-content") );
      } else {
        footer.appendTo( $(this.container).parent() );  
      }

      this.buildSlideControls(footer);

      this.buildCourseControls(footer);
    }
  },

  // build controls that go immediately after the slide (play/pause buttons)
  buildSlideControls: function(parentContainer){
    "use strict";

    var parent = parentContainer || $(this.container).parent();

    if(this.options.showSlideControls){
      console.log("!!! BUILDING SLIDE CNTRLS! ***********");

      var slideControlsRow = jQuery('<div/>', {
        "class": "row",
      }).appendTo( parent );

      this.insertLineBreak(slideControlsRow);

      var slideControlsContainer = jQuery('<div/>', {
        "id": "playerControls",
      }).appendTo(slideControlsRow);

      var slideControlsPrevious = jQuery('<div/>', {
        "id": "btnPDiv",
        html: '<a id="btnP" class="btn btn-default cdotBtn2" disabled role="button"></a>'
      }).appendTo(slideControlsContainer);

      var slideControlsPlay = jQuery('<div/>', {
        "id": "btnPlayDiv",
        html: '<a id="btnPlay" class="btn btn-default cdotBtn2" role="button"></a>' +
              '<a id="btnPause" class="btn btn-default cdotBtn2" role="button"></a>' +
              '<a id="btnR" class="btn btn-default cdotBtn2" role="button"></a>'
      }).appendTo(slideControlsContainer);

      var slideControlsNext = jQuery('<div/>', {
        "id": "btnNDiv",
        html: '<a id="btnN" class="btn btn-default cdotBtn2" disabled role="button"></a>'
      }).appendTo(slideControlsContainer);

      this.slideElements.slideControls = {
        previous: $("#btnP").data("action", "previous"),
        play: $("#btnPlay").data("action", "play"),
        pause: $("#btnPause").data("action", "pause"),
        replay: $("#btnR").data("action", "replay"),
        next: $("#btnN").data("action", "next")
      };

      this.initSlideButtonEvents();
    } else {
      this.insertLineBreak( parent );
    }
  },

  insertLineBreak: function( parent ){
    "use strict";
    try {
      jQuery('<hr/>', {
        "class": "style-two",
        
      }).appendTo(parent);
    } catch(error) {
      console.log("error: " + error);
      console.log("no parent provided, line break not added");
    }
  },

  buildSlideAudios: function(audioFiles){
    "use strict";
    var slideObject = this, localAudios, parentContainer;
    // check hasPlayer parameter if has been loaded/listend to previously
    // and if matches the # of audioFiles... if so set var to true and restrict pushing hasListened
    if(audioFiles && typeof audioFiles !== 'undefined' && audioFiles.length > 0){ //|| (modalAudios && parent) ){
      localAudios = audioFiles; // modalAudios

      if( typeof localAudios === 'string' ) {
        localAudios = [ localAudios ];
      }
      parentContainer = slideObject.container;

      console.log("building audios");
      console.log(audioFiles);

      // if modals, 2d array thus two itterations...
      localAudios.forEach( function(audio, a){
        //if(audio && typeof audio !== 'undefined'){
          // lets make sure that the filename provided is without the extension
          var split = audio.src.split("."), filename = "", tempArray = [], addedSlideAudio, source, 
              extensions = [".mp3", ".wav", ".ogg"], types = [ "audio/mpeg", "audio/wav", "audio/ogg"], i;

          // console.log("audio files here: " + audio); 

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
              src: slideObject.options.apacheServerBaseUrl + filename + extensions[i],
              type: types[i]
            }).appendTo(addedSlideAudio);
          }
          try {
            slideObject.slideAudios.push(Popcorn("#audio_" + a));
            slideObject.slideHasListened.push(false);
          } catch(error) {
            // was popcorn initialized ok?
            console.log("slide audio init error: ");
            console.log(error);
          }
      });
    }

    return slideObject.slideAudios;
  },

  buildStatusBar: function(parent){
    "use strict";
    if(this.options.showStatus){
      var closeButton, statusBar;

      this.insertLineBreak(parent);

      statusBar = jQuery('<div/>', {
        "class": "row",
        html: '<a id="' + this.statusId.split("#")[1] + '"' + 
              'class="btn btn-default col-xs-offset-1 col-xs-10 col-sm-offset-1 col-sm-10 text-center" ' +
              'role="button">Slide Loading...</a>'
      }).appendTo(parent);

      if(this.options.isModal){
        this.insertLineBreak(parent);

        closeButton = jQuery('<button/>', {
          type: "button",
          class: "btn btn-default",
          'data-dismiss': "modal",
          html: "Back to Instruments"
        }).appendTo(parent);
        
      }

      this.slideElements.statusBar = statusBar.find(this.statusId);
    }
  },

  // builds controls that go at the very bottom of the slide (back/continue) and status bar
  buildCourseControls: function(parentContainer){
    var controls = $(this.options.footerId + " .controls"), parent = parentContainer || $(this.container).parent();

    if(this.options.showControls){ //&& (!controls || controls.length < 1) ){

      var courseControlsRow = jQuery('<div/>', {
        "class": "row controls",
      }).appendTo( parent );

      this.buildStatusBar(courseControlsRow);

      this.insertLineBreak(courseControlsRow);

      // TODO: make titles of buttons editable by allowing them to be a property inside options
      var courseControlsContainer = jQuery('<div/>', {
        "class": "row",
        html: '<a id="btnB" class="btn btn-default col-xs-6 col-sm-4" role="button">&lt; Back</a>' + 
              '<a id="btnC" class="btn btn-default col-xs-6 col-sm-offset-4 col-sm-4" role="button">Continue &gt;</a>'
      }).appendTo(courseControlsRow);

      this.slideElements.courseControls = {
        back: $("#btnB").data("action", "back"),
        "continue": $("#btnC").data("action", "continue")
      };

      this.initCourseButtonEvents();
    } else {
      this.buildStatusBar(parent);
    }
  },

  checkAdvanceWith: function(event){
    "use strict";

    var onclick = event.data.onclick, callback = event.data.callbacks, c,
        element = event.data.element, onSuccess = event.data.onSuccess,
        slide = event.data.slide, advance,
        content = slide.slideContent[slide.activeIndex],
        availableAdvances = ["action", "type"];

    console.log("event.data");
    console.log(callback);
    console.log("CHECKING ADVANCE WITH!");

    // Running custom callbacks/onclicks
    for(c=0; onclick && c < onclick.length; c++){
      if(typeof onclick[c] === 'function'){
        onclick[c]();
      }
    }

    for(c=0; callback && c < callback.length; c++){
      if(typeof callback[c] === 'function'){
        callback[c]();
      }
    }

    console.log("inside advanceWith: ");

    console.log("expected advanceWith...");
    console.log(content.advanceWith);
    console.log("actual element");
    console.log(element);

    if(content.advanceWith){
      for(advance in content.advanceWith){
        if(content.advanceWith.hasOwnProperty(advance)){
          slide.checkActionables(element.type, element.index, event, content.advanceWith);
          // switch(content.advanceWith[advance]){
          //   case "pattern":
          //     slide.checkScanningPattern(element.type, element.index, event, content.advanceWith);
          //     console.log("advanceWith: pattern case");
          //     break;

          //   case "highlight":
          //   case "button":
          //     slide.checkActionable(element.type, element.index, event, content.advanceWith);
          //     console.log("advanceWith: high/btn case");            
          //     break;

          //   case "quiz":
          //     console.log("advanceWith: quiz case");
          //     break;

          //   default:
          //     console.log("advanceWith: default case");
          //     break;
          // }
        }
      }
    } else {
      $(slide).trigger("next");
    }

/***
  **  old advance with below
  **
    if(content.advanceWith && content.advanceWith.override){
      //$(slide).trigger("playIndex", )
    } else if (content.advanceWith && content.advanceWith.type === element.type){
      // TODO: check if audio has completed
      if(typeof content.advanceWith.index !== undefined){
        if(content.advanceWith.index === element.index){
          if(onSuccess && typeof onSuccess === 'function'){
            onSuccess();
          }
          $(slide).trigger("next");
        } else if(content.advanceWith.action === "pattern"){
          slide.checkScanningPattern(element.type, element.index, event, content.advanceWith.content);
        } else {
          slide.setStatus("Nope, that's wrong. Try again");
          console.log("wrong advance index, waiting for correcet input");
          // TODO: set status to wrong / retry
        }
      } else {
        console.log("no index on advance with, advancing...");
        $(slide).trigger("next");
      }
    } else if (content.advanceWith) {
      //$(slide).trigger("next");
      console.log("completed scans: ");
      console.log(slide.completedScan);
      console.log("min scan:");
      console.log(slide.minScan);
      if(slide.completedScan === slide.options.minScan){
        //slide.activeIndex = slide.activeIndex + slide.patternInnerIndex;
        //slide.buildContent(true, slide.activeIndex + slide.patternInnerIndex + 1);
      } else {
        console.log("wrong advanceWith, waiting for correcet input");
      }

    } else {
      $(slide).trigger("next");
    }
  ***  end old advanceWith
*****/
  },

  countObjectLength: function(obj){
    var counter=0, i;

    for(i in obj){
      if(obj.hasOwnProperty(i)){
        counter++;
      }
    }

    return counter;
  },

/***
  * NEW BUILD for BTNS/HGHLTS
  **/
  initActionables: function(){
    "use strict";
    console.log("trying to make buttons highlights");
    var slide = this, action, $parent, objCount, possibleActions = {}, options = {};

    possibleActions = {
      "button": {
        "enableOption": "enableButtons",
        "arrayName": "buttons",
        "elementArray": "buttonElements",
        "container": "buttonContainer"
      },
      "highlight":{
        "enableOption": "enableHighlights",
        "arrayName": "highlights",
        "elementArray": "highlightElements",
        "container": "highlightsContainer"
      },
      /*
      "panelHighlight:":{
        "enableOption": "enablePanel",
        "arrayName": "panelHighlights",
        "elementArray": "panelHighlightElements",
        "container": "panelHighlightContainer"
      },
      */
      "quiz": {
        "enableOption": "enableQuizzes",
        "arrayName": "quizzes",
        "elementArray": "quizElements",
        "container": "quizId"
      }
    };

    for(action in possibleActions){
      if(possibleActions.hasOwnProperty(action)){
        objCount = slide.countObjectLength(slide[possibleActions[action].arrayName]);

        console.log("action1");
        console.log(slide.options[possibleActions[action].enableOption]);
        console.log(slide[possibleActions[action].arrayName]);
        console.log(objCount);
        console.log(slide.slideElements[possibleActions[action].elementArray].length);

        if(slide[possibleActions[action].arrayName]){
          slide[possibleActions[action].arrayName].sort(slide.sortActionables);
        }
        //slide.slideElements[possibleActions[action].elementArray].sort = slide.sortActionables;
        //slide.elementsToShow[action] = slide.elementsToShow[action] || [];

        if( slide.options[possibleActions[action].enableOption] && slide[possibleActions[action].arrayName] && 
              objCount > 0 && objCount !== slide.slideElements[possibleActions[action].elementArray].length ){
          console.log("action!!");
          console.log(action);
          switch(action){

            case "button":

              $parent = $(slide[possibleActions[action].container]);
              options.element = '<a/>';
              options.classes = "btn btn-default ";
              options.dataToggle = "";
              options.style = "";
              options.role = "";
              break;

            case "highlight":
              $parent = this.options.enablePanel ? $(slide.options.panelHighlightsId) : $(slide.container + " > .cdot_contentText");
              options.element = '<div/>';
              options.classes = "clearClickable ";
              options.dataToggle = "modal";
              options.role = "button";              
              break;
/*
            case "panelHighlight":
              $parent = this.options.enablePanel ? $(slide.options.panelHighlightsId) : $(slide.container + " > .cdot_contentText");
              options.element = '<div/>';
              options.classes = "clearClickable ";
              options.dataToggle = "modal";
              options.role = "button";              
              break;
*/
            case "quiz":

              break;

            default:
              console.log("unknown action inside initActionables");
          }

          if($parent && $parent.length < 1){
            $parent = jQuery('<div/>',{
              id: slide[possibleActions[action].container].split("#")[1],
              class: "row"
            }).appendTo(slide.container);
          }
  
          slide.buildActionables(action, possibleActions[action], $parent, options);

          //slide.slideElements[possibleActions[action].elementArray].sort(slide.sortActionables);
        }
      }
    }
  },
  
  executeAllCallbacks: function(event){
    "use strict";

    var callbacks = event.data.callbacks, i,
        element = event.data.element,
        slide = event.data.slide;
        //content = slide.slideContent[slide.activeIndex];

    for(i = 0; i < callbacks.length; i++){
      if(callbacks[i] && typeof callbacks[i] === 'function'){
        callbacks[i]();
      }
    }
  },

  buildActionables: function(action, obj, parent, options){
    "use strict";

    var act, slide = this, actions = slide[obj.arrayName], $action, callback;
    console.log("building actionables");
    console.log(action);
    for( act in actions ){
      if(actions.hasOwnProperty(act)){
        if(action === 'highlight'){
          options.style = "z-index:1;" +
                   (slide.highlights[act].top ? ";top:" + slide.highlights[act].top : "") + 
                   (slide.highlights[act].left ? ";left:" + slide.highlights[act].left : "") + 
                   (slide.highlights[act].width ? ";width:" + slide.highlights[act].width : "") + 
                   (slide.highlights[act].height ? ";height:" + slide.highlights[act].height : "") + 
                   (slide.highlights[act].position? ";position:" + slide.highlights[act].position : "") +
                   (this.options.hiddenHighlights ? ";cursor:default; border-style: solid; border-width: 0px;" : (";border:" + this.highlights[act].border + ";cursor:pointer") );          
        }
/*
        if(action === 'panelHighlight'){
          options.style = "height:"+slide.panelHighlights[act].height +
          (this.options.hiddenHighlights ? ";cursor:default; border-style: solid; border-width: 0px;" : (";border:" + this.highlights[act].border + ";cursor:pointer") ) + 
          ";position:absolute;z-index:1;";
        }
*/
        //options.data.orderNumber = slide.options[possibleActions[action].arrayName].orderNumber || "";


        $action = $("#" + act + "_" + action);

        if( !$action || $action.length < 1){
          $action = jQuery(options.element,{
            id: actions[act].id,
            class: options.classes + (actions[act].classes ? actions[act].classes.join(" ") : "" ),
            html: actions[act].title,
            "data-toggle": options.dataToggle,
            "data-orderNumber": actions[act].orderNumber,
            role: options.role,
            style: options.style
          }).appendTo(parent);

          if(actions[act].action){
            callback = [actions[act].action];
          } else {
            callback = [];
          }

          $action.on('click', { callbacks: callback, element: { type: action, index: slide.countObjectLength(slide.slideElements[obj.elementArray]) }, slide: slide }, 
                        slide.checkAdvanceWith );

          $action.data("action", callback);
          slide.elementsToShow[action].push(false);
          console.log("pusshign onto " + obj.elementArray);
          console.log($action);
          slide.slideElements[obj.elementArray].push($action);

        }
      }
    }

  },

  sortActionables: function(a,b){
    "use strict";

    console.log("trying to sort actionables");
    console.log(a.orderNumber);
    console.log(b.orderNumber);

    return a.orderNumber - b.orderNumber;
  },

  attachActionableEvent: function(content, slide, index){
    "use strict";
    var oldActions, possibleActions = {
      "button": {
        "enableOption": "enableButtons",
        "arrayName": "buttons",
        "elementArray": "buttonElements",
        "container": "buttonContainer"
      },
      "highlight":{
        "enableOption": "enableHighlights",
        "arrayName": "highlights",
        "elementArray": "highlightElements",
        "container": "highlightsContainer"
      },
      /*
      "panelHighlight":{
        "enableOption": "enablePanel",
        "arrayName": "panelHighlights",
        "elementArray": "panelHighlightElements",
        "container": "panelHighlightContainer"
      },
      */
      "quiz": {
        "enableOption": "enableQuizzes",
        "arrayName": "quizzes",
        "elementArray": "quizElements",
        "container": "quizId"
      }
    };

    oldActions = slide.slideElements[possibleActions[content.media.type].elementArray][content.media.index].data('action');
    console.log(oldActions);
    /*
    oldActions.push(function(){
      slide.buildContent(true, index);
      $(slide).trigger("end", { callbacks: oldActions, 
        element: { type: content.media.type, index: content.media.index }, slide: slide });
    });
    */

    console.log("ELEMENT BUILD!");
    console.log(content.media.type);
    console.log(content.media.index);

    slide.slideElements[possibleActions[content.media.type].elementArray][content.media.index].off();
    slide.slideElements[possibleActions[content.media.type].elementArray][content.media.index].on('click', { element: { type: content.media.type, index: content.media.index }, 
      slide: slide }, function(){ $(slide).trigger("end", { callbacks: oldActions,  onSuccess: function(){ slide.buildContent(true, index); },
        element: { type: content.media.type, index: content.media.index }, slide: slide });
    });

    console.log("assigning EVENTS to ACTS: ");
    console.log("type: "+ content.media.type + " index: " + content.media.index);
    console.log(slide.slideElements[possibleActions[content.media.type].elementArray][content.media.index]);

    slide.slideElements[possibleActions[content.media.type].elementArray][content.media.index].data("action", oldActions);

  },

  initSlider: function(){
    "use strict";
    var newSlider = $(this.throttleId), throttleContainer = $(this.throttleContainer), slide = this;

    console.log("attempting slider...");

    console.log("slider option: " + this.options.enableSlider);
    console.log("slider length" + newSlider.length);

    if(this.options.enableSlider && newSlider.length < 1){
      if(throttleContainer && throttleContainer.length < 1){
        throttleContainer = jQuery("<div/>", {
          id: this.throttleContainer.split("#")[1],
          class: "col-xs-4",

        }).appendTo(slide.container);
      }

      newSlider = jQuery('<div/>', {
        id: this.throttleId.split("#")[1],
        class: "slider",
        style: "height: 200px;"
      }).appendTo(throttleContainer);

      console.log("DOING SLIDER!!! ***");
    }

    console.log("SLIDER!!! : ");
    console.log(newSlider);

    console.log("read only? " + this.options);

    newSlider
      .slider({ 
          min: 0,
          max: 4,
          values: [0],
          disabled: this.options.readOnlySlider ? true : false,
          orientation: "vertical"
      })
      .slider("pips", {
          first: "label",
          last: "label",
          rest: "label",
          labels: ["Idle", "Descent/Aprroach", "Cruise" , "Climb" , "Take Off/Full"],
          prefix: "",
          suffix: ""
      });

    this.slideElements.slider = newSlider;
  },

  setSlider: function(slideContent){
    "use strict";

    if(this.options.enableSlider && slideContent.slider && slideContent.slider !== ""){
      this.slideElements.slider.slider("option", "values", [slideContent.slider]);
    }
  },

  // create the instrument dashboard
  initPanel: function(instruments){
    "use strict";
    // extend to support a single instrument!
    var slide = this, instrument, instrumentSpan, panelContainer = $(slide.options.panelId), bootCol = 12, bootOffset=0, 
        instIds = slide.options.instrumentIds, instrumentObject = {}, options = {}, i=0, numberOfInstrments = 0, instBootCol=12;

    if(slide.options.enablePanel){

      if(instruments === undefined){
        instruments = slide.options.instrumentIds;
      }

      numberOfInstrments = slide.countObjectLength(instruments);

      if(numberOfInstrments<3){
        bootCol = (numberOfInstrments * 4);
        bootOffset = (12 - bootCol) / 2;
        instBootCol = (12/numberOfInstrments);
      } else {
        instBootCol = 12;
        if(!this.options.enableSlider)
          bootCol = 12;
        else
          bootCol = 8;
      }

      console.log("initing panel!");

      options = {
        size: 200,
        showBox: false,
        showScrews: true,
        bootstrapFriendly: true,
        bootstrapClass: "col-xs-" + instBootCol,
        img_directory: 'https://online.cdot.senecacollege.ca:25080/Project/library/static/img/instruments/'
      };

      // /c4x/Seneca_College/M01S01_Test/asset/

      if(panelContainer && panelContainer.length < 1){
        panelContainer = jQuery("<div/>", {
          id: slide.options.panelId.split("#")[1],
          class: "instruments col-xs-" + bootCol,
          html: '<div id="'+slide.options.instStatusId1.split("#")[1]+'" class="row"></div>'+
                '<div id="panelHighlightContainer"></div><div id="instRow1" class="row">'+
                '</div><div id="instRow2" class="row"></div><div id="'+
                  slide.options.instStatusId2.split("#")[1]+'" class="row"></div>'
        }).appendTo(slide.container);
      } else {
        $(slide.options.panelId)
          .removeClass((this.options.enableSlider ? "col-xs-8" : "col-xs-12"))
          .addClass("col-xs-" + bootCol);

        if(bootOffset){
          $(slide.options.panelId).addClass("col-xs-offset-" + bootOffset);  
        }
      }

      console.log("instruments: ");
      console.log(instruments);

      for (instrument in instruments){
        console.log("instrument: ");
        console.log(instrument);
        if(instruments.hasOwnProperty(instrument) && instIds.hasOwnProperty(instrument)){

          instrumentSpan = $("#" + instIds[instrument]);

          if( instrumentSpan && instrumentSpan.length < 1){
            instrumentSpan = jQuery("<div/>", {
              id: instIds[instrument],
              class: "instrument"
            });

            if(i <3){
              instrumentSpan.appendTo("#instRow1");
            } else {
              instrumentSpan.appendTo("#instRow2");
            }


            instrumentObject = $.flightIndicator("#"+instIds[instrument], instrument, options);
            slide.instruments[instrument] = instrumentObject;

            slide.slideElements.instrumentElements.push(instrumentSpan);
          }

          i++;

        }
      }

      slide.slideElements.instrumentStatus1 = $(slide.options.instStatusId1);
      slide.slideElements.instrumentStatus2 = $(slide.options.instStatusId2);
    }
  },

  setInstrumentStatus1: function(status){
    "use strict";

    var slide = this;

    if(slide.slideElements.instrumentStatus1 && slide.slideElements.instrumentStatus1.length > 0){
      slide.slideElements.instrumentStatus1.text(status);
    }
  },

  setInstrumentStatus2: function(status){
    "use strict";

    var slide = this;

    if(slide.slideElements.instrumentStatus2 && slide.slideElements.instrumentStatus2.length > 0){
      slide.slideElements.instrumentStatus2.text(status);
    }
  },

  instrumentResizer: function(bodySize){
    "use strict";

    var slide = this, instrument, instIds = slide.options.instrumentIds, numberOfInstrments = slide.countObjectLength( slide.options.panelType ), divider, size;

    if(numberOfInstrments && numberOfInstrments < 3){
      divider = numberOfInstrments;
    } else {
      divider = 3;
    }

    size = bodySize / divider;

    console.log("resizing to: " + size );

    for (instrument in instIds){
      if(instIds.hasOwnProperty(instrument)){
        if(slide.instruments && slide.instruments[instrument]){
          slide.instruments[instrument].resize({ resize: (parseFloat(size)-10) });
        }
      }
    }

  },

  setInstrument: function( instrument , functionName , value1, value2 ){
    "use strict";

    var slide = this, instruments = slide.instruments;

    instruments[instrument][functionName](value1, value2);

  },

  /*
    instrumentIds: {
      airspeed: "airspeed",
      attitude: "attitude",
      altimeter: "altimeter",
      turn_coordinator: "turn_coordinator",
      heading: "heading",
      variometer: "variometer"
     },
  */

  setAllInstruments: function( options ){
    "use strict";

    var slide = this, instrumentFunctions = {}, instruments = slide.instruments, instrument, i;

    instrumentFunctions = {
      airspeed          : [ "setAirSpeed" ],
      attitude          : [ "setRoll" , "setPitch", /*"setOffFlag"*/ ],
      altimeter         : [ "setAltitude", "setPressure" ],
      turn_coordinator  : [ "setTurn", "setSlip" ],
      heading           : [ "setHeading", "setBeaconOne", "setBeaconTwo" ],
      variometer        : [ "setVario" ]
    };

    /*
      indicator.resize(size);                     // Set size in pixels of the indicator
      indicator.toggleBox();                      // Toggle background box of the indicator
      indicator.toggleScrews();                   // Toggle background screws of the indicator
    */

    for (instrument in instruments){
      if(instruments.hasOwnProperty(instrument)){
        for(i=0; i < instrumentFunctions[instrument].length; i++){
          instruments[instrument][instrumentFunctions[instrument][i]](options[instrument]);
        }
      }
    }

  },

  initCSVParser: function(csvs, callback){
    "use strict";

    var slide = this, index = this.index || 0, rowNewData = {}, allFlight = [], myFlightIntVar, instrumentOptions = {}, csvPlayers = [], parsed = 0, c;

    if(slide.options.enablePanel && !slide.options.noCSV){

      var papaComplete = function(index) {
        var data = {}, flight = this.result.data, i = this.index || 0, toggle = true;
        // columns are
        // pitch: 30, roll: 31 (negative), heading: 33, altitude: 41, pressure : 12, airSpeed: 7, turnRate: 28 + 31,
        // yaw: 29, vario: 15/1000
        slide.panelPause = false;
        
        i = index || slide.pausedPanelIndex || 0;

        myFlightIntVar = setInterval(function(){
          slide.setInstrumentStatus2("Instrument panel PLAYING...");

          if(flight && flight.length > 0 && i < flight.length && !slide.panelPause){

            instrumentOptions = {
              attitude: {
                pitch: ( flight[i][30] ),
                roll: ( -( flight[i][31] ) ), //( -(allFlight[i].roll) ) 
              },
              heading: {
                heading: flight[i][33]
              },
              altimeter: {
                altitude: flight[i][41],//allFlight[i].altitude
                pressure: flight[i][19]
              },
              airspeed: {
                airSpeed: flight[i][7]//allFlight[i].airSpeed
              },
              turn_coordinator: {
                turnRate: ( ( parseFloat(flight[i][28]) * 57.3 ) + (parseFloat(flight[i][31]) ) ),
                yaw: ( parseFloat( flight[i][29] || 0 ) + 0.5 )
              },
              variometer: {
                vario: (parseFloat(flight[i][15]) / 100)//allFlight[i].vario
              }
            };

            slide.setAllInstruments( instrumentOptions );

            if(flight[i][flight[i].length-1] && typeof flight[i][flight[i].length-1] === 'function'){
              flight[i][flight[i].length-1]();
            }

            i++;
          } else {
            if(i < flight.length){
              slide.pausedPanelIndex = i;
              slide.setInstrumentStatus2("Instrument panel PAUSED.");
            } else {
              i = 0;
              data.element = {};
              data.element.type = "csv";
              data.element.index = slide.activeIndex;
              data.slide = slide;

              if(slide.slideContent[slide.activeIndex].advanceWith.action === "pattern"){
                if(slide.options.minScan <= slide.completedScan){
                  slide.setStatus("Congratulations, you have completed the scan sucessfully.");
                  slide.setInstrumentStatus2("The flight has finished.");
                  console.log("csv ended event");
                  $(slide).trigger("end", data);
                } else {
                  slide.setStatus("Sorry you didn't compelete the scan in time.");
                  slide.setInstrumentStatus2("The flight has finished.");
                  console.log("minScan: " + slide.minScan + " completedScans: " + slide.completedScan);

                  // TODO: show modal to retry or continue?
                }
              } else {
                console.log("csv ended event");
                $(slide).trigger("end", data);
              }

            }
            
            clearInterval(myFlightIntVar);
          }
        },75);

      };

      var papaPause = function(){
        console.log("attempting to pause csv");
        slide.panelPause = true;
      };

      var papaCurrentLine = function(index){
        this.index = index || 0;
        console.log("setting current line of csv");
        return this.index;
      };

      var papaCueLine = function(line, callback){
        console.log("csv cueing at line " + line);
        this.result.data[line].push(callback);
      };

      var papaSaveObject = function(result){
        this.result = result;
        this.play = papaComplete;
        this.pause = papaPause;
        this.cueLine = papaCueLine;
        this.currentTime = papaCurrentLine;
        csvPlayers.push(this);

        parsed++;

        if(parsed === csvs.length){
          slide.setInstrumentStatus2("Instrument panel ready.");
          callback(csvPlayers);
        }
      };

      for(c=0; csvs && c < csvs.length; c++){
        console.log("parsing: " + csvs[c].src);
        Papa.parse(slide.options.apacheServerBaseUrl + csvs[c].src, {
          config: {
            delimiter: "|",
            skipEmptyLines: true,
            fastMode: true,
            download: true,
          },
          download: true,
          complete: papaSaveObject
        });

      }
      
    } else {
      callback(csvPlayers);
    }

    return csvPlayers;
  },

  buildModals: function(modalOptions){
    "use strict"; // added on July 16

    var newModal, slide = this, i;
    // modals are basically slides with an extra option
    // build constrained inside a modal window
    if(this.options.enableModals && this.options.enableHighlights){
      for(i = 0; i < this.modals.length; i++){
        jQuery('<div/>', {
            id: "modal_" + this.modals[i].id,
            class : "modal fade",
            "tab-index" : "-1",
            role: "dialog",
            "aria-labelledby" : this.modals[i].id + "_label",
            "aria-hidden" : true,
            "data-backdrop": "static",
            "data-keyboard": false
        }).appendTo(this.container);

        newModal = new AVIATION.common.Slide({
               showAvatars: false,
               showSlideControls: false,
               showStatus: true,
               showControls: false,
               development: true,
               isModal: true,
               parent: slide,
               noAudio: this.modals[i].audio && this.modals[i].audio.length  > 0 ? false : true,
               container: "#modal_" + this.modals[i].id,
               statusId: "#modal_status_" + this.modals[i].id,
               headerId: "#modal_header_" + this.modals[i].id,
               footerId: "#modal_footer_" + this.modals[i].id
             },
             [{
               title: this.modals[i].title,
               content: this.modals[i].content,
               image: this.modals[i].image,
               callback: this.modals[i].callback,
             }],
             this.modals[i].audio
        );

        console.log("this is the modal slide: ");
        console.log(newModal);

        // where do we include highlights?!

        newModal.constructor();

        this.modalSlides.push(newModal);
      }
      // itirate through modals and create each one with a unique id and launch the 
      // build content with the modified this.container id so that content gets appended to the modal
      // how do we handle audio though?
    }
  },
  
  resetStatusBar: function(){
    "use strict";
    // console.log("resetting status bar");
    this.slideElements.statusBar.off();
    this.slideElements.statusBar.prop("disabled", true);
  },

  activateTimer: function(seconds, isAuto){
    "use strict";

    var timer = this._timer, slideObject = this, continueId = slideObject.options.continueId,
        counter = seconds || 5, // duration of the timer (each 1 point is about a second)
        statusBar = this.slideElements.statusBar;

    if (!timer){
      this._timer = "";
      timer = this._timer;
    }

    var resetTimerOnClick = function(e){
      e.preventDefault();
      // console.log("clicked reset on status bar");
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
    "use strict";

    if(this._timer){
      if(manual){
        this.slideElements.statusBar.text("Continue when ready");
      }

      clearInterval(this._timer);
    }
  },
  
  buttonOnClickEvents: function(){
    // check if there is a timer and reset if we click on a control button
    this.resetTimer();

  },

  initSlideButtonEvents: function(){
    // attach events to each button
    var buttons = this.slideElements.slideControls, slide = this;

    // console.log("slidebutton events slide: ");
    // console.log(slide);

    function initSlideBtn(e, button){
          var action = $(this).data("action");
          switch(action){

            case "previous":
              console.log("clicked previous");
              slide.resetTimer();
              $(slide).trigger("previous");
              break;

            case "play":
              console.log("clicked play");
              $(slide).trigger("play");
              break;

            case "pause":
              console.log("clicked pause");
              $(slide).trigger("pause");
              break;

            case "replay":
              console.log("clicked replay");
              slide.resetTimer();
              $(slide).trigger("replay");
              break;

            case "next":
              console.log("clicked next");
              $(slide).trigger("next");
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

    // console.log("coursebutton events slide: ");
    // console.log(slide);

    function assignBtnAction(e, button){
      var action = $(this).data("action");
      switch(action){
        case "back":
          console.log("back clicked");
          slide.redirectToPage(slide.options.backId);
          break;

        case "continue":
          console.log("continue clicked");
          slide.redirectToPage(slide.options.continueId);
          break;

        default:
          console.log("smth went wrong course btn");
          break;
      }
    }

    for( var button in buttons){
      if(buttons.hasOwnProperty(button)){
        buttons[button].on("click", assignBtnAction);
      }
    }


  },
  
  initHighlightClickEvents: function(){
    "use strict";

    if(this.options.advanceWith === "highlight"){

    }

    if(slide.slideContent[index].highlights){
      // now lets add on clicks on the modals we need them in
      for(h=0; h<slide.slideContent[index].highlights.length; h++){
        if(typeof slide.slideContent[index].highlights[h] === "object" && 
            slide.slideContent[index].highlights[h].onclick &&
            typeof slide.slideContent[index].highlights[h].onclick === "function"){
          addOnClick[slide.slideContent[index].highlights[h].index] = slide.slideContent[index].highlights[h].onclick;
        }
      }

      console.log("addOnClick: " + addOnClick);

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

  buildTimers: function(timers){
    return timers;
  },

  initMedia: function(callback){
    "use strict";

    console.log("running init media");

    var slide = this, mediaFiles = slide.mediaFiles, audioFiles = [], csvFiles = [], timers = [], players = [], media, i, 
        audioObjects, csvObjects, timerObjects, audioIndex = 0, csvIndex = 0, timerIndex = 0,
        medias = {};

    if(mediaFiles){

      for(i=0; mediaFiles && i < mediaFiles.length; i++){
        switch(mediaFiles[i].type){
          case "audio":
            audioFiles.push(mediaFiles[i]);
            break;
          case "csv":
            csvFiles.push(mediaFiles[i]);
            break;
          case "timer":
            timers.push(mediaFiles[i].duration);
            break;
          default:
            audioFiles.push({ "type": "audio", "src" : mediaFiles[i] });
            console.log("unidentified media type in initMedia");
        }
      }

      medias.audioFiles = { type: "audio", array: audioFiles };
      medias.csvFiles = { type: "csv", array: csvFiles};
      medias.timers = { type: "timer", array: timers};

      csvObjects = slide.initCSVParser(medias.csvFiles.array, function(csvInner){
        console.log("csv callback");
        for (media in medias){
          if(medias.hasOwnProperty(media)){
            console.log("media in medias " + media);
            console.log(medias[media]);
            switch(medias[media].type){
              case "audio":
                audioObjects = slide.buildSlideAudios(medias[media].array);
                break;
              case "csv":
                csvObjects = csvInner || [];
                break;
              case "timer":
                timerObjects = slide.buildTimers(medias[media].array);
                break;
              default:
                console.log("unknown media type to build inside initMedia2");
            }
          }
        }

        for(i=0; i < mediaFiles.length; i++){
          switch(mediaFiles[i].type){
            case "audio":
              players.push({ type: mediaFiles[i].type, player: audioObjects[audioIndex] });
              audioIndex++;
              break;
            case "csv":
              players.push({ type: mediaFiles[i].type, player: csvObjects[csvIndex] });
              csvIndex++;
              break;
            case "timer":
              players.push({ type: mediaFiles[i].type, player: timerObjects[timerIndex] });
              timerIndex++;
              break;
            default:
              players.push({ type: "audio", player: audioObjects[audioIndex] });
              console.log("unidentified media type in initMedia3");
          }
        }

        slide.players = players;

        slide.initMediaEvents();
  
        if(callback && typeof callback === 'function'){
          callback();
        }

      });

      
    }

  },


  initMediaEvents : function () {
      "use strict";

      console.log("running media events");

      // TODO: change "slideHasListened" to "isCompleted"??
      var players = this.players, content = this.slideContent, hasListened = this.slideHasListened,
          slideObject = this, player, i, slide = this, playerInitted = [];

      for(i=0; i < players.length; i++){
        playerInitted.push(false);
      }

      console.log(content);

      for(i = 0; i < content.length; i++){
        if(content[i].media && content[i].media.type && 
            (content[i].media.type !== "button" && content[i].media.type !== "highlight") ){
          // case for audio, csv, timer
          if(!playerInitted[content[i].media.index]){
            slide.initGenericEvents(players[content[i].media.index].player, content[i], slide, i);
            slide.initCueEvents(players[content[i].media.index].player, content[i], slide, i);
            playerInitted[content[i].media.index] = true;
          } else {
            slide.initCueEvents(players[content[i].media.index].player, content[i], slide, i);
          }

        } else if(content[i].media && content[i].media.type){
          // case for btn, hlight
          console.log("the media event should be a btn/hlight");
          slide.attachActionableEvent(content[i], slide, i);
          // for content.media.type
          // get the proper array of slideElements 
          // attach the buildContent callback to be added to their array of onclicks/callbacks
          // and add it to the existing data("action") of the element
          //
        }
      }
  },

  initGenericEvents: function(player, content, slide, index){
    "use strict";

    console.log("INIT All Generic Events");

    switch(content.media.type){
      case "csv":
        break;
      case "audio":
        player.on("ended", function(e){
          console.log("ended pop");
          console.log(player);
          var data = {};
          data.element = {};
          data.element.type = "audio";
          data.slide = slide;

          console.log("audio ended event");
          $(slide).trigger("end", data);
        });
        
        player.on("pause", function(e){
          // TODO: check global events for this
          // fire pause event
          console.log("audio paused event");
        });
        break;
      case "timer":
        player.on("end", function(){
          // TODO: global player end event
          console.log("timer ended");
        });
      
        player.on("pause", function(){
          // TODO: global pause event
          console.log("timer paused");
        });
        break;
      case "action":

        break;
      default:
        console.log("unknown media type in generic events");
    }

  },

  initCueEvents: function(player, content, slide, index){
    "use strict";
    
    var hasListened = slide.slideHasListened, callbackAtBeginning = "", contentAtStart = "";

    console.log("INIT ALL CUED EVENTs HERE!");
    console.log(player);

    switch(content.media.type){
      case "csv":
        if(content.media && content.media.line){
          player.cueLine(content.media.line, function(){
            slide.buildContent(true, index);

            if(content.callback && typeof content.callback === "function"){
              content.callback();
            }
          });  
        } else {
          contentAtStart = index;
          if(content.callback && typeof content.callback === 'function'){
            callbackAtBeginning = content.callback;
          }
          player.cueLine(1, function(){
            slide.buildContent(true, contentAtStart);
            if(callbackAtBeginning){
              callbackAtBeginning();
            }
          });
        }
        break;
      case "timer":
        if(content.media && content.media.second){
          player.on("tick", function(second){
            if(second === content.media.second){
              slideObject.buildContent(true, i);
            }
            if(content.callback && typeof content.callback === "function"){
              content.callback();
            }
          });
        } else {
          contentAtStart = index;
          if(content.callback && typeof content.callback === "function"){
            callbackAtBeginning = content.callback;
          }
          player.on("start", function(){
            slide.buildContent(true, contentAtStart);
            if(callbackAtBeginning){
              callbackAtBeginning();
            }
            console.log("timer started");
          });
        }
        break;
      case "audio":
        // if the settings are specified
        if(content.media && content.media.second){
          // check if the settings are a number or a string for 'end'
          player.cue(content.media.second, function(){
            slide.buildContent(true, index);

            if(content.callback && typeof content.callback === "function"){
              content.callback();
            }
          });  
        } else {
          contentAtStart = index;
          if(content.callback && typeof content.callback === "function"){
            callbackAtBeginning = content.callback;
          }
          player.cue("0.01", function(){
            slide.buildContent(true, contentAtStart);
            if(callbackAtBeginning){
              callbackAtBeginning();
            }
          });
        }
        break;
      default:
        console.log("unknown media type inside initCueEvents");
    }
    
  },

  checkSlideControlPlayButtons: function( action ){
    var controls = this.slideElements.slideControls;

    if(this.options.showSlideControls){
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

    }

    this.checkSlideControlPlayButtonsState();

    this.setStatus(action);
  },

  // constrols the state of the Previous/Next 'player' buttons
  checkSlideControlPlayButtonsState: function(){
    var controls = this.slideElements.slideControls, active = this.activeIndex,
        players = this.slideAudios, slide = this;

    if(this.options.showSlideControls){

      if(active < 1 && players.length > 1){
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
        } else if (active >= players.length - 1){
          console.log("active is the last players length");
          console.log("active: " + active);
          console.log("playerslength: " + players.length);
          if(active > 0){
            controls.previous.prop("disabled", false);
            controls.previous.removeAttr("disabled");
          }
          if(active > players.length - 1){
            slide.setStatus('Click "Continue" to proceed to the next slide');
            controls.pause.hide();
            controls.play.hide();
            controls.replay.show();
            slide.activateTimer(5, slide.options.autoRedirect);
          }
          controls.next.attr("disabled", true);
          controls.next.prop("disabled", true);

        } else {
          console.log("error: active is greater then players length? not doing anything");
        }
      }

    }

  },

  // controls the state (enabled/disabled) of the Back/Continue buttons
  checkSlideControlNavButtons: function( action ){

  },

  setStatus: function(action){
    var slide = this, status = this.slideElements.statusBar;

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
        if(action){
          status.text(action);
        } else {
          status.text("Status is undefined!");
        }
        
        break;
    }
    if($().pulse){
      status.pulse(slide.options.pulseProperties, slide.options.pulseSettings);
    }

  },

  activateSlide: function(){
    var slide = this;
    if(!slide.options.noAudio && !slide.options.isModal){
      $(slide).trigger("play");
    }

    slide.checkForContentResize();

    slide.centerModals();
  },

  resetSlide: function(){

    this.activeIndex = 0;
    // console.log(this.slideElements.slideControls);
    this.checkSlideControlPlayButtons();

    if(this.options.noAudio){
      this.setStatus('Press "Continue" when ready');
    }

  },

  redirectToPage: function( pageId ){
    var current = window.location.href, newUrl, tempSplit, splitter;

    splitter = "courseware";

    tempSplit = current.split(splitter);
          
    newUrl = tempSplit[0];
    window.location.assign(newUrl + "jump_to_id/" + pageId);
  },

  centerModals: function() {
    function centerModal(){
      $(this).attr("style", "top: -90px !important");
      $(this).css('display', 'block');

      var $dialog  = $(this).find(".modal-dialog"),
      offset       = ($(window).height() - $dialog.height()) / 2,
      bottomMargin = parseInt($dialog.css('marginBottom'), 10);

      // Make sure you don't hide the top part of the modal w/ a negative margin if it's longer than the screen height, and keep the margin equal to the bottom margin of the modal
      if(offset < bottomMargin) offset = bottomMargin;
      //$dialog.css("margin-top", offset);
    }

    $('.modal').on('show.bs.modal', centerModal);
    $(window).on("resize", function () {
        $('.modal:visible').each(centerModal);
    });

  },

  buildQuizzes: function(){
    "use strict";

    var slide = this, i, quizzes = this.options.quizzes || "", quizElements = [], tempElement, advancePattern;

    console.log("building quizzes");

    console.log(quizzes);

    advancePattern = function(oldActions){
      console.log("trying to advance on quiz complete!");
      $(slide).trigger("end", { callbacks: oldActions, element: { type: "quiz", index: slide.activeIndex + slide.patternInnerIndex }, slide: slide });
      if(oldActions && typeof oldActions === 'function'){
        oldActions();
      }

      //slide.trigger("continuePattern");
      slide.buildContent(true, slide.activeIndex);
    };

    for(i=0; i<quizzes.length; i++){
      console.log("this is one quiz: " + this.quizId);
      console.log("should it be? " + this.options.quizId);
      tempElement = jQuery("<div/>", {
        id: "quiz_" + i,
        class: "cdot_quiz",
        html: "<h1 class='quizName'><!-- where the quiz name goes --></h1><div class='quizArea'><div class='quizHeader'><!-- where the quiz main copy goes --><a class='button startQuiz' href='#'>Get Started!</a></div><!-- where the quiz gets built --></div><div class='quizResults'><h3 class='quizScore'>You Scored: <span><!-- where the quiz score goes --></span></h3><h3 class='quizLevel'><!--<strong>Ranking:</strong>--> <span><!-- where the quiz ranking level goes --></span></h3><div class='quizResultsCopy'><!-- where the quiz result copy goes --></div></div>",
      }).appendTo(this.options.quizId);

      quizzes[i].slide = $.isEmptyObject(slide.parentSlide) ? slide : slide.parentSlide;
      
      if(slide.options.enablePanel){
        quizzes[i].animationCallbacks = {
          completeQuiz : advancePattern
        };
      }
      
      tempElement.slickQuiz(quizzes[i]);
      console.log("quizzes at " + i);
      console.log(quizzes[i]);
      quizElements.push(tempElement);
      tempElement.hide();
    }

    this.slideElements.quizElements = quizElements;

  },

  initDefaults: function(options){
    "use strict";
    var avatars, content = [], audio = [],
        defaults = {
          serverBaseUrl: window.location.protocol + "//" + window.location.host + "/",
          apacheServerBaseUrl: window.location.protocol + "//" + window.location.host + ":25080/",
          parentSlide: {},
          showAvatars: false,
          showSlideControls: true,
          showStatus: true,
          showControls: true,
          showBorder: true,
          autoplay: true,
          autoRedirect: false,
          noAudio: false,
          enablePanel: false,
          enableModals: false,
          enableHighlights: false,
          hiddenHighlights: false,
          readOnlySlider: true,
          noCSV: false,
          headerId: "#slideHeader",
          footerId: "#slideFooter",
          quizId: "#slideQuiz",
          quizContainerClass: "cdot_quiz_container",
          advanceWith: "audio",
          panelId: "#flightInstruments",
          panelHighlightsId: "#panelHighlightContainer",
          instStatusId1: "#instStatus1",
          instStatusId2: "#instStatus2",
          scanningPatternArray: [ 1, 0, 1, 2, 1, 5, 1, 4, 1, 3 ],
          minScan: 1,
          pulseCorrectProp: {
            borderWidth: '5px',
            borderColor: 'green',
            borderRadius: '5px'
          },
          pulseWrongProp: {
            borderWidth: '5px',
            borderColor: 'red',
            borderRadius: '5px'
          },
          pulseInstrumentSettings: {
            duration: 500,
            pulses: 1
          },
          pulseProperties: {
            backgroundColor: "#D0FAEE",
            borderRadius: "10px"
          },
          pulseSettings: {
            duration: 3000,
            pulses: 1
          },
          instrumentIds: {
            airspeed: "airspeed",
            attitude: "attitude",
            altimeter: "altimeter",
            turn_coordinator: "turn_coordinator",
            heading: "heading",
            variometer: "variometer"
          },
          avatars: {
            tom: {
              open: "aviation/img/tomOpen.png",
              close: "aviation/img/tomClose.png"
            },
            jane: {
              open: "aviation/img/janeOpen.png",
              close: "aviation/img/janeClose.png"
            }
          },
          highlights:
          [
            { // #4
              id: "asi",
              orderNumber: 0,
              name: "Airspeed Indicator (ASI)",
              height: "50%",
              classes: ["col-xs-4"],
              border : "7px ridge yellow",
            },
            { // #1
              id: "ai",
              orderNumber: 1,
              name: "Attitude Indicator (AI)",
              height: "50%",
              classes: ["col-xs-4"],
              border : "7px ridge yellow",
            }, 
            { // #2
              id: "alt",
              orderNumber: 2,
              name: "Altimeter (ALT)",
              height: "50%",
              classes: ["col-xs-4"],
              border : "7px ridge yellow",                            
            },
            { // #6
              id: "tc",
              orderNumber: 3,
              name: "Turn Coordinator (TC)",
              height: "50%",
              classes: ["col-xs-4"],
              border : "7px ridge yellow",                            
            },
            { // #3
              id: "hi",
              orderNumber: 4,
              name: "Heading Indicator (HI)",
              height: "50%",
              classes: ["col-xs-4"],
              border : "7px ridge yellow",                            
            },
            { // #5
              id: "vsi",
              orderNumber: 5,
              name: "Vertical Speed Indicator (VSI)",
              height: "50%",
              classes: ["col-xs-4"],
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

    // init neccessary variables
    this.slideStates = [];

    this.parentSlide = options.parentSlide || {};

    this.extraStates = [];

    this.activeIndex = options.activeIndex || 0;

    this.extraActiveIndex = options.extraActiveIndex || 0;

    this.mediaFiles = options.mediaFiles;

    console.log("** AUDIO FILES? ****");
    console.log(this.mediaFiles);
    console.log(this);

    this.slideAudios = []; // init an empty array to store audio (popcorn) elements in
    this.slideHasListened = []; // store which audios have been listened to

    this.instruments = {};

    this.slideElements = {}; // will have status bar / control buttons / title / content and so on

    this.slideTimer = -1;

    this.elementsToShow = { "button": [], "highlight": [], "quiz": [] };

    this.slideContent = this.options.slideContent ||  [
                                                        { 
                                                          title: "No Content Provided",
                                                          content: "Check your slideContent object", 
                                                          audio: 0
                                                        }
                                                      ];


    // a way to keep track of the modals on the page
    this.modalSlides = [];

    // TODO: move this when neccessary, for testing and development only
    this.slideElements.slideControls = {};
    this.slideElements.courseControls = {};
    this.slideElements.highlightElements = [];
    this.slideElements.panelHighlightElements = [];
    this.slideElements.buttonElements = [];
    this.slideElements.instrumentElements = [];
    this.slideElements.quizElements = [];

    this.avatars = options.avatars;
    this.highlights = options.highlights;
    this.modals = options.modals || [];
    this.buttons = options.buttons || [];
    this.options = options;

    this.buttonContainer = options.buttonContainer || "#buttonContainer";
    this.container = options.container || "#slideContainer";
    this.statusId = options.statusId || "#statusBar";
    this.headerId = options.headerId || "#header";
    this.footerId = options.footerId || "#footer";
    this.bodyId = options.bodyId || "#body";

    this.throttleId = options.throttleId || "#slider";
    this.throttleContainer = options.throttleContainer || "#sliderContainer";

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
      this.container = "#slideContainer"
    };
    */
  },

  checkHideShowActions: function(slideContent, slide){
    "use strict";

    var possibleActions = { 
          "button": {
            "elements": "buttonElements",
            "mult": "buttons"
          }, 
          "highlight": {
            "elements" : "highlightElements",
            "mult" : "highlights"
          }, 
          "quiz": {
            "elements" : "quizElements",
            "mult": "quiz"
          } 
        }, action, toShowBtn = [], toShowHighlights = [], toShowQuiz = [], i;

    for(action in possibleActions){
      if( possibleActions.hasOwnProperty(action) ){
        for(i=0; i < slide.slideElements[possibleActions[action].elements].length; i++){
          slide.elementsToShow[action][i] = false;
        }
      }
      
      if(slideContent.hasOwnProperty(possibleActions[action].mult) && possibleActions.hasOwnProperty(action)){
        for(i = 0; slideContent[possibleActions[action].mult] &&  i < slideContent[possibleActions[action].mult].length; i++){
          if(typeof slideContent[possibleActions[action].mult][i] === "object" ){
            slide.elementsToShow[action][slideContent[possibleActions[action].mult].index] = true;
            //toShow[showButtons[j].index] = true;
          } else {
            slide.elementsToShow[action][slideContent[possibleActions[action].mult][i]] = true;
            //toShow[showButtons[j]] = true;  
          }
        }
      }
    }

    for(action in possibleActions){
      if(possibleActions.hasOwnProperty(action)){
        for(i=0; i < slide.elementsToShow[action].length; i++){
          if(slide.elementsToShow[action][i]){
            //show this one
            slide.slideElements[possibleActions[action].elements][i].show();
          } else {
            //hide this one
            slide.slideElements[possibleActions[action].elements][i].hide();
          }
        }
      }
    }
  },


  /***
    *   Function for checking if the student is performing the correct scanning pattern
    *   The scanning pattern order is:
    *   AI, ASI, AI, ALT, AI, VC, AI, HC, AI, TC
    **/
  // oldName : checkScanningPattern
  checkActionables: function(type, index, event, advanceWith){
    "use strict";

    var slide = this, completedScan = slide.completedScan || 0, overallScanIndex,
        allowedUnsuccesful, unsuccesfulAttempts, i, innerIndex, element,
        //scanPattern = [ 0, 3, 0, 1, 0, 4, 0, 2, 0, 5],
        scanPattern = slide.options.scanningPatternArray,
        highlightInstrument = [ "attitude", "altimeter", "heading", "airspeed", "variometer", "turn_coordinator"];

//  $(this).trigger("click");

/*
    $(this).on("checkScanningPattern", function(e, evt){

    });
*/

    console.log("type inside checkActionabels" + type);

    // init defaults
    if(event.target){
      element = event.target;
    } else if(type === 'highlight'){
      element = slide.slideElements.highlightElements[index];
    } else if(type === 'button'){
      element = slide.slideElements.buttonElements[index];
    } else if(type === 'quiz'){
      element = slide.slideElements.quizElements[index];
    }

    if(slide.overallScanIndex !== undefined){
      overallScanIndex = slide.overallScanIndex;
    } else {
      overallScanIndex = -1;
    }

    if(slide.allowedUnsuccesful !== undefined){
      allowedUnsuccesful = slide.allowedUnsuccesful;
    } else {
      allowedUnsuccesful = 3;
    }
    
    if(slide.unsuccesfulAttempts !== undefined){
      unsuccesfulAttempts = slide.unsuccesfulAttempts;
    } else {
      unsuccesfulAttempts = 0;
    }

    if(slide.patternInnerIndex !== undefined){
      innerIndex = slide.patternInnerIndex;
    } else {
      innerIndex = 0;
    }

    console.log("Clicked index: " + index + " Expected index: " + scanPattern[overallScanIndex+1] + " overallScanIndex: " + overallScanIndex);

    // check the logic
    if(type && !index){
      if(type === advanceWith.type)
        $(slide).trigger("correctAdvance");
      else
        $(slide).trigger("wrongAdvance");
    }

    if(type === 'highlight' && typeof index !== undefined && typeof advanceWith.action === undefined ){
      if(type === advanceWith.type && index === advanceWith.index)
        $(slide).trigger("correctAdvance");
      else
        $(slide).trigger("wrongAdvance");
    }

    if(type === 'highlight' && typeof index !== undefined && advanceWith.action === 'pattern'){
      //TODO: put into separate function?
      //slide.checkScanningPattern();
      
      slide.setStatus("Succesful completed scans: " + completedScan + " Unsuccesful attempts: " + unsuccesfulAttempts + " out of " + allowedUnsuccesful + " allowed");      
      
      if( scanPattern[overallScanIndex+1] === index){
        if(element !== undefined){
          //$(element).pulse('destroy');

          if($().pulse){
            $(element).pulse(slide.options.pulseCorrectProp, slide.options.pulseInstrumentSettings);
          }

          if(buildContent && slide.slideContent[slide.activeIndex+innerIndex+1] &&
              slide.slideContent[slide.activeIndex+innerIndex+1].media.index === index){
            console.log("index expected: " + slide.slideContent[slide.activeIndex+innerIndex].media.index);
            console.log("index provided: " + index);
            console.log("inner index: " + innerIndex);
            innerIndex++;
            slide.buildContent(true, (slide.activeIndex + innerIndex) );
          } else if (buildContent && slide.slideContent[slide.activeIndex+innerIndex+1] && 
              slide.slideContent[slide.activeIndex+innerIndex+1].media.type !== 'highlight'){
            console.log("finished a scan and all its content....");
            slide.activeIndex = slide.activeIndex + innerIndex + 1;
          }
          //$("#" + slide.options.instrumentIds[highlightInstrument[index]]).pulse(slide.options.pulseCorrectProp, slide.options.pulseInstrumentSettings);
        }
        overallScanIndex++;

        if(overallScanIndex === scanPattern.length-1){
          completedScan++;
          for(i=0; i<slide.slideElements.highlightElements.length; i++){
            if($().pulse){
              slide.slideElements.highlightElements[i].pulse(slide.options.pulseCorrectProp, slide.options.pulseInstrumentSettings);  
            }
            //$(".instrument.col-xs-4").pulse(slide.options.pulseCorrectProp, slide.options.pulseInstrumentSettings);
          }
          overallScanIndex = -1;
          slide.setStatus("Succesful completed scans: " + completedScan + " Unsuccesful attempts: " + unsuccesfulAttempts + " out of " + allowedUnsuccesful + " allowed");
          
          if(completedScan >= slide.options.minScan){
            $(slide).trigger("correctAdvance");
          }
        }

      } else {
        unsuccesfulAttempts++;
        if(element !== undefined){
          //$(element).pulse('destroy');
          if($().pulse){
            $(element).pulse(slide.options.pulseWrongProp, slide.options.pulseInstrumentSettings);
          }
          //$("#" + slide.options.instrumentIds[highlightInstrument[index]]).pulse(slide.options.pulseWrongProp, slide.options.pulseInstrumentSettings);
        }
        slide.setStatus("Wrong instrument during scan. Try Again!" + " Wrong attempts: " + unsuccesfulAttempts);

        if(unsuccesfulAttempts >= allowedUnsuccesful){
          // TODO: show modal asking to redo or continue
        }
      }

    }

    slide.patternInnerIndex = innerIndex;
    slide.allowedUnsuccesful = allowedUnsuccesful;
    slide.unsuccesfulAttempts = unsuccesfulAttempts;
    slide.overallScanIndex = overallScanIndex;
    slide.completedScan = completedScan;
  },

};
console.log("testing this class execution");
