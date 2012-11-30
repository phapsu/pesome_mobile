$('#petick-video').live('pageshow', function(event) {
    var petopic_id = $urlUtility.getVars()["petopic_id"];
    var tick_id = $urlUtility.getVars()["tick_id"];

   $.ajax({
            url: $api_url.petick_detail(petopic_id, tick_id),
            dataType: "jsonp",
            contentType: "application/json",
            async: false,
            success: function (res) {
                    var petick = res.petick;
                    $petick_video.detail(petick);

            },
            error: function(e) {
                console.log(e.message);
            }
        });

    var $petick_video = {

        detail : function(petick){

            video = petick.video;

            title = video.title;
            description = video.description;
            $('#playVideo').bind('click', function(){
                window.plugins.videoPlayer.play($full_base_url + video.url);
            });
            $('#videoPic').attr('src', $full_base_url + video.thumb);
            $('#videoTitle').text(title);
            $('#videoDesc').text(description);

        }
    }

});