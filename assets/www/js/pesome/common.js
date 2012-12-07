var $local = 1;

/**
 * Config url for image - remove when run on pesome
 */
var $full_base_url = 'http://dev.afterclassroom.com';
/**
 *  Config app client 
 */
var $client_id = 'dbbe827bca7ec697fce46f22749fa5d3';
var $client_secret = '28ca8adcf596eb543bfec576ea397cd3';

/**
 * Access token 
 */
var $access_token = ($local == 0) ? window.localStorage.getItem("access_token") : 'c75d3fd6194cf87c552877d7c6cddf22';

/**
 *  API URL list
 */
var $api_url  = {
    auth : function(){
        return $full_base_url+'/oauth/token';
    },
    me : function(){
        return $full_base_url+'/api/users/me?access_token='+ $access_token;
    },
    category : function(){
        return $full_base_url+'/api/petopics/get_category?access_token='+ $access_token;
    },
    petopic : function(){
        return $full_base_url+'/api/petopics?access_token='+ $access_token;
    },
    petopic_detail : function(id){
        return $full_base_url+'/api/petopics/'+id+'?access_token='+ $access_token;
    },
    petopic_getpeticks : function(id){
        return $full_base_url+'/api/petopics/get_peticks?id='+id+'&access_token='+ $access_token;
    },    
    
    petopic_getlink : function(link_id){
        return $full_base_url+'/api/peticks/get_link?link_id='+link_id+'&access_token='+ $access_token;
    },
    petopic_getaudio : function(audio_id){
        return $full_base_url+'/api/peticks/get_audio?audio_id='+audio_id+'&access_token='+ $access_token;
    },
    petopic_getvideo : function(video_id){
        return $full_base_url+'/api/peticks/get_video?video_id='+video_id+'&access_token='+ $access_token;
    },
    petopic_getlist_friend : function(){
        return $full_base_url+'/api/petopics/members?access_token='+ $access_token;
    },
    petick_detail : function(petopic_id, tick_id){
        return $full_base_url+'/api/petopics/get_petick?id='+petopic_id+'&tick_id='+tick_id+'&access_token='+ $access_token;
    },    
    petick_postcomment : function(petopic_id){
        return $full_base_url+'/api/peticks/create_comment?id='+petopic_id+'&access_token='+ $access_token;
    },
    petick_getcomment : function(tick_id){
        return $full_base_url+'/api/peticks/get_comment?tick_id='+tick_id+'&access_token='+ $access_token;
    }
};

/*
 * URL utility
 */
var $urlUtility  = {
    getVars : function(){
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;        
    }
};


function l(d){
    console.log(d);
}
function d(d){
    console.dir(d);
}

// Constants
var MISSING = "missing";
var EMPTY = "";
var NO_STATE = "ZZ"; 