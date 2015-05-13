var AVIATION = AVIATION || {};

//AVIATION.common


// begin a javascript class "Slide"
AVIATION.common = {
Slide : function( options ){
	this["type"] = options["type"] || "simple"; // check which options are given and then assign a default
												                      // type maybe in constructor?
	this["options"] = options["options"];
	this.avatars = options.avatars;
},
Slide.prototype = {

  constructor: function(){
  	// check type of slide and run the proper initFunc
    if (type === "simple"){
      this._initSimple( this["options"] );
    } else {
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
      showAvatars: false,
      showSlideControls: true,
      showStatus: true,
      showControls: true,
    };

    for (option in defaults){
      // if this key doesn't exist, init to default
      if(!options[option]){
        options[option] = defaults[option]
      }
    }

    console.log("run simple");
    console.log(options);    

  },
  
  _initHighlights: function( options, instruments, highlights, buttons, ){
  var md = new MobileDetect(window.navigator.userAgent), isMobile, hasListened = [], reset, players=[], btnAudioPlaying = false,
      hasClosed = [], buttonEnabled = [], active , manualCancelTimer, manualCancel, cancellingRedirect, invokerAction, defaults={},
      pause, play, replay, previous, next, btnC, btnB, cancelRedirect, modalDefaultMessage, defaultMessage, resetImage,
      playStatus, pauseStatus, backId, continueId, highlightsDisable, closeModalButton, closeModal, modalNote, ensureNoDblClick,
      noModal, reverseAudio, statusClickMessage, hideInvokerBorder, redirectId, showTitles, attempts = 0, snap3slide2special;

  defaults = {
    pause: $("#btnPause"),
    play: $("#btnPlay"),
    replay: $("#btnR"),
    previous: $("#btnP"),
    next: $("#btnN"),
    btnC: $("#btnC"),
    btnB: $("#btnB"),
    cancelRedirect: $("#cancelRedirect"),
    modalDefaultMessage: "Select a highlight/button",
    defaultMessage: "Select the highlighted instrument to continue",
    playStatus: "Playing...",
    pauseStatus: "Paused",
    backId: "aa53d0cd988547e084d69d59f4dbe7a3", 
    continueId: "a01099b4746644e6b4bfcebeea88ab22",
    continueTime: 10, // time until automatically continues
    highlightsDisable: false,
    closeModalButton: "Back to Panel",
    allowEasyClose: false,
    modalNote: "* all highlights and videos must be explored before this panel can be closed",
    altModalMessage: "Continue when ready",
    noModal: false,
    reverseAudio: false,
    statusClickMessage: "Click on the ",
    hideInvokerBorder: false,
    redirectId: "1862e788b22443758a96795e226d34e9",
    showTitles: false,
    snap3slide2special: false,
    ensureNoDblClick: false,
    resetImage: false,
  }

  // set the default options for keys that do not exist inside the object
  for (option in defaults){
    // if this key doesn't exist, init to default
    if(!options[option]){
      options[option] = defaults[option]
    }
  }


  if (!instruments){
    instruments = 
      [
        { // #1
          id: "ai",
          orderNumber: 0,
          name: "Attitude Indicator (AI)",
          image: "//online.cdot.senecacollege.ca/c4x/Seneca_College/M01S01_Test/asset/attitudeIndicator_wBg.png",
          audio: [ "//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide2_Tom.mp3" ],
          modalAudio: ["//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_ClickHighlights_Tom.mp3"],
          top : "5%",
          left : "36.2%",
          width : "26%",
          height: "41%",
          border : "7px ridge yellow",
        }, 
        { // #2
          id: "alt",
          orderNumber: 1,
          name: "Altimeter (ALT)",
          image: "//online.cdot.senecacollege.ca/c4x/Seneca_College/M01S01_Test/asset/altimeter_wBg.png",
          audio: [ "//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide4_Jane.mp3" ],
          modalAudio: ["//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_ClickHighlights_Jane.mp3"],
          top : "5%",
          left : "62%",
          width : "26%",
          height: "41%",
          border : "7px ridge yellow",                            
        },
        { // #3
          id: "hi",
          orderNumber: 2,
          name: "Heading Indicator (HI)",
          image: "//online.cdot.senecacollege.ca/c4x/Seneca_College/M01S01_Test/asset/headingIndicator_wBg.png",
          audio: [ "//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide7_Tom.mp3" ],
          modalAudio: ["//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_ClickHighlights_Tom.mp3"],
          top : "50%",
          left : "36.2%",
          width : "26%",
          height: "41%",
          border : "7px ridge yellow",                            
        },
        { // #4
          id: "asi",
          orderNumber: 3,
          name: "Airspeed Indicator (ASI)",
          image: "//online.cdot.senecacollege.ca/c4x/Seneca_College/M01S01_Test/asset/airspeedIndicator_wBg.png",
          audio: [ "//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide9_Jane.mp3" ],
          modalAudio: ["//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_ClickHighlights_Jane.mp3"],
          top : "5%",
          left : "10.5%",
          width : "26%",
          height: "41%",
          border : "7px ridge yellow",                            
        },
        { // #5
          id: "vsi",
          orderNumber: 4,
          name: "Vertical Speed Indicator (VSI)",
          image: "//online.cdot.senecacollege.ca/c4x/Seneca_College/M01S01_Test/asset/verticalSpeedIndicator_wBg.png",
          audio: [ "//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide11_Tom.mp3" ],
          modalAudio: ["//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_ClickHighlights_Tom.mp3"],
          top: "50%",
          left: "62%",
          width: "26%",
          height: "41%",
          border : "7px ridge yellow",
        },
        { // #6
          id: "tc",
          orderNumber: 5,
          name: "Turn Coordinator (TC)",
          image: "//online.cdot.senecacollege.ca/c4x/Seneca_College/M01S01_Test/asset/turnCoordinator_wBg.png",
          audio: [ "//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide14_Jane.mp3" ],
          modalAudio: ["//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_ClickHighlights_Jane.mp3"],
          top : "50%",
          left : "10.5%",
          width : "26%",
          height: "41%",
          border : "7px ridge yellow",                            
        },
      ]
  }

  if (!highlights && !highlightsDisable){
    highlights = 
      [
        [ // highlight for the first instrument (attitude indicator)
          { // minituare airplane, box in the center
            top : "35%",
            left : "24%",
            width : "52%",
            height: "20%",
            border : "4px ridge yellow",
            audio: [ "//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide3a_Tom.mp3" ]
          }, 
          
          { // angle of bank (small triangle at the top)
            top : "17%",
            left : "34%",
            width : "32%",
            height: "13%",
            border : "4px ridge yellow",
            audio: [ "//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide3c_Tom.mp3" ]
          }, 
          
          { // notches to indicate bank angle degree
            top : "11%",
            left : "21%",
            width : "58%",
            height: "12%",
            border : "4px ridge yellow",
            audio: [ "//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide3d_Tom.mp3" ]
          },

          { // horizontal line, long line in the middle
            top : "45%",
            left : "10%",
            width : "80%",
            height: "12%",
            border : "4px ridge yellow",
            audio: [ "//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide3b_Tom.mp3" ]
          } 
        ], // end highlights for first instrument

        [ // highlights for the second instrument (altimeter)
          // scale at the top right of the altimeter
          { top : "9%",
            left : "45%",
            width : "40%",
            height: "25%",
            border : "4px ridge yellow",
            audio: [ "//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide5_Jane.mp3" ]
          },
          // scale at the 3oclock of the altimeter
          { top : "35%",
            left : "72%",
            width : "23%",
            height: "30%",
            border : "4px ridge yellow",
            audio: [ "//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide5a_Jane.mp3" ]
          },
          // small window at the 6oclock of altimeter
          {
            top : "52%",
            left : "30%",
            width : "40%",
            height: "25%",
            border : "7px ridge yellow",
            audio: [ "//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide5b_Jane.mp3" ]
          }
        ], // end highlights for second instrument
        
        [ // start highlights for third instrument (heading indicator)
          // big highlight over the whole instrument
          { 
            top : "8%",
            left : "8%",
            width : "84%",
            height: "84%",
            border : "7px ridge yellow",
            audio: [ "//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide8_Tom.mp3" ]
          }
        ], // end third highlights

        [ // start fourth highlights
          { // middle (ASI scale area) 
            top : "23%",
            left : "34%",
            width : "45%",
            height: "60%",
            border : "7px ridge yellow",
            audio: [ "//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide10_Jane.mp3" ]
          },
          { // bottom left (ASI colour code - YELLOW)
            top : "60%",
            left : "15%",
            width : "18%",
            height: "19%",
            border : "7px ridge yellow",
            audio: [ "//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide10a_Jane.mp3" ]
          },
          { // middle left (ASI never exceed speed - RED)
            top : "50%",
            left : "10%",
            width : "15%",
            height: "9%",
            border : "7px ridge yellow",
            audio: [ "//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide10b_Jane.mp3" ]
          },
          { // middle right (additional markings / arc)
            top : "20%",
            left : "80%",
            width : "12%",
            height: "52%",
            border : "7px ridge yellow",
            audio: [ "//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide10c_Jane.mp3" ]
          }
        ], // end foruth instrument | ASI (airspeed indicator highlights)

        [ // start fifth | VSI (vertical speed indicator)
          { // middle left (rate of climb/descent)
            top : "39%",
            left : "10%",
            width : "13%",
            height: "22%",
            border : "7px ridge yellow",
            audio: [ "//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide12_Tom.mp3" ]
          }
        ], // end fifth

        [ // start sixth | TC (turn coordinator)
          { // middle center (miniature plane)
            top : "38%",
            left : "25%",
            width : "50%",
            height: "17%",
            border : "7px ridge yellow",
            audio: [ "//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide15_Jane.mp3" ]
          },
          { // middle sides (turn hash marks)
            top : "47%",
            left : "15%",
            width : "70%",
            height: "15%",
            border : "7px ridge yellow",
            audio: [ "//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide15a_Jane.mp3" ]
          },
          { // middle bottom (slip ball)
            top : "58%",
            left : "25%",
            width : "50%",
            height: "15%",
            border : "7px ridge yellow",
            audio: [ "//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide15b_Jane.mp3" ]
          }
        ] // end sixth
      ]
  }

  if(!buttons && !noModal){
    buttons = 
      [ // Note: These current default values are for Module1,Snap2,Slide2-15
        [ // first instrument buttons (ai)
          {
            title: "Pitch Up",
            video: "//online.cdot.senecacollege.ca/c4x/Seneca_College/M01S01_Test/asset/AI_PitchUp.mp4",
            relatedHighlight: 3,
          },
          {
            title: "Pitch Down",
            video: "//online.cdot.senecacollege.ca/c4x/Seneca_College/M01S01_Test/asset/AI_PitchDown.mp4",
            relatedHighlight: 3,
          },
          {
            title: "Bank Left",
            video: "//online.cdot.senecacollege.ca/c4x/Seneca_College/M01S01_Test/asset/AI_RollLeft.mp4",
            relatedHighlight: 1,
          },
          {
            title: "Bank Right",
            video: "//online.cdot.senecacollege.ca/c4x/Seneca_College/M01S01_Test/asset/AI_RollRight.mp4",
            relatedHighlight: 1,
          },

          { // reset button 
            title: "Back to Instrument",
            video: "",
          }
        ], // first instrument buttons (ai)
        
        [ // second instrument butons (alt)
          {
            title: "Climb",
            video: "//online.cdot.senecacollege.ca/c4x/Seneca_College/M01S01_Test/asset/ALT_Climb.mp4",
            audio: "//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide6a_Jane.mp3",
          },

          { // reset button 
            title: "Back to Instrument",
            video: "",
          }
        ], // second instrument butons (alt)

        [], // third instrument buttons (hi)

        [ // fourth instrument buttons (asi)
          {
            title: "Accelerate",
            video: "//online.cdot.senecacollege.ca/c4x/Seneca_College/M01S01_Test/asset/ASI_AccelerateVNE.mp4",
            audio: "//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide10d2_Jane.mp3",
          },

          { // reset button 
            title: "Back to Instrument",
            video: "",
          }
        ], // fourth instrument buttons (asi)

        [ // fifth instrument buttons (vsi)
          {
            title: "Climb",
            video: "//online.cdot.senecacollege.ca/c4x/Seneca_College/M01S01_Test/asset/VSI_Climb.mp4",
            audio: "//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide13b_Tom.mp3",
          },
          {
            title: "Descent",
            video: "//online.cdot.senecacollege.ca/c4x/Seneca_College/M01S01_Test/asset/VSI_Descend.mp4",
            audio: "//online.cdot.senecacollege.ca:25080/aviation/audios/M01S02_Slide13c_Tom.mp3",
          },

          { // reset button 
            title: "Back to Instrument",
            video: "",
          }
        ], // fifth instrument buttons (vsi)

        [ // sixth instrument buttons (tc)
          {
            title: "Slip Right",
            video: "//online.cdot.senecacollege.ca/c4x/Seneca_College/M01S01_Test/asset/TC_SlipRight.mp4",
            relatedHighlight: 2,
          },
          {
            title: "Slip Left",
            video: "//online.cdot.senecacollege.ca/c4x/Seneca_College/M01S01_Test/asset/TC_SlipLeft.mp4",
            relatedHighlight: 2,
          },

          { // reset button 
            title: "Back to Instrument",
            video: "",
          }
        ], // sixth instrument buttons (tc)
      ]
  }

  isMobile = md.mobile();

  reset = function(){
    btnC.attr("disabled", true);
    previous.attr("disabled", true);
    next.attr("disabled", true); 
    cancelRedirect.attr("disabled", true);
    cancelRedirect.off();

    replay.hide();
    pause.hide();
    
    active = 0;
    
    $('div.cdot_contentText > .clearClickable').each(function(index, element){
      $(element).hide();
      $(element).attr("disabled", true);
    });
  };


  // function used to initialize all instruments and their popups
  // associated highlights and buttons and their actions / videos / audios
  init = function(){
    var container = $("#modalContainer");

    instruments.forEach(function(element, index){
      // add highlights that will envoke the modal            
      var modalInvoker = jQuery('<div/>', {
          id: element.id + "_highlight",
          href : "#" + element.id,
          role : "button",
          "class" : "clearClickable",
          style: "top:" + element.top + 
                 ";left:" + element.left +
                 ";width:" + element.width +
                 ";height:" + element.height +
                 (hideInvokerBorder ? ";" : (";border:" + element.border) ) + 
                 ";position:absolute"
      }).appendTo('div.cdot_contentText');            

      invokerAction = function(e){
        if (manualCancelTimer){
          manualCancelTimer();  
        }
        if(noModal){
          closeModal();
        }
        if(hideInvokerBorder){
          // check if correct click
          if( this.id  != (instruments[active].id + "_highlight") ){
            e.preventDefault();
            attempts++;

            cancelRedirect.html( "This is not the " + instruments[active].name + ". " + (3-attempts) + "/3 attempts left");

            if (attempts === 3){
              redirectToPage(redirectId);
            }
          }
        }
      };

      modalInvoker.on("click", invokerAction);

      // check each instrument for the audio that is associated with it
      if(element.audio && element.audio.length > 0){
        element.audio.forEach(function( audio, i ){

          jQuery('<audio/>', {
            id: element.id + "_sound_" + index + i,
            html: '<source src="' + element.audio[i] + '" />'
          }).appendTo('div.cdot_contentText');  

          // push onto the players array
          players.push(Popcorn("#" + element.id + "_sound_" + index + i ));
        });
      }


      if(!noModal){
        // create the parent modal div and attach to DOM
        var modal = jQuery('<div/>', {
            id: element.id,
            class : "modal fade",
            "tab-index" : "-1",
            role: "dialog",
            "aria-labelledby" : element.id + "_label",
            "aria-hidden" : true,
            "data-backdrop": "static",
            "data-keyboard": false
        }).appendTo('.content-wrapper');

        if(element.modalAudio){
          element.modalAudio.forEach(function(modalAudio, a){
            var initAudio = jQuery('<audio/>', {
              id: element.id + "_init_audio_" + index ,
              html: '<source src="' + modalAudio + '" />'
            }).appendTo(modal);  
          });
        }

        // create inner modal-header (title) and attach to modal-content
        var modalHeader = jQuery('<div/>', {
            class : "modal-header",
        }).appendTo('#' + element.id); //+ ' > .modal-dialog > .modal-content');

        var xButton = jQuery('<button/>', {
          class : "close",
          type : "button",
          "data-dismiss" : "modal",
          "aria-hidden" : true,
          "disabled" : true,
          html : "x"
        }).appendTo(modalHeader);

        jQuery('<h4/>', {
          class: "modal-title",
          id: element.id + "_label",
          html: element.name
        }).appendTo(modalHeader);

        xButton.on('click', function(e){
          closeModal();
        });

        // create inner modal-header (title) and attach to modal-content
        jQuery('<div/>', {
            class : "modal-body",
        }).appendTo('#' + element.id); //+ ' > .modal-dialog > .modal-content');

        // create inner modal-footer (buttons) and attach to modal-content
        var footer = jQuery('<div/>', {
          class : "modal-footer",
        }).appendTo('#' + element.id); //+ ' > .modal-dialog > .modal-content');
        
        var createdFooterRow = jQuery('<div/>', {
          class : "row",
        }).appendTo(footer); //+ ' > .modal-dialog > .modal-content');

        if(buttons && buttons.length> 0 && buttons[index].length > 0){
          var modalHasWatched = [], videoPlaying = [], enabledButton = [], btnAudio, btnClicked = [], restartAudio;
          // go through all the buttons for an instrument, create and init them
          buttons[index].forEach(function(button, i){
            var createdButton =
              jQuery('<button/>', {
                id: element.id + "_button_" + i,
                class : "btn btn-default col-xs-5",
                href: "#",
                role: "button",
                disabled: "disabled",
                html: button.title
              }).appendTo(createdFooterRow); //+ ' > .modal-dialog > .modal-content');
            
            btnClicked.push(false);

            if (button.audio && button.audio != ''){
              var btnAudio = jQuery('<audio/>', {
                id: element.id + "_btn_audio_" + i,
                html: '<source src="' + button.audio + '" />'
              }).appendTo(createdFooterRow);

              btnAudio = Popcorn("#" + element.id + "_btn_audio_" + i);

              restartAudio = function(){
                btnAudio.pause();
                btnAudio.currentTime(0);
                btnAudioPlaying = false;
                hasCompletedModal();
              }
            }

            if (button.video != '' || button.title != "Back to Instrument"){
              var createdVideo =
                jQuery('<video/>', {
                  id: element.id + "_video_" + index + "_" + i,
                  class: "hide",
                  width: "470px",
                  height: "470px",
                  html: '<source src="' + button.video + '">Your browser doesn\'t support the video tag'
                }).appendTo('#' + element.id + " > .modal-body"); //+ ' > .modal-dialog > .modal-content');
        
              modalHasWatched.push(false);
              videoPlaying.push(false);

              if(highlightsDisable || !button.relatedHighlight){
                createdButton.removeAttr("disabled");
                enabledButton.push(true);
              } else {
                enabledButton.push(false);
              }
              
            }

            createdButton.on("click", function(e){
              // if button comes with a specific highlight that it needs to
              // keep the highlight visible
              // go through all the highlights for the current instrument (index)
              if (button.video != '' || button.title != "Back to Instrument"){
                $("#" + element.id + "_button_" + (buttons[index].length-1) ).attr("disabled", false);

                // check if there are any related highlights for this button
                for (var j=0; !highlightsDisable && j<highlights[index].length; j++){
                  if (j != button.relatedHighlight){
                    // hide the unneccessary highlights
                    $("#" + element.id + "_highlight_" + j).hide();
                  } else {
                    // make sure to show the required highlight
                    $("#" + element.id + "_highlight_" + j).show();
                  }
                }
              // if it is a reset button
              } else {
                // disable the button
                $("#" + element.id + "_button_" + i ).attr("disabled", true);

                // bring back all the highlights
                for (var j=0; !highlightsDisable && j<highlights[index].length; j++){
                  $("#" + element.id + "_highlight_" + j).show();
                }

                if(restartAudio){
                  restartAudio();                  
                }
              }

              for(var p=0; p<videoPlaying.length; p++){
                $("#" + element.id + "_video_" + index + "_" + p)[0].pause();
                $("#" + element.id + "_video_" + index + "_" + p)[0].currentTime = 0;
                videoPlaying[p] = false;
              }

              // go through all the buttons for the current instrument
              for (var v=0; v<buttons[index].length; v++){
                if (v != i){
                  // if not the video related to the current button, HIDE IT!
                  $('#' + element.id + "_video_" + index + "_" + v).hide();
                  $('#' + element.id + "_video_" + index + "_" + v).addClass("hide");
                }
              } // end for

              if (button.video != "" || button.title != "Back to Instrument"){
                // hide the image of the instrument to replace it with the video
                $("#" + element.id + "> .modal-body .img-responsive").hide();

                // show and play the video which corresponds to the current button
                createdVideo.removeClass("hide");
                createdVideo.show();
                createdVideo[0].play();
                videoPlaying[i] = true;
                createdVideo[0].onended = function(){
                  videoPlaying[i] = false;
                }

                if(btnAudio){
                  btnAudio.play();

                  btnAudio.on("playing", function(){
                    btnAudioPlaying = true;
                    if(!btnClicked[i]){
                      $("#" + element.id + "_button_" + (buttons[index].length-1) ).attr("disabled", true);
                    }
                    hasCompletedModal();
                  });

                  btnAudio.on("ended", function(){
                    btnAudioPlaying = false;
                    $("#" + element.id + "_button_" + (buttons[index].length-1) ).attr("disabled", false);
                    btnClicked[i] = true;
                    hasCompletedModal();
                  });
                }
                
                modalHasWatched[i] = true;

                hasCompletedModal();
              } else {
                // show the image of the instrument
                $("#" + element.id + "> .modal-body .img-responsive").show();
                for( var e=0; e<enabledButton.length; e++){
                  if(enabledButton[e]){
                    $("#" + element.id + "_button_" + e).attr("disabled", false);
                  }
                }
                if(videosNotPlaying() && audiosNotPlaying()){
                  highlights[index].forEach(function(highlight, h){
                    $("#" + element.id + "_highlight" + "_" + h).show();
                    $("#" + element.id + "_highlight" + "_" + h).attr("disabled", false);
                    $("#" + element.id + "_highlight" + "_" + h).removeClass("disabled");
                  });
                }
              }
              
            }) // end button on click
              
          }); // end buttons[index].forEach

        } // end if(buttons...)

        // end status bar and button to return to the panel
        jQuery('<div/>', {
          class : "row",
          html: "<br/>"
        }).appendTo('#' + element.id + " > .modal-footer");

        var statusRow = jQuery('<div/>', {
          class : "row",
        }).appendTo('#' + element.id + " > .modal-footer");

        jQuery('<div/>', {
          class : "row",
          html: "<br/>"
        }).appendTo('#' + element.id + " > .modal-footer");

        var footerRow = jQuery('<div/>', {
          class : "row",
        }).appendTo('#' + element.id + " > .modal-footer");

        // add "back" button to return to the instrument panel (exit the modal)
        var modalStatusBar = jQuery('<button/>', {
          class : "btn btn-default pull-left col-xs-offset-2 col-xs-8",
          type : "button",
          "disabled" : true,
          html : modalDefaultMessage
        }).appendTo(statusRow);
        

        if(buttons[index] && buttons[index].length < 1){
          modalStatusBar.text(altModalMessage);
        }

        // add "back" button to return to the instrument panel (exit the modal)
        var backButton = jQuery('<button/>', {
          class : "btn btn-primary col-xs-4 pull-right",
          type : "button",
          "data-dismiss" : "modal",
          "aria-hidden" : true,
          "disabled" : true,
          html : closeModalButton
        }).appendTo(footerRow);

        // check if the button actually should be disabled by 
        // checking if there are any buttons to press in the dialogue
        if(allowEasyClose){
          backButton.removeAttr("disabled");
          xButton.removeAttr("disabled");
          // also add code to activate the 'x' at the top right corner
        }

        jQuery('<p/>', {
          class : "text-muted",
          html : modalNote
        }).appendTo(footerRow);
        
        backButton.on("click", function(e){
          closeModal();
        });
        // end adding back button and status bar

        // create instrument image inside modal-body
        jQuery('<img/>', {
            class : "img-responsive",
            src: element.image
        }).appendTo('#' + element.id + '> .modal-body');


        if (highlights && highlights[index]){

          var modalAudios = [], modalHasListened = [], audioPlaying = [];

          // go through each highlight and insert it into the DOM
          highlights[index].forEach(function(highlight, i){

            // add highlights on top of instruments inside the modal
            var createdHighlight = 
              jQuery('<input/>', {
                id: element.id + "_highlight" + "_" + i,
                class : "clearClickable",
                type: "button",
                style: "top:" + highlight.top + 
                       ";left:" + highlight.left +
                       ";width:" + highlight.width +
                       ";height:" + highlight.height +
                       ";border:" + highlight.border + 
                       ";position:absolute"
              }).appendTo('#' + element.id + '> .modal-body');

            highlight.audio.forEach(function(audio, z){
              var createdAudio = jQuery('<audio/>', {
                  id: element.id + "_audio_" + i + "_" + z,
                  html: '<source src="' + highlight.audio + '" />'
                }).appendTo('#' + element.id + "_highlight_" + i);

              modalAudios.push(Popcorn("#" + element.id + "_audio_" + i + "_" + z));
              modalHasListened.push(false);
              audioPlaying.push(false);
            });
            
            modalAudios[i].on("playing", function(){
              audioPlaying[i] = true;
              highlights[index].forEach(function(highlight, h){
                if(h != i){
                  $("#" + element.id + "_highlight" + "_" + h).hide();
                }
                $("#" + element.id + "_highlight" + "_" + h).attr("disabled", true);
              });
              modalStatusBar.html(playStatus);
            });

            modalAudios[i].on("ended", function(){
              audioPlaying[i] = false;
              modalHasListened[i] = true;

              // if no videos are playing... show all the highlights again
              if(videosNotPlaying()){
                highlights[index].forEach(function(highlight, h){
                  $("#" + element.id + "_highlight" + "_" + h).show();
                  $("#" + element.id + "_highlight" + "_" + h).attr("disabled", false);
                  $("#" + element.id + "_highlight" + "_" + h).removeClass("disabled");
                });
              }
              
              // re-enable previously enabled buttons
              if(enabledButton){
                for(var e=0; e<enabledButton.length; e++){
                  if(enabledButton[e]){
                    $("#" + element.id + "_button_" + e).attr("disabled", false);
                  }
                }
              }

              modalStatusBar.html(modalDefaultMessage);

              hasCompletedModal();
            });              

            // rethink logic to iterate through each individual audio
            // if under same highlight play one after another?
            createdHighlight.on("click", function(e){
              this.isClicked = true;
              modalAudios[i].play();
              createdHighlight.css("border", "4px ridge blue");
              buttons[index].forEach(function(button, b){
                if(button.relatedHighlight == i){
                  $("#" + element.id + "_button_" + b).attr("disabled", false);
                  enabledButton[b] = true;
                } else {
                  $("#" + element.id + "_button_" + b).attr("disabled", true);                    
                }
              });
            });

          }); // end higlights.forEach
        
        
          
        } // end if(highlights)

        var hasListenedModalAudios = function(){
          // check all modalAudios
          if (modalHasListened && modalHasListened.length > 0){
            for(var m=0; m<modalHasListened.length; m++){
              if(!modalHasListened[m]){
                return false
              }
            }
          }
          return true;
        }

        var hasWatchedModalVideos = function(){
          // check all modalVideos
          if (modalHasWatched && modalHasWatched.length > 0){
            for(var m=0; m<modalHasWatched.length; m++){
              if(!modalHasWatched[m]){
                return false
              }
            }
          }
          return true;
        }

        var hasCompletedModal = function(){
          if(hasWatchedModalVideos() && hasListenedModalAudios() && !btnAudioPlaying ){
            // enable "Back to Panel" + other close functions on the modal
            if(backButton){
              backButton.attr("disabled", false);
            }
            if(modalHeader){
              modalHeader.find("button").attr("disabled", false);
            }
            if(modal){
              modal.removeAttr("data-backdrop");
              modal.removeAttr("data-keyboard");
            }
            return true;
          } else {
            backButton.attr("disabled", true);            
          }
          return false;
        }

        var videosNotPlaying = function(){
          if(videoPlaying && videoPlaying.length>0){
            for(var v=0; v<videoPlaying.length; v++){
              if(videoPlaying[v]){
                return false;
              }
            }
          }
          return true;
        }

        var audiosNotPlaying = function(){
          if(audioPlaying && audioPlaying.length>0){
            for(var a=0; a<audioPlaying.length; a++){
              if(audioPlaying[a]){
                return false;
              }
            }
          }
          return true;
        }      
      }

      closeModal = function(){
        hasClosed[index] = true;
        playNext();
      }

      $("#"+element.id).on("shown", function(){
        if(element.modalAudio && element.modalAudio.length > 0){
          var modalInitAudio = Popcorn("#" + element.id + "_init_audio_" + index);
          modalInitAudio.play();
          modalInitAudio.on("playing", function(){
            toggleHighlights("hide", index, element.id);
            toggleButtons("disable", index, element.id);
          });
          modalInitAudio.on("ended", function(){
            toggleHighlights("show", index, element.id);
            toggleButtons("enable", index, element.id);
          });
        }
      });

      toggleHighlights = function( action, elementIndex, elementId ){
        if(action && action != ''){
          highlights[elementIndex].forEach(function(highlight, h){
            if(action == "show"){
              $("#" + elementId + "_highlight_" + h).show();
            } else if (action == "hide"){
              $("#" + elementId + "_highlight_" + h).hide();
            }
          });
        }
      }

      toggleButtons = function( action, elementIndex, elementId ){
        if(action && action != ''){
          buttons[elementIndex].forEach(function(button, b){
            if(action == "enable"){
              $("#" + elementId + "_button_" + b).attr("disabled", false);
            } else if (action == "disable"){
              $("#" + elementId + "_button_" + b).attr("disabled", true);
            }
          });
        }
      }

    }); // end instruments.forEach

  } // end init function

  init();

  reset();

  activateTimer = function(e){
    cancelRedirect.attr("disabled", false);
    redirectMessage(continueTime, true);
    btnC.removeAttr("disabled");
    pause.hide();
    play.hide();
    replay.show();
  }

  playPrevious = function(e){
    if(e){
      e.preventDefault();
    }

    cancelRedirect.attr("disabled", true);
    cancelRedirect.off();

    if (active > 0){
      pauseSpecific(active);
      active--;
      playCurrent();
    }
  };

  playNext = function(e){
    if(e){
      e.preventDefault();
    }
    
    $(".mid_content1").show();
    
    if(active < players.length - 1){
      pauseSpecific(active);
      active++;
      playCurrent();  
    } else {
      activateTimer();
    }
  };

  playCurrent = function(e){
    replay.hide();

    if(e){
      e.preventDefault();
    }

    checkControlButtons();

    players[active].play();
    play.hide();
    pause.show();
    cancelRedirect.text(playStatus);
    
  };

  replayAll = function(e){
    if(e){
      e.preventDefault();
    }
    reset();

    if(resetImage){
      replaceBackground(resetImage[0], resetImage[1]);
    }

    active = 0;
    replay.hide();

    // disable the timer
    manualCancelTimer();
    playCurrent();    
  }

  replayCurrent = function(e){
    if(e){
      e.preventDefault();
    }
    
    replay.hide();

    // disable the timer
    manualCancelTimer();

    playCurrent();
  };

  pauseSpecific = function(index){
    players[index].pause();
    players[index].currentTime(0);

    if (manualCancelTimer){
      manualCancelTimer();  
    }
  }

  pauseCurrent = function(e, hidePlay) {
    if(e) {
      e.preventDefault();  
    }

    players[active].pause();

    pause.hide();
      if (!hidePlay){
      play.show();
    }
          
    cancelRedirect.text(pauseStatus);
  };

  checkControlButtons = function(){
    if (active > 0){
      previous.removeAttr("disabled");
      previous.removeClass("disabled");
    } else {
      previous.attr("disabled", true);
      previous.addClass("disabled");
    }
    
    if(hasClosed[active] && active < players.length-1){
      next.removeAttr("disabled");
      next.removeClass("disabled");
    } else {
      next.attr("disabled", true);
      next.addClass("disabled");
    }
  };

  // Replay button 'onclick' behaviour
  replay.on("click", replayAll);

  // Previous button 'onclick' behaviour
  previous.on("click", playPrevious);
  
  // Next button 'onclick' behaviour
  next.on("click", playNext);

  // Play button 'onclick' behaviour
  play.on("click", playCurrent);

  // Pause button 'onclick' behaviour
  pause.on("click", pauseCurrent);

  for (var i=0; i<players.length; i++){
    var tempFn;

    hasListened.push(false);
    hasClosed.push(false);

    if(snap3slide2special){
      players[0].cue(9, function(){
        $($('div.cdot_contentText > .clearClickable')[active]).show();              
      });

      players[0].cue(14, function(){
        $($('div.cdot_contentText > .clearClickable')[active]).hide();              
      });      
    }

    players[i].on("playing", function(){
      $('div.cdot_contentText > .clearClickable').each(function(index, element){
        if(reverseAudio){
          if (index != (active - 1) ){
            $(element).hide();
            $(element).attr("disabled", true);
          }
          if(ensureNoDblClick) {
            $(element).attr("disabled", true);
            $(element).unbind('click');
          }
        } else {
          if (index != active){
            $(element).hide();
            $(element).attr("disabled", true);
          }
        }
        
      });
      
      if(!reverseAudio){
        players[active].cue(1, function(){
          if (hasListened[active]){
            $($('div.cdot_contentText > .clearClickable')[active]).attr("disabled", false);
            $($('div.cdot_contentText > .clearClickable')[active]).css("cursor", "pointer");
          }
          if(!hideInvokerBorder){
            $($('div.cdot_contentText > .clearClickable')[active]).show();              
          } else {
            // disable all highlights for now
            $('div.cdot_contentText > .clearClickable').each( function(key, element){
              $(this)
                .attr("disabled", true)
                .css("cursor", "default")
                .hide();
            });
          }
        });
      }
      
      play.hide();
      pause.show();
    });

    players[i].on("ended", function(){

      if(reverseAudio){
        if(instruments[active-1] && instruments[active-1].callback){
          // switch image here (execute callback)
          instruments[active-1].callback();
        }
        $($('div.cdot_contentText > .clearClickable')[active]).show();
        $($('div.cdot_contentText > .clearClickable')[active-1]).hide();
        if(ensureNoDblClick){
          $($('div.cdot_contentText > .clearClickable')[active]).on("click", invokerAction);
        }
      }

      if(active == players.length-1 && reverseAudio){
        activateTimer();
      } else {
        pause.hide();
        play.show();

        if(hideInvokerBorder){
          if(instruments[active]){
            cancelRedirect.text(statusClickMessage + instruments[active].name);  
          }
          // allow clicking on all the highlights
          $('div.cdot_contentText > .clearClickable').each( function(key, element){
            $(this)
              .attr("disabled", false)
              .css("cursor", "pointer")
              .show();

            if(key === active){
              $(this).attr("data-toggle", "modal");
            } else {
              $(this).removeAttr("data-toggle");
            }
          });
        } else {
          // allow clicking on the highlight
          $($('div.cdot_contentText > .clearClickable')[active])
            .attr("data-toggle", "modal")
            .attr("disabled", false)
            .css("cursor", "pointer");

          cancelRedirect.text(defaultMessage);
        }
      }

      hasListened[active] = true; // mark this audio as we have listened to it already
     
    });
  }

  if(!isMobile){
    players[active].play();
  } else {
    cancelRedirect.text("Please press Play");
  }
  
  $("#btnB").on("click", function(e) {
    if(e) {
      e.preventDefault();
    }
    redirectToPage(backId); // any URL   
  });
  $("#btnC").on("click", function(e) {
    if(e) {
      e.preventDefault();
    }
    redirectToPage(continueId); // any URL
  });
  
  redirectToPage = function( pageId ){
    var current = window.location.href, newUrl, tempSplit, splitter;

    splitter = "courseware";

    tempSplit = current.split(splitter);
          
    newUrl = tempSplit[0];
    window.location.assign(newUrl + "jump_to_id/" + pageId);
  },

  function redirectMessage(seconds, isAuto) {    

    var counter = seconds; // duration of the timer (each 1 point is about a second)

    if (!counter){
      counter = 5;
    }    
    manualCancel = function(){
      clearInterval(timer);
      cancelRedirect.text("Continue when ready");
    };
    manualCancelTimer = function(){
      clearInterval(timer);
    };

    cancelRedirect.text("");
    
    cancellingRedirect = function(e){
      e.preventDefault();
      manualCancel();
      $(this).on('click', function(){
        redirectToPage(continueId); // any URL
      });
    };
    cancelRedirect.on('click', cancellingRedirect);
  
    if(isAuto) {
    
      cancelRedirect.text("Continuing in " + counter.toString() + "... Click here to cancel");
    
      timer = setInterval(function() {
          counter--;
          if(counter < 0) {
            cancelRedirect.text("Redirecting...");
            redirectToPage(continueId);
            clearInterval(timer);
          } else {
            cancelRedirect.text("Continuing in " + counter.toString() + "... Click here to cancel");
          }
      }, 1000);
    } else {
      timer = null;
    }
  },

}

var replaceBackground = function( jquerySelector, imageURL){
  $(jquerySelector).prop("src", imageURL);
};


/**
  var newSlide = new Slide();
  newSlide.constructor();
**/
var testSlide = new Slide();
console.log("this is a test slide...");
console.log(testSlide);