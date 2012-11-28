$('#petick-link').live('pageshow', function(event) {
    var id = $urlUtility.getVars()["id"];

   $.ajax({
            url: $api_url.petick_detail(id),
            dataType: "jsonp",
            contentType: "application/json",
            async: false,
            success: function (res) {d(res);
                    var petick = res.petick;
                    var type = petick.tick_attach_type;
                    var attach_id = petick.tick_attach_id;
                    $petick_link.detail(attach_id);

            },
            error: function(e) {
                console.log(e.message);
            }
        });

    var $petick_link = {

        detail : function(link_id){
            $.ajax({
                url: $api_url.petopic_getlink(link_id),
                dataType: "jsonp",
                contentType: "application/json",
                async: false,
                success: function (data) {
                    
                    url = data.link.link;
                    if(data.link.is_link_video == true){
                        //$('#linkPic').attr('src', data.link.image);
                        $('#linkTitle').text(data.link.title);

                        /**
                         * Check youtube
                         */

                        var isYouTube = RegExp(/\.youtube\.com.+v=([\w_\-]+)/i);
                        var r = isYouTube.exec(url);
                        if (r && r[1]) {
                            code = r[1];
                            description = '<p><iframe width="260" height="140" src="http://www.youtube.com/embed/'+code+'?fs=1&amp;feature=oembed" frameborder="0" allowfullscreen=""></iframe></p>';
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
                            description = '<p><iframe width="260" height="140" src="http://player.vimeo.com/video/'+code+'?badge=0" frameborder="0" allowfullscreen=""></iframe></p>';
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
                },
                error: function(e) {
                    console.log(e.message);
                }
            });
        }
    }

});