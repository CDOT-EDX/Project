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
/*global _:false */
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
  version: "0.1.1",

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
      /*
      "continuePattern": function(e, data){
      },
      */
      "correctAdvance": function(e, data){
        console.log("!* correctAdvance triggered");
        if(data && data.onSuccess){
          if(data.onSuccess.contentIndex !== undefined){
            slide.contentActiveIndex = data.onSuccess.contentIndex;

            slide.mediaActiveIndex = slide.content[slide.contentActive].media.index;
          } else if (data.onSuccess.mediaIndex !== undefined){
            slide.mediaActiveIndex = data.onSuccess.mediaIndex;
            $(slide).trigger("play");
          }
          return;
        }
        $(slide).trigger("next", data);
      },
      "wrongAdvance": function(e, data){
        console.log("!* wrong advance triggered");
        console.log("!* wrong advance data");
        console.log(data);
        if(data && data.onFail && data.onFail.index !== undefined){
          $(slide).trigger("pause");
          $(slide).trigger("reset");
          $(slide).trigger("playAltIndex", data.onFail);
        }
        // TODO: tell the student that the action was a wrong one...
      },
      "playAltIndex": function(e, data){
        var index = data.index, altPlayer = slide.altPlayers;

        console.log("!* playAltIndex triggered");
        console.log("!* altIndex: " + index);
        slide.checkSlideControlPlayButtons("play");
        // TODO: or disable all buttons


        if(altPlayer[index] && altPlayer[index].player){
          altPlayer[index].player.play();
          // buildAltContent?
        }

        if(data.resetMediaIndex){
          slide.mediaActiveIndex = data.resetMediaIndex;
        }

        if(data.resetContentIndex){
          slide.contentActiveIndex = data.resetContentIndex;
        }
      },
      instrumentPause: function(index){
        slide.setInstrumentStatus2("Instrument panel is paused");
        //slide.checkSlideControlPlayButtons("pause");
      },
      instrumentResume: function(){
        slide.panelPause = false;

        slide.setInstrumentStatus2("Instrument panel is playing...");
        slide.checkSlideControlPlayButtons("play");
      },
      instrumentResetPlay: function(e,newMediaIndex){
        $(slide).trigger("pause");
        $(slide).trigger("reset");
        slide.mediaActiveIndex = newMediaIndex;
        //slide.mediaActiveIndex++;
        $(slide).trigger("reset");
        $(slide).trigger("play");  
      },
      contentNext: function(e,data){
        //slide.checkSlideControlPlayButtons("play");
        if(data && data.mediaIndex !== undefined){
          $(slide).trigger("instrumentResetPlay", data.mediaIndex);
        } else 
        if(slide.slideContent && slide.contentActiveIndex < slide.slideContent.length-1){
          slide.buildContent(true, slide.contentActiveIndex+1);
          slide.checkSlideControlPlayButtons("play");
        } else {
          $(slide).trigger("slideEnd");
        }
      },
      slideEnd: function(e, data){
        console.log("attempting reset");
        $(slide).trigger('reset', 'Click "Continue" to proceed to the next slide');
        console.log("after reset");
        slide.checkSlideControlPlayButtons("replay");
        slide.setStatus('Click "Continue" to proceed to the next slide');
        slide.activateTimer(6, slide.options.autoRedirect);
      },
      end: function(e, data){
        if(data && data.element && data.element.type !== undefined){
          if(data.element.type === 'csv'){
            // set inst panel status as 'ended'
          }
        }
        //slide.checkSlideControlPlayButtons("pause");
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

        var active = slide.mediaActiveIndex, players = slide.players, content = slide.slideContent;

        console.log(players[active]);
        if(players[active] && players[active].player){
          slide.checkSlideControlPlayButtons("play");
          players[active].player.play();  
        }
      },
      pause: function(e){
        console.log("!* pause event fired");

        var active = slide.mediaActiveIndex, players = slide.players;

        console.log(players[active]);
        if(players[active] && players[active].player){
          slide.checkSlideControlPlayButtons("pause");
          console.log("trying to pause ");
          players[active].player.pause();  
        }

      },
      stop: function(e){
        console.log("!* stop event fired");
        //slide.states.stopped = true;
        //slide.states.playing = false;
      },
      next: function(e, data){
        var nextContent = slide.slideContent[slide.contentActiveIndex+1], type;
        console.log("!* next event fired");
        // move on to the next track
        //if(data && data !== undefined){
          if(nextContent && nextContent.media && nextContent.media !== undefined && nextContent.media.type &&
              nextContent.media.type !== undefined){
            type = nextContent.media.type;
            if(type === 'button' || type === 'highlight' || type === 'quiz'){ // or pattern?
              $(slide).trigger("contentNext", data);
              return;
            }
          }
        //}
        // if we got this far, we need to increment mediaActiveIndex instead
        $(slide).trigger("nextMedia");
      },
      nextMedia: function(e, data){
        $(slide).trigger("pause");
        $(slide).trigger("reset");
        slide.mediaActiveIndex++;
        if(slide.slideContent && slide.mediaActiveIndex < slide.players.length){
          $(slide).trigger("play");
        } else {
          $(slide).trigger("slideEnd");
        }
      },
      previous: function(e){
        console.log("!* previous event fired");
        // go to the previous track
        slide.resetStatusBar();
        $(slide).trigger("pause");
        $(slide).trigger("reset");
        slide.mediaActiveIndex--;
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
      reset: function(e, status){
        console.log("!* reset event fired");

        if(slide.players[slide.mediaActiveIndex] && slide.players[slide.mediaActiveIndex].player){
          slide.players[slide.mediaActiveIndex].player.pause();
          slide.players[slide.mediaActiveIndex].player.currentTime(0);
        }
        console.log("status on reset: " + status);
        if(status){
          slide.setStatus(status);
        }
        console.log("reset event finished");
      },
      setPosition: function(e, position){
        if(slide.players[slide.mediaActiveIndex] && slide.players[slide.mediaActiveIndex].player){
            slide.players[slide.mediaActiveIndex].player.currentTime(position); 
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

    this.buildAvatars(parent, content.avatar, function(){

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
        setupContent(callback);
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

    //console.log("no audio and building content! *** " + this.mediaActiveIndex);
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

    this.buildContent(true, this.contentActiveIndex, this.mediaActiveIndex, false, null, true);


    if(this.options.studentGraph){
      callback();
      this.buildGraph();
      return;
    }


    slide.initPanel(slide.options.panelType);
    
    callback = function(){
      slide.buildQuizContainer();
      slide.buildQuizzes();
      slide.buildFooter();
      slide.buildModals();
      slide.resetSlide();
      slide.initAltmedia();

      // finished thus activate the slide
      slide.activateSlide();
  
    };

    console.log("inside build slide before init media");
    slide.initMedia(callback);
    
  },

  // will generate the graph of KCs for student and their progress
  buildGraph: function(){
    "use strict";

  },

  // modal that will prompt user to retry/review/continue
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
        slide.instrumentResizer( $body.width(), $body.height() );
        console.log($slider.height() );
        console.log($sliderContainer.height() );
        console.log($body.height() );
      });

    }
  },

  // method for building the content of the slide
  buildContent: function(correctAudio, index, outerIndex, clearContent, cb, triggerCallback, action){
    "use strict";
    var outerSlideContent = this.slideContent, slide = this, 
        contentActiveIndex = index || this.contentActiveIndex, position,
        contentContainer = $(this.container + " > " + this.bodyId), setupInnerContent;

    if(index && index !== undefined && action !== 'pattern'){
      this.contentActiveIndex = index;
    }

    outerIndex = outerIndex || this.mediaActiveIndex || 0;

    if( !this.options.isModal && (!contentContainer || contentContainer.length === 0) ){

      this.initSlider(contentActiveIndex);

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
    }

    if(slide.slideContent[contentActiveIndex].action !== undefined){
      // set line or second of media before playing it
      position = slide.slideContent[contentActiveIndex].action.line || slide.slideContent[contentActiveIndex].action.second;
      if(position !== undefined){
        $(slide).trigger("setPosition", position );
      }

      if(slide.slideContent[contentActiveIndex].action.type !== undefined && 
          slide.slideContent[contentActiveIndex].action.index !== undefined){
        slide.mediaActiveIndex = slide.slideContent[contentActiveIndex].action.index;
        $(slide).trigger(slide.slideContent[contentActiveIndex].action.type);
      }
    }

    if(slide.slideContent[contentActiveIndex].setContentIndex !== undefined){
      slide.contentActiveIndex = parseInt(slide.slideContent[contentActiveIndex].setContentIndex, 10);
    }

    if(slide.slideContent[contentActiveIndex].setMediaIndex !== undefined){
      slide.mediaActiveIndex = parseInt(slide.slideContent[contentActiveIndex].setMediaIndex, 10);
    }

    setupInnerContent = function(callback){
      // TODO: "slideInner doesn't work if we are in a modal?"
      var slideContent = outerSlideContent[contentActiveIndex], contentParent = $(slide.options.contentParentId),
          contentClasses = "", imageClasses = "", innerContent, innerImage, imageParent = $(slide.options.imageParentId),
          generalParent = $(slide.options.generalContentId);

      if(!clearContent){
        if(slideContent.content){
          action = slideContent.content.action || "replace";
        } else {
          action = "replace";
        }

        // and the buttons
        // let's switch the slider if needed
        slide.setSlider(slideContent);

        // check parent of general content
        if(generalParent.length < 1){
          generalParent = jQuery('<div/>',{
            id: "generalContentParent",
            "class": "slideGeneral row"
          }).appendTo($(slide.container + " > .cdot_contentText") );
        }

        if(imageParent.length < 1){
          imageParent =jQuery('<div/>', {
            id: "imageParent",
            "class": "slideImage col-xs-12"
          }).appendTo(generalParent);
        }

        // if image and content parents dont exist, create them
        if(contentParent.length < 1){
          contentParent =jQuery('<div/>', {
            id: "contentParent",
            "class": "slideContent col-xs-12"
          }).appendTo(generalParent);
        }

        if (slideContent.content && slideContent.content.html){
          if(slideContent.content.classes){
            contentClasses = slideContent.content.classes.join(" ");
          }

          innerContent = jQuery('<div/>',{
            id: "innerContent_" + outerIndex + "_" + contentActiveIndex + "_content",
            "class": contentClasses  + " innerContent",
            html: slideContent.content.html || ""
          });
        } 


        if (slideContent.image && slideContent.image.src) {
          if(slideContent.image.classes){
            imageClasses = slideContent.image.classes.join(" ");
          }

          innerImage = jQuery('<img/>',{
            id: "innerImage_" + outerIndex + "_" + contentActiveIndex + "_img",
            "class": imageClasses + " innerImage",
            src: slideContent.image.src || ""
          });
        }

        if(action === "remove" || action === "replace"){
          contentParent.children().remove(".innerContent");

          imageParent.children().remove(".innerImage");
        }

        if(action === "append" || action === "replace"){
          if(innerContent){
            innerContent.appendTo(contentParent);
          }
          if(innerImage){
            innerImage.appendTo(imageParent);
          }

          if($().pulseinnerContent){
            if(innerContent){
              innerContent.pulse(slide.options.pulseProperties, slide.options.pulseSettings);
            }

            if(innerImage){
              innerImage.pulse(slide.options.pulseProperties, slide.options.pulseSettings);
            }
          }
        }
      } else {
        generalParent.children().remove();
      }


      if(callback && typeof callback != 'function'){
        console.log("reassigning eval");
        callback = eval(callback);
      }      

      if(callback && typeof callback === 'function'){
        console.log("running eval");
        callback();
      }

      if(triggerCallback && slideContent.callback && typeof slideContent.callback != 'function'){
        slideContent.callback = eval(slideContent.callback);
      }

      if(triggerCallback && slideContent.callback && typeof slideContent.callback === 'function'){
        console.log("triggering the callback! ****");
        slideContent.callback();
      }

      slide.initActionables();
      slide.checkHideShowActions(slideContent, slide);

    };

    if ( (!this.slideContent[contentActiveIndex].second && !this.slideContent[contentActiveIndex].audio) || correctAudio ){
      this.buildHeader( contentContainer, this.slideContent[contentActiveIndex], setupInnerContent, false, triggerCallback);
    } else if ( clearContent ){
      this.buildHeader( contentContainer, this.slideContent[contentActiveIndex], setupInnerContent, clearContent, triggerCallback);
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
    // TODO: allow for array of possible indices!
    var onclick = event.data.onclick, callback = event.data.callbacks, c,
        element = event.data.element, onSuccess = event.data.onSuccess,
        slide = event.data.slide, advance,
        content = slide.slideContent[slide.contentActiveIndex],
        availableAdvances = ["action", "type"];

    console.log("event.data");
    console.log(event);
    console.log("CHECKING ADVANCE WITH!");

    // Running custom callbacks/onclicks
    for(c=0; onclick && c < onclick.length; c++){
      
      if(typeof onclick[c] != 'function'){
        onclick[c] = eval(onclick[c]);
      }
      if(typeof onclick[c] === 'function'){
        onclick[c]();
      }
    }

    for(c=0; callback && c < callback.length; c++){
      if(typeof callback[c] != 'function'){
        callback[c] = eval(callback[c]);
      }
      if(typeof callback[c] === 'function'){
        callback[c]();
      }
    }

    console.log("inside advanceWith: ");

    console.log("expected advanceWith...");
    console.log(content.advanceWith);
    console.log("actual element");
    console.log(element);

    if( content.advanceWith && content.advanceWith.type !== undefined && !$.isArray(content.advanceWith.type) ){
      content.advanceWith.type = [content.advanceWith.type];
    }

    if( content.advanceWith && content.advanceWith.index !== undefined && !$.isArray(content.advanceWith.index) ){
      content.advanceWith.index = [content.advanceWith.index];
    }

    if(content.advanceWith){
      for(advance in content.advanceWith){
        if(content.advanceWith.hasOwnProperty(advance)){
          slide.checkActionables(element.type, element.index, event, content.advanceWith, slide.contentActiveIndex);
          // TODO: better solution over a break?
          break;
        }
      }
    } else if(element.type === "highlight" || element.type === "button" || element.type === 'quiz'){
      $(slide).trigger("contentNext", event.data.element);
    } else {
      $(slide).trigger("next");
    }
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
    var slide = this, action, $parent, objCount, possibleActions = {}, options = {}, appendParent = slide.container;

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
            }).appendTo(appendParent);
          }
  
          slide.buildActionables(action, possibleActions[action], $parent, options);
        }
      }
    }
  },
  
  executeAllCallbacks: function(event){
    "use strict";

    var callbacks = event.data.callbacks, i,
        element = event.data.element,
        slide = event.data.slide;

    for(i = 0; i < callbacks.length; i++){
      if(callbacks[i] && typeof callbacks[i] != 'function'){
        callbacks[i] = eval(callbacks[i]);
      }

      if(callbacks[i] && typeof callbacks[i] === 'function'){
        callbacks[i]();
      }

      console.log("executing actionable callbacks");
    }
  },

  buildActionables: function(action, obj, parent, options){
    "use strict";

    var act, slide = this, actions = slide[obj.arrayName], $action, callback, appendParent = slide.container;
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

          switch(slide.highlights[act].parent){
            case "panel":
              parent = $(slide.options.panelHighlightsId);
              break;
            case "content":
              parent = $(slide.options.contentHighlightsId);
              appendParent = slide.options.contentParentId;
              break;
            case "image":
              parent = $(slide.options.imageHighlightsId);
              appendParent = slide.options.imageParentId;
              break;
            default:
              parent = $(slide.options.generalHighlightsId);
              appendParent = slide.options.generalContentId;
              break;
          }

          if(parent.length < 1){
            parent = jQuery('<div/>', {
              id: parent.selector.split('#')[1],
              class: "row"
            }).appendTo(appendParent);
          }
        }
