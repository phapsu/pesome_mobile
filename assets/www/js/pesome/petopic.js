$('#page-petopic').bind('pageinit', function(event) {    $.fn.petopic = function(config){        config = $.extend({}, {            loadURL : null,            callback: function() {}        }, config);        //check content        if(config.loadURL == null || config.loadURL == undefined){            return false;        }        // initial container object        var $container = $(this);        $.ajax({            url: config.loadURL,            dataType: "jsonp",            contentType: "application/json",            async: false,            success: function (data) {                $tmpl = "";                $.each(data, function(i, item) {                    var id =  item.petopic.id;                    var description =  item.petopic.description;                    var title =  item.petopic.title;                    var thumbnail =  item.petopic.thumbnail;                    description = (description.length > 100) ? description.substring(1, 100) : description;                    $tmpl += "<li><a data-transition=\"slide\" href=\"petopic_detail.html?id="+id+"\"><img src=\""+$full_base_url+thumbnail+"\" /><h3>"+title+"</h3><p>"+description+"</p></a></li>";                });                $container.html($tmpl).listview('refresh');            },            error: function(e) {                console.log(e.message);            }        });    }    $('#listposts').petopic({        loadURL : $api_url.petopic()    });/*    var $container = $("#listposts");        var petopic = {        load : function(offset){            offset = (offset == 'undefined') ? 1 : offset;            offset = parseInt(offset);            $.ajax({                url: $api_url.petopic(),                data: {'page' : offset},                dataType: "jsonp",                contentType: "application/json",                async: false,                    success: function(res){                    $('#loader').fadeOut('fast', function(){                        $("#tmplPetopic").tmpl( res ).appendTo("#listposts");                                            });//                    $container.isotope({//                        itemSelector : '.entry'//                    });                },                error: function(e) {                    l(e.message);                }            });        }    };            var $currentPage = 0;   // petopic.load($currentPage);    $currentPage = 1;            $container.scrollPagination({        'contentPage': 'blank.html', // the url you are fetching the results        'contentData': {}, // these are the variables you can pass to the request, for example: children().size() to know which page you are        'scrollTarget': $(window), // who gonna scroll? in this example, the full window        'heightOffset': 10, // it gonna request when scroll is 10 pixels before the page ends        'beforeLoad': function(){ // before load function, you can display a preloader div            $('#loader').fadeIn();        },        'afterLoad': function(elementsLoaded){            l($currentPage);            //$currentPage = ($currentPage > 1) ? $currentPage - 1 : $currentPage;            petopic.load($currentPage);            $currentPage += 1;        }    });     *     */});