/*
 * Created for CDOT at Seneca College by Pavlo Kuzhel
 * for managing client side interactions and events
 */

<!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
<div id="player" style="display:block; margin:auto;"></div>
<div id="cancelRedirect" style="text-align:center"> </div>

<script>
  // 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script'),
      youtubeID = "xCzhAy-eeJE", // youtube id HERE!!!
      pageId = "c224fdfa52ee4737b8b63e491ee9cdce"; // identifier of the page to redirect to

  tag.src = "http://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  var player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: youtubeID,
      playerVars: {
        'disablekb': 1, // disable keyboard shortcuts
        'fs': 0, // disabled fullscreen
        'modestbranding': 1, // hide youtube branding
        //'origin': 'domain', // set the domain accessing from (online-dev)?
        'rel': 0 // disable related videos at the end of vido
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }

  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    var isiPad = navigator.userAgent.match(/iPad/i) != null;
    if (!isiPad){
    	event.target.playVideo();
    }
  }

  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when video ends, call the redirectMessage() function
  function onPlayerStateChange(event) {
    console.debug("Player State: " + event);
    if (event.data == YT.PlayerState.ENDED) {
      redirectMessage();
    }
  }

  function redirectMessage() {
    var cancelRedirect = document.getElementById("cancelRedirect"), // get the redirect text by its ID
        counter = 3, // duration of the timer (each 1 point is about a second)
        timer; // the interval/timer that is being set for the page
  
    cancelRedirect.innerHTML = "Continuing in " + counter + " seconds... Click here to cancel";
    cancelRedirect.style.textAlign = "center"
    cancelRedirect.style.cursor = "pointer";
    
    cancelRedirect.addEventListener('click', function(){
      clearInterval(timer);
      this.innerHTML = "Click here to continue when you are ready";
      this.addEventListener('click', function(){
        window.location = "/jump_to_id/" + pageId; // any URL
      });
    });
  
    timer = setInterval(function() {
        counter--;
        if(counter < 0) {
            cancelRedirect.innerHTML = "Redirecting...";
            window.location = "/jump_to_id/" + pageId; // any URL
            clearInterval(timer);
        } else {
            cancelRedirect.innerHTML = "Continuing in " + counter.toString() + " seconds... Click here to cancel";
        }
    }, 1000);
  }
</script>