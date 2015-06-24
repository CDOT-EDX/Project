# Aviation Project

This branch is for combining front-end libraries and features used in the edX/Aviation project at CDOT

## Slide Creation Library for the internal use of the edX team at CDOT

createSlide now supports one options object being passed on versus multiples...

therefore use: `var anySlide = new AVIATION.Slide( options )`

Acceptable options and defaults are as follows:

    development         false, // if running inside a devstack set to true
    showAvatars:        false,
    showSlideControls:  true,
    showStatus:         true,
    showControls:       true,
    showBorder:         true, // this applies to the border around the content
    autoplay:           true, // proceeds to the next AUDIO automatically after current is finished
    autoRedirect:       false, // proceeds to the next SLIDE automatically after current is finished
    noAudio:            false,
    enableModals:       false,
    enableHighlights:   false,
    hiddenHighlights:   false,
    enableButtons:      true,
    hiddenButtons:      false, // am I using this yet?
    container:          "#slideContainer",
    statusId:           "#statusBar",
    headerId:           "#header",
    footerId:           "#footer",
    bodyId:             "#body",
    headerId:           "#slideHeader",
    footerId:           "#slideFooter",
    quizId:             "#slideQuiz",
    continueId:         "", // string specifying the next id to redirect to
    backId:             "", // string specifying the previous id to redirect to
    advanceWith:        "audio", // other options -> "highlight", "timer", "button"
    avatars: 
    {
      tom: {
        open: "//online.cdot.senecacollege.ca:25080/aviation/img/tomOpen.png",
        close: "//online.cdot.senecacollege.ca:25080/aviation/img/tomClose.png"
      },
      jane: {
        open: "//online.cdot.senecacollege.ca:25080/aviation/img/janeOpen.png",
        close: "//online.cdot.senecacollege.ca:25080/aviation/img/janeClose.png"
      }
    },
    highlights: {
      ai: { // #1
        orderNumber: 0,
        // image: "//online.cdot.senecacollege.ca/c4x/Seneca_College/M01S01_Test/asset/attitudeIndicator_wBg.png",
        // modalAudio: ["//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_ClickHighlights_Tom.mp3"],
        content: {},
        top : "5%",
        left : "36.2%",
        width : "26%",
        height: "41%",
        border : "7px ridge yellow",
      }, 
      alt: { // #2
        orderNumber: 1,
        // image: "//online.cdot.senecacollege.ca/c4x/Seneca_College/M01S01_Test/asset/altimeter_wBg.png",
        // modalAudio: ["//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_ClickHighlights_Jane.mp3"],
        top : "5%",
        left : "62%",
        width : "26%",
        height: "41%",
        border : "7px ridge yellow",                            
      },
      hi: { // #3
        orderNumber: 2,
        // image: "//online.cdot.senecacollege.ca/c4x/Seneca_College/M01S01_Test/asset/headingIndicator_wBg.png",
        // modalAudio: ["//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_ClickHighlights_Tom.mp3"],
        top : "50%",
        left : "36.2%",
        width : "26%",
        height: "41%",
        border : "7px ridge yellow",                            
      },
      asi: { // #4
        orderNumber: 3,
        // image: "//online.cdot.senecacollege.ca/c4x/Seneca_College/M01S01_Test/asset/airspeedIndicator_wBg.png",
        // modalAudio: ["//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_ClickHighlights_Jane.mp3"],
        top : "5%",
        left : "10.5%",
        width : "26%",
        height: "41%",
        border : "7px ridge yellow",                            
      },
      vsi: { // #5
        orderNumber: 4,
        //image: "//online.cdot.senecacollege.ca/c4x/Seneca_College/M01S01_Test/asset/verticalSpeedIndicator_wBg.png",
        //modalAudio: ["//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_ClickHighlights_Tom.mp3"],
        top: "50%",
        left: "62%",
        width: "26%",
        height: "41%",
        border : "7px ridge yellow",
      },
      tc: { // #6
        orderNumber: 5,
        //image: "//online.cdot.senecacollege.ca/c4x/Seneca_College/M01S01_Test/asset/turnCoordinator_wBg.png",
        //modalAudio: ["//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_ClickHighlights_Jane.mp3"],
        top : "50%",
        left : "10.5%",
        width : "26%",
        height: "41%",
        border : "7px ridge yellow",                            
      },
    },
    buttons: {
        someId: {
            title: 'I am a button',
            classes: ["btn", "btn-default"],
            action: function(){ console.log("button of someId is executing"); }
        },
        anotherId: {
            title: 'another button',
            action: function(){}
        }
    },
    slideContent: {
        title: {html: "No content provided", classes: "col-md-12" }, 
        content: {html: "Check your slideContent object", classes: "text-center" },
        image: {src: "/someSource/image.png", classes: "imageClass"},
        highlights: [ 
                        0 , 
                        { index: 2, onclick: function(){ console.log("highlight onclick");} }, 
                        5 
        ],
        buttons: [
                    0 , 
                    { index: 2, onclick: function(){ console.log("highlight onclick");} }, 
                    3 
        ],
        audio: 0,
        second: 10,
        callback: function(){ console.log("this is a callback function"); }
    },
    audioFiles: [
        "someURL/toAudioFile",
        "anotherURL/toOtherFile"
    ]
  

