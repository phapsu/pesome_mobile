$('#petick-text').live('pageshow', function(event) {
    var petopic_id = $urlUtility.getVars()["petopic_id"];
    var tick_id = $urlUtility.getVars()["tick_id"];

   $.ajax({
            url: $api_url.petick_detail(petopic_id, tick_id),
            dataType: "jsonp",
            contentType: "application/json",
            async: false,
            success: function (res) {
                    var petick = res.petick;
                    $petick_text.detail(petick);

            },
            error: function(e) {
                console.log(e.message);
            }
        });

    var $petick_text = {

        detail : function(data){
           $('#textTitle').text(data.content);
           //$('#linkDesc').html(description);
        }
    }

});