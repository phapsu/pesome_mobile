$('#petick-detail').live('pageshow', function(event) {
    var id = $urlUtility.getVars()["id"];
    var type = 'audio';
    
    $('#petick-'+type).show();
    
    if(typeof id === "undefined"){
        //do nothing
    }else{

        $.ajax({
            url: $api_url.petick_detail(id),
            dataType: "jsonp",
            contentType: "application/json",
            async: false,
            success: function (res) {

                    var petick = res.petick;
                    var type = petick.tick_attach_type;
                    var attach_id = petick.tick_attach_id;
                    d(petick);
                    switch(type){
                        case 'Link':
                            d(petick)
                            $petick.link(petick);
                            break;
                        case 'Audio':                            
                            $('#petick-audio').show();
                            $petick_detail.audio(attach_id);
                            break;
                        case 'Video':
                            //$petick_detail.video(petick);
                            break;
                        case 'ShareFile':
                            //d(petick);//chua co
                            break;
                        case 'PhotoAlbum':
                            //d(petick);
                            //$petick_detail.photo(petick);
                            break;
                        default:
                            $petick_detail.text(petick.content);
                            break;
                    }                 

            },
            error: function(e) {
                console.log(e.message);
            }
        });
    }
});

var $petick_detail = {
    text : function(text_id){
      //text-content  
     
    },
    
    
    audio : function(audio_id){
        $.ajax({
            url: $api_url.petopic_getaudio(audio_id),
            dataType: "jsonp",
            contentType: "application/json",
            async: false,
            success: function (data) {
                audioURL = encodeURIComponent($.trim($full_base_url + data.audio.url));                
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
                
            },
            error: function(e) {
                console.log(e.message);
            }
        });
    }
}