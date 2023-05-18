/////////////////////
// Public API
/////////////////////

endpoint.appGet = function(url, params) {
    var options = checkHttpOptions(url, {params: params});
    return endpoint._appGet(options);
};

endpoint.get = function(url, params) {
    var options = checkHttpOptions(url, {params: params});
    return endpoint._get(options);
};

endpoint.post = function(url, options) {
    options = checkHttpOptions(url, options);
    return endpoint._post(options);
};

endpoint.app = {};
endpoint.user = {};
endpoint.tweets = {};

//App

endpoint.app.searchTweets = function(criteria) {
    if (!criteria) {
        throw 'Criteria is required for this operation';
    }
    return endpoint.appGet('/1.1/search/tweets.json', criteria);
};

//User

endpoint.user.tweet = function(tweetParams) {
    if (!tweetParams) {
        throw 'Tweet body is required for this operation';
    }
    return endpoint.post('/1.1/statuses/update.json', {params: tweetParams});
};

endpoint.user.retweet = function(tweetId) {
    if (!tweetId) {
        throw 'Tweet identifier is required for this operation';
    }
    return endpoint.post('/1.1/statuses/retweet.json', {params: {id:tweetId}});
};

endpoint.user.unretweet = function(tweetId) {
    if (!tweetId) {
        throw 'Tweet identifier is required for this operation';
    }
    return endpoint.post('/1.1/statuses/unretweet.json', {params: {id:tweetId}});
};

endpoint.user.like = function(tweetId) {
    if (!tweetId) {
        throw 'Tweet identifier is required for this operation';
    }
    return endpoint.post('/1.1/favorites/create.json', {params: {id:tweetId}});
};

endpoint.user.undoLike = function(tweetId) {
    if (!tweetId) {
        throw 'Tweet identifier is required for this operation';
    }
    return endpoint.post('/1.1/favorites/destroy.json', {params: {id:tweetId}});
};

endpoint.user.myLikes = function() {
    return endpoint.get('/1.1/favorites/list.json');
};

endpoint.user.show = function(tweetId) {
    if (!tweetId) {
        throw 'Tweet identifier is required for this operation';
    }
    return endpoint.get('/1.1/statuses/show.json', {id:tweetId});
};

endpoint.user.remove = function(tweetId) {
    if (!tweetId) {
        throw 'Tweet identifier is required for this operation';
    }
    return endpoint.post('/1.1/statuses/destroy.json', {params: {id:tweetId}});
};

endpoint.user.lookup = function(criteria) {
    if (!criteria) {
        throw 'Criteria is required for this operation';
    }
    return endpoint.get('/1.1/statuses/lookup.json', criteria);
};

endpoint.user.searchTweets = function(criteria) {
    if (!criteria) {
        throw 'Criteria is required for this operation';
    }
    return endpoint.get('/1.1/search/tweets.json', criteria);
};

endpoint.user.retweets = function(tweetId) {
    if (!tweetId) {
        throw 'Tweet identifier is required for this operation';
    }
    return endpoint.get('/1.1/statuses/retweets.json', {id:tweetId});
};

endpoint.user.retweetsOfMe = function() {
    return endpoint.get('/1.1/statuses/retweets_of_me.json');
};

endpoint.user.retweeters = function(tweetId) {
    if (!tweetId) {
        throw 'Tweet identifier is required for this operation';
    }
    return endpoint.get('/1.1/statuses/retweeters/ids.json', {id:tweetId, stringify_ids: true});
};

endpoint.user.upload = function(fileId) {
    if (!fileId) {
        throw 'File identifier is required for this operation';
    }
    var reader = sys.files.open(fileId);
    var descriptor = reader.descriptor();
    var params = {command:'INIT', total_bytes:descriptor.size().toString(), media_type: descriptor.type()};
    if (params.media_type && params.media_type.indexOf('video') !== -1) {
        params.media_category = 'amplify_video';
    }
    var resInit = upload('/1.1/media/upload.json', {params: params});
    if (!resInit) {
        throw 'There was an error starting upload of file';
    }
    var mediaId = resInit['media_id_string'];
    if (!mediaId) {
        throw 'There was an error starting upload of file, no media id was returned';
    }
    upload('/1.1/media/upload.json', {
        multipart: true,
        parts: [
            {
                name: 'media',
                type: 'file',
                fileId: fileId
            }
        ],
        params: {
            command:'APPEND',
            media_id: mediaId,
            segment_index: 0
        }
    });
    var resFinalize = upload('/1.1/media/upload.json', {params: {command:'FINALIZE', media_id:mediaId}});
    if (!resFinalize) {
        throw 'There was an error finalizing upload of file';
    }
    while (resFinalize.processing_info && resFinalize.processing_info.state) {
        if (resFinalize.processing_info.state === 'pending' || resFinalize.processing_info.state === 'in_progress') {
            sys.logs.debug('Waiting media ['+mediaId+'] to be uploaded');
            sys.utils.script.wait(1000 * parseInt(resFinalize.processing_info.check_after_secs));
            resFinalize = endpoint.user.uploadStatus(mediaId);
        } else {
            sys.logs.debug('Media ['+mediaId+'] uploaded with status ['+resFinalize.processing_info.state+']');
            break;
        }
    }
    return resFinalize;
};

endpoint.user.uploadStatus = function(mediaId) {
    if (!mediaId) {
        throw 'Media identifier is required for this operation';
    }
    return uploadStatus('/1.1/media/upload.json', {media_id:mediaId, command:'STATUS'});
};


/////////////////////////////
//  Private helpers
/////////////////////////////

var upload = function(url, options) {
    options = checkHttpOptions(url, options);
    return endpoint._uploadMedia(options);
};

var uploadStatus = function(url, params) {
    var options = checkHttpOptions(url, {params: params});
    return endpoint._uploadStatus(options);
};

var checkHttpOptions = function (url, options) {
    options = options || {};
    if (!!url) {
        if (isObject(url)) {
            // take the 'url' parameter as the options
            options = url || {};
        } else {
            if (!!options.path || !!options.params || !!options.body) {
                // options contains the http package format
                options.path = url;
            } else {
                // create html package
                options = {
                    path: url,
                    body: options
                }
            }
        }
    }
    return options;
};

var isObject = function (obj) {
    return !!obj && stringType(obj) === '[object Object]'
};

var stringType = Function.prototype.call.bind(Object.prototype.toString);