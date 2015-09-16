** last updated at 17:10 on Sept 16/2015
** advanceWith with explanations added along with mediaIndex + contentIndex
** I am separating control over media and content. There was a flaw in my logic.
** will update this note when finished

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

In order to have this version of the createSlide library working you will need the following files: (these files should be already organized inside Project/aviation/)

    CDOT-EDX/Project/library/static/js/content/createSlide.js
    CDOT-EDX/Project/library/statis/js/*
    CDOT-EDX/Project/library/statis/css/*

createSlide now supports one options object being passed versus multiples...

therefore use: `var anySlide = new AVIATION.Slide( options )` (if ComplexHTML xblock isn't being used)

**NOTE: The example below doesn't use a properly formatted JSON, make sure to use proper JSON
**This can be validated easily using a tool such as: http://jsonlint.com/

Acceptable options and defaults are as follows:

    serverBaseUrl:      window.location.protocol + "//" + window.location.host + "/",
    apacheServerBaseUrl:window.location.protocol + "//" + window.location.host + ":25080/",
    parentSlide:        {},
    development         false, // if running inside a devstack set to true
    showAvatars:        false,
    showSlideControls:  true,
    showStatus:         true,
    showControls:       true,
    showBorder:         true, // this applies to the border around the content
    autoplay:           true, // proceeds to the next AUDIO automatically after current is finished
    autoRedirect:       false, // proceeds to the next SLIDE automatically after current is finished
    noAudio:            false, // in case the slide doesn't have any audio content to control the content creation
    noCSV:              false, // indicates that the instrument panel should build even if a csv file isn't specified in media object
    enableModals:       false,
    enableHighlights:   false,
    hiddenHighlights:   false,
    enableButtons:      true,
    enableSlider:       false,
    enablePanel:        false, // enable full panel unless "panelType" option is set
    panelType:          { "attitude": "attitude" }, // object that lists 1 or more instruments to display (if not set, full panel)
    readOnlySlider:     true,
    container:          "#slideContainer", // where should we look for the slideContainer?
    statusId:           "#statusBar", // whats the id that we should create for statusBar?
    headerId:           "#header",
    footerId:           "#footer",
    bodyId:             "#body",
    headerId:           "#slideHeader",
    footerId:           "#slideFooter",
    quizId:             "#slideQuiz",   // id of div that contains all quizzes
    quizContainerClass: "cdot_quiz_container", // class thats appended to each individual quiz

    // new optinal+experimental additions below
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
    
    // both options below are used to pull audio/images/csvs from the correct server without running into cross-origin restrictions
    serverBaseUrl: window.location.protocol + "//" + window.location.host + "/", //can be overwritten by a string of the host url
    apacheServerBaseUrl: window.location.protocol + "//" + window.location.host + ":25080/",

    **possibly deprecated and moved inside slideContent:
    **  advanceWith:        "audio", // other options -> "highlight", "timer", "button", "instruments"

    continueId:         "", // string specifying the next id to redirect to
    backId:             "", // string specifying the previous id to redirect to
    
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

    quizzes: [ // options passed on to the slickQuiz library
    // most explanations to these can be found at: https://github.com/jewlofthelotus/SlickQuiz
      {
        json: {
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
      }
    ],
    avatars: 
    {
      tom: {
        ~~open: "//online.cdot.senecacollege.ca:25080/aviation/img/tomOpen.png",~~
        ~~close: "//online.cdot.senecacollege.ca:25080/aviation/img/tomClose.png"~~
        // since server url options have been added, we can give relative locations to resources
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
      {
        id: "asi",
        orderNumber: 0,
        name: "Airspeed Indicator (ASI)",
        height: "50%",
        classes: ["col-xs-4"],
        border : "7px ridge yellow",
      },
      {
        id: "ai",
        orderNumber: 1,
        name: "Attitude Indicator (AI)",
        height: "50%",
        classes: ["col-xs-4"],
        border : "7px ridge yellow",
      }, 
      {
        id: "alt",
        orderNumber: 2,
        name: "Altimeter (ALT)",
        height: "50%",
        classes: ["col-xs-4"],
        border : "7px ridge yellow",                            
      },
      {
        id: "tc",
        orderNumber: 3,
        name: "Turn Coordinator (TC)",
        height: "50%",
        classes: ["col-xs-4"],
        border : "7px ridge yellow",                            
      },
      {
        id: "hi",
        orderNumber: 4,
        name: "Heading Indicator (HI)",
        height: "50%",
        classes: ["col-xs-4"],
        border : "7px ridge yellow",                            
      },
      {
        id: "vsi",
        orderNumber: 5,
        name: "Vertical Speed Indicator (VSI)",
        height: "50%",
        classes: ["col-xs-4"],
        border : "7px ridge yellow",
      },
    ],
    },
    // This is for buttons that we want to use on the slide
    buttons: [
        {
          "id": "btn0",
          "title": 'I am a button',
          "classes": ["btn", "btn-default"],
          "orderNumber": 0,
          "action": function(){ console.log("button of someId is executing"); }
        },
        {
          "id": "btn1",
          title: 'another button',
          "orderNumber": 1
        }
    ],
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
        "media":{
            "type": "audio", // could be csv/button/highlight/quiz
            "index": 0,
            "second" 10
        },
        callback: function(){ console.log("this is a callback function"); },
        "advanceWith": {
            "action": "pattern",
            // for both properties below, anything to do with the contentIndex will only rebuild the content for that
            // index and not replay the media associated with the content
            // BUT, anything to do with mediaIndex, will restart the media and run all of the content associated with that media again
            // "<-"/previous btn and "->"/forward btn on the slides skip mediaIndices NOT contentIndices
            "onSuccess": { ** optional if needed and currently under development
                "status": "Good job, let's move on...",
                // if onSuccess content is not the next slideContent....
                "contentIndex": 3 // optional, which index should we jump to in slideContent OR use mediaIndex instead
                "mediaIndex": 2 // mediaIndex will jump to the beginning of a media at set index and run all the content from that
                "callback": "function(){ console.log('You did smth right'); }" // optional
            },
            "onFail": { ** optional if needed and currently under development
                "index": 2, // which altMediaFile should be played (currently sound only)
                "status": "That's not correct. Let's try this again", // what msg should we display in the status bar?
                "resetContentIndex": 0 // which slideContent index do we need to replay on end of altMedia?
                "resetMediaIndex": 0 // which media index do we need to replay on end of altMedia?
            },
            "content": true // if there is content to that should be triggered during the scanning pattern
        }
    },
    {
        //... another slide content can go here to be triggered at a different time of the audio
        title: {html: "This is a different title / slide"},
        slider: 3,
        "media": {
            "type": "csv",
            "line": 100,
            "index": 2
        }
        "advanceWith": {
            "type": "button", // highlight, audio, csv
            "index": 0,
            "onFail": {
                "index": 0,
                "resetIndex": 1
            }
        }
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
        // since server url options have been added, we can give relative locations to resources omitting the https://online...../
        {type: "audio", src: "someRelativeURL/toAudioFile"},
        {type: "audio", src: "anotherURL/toOtherFile"},
        {type: "csv", src: "someURL/flightData"},
    ],
    altMediaFiles: [ // media files that will be used in alternative content (in case a student answered a question wrong)
        {type: "audio", src: "someURL/toAudioFile"},
        {type: "audio", src: "anotherURL/toOtherFile"},
    ]

The rest of this README is being edited at this moment
**More options and capabilities are being added all the time**
**Everything below is just notes of the developer for the developer**

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