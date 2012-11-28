$('#petick-photo').live('pageshow', function(event) {
    var petopic_id = $urlUtility.getVars()["petopic_id"];
    var tick_id = $urlUtility.getVars()["tick_id"];

   $.ajax({
            url: $api_url.petick_detail(petopic_id, tick_id),
            dataType: "jsonp",
            contentType: "application/json",
            async: false,
            success: function (res) {       
                    $petick_photo.detail(res.petick);
                    $("#gallery a").photoSwipe({ enableMouseWheel: false , enableKeyboard: false });
            },
            error: function(e) {
                console.log(e.message);
            }
        });

    var $petick_photo = {

        detail : function(petick){
            petick_name = petick.name;
            petick_content = petick.content;
            photos = petick.photos;
            $.each(photos, function(i, $photo){
                photo_id    = $photo.photo.id;
                photo_title = $photo.photo.title;
                photo_thumb = $full_base_url + $photo.photo.thumb;
                photo_large = $full_base_url + $photo.photo.large;
                
                $('#gallery').append('<li><a rel="external" href="'+photo_large+'"><img src="'+photo_thumb+'" alt="Image 001" /></a></li>');
            });
        }
    }

});