$('#petick-link').live('pageshow', function(event) {
    var petopic_id = $urlUtility.getVars()["petopic_id"];
    var tick_id = $urlUtility.getVars()["tick_id"];

   $.ajax({
            url: $api_url.petick_detail(petopic_id, tick_id),
            dataType: "jsonp",
            contentType: "application/json",
            async: false,
            success: function (res) {d(res);
                    var petick = res.petick;
                    $petick_link.detail(petick);

            },
            error: function(e) {
                console.log(e.message);
            }
        });

    var $petick_link = {

        detail : function(data){
            url = data.link.link;d(data.link.is_link_video);
            if(data.link.is_link_video != null){
                //$('#linkPic').attr('src', data.link.image);
                $('#linkTitle').text(data.link.title);

                /**
                 * Check youtube
                 */

                var isYouTube = RegExp(/\.youtube\.com.+v=([\w_\-]+)/i);
                var r = isYouTube.exec(url);
                if (r && r[1]) {
                    code = r[1];
                    description = '<p><iframe style="width:auto" src="http://www.youtube.com/embed/'+code+'?fs=1&amp;feature=oembed" frameborder="0" allowfullscreen=""></iframe></p>';
                    $('#linkDesc').html(description);
                    $('#linkPic').remove();

                    return false;
                }

                /**
                 * Check Vimeo
                 */
                var regExpVimeoURL = /http:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;
                var match = url.match(regExpVimeoURL);
                d(match);
                if (match) {
                    code = match[2];
                    description = '<p><iframe style="width:auto" src="http://player.vimeo.com/video/'+code+'?badge=0" frameborder="0" allowfullscreen=""></iframe></p>';
                    $('#linkDesc').html(description);
                    $('#linkPic').remove();

                    return false;
                }
            }else{
                /**
                 * Normal link
                 */
                img = (data.link.image === null) ? '' : data.link.image;
                if(img != ''){
                    $('#linkPic').attr('src', img);
                }
                $('#linkTitle').html('<a href="'+url+'" alt="" title="'+data.link.title+'">'+data.link.title+'</a>');
                $('#linkDesc').html(data.link.sub_content);
            }
        }
    }

});