## Global Events available for binding and triggering

    play
    pause
    stop
    next
    previous
    replay


## Global States available for checking

    started
    playing
    ended
    paused
    //replayed?
    //stopped?


## JavaScript and jQuery libraries required by this library

    SlickQuiz: https://github.com/pkuzhel/SlickQuiz
    TimerJS: https://github.com/pkuzhel/timer.js
    PopcornJS: http://cdn.popcornjs.org/code/dist/popcorn.min.js || https://github.com/mozilla/popcorn-js
    jQuery Flight Indicators: https://github.com/echanna/jQuery-Flight-Indicators/tree/cdot_with_turn_coordinator
    JS CSV Parser (PapaParse): http://papaparse.com/


The rest of this README is being edited at this moment
**More options and capabilities are being added all the time**
**Everything below is just notes of the developer for the developer**

    Slide class methods:
        
        new Slide(options, slideContent, audioFiles)
        create( options )
        destroy()
        constructor()
        _initSimple()
        buildHeader( parent, content, callback, clearTitle)
        buildSlide()
        buildAvatars(parent, avatar, callback)
        buildContent( correctAudio, index, outerIndex, clearContent )
        buildSlideControls()
        insertLineBreak(parent)
        buildSlideAudios(modalAudios, parent, modalIndex)
        buildStatusBar()
        buildFooter()
        buildCourseControls()
        buildHighlights(index, modalHighlight)
        buildModals()
        activateTimer()
        resetTimer()
        playCurrent()
        pauseCurrent()
        playPrevious()
        playNext()
        replayAll()
        replayCurrent()
        buttonOnClickEvents()
        initButtonEvents()
        initAudioEvents()
        checkSlideControlButtons()
        activateTimer( seconds, isAuto )
        initCourseButtonEvents()
        initAudioEvents()
        checkSlideControlPlayButtons( action );
        setStatus ( action ) - set status bar depending on action: play, pause, or display the actual "action"
        activateSlide()
        resetSlide()
        redirectToPage( pageId ) - use instead of "jump_to_id"

    Slide class properties:

        type
            (string) - simple/highlights)
        options
            development (if running inside a devstack, set to true)
            autoplay (boolean)
            showAvatars (boolean)
            showSlideControls (boolean)
            showStatus (boolean)
            showControls (boolean)
            showBorder (boolean)
            continueId (string)
            backId (string)
            noAudio (boolean)
            enableHighlights (boolean)
            hiddenHighlights (boolean)
            enableModals (boolean)
        activeIndex
            (integer which keeps track of the active audio of the slide)
        slideContent (object array)
            avatar (object array)
                type (string) - available avatars: [open, close, ...]
                position - left / right / hide
                character - Tom / Jane
            title - can include any custom html if needed
                html (string/html)
                classes (string array)
                action (string) - available actions: remove 
                ** if a title is sent in without an action, the default action will be **replace**
            content - can include any custom html if needed
                html (string/html)
                classes (string array)
                action (string) - available actions: remove, replace, append **replace is default**

            //classes (string)
            image 
                classes (string array)
                src (string)
            second (integer)
            audio (integer starting at index 0)
            callback (custom function to call at end of audio or on specified second)
            highlights (integer array specifying the index/indices of highlight(s) to show, 
                        OR object/integer array)
                index - highlight index that this applies to
                onclick - function to execute on "click" event
                *** or simply specify the index without any properties if there is no need for
                *** onclick event. if a modal is present the onclick is mapped automatically
            ...
        audioFiles
            (string array)
        slideAudios
            (Popcorn obj array / html audio element array)
        slideHasListened
            (bool array)
        modalData (Modal obj array)
            modalAudios (Popcorn obj array)
            modalHasListened (bool array)
        slideElements
            content
                title ("#slideTitle")
                innerContent ("#slideInner")
                ...
            slideControls
                previous
                play
                pause
                replay
                next
            courseControls
                back
                continue
            statusBar
            highlightElements (jquery object array)
        _timer // keeps track of the autoplay (no need to configure this variable)
        slideTimer // keeps track of available time for student to complete a task
        avatars (key : value pairs of string) // detailed description in defaults
            /************************************************
            modalHighlights (highlights objs 2D array)
                top
                left
                width
                height
                border
                audio
                second
                callback
                highlights (modal obj array)
                id
                name
                image
                modalAudio
                top
                left
                width
                height
                border
                audio
                second
                onclick
                //callback
            modalButtons
                callback (action)
                title
                relatedHighlight / or related instrument if we only working with instruments
                // back to instrument
            highlights
                id
                orderNumber
                //name
                top
                left
                width
                height
                border
            modals
                id
                name


            **********************************/
    Default values:

          showAvatars: false
          showSlideControls: true
          showStatus: true
          showControls: true
          showBorder: true
          autoplay: true
          avatars: {
              tom: {
                  open: "tomOpen.png",
                  close: "tompClose.png"
              },
              jane: {
                  open: "janeOpen.png",
                  close: "janeClose.png"
              }
          }
          noAudio: false
          highlights: [

          ]


    In order to initialize a slide, the following syntax can be used:

        var anySlide = new AVIATION.common.Slide();
        // this uses all of the defaults and should be used for testing purposes only
        // defaults are given below


    or

        <!-- SLIDE HTML TEMPLATE FOR TWO AVATAR -->
        <script src="/static/popcorn-complete.min.js"></script>
        <script src="/static/mobile-detect.min.js"></script>
        <script src="/static/createSlide.js"></script>
        <link rel="stylesheet" type="text/css" href="/static/custom.css">

        <!-- START SLIDE HTML -->
        <div id="slideContainer" class="cdot_bg container-fluid">
        </div>

        <script>
    	$( document ).ready(function() {
              var anySlide = new AVIATION.common.Slide({
                     showAvatars: true,
                     showSlideControls: true,
                     showStatus: true,
                     showControls: true,
                     development: true,
                   },
                   [{
                     avatar: 
                     [{
                       type: "close",
                       position: "left",
                       character: "jane",
                     },
                     {
                       type: "open",
                       position: "right",
                       character: "tom"
                     }],
                     title: { html: "This is the first title that appears" },
                     content: { html: "This is the html inside the slide <b>that can be used</b>" },
                     audio: 0, // reference to which audio it should be init with
                     second: 1, // which second of the audio should trigger this to appear,
                     callback: function(){ console.log("callback executed for first one!"); return 0;}// a piece of custom code that you want to execute possibly
                     // we can use this for animating the svgs or any other actions that require code
                     // it will be executed on that second of that audio
                   },
                   {
                     title: { html: "This title is at the beginning of second audio"},
                     content: { html: "This is also the content for the beginning" },
                     // notice that we have no content... will it be erased?
                     audio: 1,
                     // notice no seconds.. should change content at beginning of audio
                     // and run callback at end
                     callback: function(){ console.log("this callback is at the end of 2nd audio");}
                   },
                   {
                     title: {html: "This title is beginning of third audio"},
                     audio: 2
                   },
                   {
                     content: { html: "Add this content to that title in 2nd second"},
                     audio: 2,
                     second: 2
                   },
                   {
                     content: {html: "And change to this content on the 5th second"},
                     audio: 2,
                     second: 5
                   },
                   {
                     content: {html: "And add this content on the 10th second", action: "append" },
                     audio: 2,
                     second: 10,
                     image: { src: "//online.cdot.senecacollege.ca:25080/aviation/img/tomOpen.png"}
                   }],
                   [ 
                     "//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide2_Tom.mp3",
                     "//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide2_Tom.mp3",
                     "//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide2_Tom.mp3" // no extension necessary
                                   // all of the possible extensions will be created automatically
                   ]);
          
          	console.log("trying to create new slide");
          	console.log(anySlide);
          	anySlide.constructor();
            });
        </script>


    Example with highlights:

        $( document ).ready(function() {
          var anySlide = new AVIATION.common.Slide({
                     showAvatars: false,
                     showSlideControls: true,
                     showStatus: true,
                     showControls: true,
                     development: true,
                     enableHighlights: true,
                     hiddenHighlights: false,
                   },
                   [{
                     title: { html: "This slide has highlights (hopefully)" },
                     image: { src: "/static/cessna_dashboardAll.png" },
                     highlights: [0,1,{ index: 2, onclick: function(){ console.log("highlight onclick");} },{ index: 5, onclick: function(){ console.log("highlight callback");}}],
                     audio: 0,
                     callback: function(){ console.log("callback executed for first one!"); return 0;}
                   },
                   {
                     title: { html: "This slide has less highlights" },
                     image: { src: "/static/cessna_dashboardAll.png" },
                     highlights: [0,{ index: 2, onclick: function(){ console.log("highlight onclick");} },5],
                     audio: 0,
                     second: 10,
                     callback: function(){ console.log("callback executed for first one!"); return 0;}
                   }],
                   ["//online.cdot.senecacollege.ca:25080/aviation/audios/PlaceHolderTomLong.mp3"]);
          
          	console.log("trying to create new slide");
          	console.log(anySlide);
          	anySlide.constructor();
        });