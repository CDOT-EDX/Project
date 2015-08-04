# Aviation Project

This branch is for combining front-end libraries and features used in the edX/Aviation project at CDOT

## References to works used in this project and
### JavaScript and jQuery libraries required by this library:

    SlickQuiz: https://github.com/pkuzhel/SlickQuiz
        Original library: https://github.com/jewlofthelotus/SlickQuiz
    TimerJS: https://github.com/pkuzhel/timer.js
        Original library: https://github.com/husa/timer.js
    PopcornJS: http://cdn.popcornjs.org/code/dist/popcorn.min.js || https://github.com/mozilla/popcorn-js
    jQuery Flight Indicators: https://github.com/uw-ray/Skyhawk-Flight-Instruments
        Continued from: https://github.com/echanna/jQuery-Flight-Indicators/tree/cdot_with_turn_coordinator
            Original: https://github.com/sebmatton/jQuery-Flight-Indicators
    JS CSV Parser (PapaParse): http://papaparse.com/
    Resize Detection (CSS Element Queries): https://github.com/marcj/css-element-queries
	jQuery Pulse Animation Plugin: https://github.com/jsoverson/jquery.pulse.js


## Slide Creation Library for the internal use of the edX team at CDOT

In order to have this version of the createSlide library working you will need the following files:
    CDOT-EDX/Project/library/createSlide.js
    CDOT-EDX/Project/library/statis/js/*
    CDOT-EDX/Project/library/statis/css/*

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
    enableSlider:       false,
    enablePanel:        false, // should it be panel or dashboard or each instrument separately?
    readOnlySlider:     true,
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
    advanceWith:        "audio", // other options -> "highlight", "timer", "button", "instruments"
    panelOptions: { // options passed on to flightInstruments library
        size : 200,             // Sets the size in pixels of the indicator (square)
        showBox : true,         // Sets the visibility of the box behind the instruments
        showScrews: true,       // Sets the visibility of the four screws around the instruments
        airspeed: 0,            // Air speed in knots for an air speed indicator
        roll : 0,               // Roll angle in degrees for an attitude indicator
        pitch : 0,              // Pitch angle in degrees for an attitude indicator
        off_flag: false         // Off flag for an attitude indicator
        altitude: 0,            // Altitude in feets for an altimeter indicator
        pressure: 30,           // Pressure in inHg for an altimeter indicator
        turn: 0,                // Turn direction for turn coordinator
        slip: 0,                // Slip ball position for turn coordinator (0 to 1; 0.5 is middle)
        heading: 0,             // Heading angle in degrees for an heading indicator
        beaconone: 0,           // Angle of first beacon on the heading indicator
        beacononeshow: true,    // Sets the visibility of the first beacon on the heading indicator
        beacontwo: 0,           // Angle of second beacon on heading indicator
        beacontwoshow: true,    // Sets the visibility of the second beacon on the heading indicator
        vario: 0,               // Variometer in 1000 feets/min for the variometer indicator
        img_directory : 'img/'  // The directory where the images are saved to
    },
    quizzes: [{json: // options passed on to the slickQuiz library
      {
        "info": {
          "name":    "Answer the following questions to the best of your ability.",
          "main":    "",
          "results": "",
          "level1":  "",
          "level2":  "",
          "level3":  "",
          "level4":  "",
          "level5":  "" // no comma here
        },
        "questions": [
          { // Question 1 - Multiple Choice, Single True Answer
            "q": "Now speak the correct clearance: >>AS12, I read back",
            "a": [
              {"option": "Climb on runway heading to 3000 ft, turning right onto 125 degrees", "correct": "", "reason": ""},
              {"option": "Climb on 135 degrees to 1500 ft, then climb to 3000 ft", "correct": "",  "reason": ""},
              {"option": "Climb on runway heading to 1500 ft, turning right onto 125 degrees", "correct": "",  "reason": ""},
              {"option": "Climb on runway heading to 1500 ft, turning right onto 135 degrees. Continue climb to 3000 feet to complete the correct read back.",  "correct": "",  "reason": ""} // no comma here
            ],
            "correct": "<p><span>Control, correct, AS12 is clear to take-off</span></p>",
            "incorrect": "<p><span>That's not correct.  Ask for the clearance to be repeated.</span></p>" // no comma here
          }

        ],
        
      },
      "animationCallbacks": {
        "checkAnswer": function(){
          console.log("do something");
          $(anySlide).trigger("completedQuiz");
        }
      }
    }],
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
        top : "5%",
        left : "36.2%",
        width : "26%",
        height: "41%",
        border : "7px ridge yellow",
      }, 
      alt: { // #2
        orderNumber: 1,
        top : "5%",
        left : "62%",
        width : "26%",
        height: "41%",
        border : "7px ridge yellow",                            
      },
      hi: { // #3
        orderNumber: 2,
        top : "50%",
        left : "36.2%",
        width : "26%",
        height: "41%",
        border : "7px ridge yellow",                            
      },
      asi: { // #4
        orderNumber: 3,
        top : "5%",
        left : "10.5%",
        width : "26%",
        height: "41%",
        border : "7px ridge yellow",                            
      },
      vsi: { // #5
        orderNumber: 4,
        top: "50%",
        left: "62%",
        width: "26%",
        height: "41%",
        border : "7px ridge yellow",
      },
      tc: { // #6
        orderNumber: 5,
        top : "50%",
        left : "10.5%",
        width : "26%",
        height: "41%",
        border : "7px ridge yellow",                            
      },
    },
    // This is for default buttons that we will be reusing over and over (if any)
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
    slideContent: [{
        title: {html: "No content provided", classes: ["col-md-12"] }, 
        content: {html: "<p<Check your <b>slideContent</b> object</p>", classes: ["text-center"] },
        image: {src: "/someSource/image.png", classes: ["imageClass"] },
        highlights: [ 
                        0 , 
                        { index: 2, onclick: function(){ console.log("highlight onclick");} }, 
                        5 
        ],
        // this is to hide / show buttons just like we do with highlights
        buttons: [
                    0 , 
                    { index: 2, onclick: function(){ console.log("button onclick");} }, 
                    3 
        ],
        // set slider to any throttle possition from 0-4
        slider: 2,
        audio: 0,
        second: 10,
        callback: function(){ console.log("this is a callback function"); }
    },
    {
        //... another slide content can go here to be triggered at a different time of the audio
        title: {html: "This is a different title / slide"},
        slider: 3,
        audio: 1
    }],
    // default models that we want to be set-up in the background
    modals: [{ 
              id: "ai", 
              title: "Attitude Indicator", 
              content: {html: "This is the MODAL custom HTML" },
            }, 
            {
              id: "alt", 
              title: "Altimeter", 
            }
    ],
    // these audioFiles are for the slide only
    mediaFiles: [ 
        {type: "audio", src: "someURL/toAudioFile"},
        {type: "audio", src: "anotherURL/toOtherFile"},
        {type: "csv", src: "someURL/flightData"},
    ]

The rest of this README is being edited at this moment
**More options and capabilities are being added all the time**
**Everything below is just notes of the developer for the developer**

    // these audio files are extras (audios for quizzes and interactions)
    extraAudioFiles: [
        "someURL/toAudioFile",
        "anotherURL/toOtherFile"
    ],
    // these audio files are for modals
    <!-- 
        modalAudioFiles: [
        "someURL/toAudioFile",
        "anotherURL/toOtherFile"
        ],
     -->  

## Syntax and actions available for content
    content - can include any custom html if needed
        html (string/html)
        classes (string array)
        action (string) - available actions: remove, replace, append **replace is default**


## Global Events available for triggering

    play(playWhat, whichIndex)
        - with no parameters passed, will start playing slide audios (and stop all other audios)
        - with "modal" passed, will start playing the modal audio
        - with "extra" passed, will start playing the extra audio within slides

    next

    previous

    pause

    stop

    replay


## Global States available for checking

    started
    playing
    ended
    paused
    //replayed?
    //stopped?

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