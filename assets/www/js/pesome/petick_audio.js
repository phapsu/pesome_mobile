$('#petick-audio').live('pageshow', function(event) {
    var petopic_id = $urlUtility.getVars()["petopic_id"];
    var tick_id = $urlUtility.getVars()["tick_id"];

   $.ajax({
            url: $api_url.petick_detail(petopic_id, tick_id),
            dataType: "jsonp",
            contentType: "application/json",
            async: false,
            success: function (res) {

                    var petick = res.petick; 
                    $petick_audio.detail(petick);

            },
            error: function(e) {
                console.log(e.message);
            }
        });

    var $petick_audio = {

        detail : function(data){
           
                audioURL = encodeURIComponent($.trim($full_base_url + data.audio.url));d(audioURL);
                var play_btn = $('#play');
                var pause_btn = $('#pause');
                var stop_btn = $('#stop');
                var rewind_btn = $('#rewind');
                var record_btn = $('#record');

                play_btn.click(function(){

                        playAudio(audioURL);

                        $(this).button('disable');
                        pause_btn.button('enable');
                });

                pause_btn.click(function(){
                        pauseAudio();

                        $(this).button('disable');
                        play_btn.button('enable');
                });

                stop_btn.click(function(){
                        stopAudio();
                        // reset slider
                        $('#slider').val(0);
                        $('#slider').slider('refresh');

                    pause_btn.button('disable');
                        play_btn.button('enable');
                });

                rewind_btn.click(function(){
                        stopAudio();
                        playAudio(audioURL);

                    play_btn.button('enable');
                        pause_btn.button('disable');
                });

                record_btn.click(function(){
                        stopAudio();
                        $(this).button('disable');
                        play_btn.button('enable');
                        pause_btn.button('disable');

                        var recsec = 10;
                        recordAudio('record.mp3');
                        var rectxt = setInterval(function(){
                                var recording = $('#recording');
                                if(recsec == 0) {
                                        clearInterval(rectxt);
                                        recording.text('Play recording');
                                        record_btn.button('enable');
                                        playAudio('record.mp3');
                                } else {
                                        recording.text('Stop recording in ' + recsec + ' seconds' );
                                        --recsec;
                                }
                        },1000);
                });                
        }
    }

/**
 * AUDIO PLAYER
 *
 * /
    /* Audio player */
    var audio = null;
    var audioTimer = null;
    var pausePos = 0;

    /* play audio file */
    function playAudio(file){
       file = decodeURIComponent(file);
           audio = new Media(file, function(){ // success callback
           console.log("playAudio():Audio Success");
       }, function(error){ // error callback
           alert('code: '    + error.code    + '\n' +
                     'message: ' + error.message + '\n');
       });

       // get audio duration
       var duration = audio.getDuration();

       // set slider data
       if( duration > 0 ){
               $('#slider').attr( 'max', Math.round(duration) );
               $('#slider').slider('refresh');
       }

       // play audio
       audio.play();

       audio.seekTo(pausePos*1000);

       // update audio position every second
       if (audioTimer == null) {
           audioTimer = setInterval(function() {
               // get audio position
               audio.getCurrentPosition(
                   function(position) { // get position success
                       if (position > -1) {
                           setAudioPosition(position);
                       }
                   }, function(e) { // get position error
                       console.log("Error getting pos=" + e);
                       //setAudioPosition(duration);
                   }
               );
           }, 1000);
       }
    }

    /* pause audio */
    function pauseAudio() {
       if (audio) {
           audio.pause();
       }
    }

    /* stop audio */
    function stopAudio() {
       if (audio) {
           audio.stop();
           audio.release();
       }
       clearInterval(audioTimer);
       audioTimer = null;
       pausePos = 0;
    }

    /* set audio position */
    function setAudioPosition(position) {
           pausePos = position;
           position = Math.round(position);
       $('#slider').val(position);
       $('#slider').slider('refresh');
    }

    /* record audio file */
    function recordAudio(file){
           audioRec = new Media(file, function(){ // success callback
           console.log("recordAudio():Audio Success");
       }, function(error){ // error callback
           alert('recording error : ' + error.message);
       });

       // start recording
       audioRec.startRecord();

       // stop recording after 10 seconds
       setTimeout(function(){
           audioRec.stopRecord();
           audioRec.release();
       }, 10000);
    }

});