/*
        if(action === 'panelHighlight'){
          options.style = "height:"+slide.panelHighlights[act].height +
          (this.options.hiddenHighlights ? ";cursor:default; border-style: solid; border-width: 0px;" : (";border:" + this.highlights[act].border + ";cursor:pointer") ) + 
          ";position:absolute;z-index:1;";
        }
*/

        $action = $("#" + act + "_" + action);

        if( !$action || $action.length < 1){
          $action = jQuery(options.element,{
            id: actions[act].id,
            class: options.classes + (actions[act].classes ? actions[act].classes.join(" ") : "" ),
            html: actions[act].title,
            "data-toggle": options.dataToggle,
            "data-target": "#" + actions[act].id + "_modal",
            "data-orderNumber": actions[act].orderNumber,
            role: options.role,
            style: options.style
          }).appendTo(parent);

          if(actions[act].action){
            callback = [actions[act].action];
          } else {
            callback = [];
          }

          $action.on('click', { callbacks: callback, element: { type: action, index: slide.countObjectLength(slide.slideElements[obj.elementArray]), 
                                mediaIndex: actions[act].mediaIndex }, slide: slide }, slide.checkAdvanceWith );

          $action.data("action", callback);
          slide.elementsToShow[action].push(false);
          slide.elementsToDisable[action].push(false);
          slide.slideElements[obj.elementArray].push($action);

        }
      }
    }

  },

  // simple function to sort an array by their orderNumber prop
  sortActionables: function(a,b){
    "use strict";
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

    if(this.options.enableSlider && slideContent.slider !== undefined && slideContent.slider !== ""){
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
        instBootCol = 4;
        if(!this.options.enableSlider)
          bootCol = 12;
        else
          bootCol = 8;
      }

      console.log("initing panel!");

      options = {
        size: 200,
	beacononeshow: slide.options.panelOverlay,
	beacontwoshow: slide.options.panelOverlay,
	ils: slide.options.panelOverlay,
	off_flag: slide.options.offFlag,
        showBox: false,
        showScrews: true,
        bootstrapFriendly: true,
        bootstrapClass: "col-xs-" + instBootCol,
        img_directory: slide.options.apacheServerBaseUrl + 'Project/library/static/img/instruments/'
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

  instrumentResizer: function(bodyWidth, bodyHeight){
    "use strict";

    var slide = this, instrument, instIds = slide.options.instrumentIds, numberOfInstrments = slide.countObjectLength( slide.options.panelType ), divider, size;

    if(numberOfInstrments && numberOfInstrments < 3){
      divider = numberOfInstrments;
    } else {
      divider = 3;
    }

    size = bodyWidth / divider;

    console.log("resizing to: " + size );

    for (instrument in instIds){
      if(instIds.hasOwnProperty(instrument)){
        if(slide.instruments && slide.instruments[instrument]){
          slide.instruments[instrument].resize({ resize: (parseFloat(size)-10) });
        }
      }
    }

    // resize panelHighlights as well to be the same size as inst panel
    //$(slide.options.panelHighlightsId).height( bodyHeight );
    //$(slide.options.panelHighlightsId).width( bodyWidth );

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
      attitude          : [ "setRoll" , "setPitch","setILSLocalizer","setILSGlideslope" /*"setOffFlag"*/ ],
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

    var slide = this, index = this.index || 0, rowNewData = {}, allFlight = [],  
        instrumentOptions = {}, csvPlayers = [], parsed = 0, c, playFirstLine = false; //runFlight;

    if(slide.options.enablePanel && !slide.options.noCSV){

      var papaComplete = function() {
        var data = {}, flight = this.result.data, i = this.index || 0, toggle = true, end = this.end,
            player = this, interval;
        // columns are
        // pitch: 30, roll: 31 (negative), heading: 33, altitude: 41, pressure : 12, airSpeed: 7, turnRate: 28 + 31,
        // yaw: 29, vario: 15/1000
	//apperentaly the glidescope is Nav 1 h-def: 57, localizer is Nav 1 v-def: 56, beacon 1 is ADF_1 r-brg:67 beacon2 is ADF_2 r-brg: 71
        if(!this.config.panelPause){
          this.config.pausedIndex = this.index || slide.pausedPanelIndex || 0;
        }

        if(this.config.line !== undefined){
          this.config.pausedIndex = this.config.line;
          this.config.line = undefined;
        }

        console.log("starting csv at: " + this.config.pausedIndex);
        
        slide.panelEnd = false;
        this.config.panelPause = false;
        this.config.panelEnd = false;

        console.log("this csv is: ");
        console.log(this.config.selfIndex);

        function runFlight(flight, slide, end){
          var i = player.config.pausedIndex;
          slide.setInstrumentStatus2("Instrument panel is playing...");

          if(flight && flight.length > 0 && i < flight.length && !player.config.panelPause){
            instrumentOptions = {
              attitude: {
                pitch: ( flight[i][30] ),
                roll: ( -( flight[i][31] ) ),
                ils: slide.options.panelOverlay,      
		ilslocalizer: flight[i][56],
		ilsglideslope: flight[i][57]
              },
	       heading: {
		heading: flight[i][33],
               	beaconOne: (-(flight[i][66])),//67 on the other csv
		showBeaconOne: slide.options.panelOverlay,
		beaconTwo: flight[i][70],//71 on the other csv
		showBeaconTwo: slide.options.panelOverlay
              },
              altimeter: {
                altitude: flight[i][41],
                pressure: flight[i][19]
              },
              airspeed: {
                airSpeed: flight[i][7]
              },
              turn_coordinator: {
                turnRate: ( ( parseFloat(flight[i][28]) * 57.3 ) + (parseFloat(flight[i][31]) ) ),
                yaw: ( parseFloat( flight[i][29] || 0 ) + 0.5 )
              },
              variometer: {
                vario: (parseFloat(flight[i][15]) / 100)
              }
            };

            slide.setAllInstruments( instrumentOptions );

            if(flight[i][flight[i].length-1] && typeof flight[i][flight[i].length-1] === 'function'){
              flight[i][flight[i].length-1]();
            }

            player.config.pausedIndex++;

            // if statement to pause if first csv and needs to set panel
            if(slide.options.setPanel && slide.justLoaded){
              if(player.config.selfIndex === 0 && player.config.pausedIndex === 1){
                player.config.panelPause = true;
                slide.justLoaded = false;
              }
            }
          } else if (i !== 1) {
            if(i < flight.length){
              player.config.pausedIndex = i;
              $(slide).trigger("instrumentPause", i);
            } else {
              i = 0;
              data.element = {};
              data.element.type = "csv";
              data.element.index = slide.mediaActiveIndex;
              data.slide = slide;

              player.config.panelEnd = true;
              slide.panelEnd = true;

              if(end && typeof end === 'function'){
                end();
              }

              $(slide).trigger("end", data);
            }
            
            clearInterval(interval);
          }
        }

        interval = setInterval( runFlight.bind(player, flight, slide, end),75 );
      };

      var papaPause = function(){
        console.log("attempting to pause csv: ");
        slide.panelPause = true;
        this.config.panelPause = true;
        console.log("for csv: " + this.config.selfIndex);
        slide.setInstrumentStatus2("Instrument panel is paused");
      };

      var papaCurrentLine = function(index){
        this.config.line = line;
        //this.index = index || 0;
        console.log("setting current line of csv");
        //return this.index;
      };

      var papaResetLine = function(line){
        console.log("for csv: " + this.config.selfIndex);
        console.log("reseting csv line: "+ this.config.line);
        this.config.line = line;
      };

      var papaCueLine = function(line, callback){
        console.log("csv cueing at line " + line);
        this.result.data[line].push(callback);
      };

      var papaCueEnd = function(callback){
        console.log("papaparse end event");
        slide.setInstrumentStatus2("The flight has finished");
        this.end = callback;
      };

      var papaCuePause = function(callback){
        console.log("papaparse pause event");
      };

      var papaSaveObject = function(result){
        this.result = result;
        this.play = papaComplete;
        this.pause = papaPause;
        this.cueLine = papaCueLine;
        this.currentTime = papaResetLine;
        this.papaCuePause = papaCuePause;
        this.papaCueEnd = papaCueEnd;
        this.panelPause = false;
        csvPlayers[this.config.selfIndex] = this;

        parsed++;

        if(parsed === csvs.length){
          // play the first line of first csv only
          if(slide.justLoaded && slide.options.setPanel){
            csvPlayers[0].play();
          }

          slide.setInstrumentStatus2("Instrument panel ready");
          callback(csvPlayers);
        }
      };

      for(c=0; csvs && c < csvs.length; c++){
        csvPlayers.push(false);

        console.log("parsing: " + csvs[c].src);
        Papa.parse(slide.options.apacheServerBaseUrl + csvs[c].src, {
          config: {
            delimiter: "|",
            skipEmptyLines: true,
            fastMode: true,
            selfIndex: c,
            panelPause: false,
            panelEnd: false,
            line: 0
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

    var slideObject = this, timer = this._timer, continueId = slideObject.options.continueId,
        counter = seconds || 6, // duration of the timer (each 1 point is about a second)
        statusBar = slideObject.slideElements.statusBar;

    if (!timer){
      slideObject._timer = "";
      timer = slideObject._timer;
    }

    var resetTimerOnClick = function(e){
      e.preventDefault();
      // console.log("clicked reset on status bar");
      slideObject.resetTimer(true);

      if(continueId && continueId !== ""){
        statusBar.off();
        statusBar.on('click', function(){
          slideObject.redirectToPage(continueId); // any URL
        });
      }
    };

    // enable the status bar because we need to accept clicks
    statusBar.prop("disabled", false);

    statusBar.off();
    statusBar.on('click', resetTimerOnClick);
  
    if(isAuto) {
      slideObject.setStatus("Continuing in " + counter.toString() + "... Click here to cancel");
    
      if(!slideObject.timerActivated){
        slideObject.timerActivated = true;
        slideObject._timer = setInterval( function(){
            counter--;
            if(counter < 0) {
              clearInterval(slideObject._timer);
              
              if(continueId && continueId !== ""){
                slideObject.redirectToPage(continueId);
                slideObject.setStatus("Redirecting...");
              } else {
                slideObject.setStatus("Error: continueId is undefined");
              }
            } else {
              slideObject.setStatus("Continuing in " + counter.toString() + "... Click here to cancel");
            }
        }, 1000);
      }
      console.log("timer after setting");
      console.log(slideObject._timer);
    } else {
      slideObject.setStatus('Press "Continue" when ready');
      slideObject._timer = null;
    }
  },

  resetTimer: function( manual ){
    "use strict";
    var slide = this;
    if(slide._timer){
      if(manual){
        slide.setStatus('Press "Continue" when ready');
      }

      console.log("trying to resetTimer");
      console.log(slide._timer);
      clearInterval(slide._timer);
      slide.timerActivated = false;
    }
  },
  
  buttonOnClickEvents: function(){
    var slide = this;
    // check if there is a timer and reset if we click on a control button
    slide.resetTimer();
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
            slide.slideContent[index].highlights[h].onclick){

          if(typeof slide.slideContent[index].highlights[h].onclick != "function"){
            slide.slideContent[index].highlights[h].onclick = eval(slide.slideContent[index].highlights[h].onclick);
          }

          if(typeof slide.slideContent[index].highlights[h].onclick === "function"){
            addOnClick[slide.slideContent[index].highlights[h].index] = slide.slideContent[index].highlights[h].onclick;
          }
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

  initAltMedia: function(callback){
    "use strict";

    var slide = this, altMediaFiles = slide.altMediaFiles, altAudioFiles = [], altMedia = [];

    slide.altPlayers = [];

    if(altMediaFiles){
      altMedia = slide.buildSlideAudios(altMediaFiles);

      for(i=0; i < altMedia.length; i++){
        slide.altPlayers.push({ type: "audio", player: altMedia[i] });
      }
    }

    //slide.initAltMediaEvents();

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

  /***
    *   This method iterates through all of the slideContent elements
    *   and assigns them as events to corresponding media
    *   It also tracks the number of "patterns" that are on the slide
    *   and maps them to their media items
    **/
  initMediaEvents : function () {
      "use strict";

      console.log("running media events");

      // TODO: change "slideHasListened" to "isCompleted"??
      var players = this.players, content = this.slideContent, hasListened = this.slideHasListened,
          slideObject = this, player, i, slide = this, playerInitted = [], patternId = 0;

      for(i=0; i < players.length; i++){
        playerInitted.push(false);
      }

      console.log(content);

      for(i = 0; i < content.length; i++){
        if( (content[i].advanceWith && content[i].advanceWith.action && content[i].advanceWith.action === 'pattern' ) || 
              (content[i].advanceWith && content[i].advanceWith.type && (content[i].advanceWith.type === 'highlight' || content[i].advanceWith.type === 'button' ) ) ){
          slide.patternMap.push({ "media": content[i].media.index, "id" : patternId});
          patternId++;
        }

        if(content[i].media && content[i].media.type && 
            (content[i].media.type !== "button" && content[i].media.type !== "highlight") ){
          // case for audio, csv, timer
          console.log("initing mediaEvents:");
          console.log(content[i]);
          console.log(content[i].media.index);
          if(!playerInitted[content[i].media.index]){
            slide.initGenericEvents(players[content[i].media.index].player, content[i], slide, i);
            //slide.initCueEvents(players[content[i].media.index].player, content[i], slide, i);
            playerInitted[content[i].media.index] = true;
          } //else {
            slide.initCueEvents(players[content[i].media.index].player, content[i], slide, i);
          //}

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
      /**
        player.papaCueEnd(function(){
        });
        player.papaCuePause(function(){
        });
      **/
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

            if(content.callback && typeof content.callback != "function"){
              content.callback = eval(content.callback);
            }

            if(content.callback && typeof content.callback === "function"){
              content.callback();
            }
          });  
        } else {
          contentAtStart = index;
          
          if(content.callback && typeof content.callback != "function"){
            content.callback = eval(content.callback);
          }

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
              slideObject.buildContent(true, index);
            }

            if(content.callback && typeof content.callback != "function"){
              content.callback = eval(content.callback);
            }

            if(content.callback && typeof content.callback === "function"){
              content.callback();
            }
          });
        } else {
          contentAtStart = index;

          if(content.callback && typeof content.callback != "function"){
            content.callback = eval(content.callback);
          }

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

            if(content.callback && typeof content.callback != "function"){
              content.callback = eval(content.callback);
            }

            if(content.callback && typeof content.callback === "function"){
              content.callback();
            }
          });  
        } else {
          contentAtStart = index;

          if(content.callback && typeof content.callback != "function"){
            content.callback = eval(content.callback);
          }

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

    this.checkSlideControlPlayButtonsState( action );

    this.setStatus(action);
  },

  // constrols the state of the Previous/Next 'player' buttons
  checkSlideControlPlayButtonsState: function(action){
    var controls = this.slideElements.slideControls, active = this.mediaActiveIndex,
        players = this.players, slide = this, contentActive = this.contentActiveIndex;

    console.log("check button state");
    console.log(contentActive);
    console.log(this.slideContent.length);

    if(this.options.showSlideControls){

      if(active < 1 && players.length > 1){
        console.log("first audio, no way back");
        controls.previous.prop("disabled", true);
        controls.previous.attr("disabled", true);
        controls.next.prop("disabled", false);
        controls.next.attr("disabled", false);
        controls.next.removeProp("disabled");
        controls.next.removeAttr("disabled");
        //if(this.slideHasListened[active]){
        //}
      } else {
        if (active < players.length - 1){
          console.log("active is before the last player");
          controls.previous.prop("disabled", false);
          controls.previous.removeAttr("disabled");
          //if(this.slideHasListened[active]){
            //controls.next.prop("disabled", false);
            //controls.next.removeAttr("disabled");
          //} else {
          controls.next.prop("disabled", false);
          controls.next.attr("disabled", false);
          controls.next.removeProp("disabled");
          controls.next.removeAttr("disabled");
          //}
        } else if (active >= players.length - 1){
          console.log("active is the last players length");
          console.log("active: " + active);
          console.log("playerslength: " + players.length);
          if(active > 0){
            controls.previous.prop("disabled", false);
            controls.previous.removeAttr("disabled");
          }
          if( ( (active > players.length - 1) && (contentActive + 1 > this.slideContent.length - 1) ) || (contentActive + 1 > this.slideContent.length - 1) ){
            if(action !== 'replay'){
              $(slide).trigger("slideEnd");
            }
            controls.pause.hide();
            controls.play.hide();
            controls.replay.show();
          } else {
            controls.play.hide();
            controls.pause.show();
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
    var slide = this, status = slide.slideElements.statusBar;
    console.log("setting status to: " + action);

    switch(action){
      case "play":
        status.text("Playing...");
        break;
      case "pause":
        status.text("Paused");
        break;
      default:
        if(action){
          console.log("setting custom status to: " + action);
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

    this.mediaActiveIndex = 0;
    this.contentActiveIndex = 0;
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

    var slide = this, i, quizzes = this.options.quizzes || "", quizElements = [], tempElement, advancePattern, onComplete;

    console.log("building quizzes");

    console.log(quizzes);

    advancePattern = function(index){
      return function(){
        console.log("trying to advance on quiz complete with index: " + index);
        console.log("on quiz end contentIndex: "+ slide.contentActiveIndex);

        $(slide).trigger("end", { element: { type: "quiz", index: index }, slide: slide }, slide.checkAdvanceWith);

        /*
        if(oldActions && typeof oldActions != "function"){
          oldActions = eval(oldActions);
        }
        if(oldActions && typeof oldActions === 'function'){
          oldActions();
        }
        */
        //slide.buildContent(true, slide.contentActiveIndex);
      };
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

      onComplete = advancePattern(i);

      if(slide.options.enablePanel){
        quizzes[i].animationCallbacks = {
          completeQuiz : onComplete
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
	  panelOverlay : false,
	  offFlag: false,
          generalContentId : "#generalContentParent",
          contentParentId : "#contentParent",
          imageParentId: "#imageParent",

          panelHighlightsId: "#panelHighlightContainer",
          generalHighlightsId: "#generalHighlightContainer",
          contentHighlightsId: "#contentHighlightContainer",
          imageHighlightsId: "#imageHighlightContainer",

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
              parent: 'panel'
            },
            { // #1
              id: "ai",
              orderNumber: 1,
              name: "Attitude Indicator (AI)",
              height: "50%",
              classes: ["col-xs-4"],
              border : "7px ridge yellow",
              parent: 'panel'
            }, 
            { // #2
              id: "alt",
              orderNumber: 2,
              name: "Altimeter (ALT)",
              height: "50%",
              classes: ["col-xs-4"],
              border : "7px ridge yellow",
              parent: 'panel'
            },
            { // #6
              id: "tc",
              orderNumber: 3,
              name: "Turn Coordinator (TC)",
              height: "50%",
              classes: ["col-xs-4"],
              border : "7px ridge yellow",
              parent: 'panel'
            },
            { // #3
              id: "hi",
              orderNumber: 4,
              name: "Heading Indicator (HI)",
              height: "50%",
              classes: ["col-xs-4"],
              border : "7px ridge yellow",                            
              parent: 'panel'
            },
            { // #5
              id: "vsi",
              orderNumber: 5,
              name: "Vertical Speed Indicator (VSI)",
              height: "50%",
              classes: ["col-xs-4"],
              border : "7px ridge yellow",
              parent: 'panel'
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

    this.mediaActiveIndex = options.mediaActiveIndex || 0;

    this.contentActiveIndex = options.contentActiveIndex || 0;

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
    this.elementsToDisable = { "button": [], "highlight": [], "quiz": [] };


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

    this.panelEnd = false;
    this.justLoaded = true;

    this.timerActivated = false;

    this.patternMap = [];
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

  /***
    *   check if a button has been shown/hidden
    *   as well as check the buttons enabled/disabled prop
    **/
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
        }, action, toShowBtn = [], toShowHighlights = [], toShowQuiz = [], i, toDisable = [];

    for(action in possibleActions){
      if( possibleActions.hasOwnProperty(action) ){
        for(i=0; i < slide.slideElements[possibleActions[action].elements].length; i++){
          slide.elementsToShow[action][i] = false;
          slide.elementsToDisable[action][i] = false;          
        }
      }
      
      if(slideContent.hasOwnProperty(possibleActions[action].mult) && possibleActions.hasOwnProperty(action)){
        for(i = 0; slideContent[possibleActions[action].mult] &&  i < slideContent[possibleActions[action].mult].length; i++){
          if(typeof slideContent[possibleActions[action].mult][i] === "object" ){
            slide.elementsToShow[action][slideContent[possibleActions[action].mult][i].index] = true;
             if(slideContent[possibleActions[action].mult][i].disable && slideContent[possibleActions[action].mult][i].disable === true){
               slide.elementsToDisable[action][slideContent[possibleActions[action].mult][i].index] = slideContent[possibleActions[action].mult][i].disable;
             }
          } else {
            slide.elementsToShow[action][slideContent[possibleActions[action].mult][i]] = true;
          }
        }
      }
    }

    for(action in possibleActions){
      if(possibleActions.hasOwnProperty(action)){
        for(i=0; i < slide.elementsToShow[action].length; i++){
          if(slide.elementsToShow[action][i]){
            //show this one
            if(action === 'highlight'){
              if(slide.options.hiddenHighlights){
                slide.slideElements[possibleActions[action].elements][i].css("border", "");
                slide.slideElements[possibleActions[action].elements][i].css("cursor", "default");

              } else {
                slide.slideElements[possibleActions[action].elements][i].css("border", slide.options[possibleActions[action].mult][i].border);
                slide.slideElements[possibleActions[action].elements][i].css("cursor", "pointer");
              }
              slide.slideElements[possibleActions[action].elements][i].attr('disabled', false);
              slide.slideElements[possibleActions[action].elements][i].prop('disabled', false);
              slide.slideElements[possibleActions[action].elements][i].removeAttr('disabled');
              slide.slideElements[possibleActions[action].elements][i].removeProp('disabled');
            } else {
              slide.slideElements[possibleActions[action].elements][i].show();              
              // only disable the ones we show (btn, quizzes only)
              if(slide.elementsToDisable[action][i]){
                slide.slideElements[possibleActions[action].elements][i].attr('disabled', true);
                slide.slideElements[possibleActions[action].elements][i].prop('disabled', true);
              } else {
                slide.slideElements[possibleActions[action].elements][i].attr('disabled', false);
                slide.slideElements[possibleActions[action].elements][i].prop('disabled', false);
                slide.slideElements[possibleActions[action].elements][i].removeAttr('disabled');
                slide.slideElements[possibleActions[action].elements][i].removeProp('disabled');
              }
            }
          } else {
            //hide this one
            if(action === 'highlight'){
              slide.slideElements[possibleActions[action].elements][i].css("border", "");
              slide.slideElements[possibleActions[action].elements][i].css("cursor", "default");
              slide.slideElements[possibleActions[action].elements][i].attr('disabled', true);
              slide.slideElements[possibleActions[action].elements][i].prop('disabled', true);
            } else {
              slide.slideElements[possibleActions[action].elements][i].hide();              
            }
          }
        }
      }
    }
  },


  /***
    *   Function for checking if the student is performing the correct scanning pattern
    *   The scanning pattern order is:
    *   AI, ASI, AI, ALT, AI, VC, AI, HC, AI, TC
    *   0,  3,   0,  1,   0,  4,  0,  2,  0,  5
    **/
  // oldName : checkScanningPattern
  checkActionables: function(type, index, event, advanceWith, activeContent){
    "use strict";

    var slide = this, completedScan = slide.completedScan || 0, overallScanIndex,
        allowedUnsuccesful, unsuccesfulAttempts, i, innerIndex, element,
        //scanPattern = [ 0, 3, 0, 1, 0, 4, 0, 2, 0, 5],
        scanPattern = slide.options.scanningPatternArray, patternId,
        highlightInstrument = [ "attitude", "altimeter", "heading", "airspeed", "variometer", "turn_coordinator"];

//  $(this).trigger("click");

/*
    $(this).on("checkScanningPattern", function(e, evt){
    });
*/
    // new check to see if we've already moved past this advanceWith index
    console.log("new actionable index: ");
    console.log(activeContent);
    console.log("vs contentActive");
    console.log(slide.contentActiveIndex);
    if(activeContent >= slide.contentActiveIndex){
      console.log("type inside checkActionabels: " + type);

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

      for(i=0; i<slide.patternMap.length; i++){
        if(slide.mediaActiveIndex === slide.patternMap[i].media){
          patternId = slide.patternMap[i].id;
        }
      }

      // check the logic
      if(type && index===undefined && advanceWith.action===undefined){
        if( _.contains(advanceWith.type, type) )
          $(slide).trigger("correctAdvance", advanceWith);
        else
          $(slide).trigger("wrongAdvance", advanceWith);

      } else if(_.contains(advanceWith.type, type) && index !== undefined && advanceWith.action === undefined ){
        if(type === 'quiz'){
          $(slide).trigger("correctAdvance", advanceWith);
        } else if( _.contains(advanceWith.index, index) ){

          $(slide).trigger("completedQuiz", { "type": "action", patternId: patternId, actionId: true} );
          $(slide).trigger("correctAdvance", advanceWith);
        } else {
          $(slide).trigger("completedQuiz", { "type": "action", patternId: patternId, actionId: false} );
          $(slide).trigger("wrongAdvance", advanceWith);
        }

      } else if(type === 'csv' && slide.completedScan >= slide.options.minScan){
        $(slide).trigger("correctAdvance", advanceWith);
      } else if(type === 'csv') {
        $(slide).trigger("wrongAdvance", advanceWith);

      } else if( (type === 'highlight' || type === 'quiz' ) && typeof index !== undefined && advanceWith.action === 'pattern'){
        //TODO: put into separate function?
        //slide.checkScanningPattern();

        slide.setStatus("Succesful completed scans: " + completedScan + " Unsuccesful attempts: " + unsuccesfulAttempts + " out of " + allowedUnsuccesful + " allowed");      
        
        if(type === 'quiz'){
          // all good, let's wait for next input...
        } else if( scanPattern[overallScanIndex+1] === index){
          $(slide).trigger("completedQuiz", { "type": "action", patternId: patternId, actionId: true} );
          if(element !== undefined){
            //$(element).pulse('destroy');

            if($().pulse){
              $(element).pulse(slide.options.pulseCorrectProp, slide.options.pulseInstrumentSettings);
            }

            if(advanceWith.content && slide.slideContent[slide.contentActiveIndex+innerIndex+1] &&
                slide.slideContent[slide.contentActiveIndex+innerIndex+1].media.index === index){
              
              console.log("index expected: " + slide.slideContent[slide.contentActiveIndex+innerIndex].media.index);
              console.log("index provided: " + index);
              console.log("inner index: " + innerIndex);
              innerIndex++;
              slide.buildContent(true, (slide.contentActiveIndex + innerIndex), this.mediaActiveIndex, false, null, false, advanceWith.action );
              //this.buildContent(true, this.contentActiveIndex, this.mediaActiveIndex, false, null, true);

            } else if (advanceWith.content && slide.slideContent[slide.contentActiveIndex+innerIndex+1] && 
                slide.slideContent[slide.contentActiveIndex+innerIndex+1].media.type !== 'highlight'){

              console.log("finished a scans content....");
              // reset active index to the content after pattern content
              slide.contentActiveIndex = slide.contentActiveIndex + innerIndex;

            }
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
            
            if(completedScan >= slide.options.minScan && slide.panelEnd){
              $(slide).trigger("correctAdvance", advanceWith);
            }
          }
        } else {
          $(slide).trigger("completedQuiz", { "type": "action", patternId: patternId, actionId: true} );
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
      } else {
        $(slide).trigger("wrongAdvance", advanceWith);
      }

      slide.patternInnerIndex = innerIndex;
      slide.allowedUnsuccesful = allowedUnsuccesful;
      slide.unsuccesfulAttempts = unsuccesfulAttempts;
      slide.overallScanIndex = overallScanIndex;
      slide.completedScan = completedScan;

    }

  },

};
console.log("testing this class execution");
