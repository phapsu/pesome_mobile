$('#petick-video').live('pageshow', function(event) {
    var id = $urlUtility.getVars()["id"];

   $.ajax({
            url: $api_url.petick_detail(id),
            dataType: "jsonp",
            contentType: "application/json",
            async: false,
            success: function (res) {
                    var petick = res.petick;
                    var type = petick.tick_attach_type;
                    var attach_id = petick.tick_attach_id;
                    $petick_video.detail(attach_id);

            },
            error: function(e) {
                console.log(e.message);
            }
        });

    var $petick_video = {

        detail : function(video_id){
            $.ajax({
                url: $api_url.petopic_getvideo(video_id),
                dataType: "jsonp",
                contentType: "application/json",
                async: false,
                success: function (data) {
                    title = data.video.title;
                    description = data.video.description;
                    $('#playVideo').bind('click', function(){
                        window.plugins.videoPlayer.play($full_base_url + data.video.video);
                    });
                    $('#videoPic').attr('src', $full_base_url + data.video.thumb);
                    $('#videoTitle').text(title);
                    $('#videoDesc').text(description);
                },
                error: function(e) {
                    console.log(e.message);
                }
            });
        }
    }

});