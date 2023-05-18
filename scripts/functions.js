////////////////////////////////////////////////////////////////////////////
//                                                                        //
//             This file was generated with "slingr-helpgen"              //
//                                                                        //
//               For more info, check the following links:                //
//             https://www.npmjs.com/package/slingr-helpgen               //
//           https://github.com/slingr-stack/slingr-helpgen               //
//                                                                        //
////////////////////////////////////////////////////////////////////////////

endpoint.tweets = {};

endpoint.users = {};

endpoint.users.by = {};

endpoint.users.by.username = {};

endpoint.users.followers = {};

endpoint.users.following = {};

endpoint.users.blocking = {};

endpoint.lists = {};

endpoint.users.ownedLists = {};

endpoint.lists.tweets = {};

endpoint.lists.members = {};

endpoint.users.listMemberships = {};

endpoint.users.followedLists = {};

endpoint.lists.followers = {};

endpoint.users.pinnedLists = {};

endpoint.lists.pinnedLists = {};

endpoint.users.muting = {};

endpoint.tweets.quoteTweets = {};

endpoint.tweets.hidden = {};

endpoint.tweets.search = {};

endpoint.tweets.search.recent = {};

endpoint.tweets.search.all = {};

endpoint.tweets.counts = {};

endpoint.tweets.counts.recent = {};

endpoint.tweets.counts.all = {};

endpoint.tweets.search.stream = {};

endpoint.tweets.search.stream.rules = {};

endpoint.tweets.sample = {};

endpoint.tweets.sample.stream = {};

endpoint.spaces = {};

endpoint.spaces.by = {};

endpoint.spaces.by.creatorId = {};

endpoint.spaces.buyers = {};

endpoint.spaces.search = {};

endpoint.compliance = {};

endpoint.compliance.jobs = {};

endpoint.users.likes = {};

endpoint.users.likedTweets = {};

endpoint.tweets.likingUsers = {};

endpoint.users.retweets = {};

endpoint.tweets.retweetedBy = {};

endpoint.users.bookmarks = {};

endpoint.users.timelines = {};

endpoint.users.timelines.reverseChronological = {};

endpoint.users.tweets = {};

endpoint.users.mentions = {};

endpoint.dmConversations = {};

endpoint.dmConversations.with = {};

endpoint.dmConversations.with.dmEvents = {};

endpoint.dmConversations.dmEvents = {};

endpoint.dmEvents = {};

endpoint.dmConversations.with.messages = {};

endpoint.dmConversations.messages = {};

endpoint.tweets.get = function(id, httpOptions) {
    if(!httpOptions){
        for (var i = 0 ; i < arguments.length; i++){
            if (isObject(arguments[i])){
                httpOptions = arguments[i];
                arguments[i] = undefined;
            }
        } 
    }
    var url;
    switch(httpOptions ? arguments.length - 1 : arguments.length){
        case 1:
			url = parse('/2/tweets/:id', [id]);
			break;
		case 0:
			url = parse('/2/tweets');
			break;
		default:
            sys.logs.error('Invalid argument received.');
            return;
    }
    sys.logs.debug('[twitter] GET from: ' + url);
	var options = checkHttpOptions(url, httpOptions);
	return endpoint._get(options);
};

endpoint.users.get = function(id, httpOptions) {
    if(!httpOptions){
        for (var i = 0 ; i < arguments.length; i++){
            if (isObject(arguments[i])){
                httpOptions = arguments[i];
                arguments[i] = undefined;
            }
        } 
    }
    var url;
    switch(httpOptions ? arguments.length - 1 : arguments.length){
        case 1:
			url = parse('/2/users/:id', [id]);
			break;
		case 0:
			url = parse('/2/users');
			break;
		default:
            sys.logs.error('Invalid argument received.');
            return;
    }
    sys.logs.debug('[twitter] GET from: ' + url);
	var options = checkHttpOptions(url, httpOptions);
	return endpoint._get(options);
};

endpoint.users.by.username.get = function(username, httpOptions) {
    if (!username) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [username].');
        return;
    }
    var url = parse('/2/users/by/username/:username', [username]);
    sys.logs.debug('[twitter] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.users.by.get = function(httpOptions) {
    var url = parse('/2/users/by');
    sys.logs.debug('[twitter] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.users.followers.get = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/2/users/:id/followers', [id]);
    sys.logs.debug('[twitter] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.users.following.get = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/2/users/:id/following', [id]);
    sys.logs.debug('[twitter] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.users.following.post = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/2/users/:id/following', [id]);
    sys.logs.debug('[twitter] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.users.following.delete = function(sourceUserId, targetUserId, httpOptions) {
    if (!sourceUserId || !targetUserId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [sourceUserId,targetUserId].');
        return;
    }
    var url = parse('/2/users/:source_user_id/following/:target_user_id', [sourceUserId, targetUserId]);
    sys.logs.debug('[twitter] DELETE from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._delete(options);
};

endpoint.users.blocking.post = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/2/users/:id/blocking', [id]);
    sys.logs.debug('[twitter] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.users.blocking.get = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/2/users/:id/blocking', [id]);
    sys.logs.debug('[twitter] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.users.blocking.delete = function(sourceUserId, targetUserId, httpOptions) {
    if (!sourceUserId || !targetUserId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [sourceUserId,targetUserId].');
        return;
    }
    var url = parse('/2/users/:source_user_id/blocking/:target_user_id', [sourceUserId, targetUserId]);
    sys.logs.debug('[twitter] DELETE from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._delete(options);
};

endpoint.lists.get = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/2/lists/:id', [id]);
    sys.logs.debug('[twitter] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.users.ownedLists.get = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/2/users/:id/owned_lists', [id]);
    sys.logs.debug('[twitter] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.lists.post = function(httpOptions) {
    var url = parse('/2/lists');
    sys.logs.debug('[twitter] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.lists.delete = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/2/lists/:id', [id]);
    sys.logs.debug('[twitter] DELETE from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._delete(options);
};

endpoint.lists.put = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/2/lists/:id', [id]);
    sys.logs.debug('[twitter] PUT from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._put(options);
};

endpoint.lists.tweets.get = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/2/lists/:id/tweets', [id]);
    sys.logs.debug('[twitter] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.lists.members.post = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/2/lists/:id/members', [id]);
    sys.logs.debug('[twitter] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.lists.members.delete = function(id, userId, httpOptions) {
    if (!id || !userId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id,userId].');
        return;
    }
    var url = parse('/2/lists/:id/members/:user_id', [id, userId]);
    sys.logs.debug('[twitter] DELETE from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._delete(options);
};

endpoint.lists.members.get = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/2/lists/:id/members', [id]);
    sys.logs.debug('[twitter] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.users.listMemberships.get = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/2/users/:id/list_memberships', [id]);
    sys.logs.debug('[twitter] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.users.followedLists.post = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/2/users/:id/followed_lists', [id]);
    sys.logs.debug('[twitter] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.users.followedLists.delete = function(id, listId, httpOptions) {
    if (!id || !listId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id,listId].');
        return;
    }
    var url = parse('/2/users/:id/followed_lists/:list_id', [id, listId]);
    sys.logs.debug('[twitter] DELETE from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._delete(options);
};

endpoint.lists.followers.get = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/2/lists/:id/followers', [id]);
    sys.logs.debug('[twitter] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.users.followedLists.get = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/2/users/:id/followed_lists', [id]);
    sys.logs.debug('[twitter] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.users.pinnedLists.post = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/2/users/:id/pinned_lists', [id]);
    sys.logs.debug('[twitter] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.lists.pinnedLists.delete = function(id, listId, httpOptions) {
    if (!id || !listId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id,listId].');
        return;
    }
    var url = parse('/2/lists/:id/pinned_lists/:list_id', [id, listId]);
    sys.logs.debug('[twitter] DELETE from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._delete(options);
};

endpoint.users.pinnedLists.get = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/2/users/:id/pinned_lists', [id]);
    sys.logs.debug('[twitter] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.tweets.post = function(httpOptions) {
    var url = parse('/2/tweets');
    sys.logs.debug('[twitter] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.tweets.delete = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/2/tweets/:id', [id]);
    sys.logs.debug('[twitter] DELETE from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._delete(options);
};

endpoint.users.muting.post = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/2/users/:id/muting', [id]);
    sys.logs.debug('[twitter] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.users.muting.delete = function(sourceUserId, targetUserId, httpOptions) {
    if (!sourceUserId || !targetUserId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [sourceUserId,targetUserId].');
        return;
    }
    var url = parse('/2/users/:source_user_id/muting/:target_user_id', [sourceUserId, targetUserId]);
    sys.logs.debug('[twitter] DELETE from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._delete(options);
};

endpoint.users.muting.get = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/2/users/:id/muting', [id]);
    sys.logs.debug('[twitter] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.tweets.quoteTweets.get = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/2/tweets/:id/quote_tweets', [id]);
    sys.logs.debug('[twitter] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.tweets.hidden.put = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/2/tweets/:id/hidden', [id]);
    sys.logs.debug('[twitter] PUT from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._put(options);
};

endpoint.tweets.search.recent.get = function(httpOptions) {
    var url = parse('/2/tweets/search/recent');
    sys.logs.debug('[twitter] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.tweets.search.all.get = function(httpOptions) {
    var url = parse('/2/tweets/search/all');
    sys.logs.debug('[twitter] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.tweets.counts.recent.get = function(httpOptions) {
    var url = parse('/2/tweets/counts/recent');
    sys.logs.debug('[twitter] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.tweets.counts.all.get = function(httpOptions) {
    var url = parse('/2/tweets/counts/all');
    sys.logs.debug('[twitter] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.tweets.search.stream.rules.post = function(httpOptions) {
    var url = parse('/2/tweets/search/stream/rules');
    sys.logs.debug('[twitter] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.tweets.search.stream.rules.get = function(httpOptions) {
    var url = parse('/2/tweets/search/stream/rules');
    sys.logs.debug('[twitter] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.tweets.search.stream.get = function(httpOptions) {
    var url = parse('/2/tweets/search/stream');
    sys.logs.debug('[twitter] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.tweets.sample.stream.get = function(httpOptions) {
    var url = parse('/2/tweets/sample/stream');
    sys.logs.debug('[twitter] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.spaces.get = function(id, httpOptions) {
    if(!httpOptions){
        for (var i = 0 ; i < arguments.length; i++){
            if (isObject(arguments[i])){
                httpOptions = arguments[i];
                arguments[i] = undefined;
            }
        } 
    }
    var url;
    switch(httpOptions ? arguments.length - 1 : arguments.length){
        case 1:
			url = parse('/2/spaces/:id', [id]);
			break;
		case 0:
			url = parse('/2/spaces');
			break;
		default:
            sys.logs.error('Invalid argument received.');
            return;
    }
    sys.logs.debug('[twitter] GET from: ' + url);
	var options = checkHttpOptions(url, httpOptions);
	return endpoint._get(options);
};

endpoint.spaces.by.creatorId.get = function(httpOptions) {
    var url = parse('/2/spaces/by/creator_id');
    sys.logs.debug('[twitter] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.spaces.buyers.get = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/2/spaces/:id/buyers', [id]);
    sys.logs.debug('[twitter] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.spaces.search.get = function(httpOptions) {
    var url = parse('/2/spaces/search');
    sys.logs.debug('[twitter] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.compliance.jobs.post = function(httpOptions) {
    var url = parse('/2/compliance/jobs');
    sys.logs.debug('[twitter] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.compliance.jobs.get = function(id, httpOptions) {
    if(!httpOptions){
        for (var i = 0 ; i < arguments.length; i++){
            if (isObject(arguments[i])){
                httpOptions = arguments[i];
                arguments[i] = undefined;
            }
        } 
    }
    var url;
    switch(httpOptions ? arguments.length - 1 : arguments.length){
        case 0:
			url = parse('/2/compliance/jobs');
			break;
		case 1:
			url = parse('/2/compliance/jobs/:id', [id]);
			break;
		default:
            sys.logs.error('Invalid argument received.');
            return;
    }
    sys.logs.debug('[twitter] GET from: ' + url);
	var options = checkHttpOptions(url, httpOptions);
	return endpoint._get(options);
};

endpoint.users.likes.post = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/2/users/:id/likes', [id]);
    sys.logs.debug('[twitter] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.users.likedTweets.get = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/2/users/:id/liked_tweets', [id]);
    sys.logs.debug('[twitter] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.tweets.likingUsers.get = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/2/tweets/:id/liking_users', [id]);
    sys.logs.debug('[twitter] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.users.likes.delete = function(id, tweetId, httpOptions) {
    if (!id || !tweetId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id,tweetId].');
        return;
    }
    var url = parse('/2/users/:id/likes/:tweet_id', [id, tweetId]);
    sys.logs.debug('[twitter] DELETE from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._delete(options);
};

endpoint.users.retweets.post = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/2/users/:id/retweets', [id]);
    sys.logs.debug('[twitter] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.tweets.retweetedBy.get = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/2/tweets/:id/retweeted_by', [id]);
    sys.logs.debug('[twitter] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.users.retweets.delete = function(id, sourceTweetId, httpOptions) {
    if (!id || !sourceTweetId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id,sourceTweetId].');
        return;
    }
    var url = parse('/2/users/:id/retweets/:source_tweet_id', [id, sourceTweetId]);
    sys.logs.debug('[twitter] DELETE from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._delete(options);
};

endpoint.users.bookmarks.post = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/2/users/:id/bookmarks', [id]);
    sys.logs.debug('[twitter] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.users.bookmarks.delete = function(id, tweetId, httpOptions) {
    if (!id || !tweetId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id,tweetId].');
        return;
    }
    var url = parse('/2/users/:id/bookmarks/:tweet_id', [id, tweetId]);
    sys.logs.debug('[twitter] DELETE from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._delete(options);
};

endpoint.users.bookmarks.get = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/2/users/:id/bookmarks', [id]);
    sys.logs.debug('[twitter] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.users.timelines.reverseChronological.get = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/2/users/:id/timelines/reverse_chronological', [id]);
    sys.logs.debug('[twitter] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.users.tweets.get = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/2/users/:id/tweets', [id]);
    sys.logs.debug('[twitter] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.users.mentions.get = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/2/users/:id/mentions', [id]);
    sys.logs.debug('[twitter] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.dmConversations.with.dmEvents.get = function(participantId, httpOptions) {
    if (!participantId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [participantId].');
        return;
    }
    var url = parse('/2/dm_conversations/with/:participant_id/dm_events', [participantId]);
    sys.logs.debug('[twitter] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.dmConversations.dmEvents.get = function(dmConversationId, httpOptions) {
    if (!dmConversationId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [dmConversationId].');
        return;
    }
    var url = parse('/2/dm_conversations/:dm_conversation_id/dm_events', [dmConversationId]);
    sys.logs.debug('[twitter] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.dmEvents.get = function(httpOptions) {
    var url = parse('/2/dm_events');
    sys.logs.debug('[twitter] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options);
};

endpoint.dmConversations.with.messages.post = function(participantId, httpOptions) {
    if (!participantId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [participantId].');
        return;
    }
    var url = parse('/2/dm_conversations/with/:participant_id/messages', [participantId]);
    sys.logs.debug('[twitter] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.dmConversations.post = function(httpOptions) {
    var url = parse('/2/dm_conversations');
    sys.logs.debug('[twitter] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

endpoint.dmConversations.messages.post = function(dmConversationId, httpOptions) {
    if (!dmConversationId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [dmConversationId].');
        return;
    }
    var url = parse('/2/dm_conversations/:dm_conversation_id/messages', [dmConversationId]);
    sys.logs.debug('[twitter] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options);
};

////////////////////////////////////
// Public API - Generic Functions //
////////////////////////////////////

endpoint.get = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options, callbackData, callbacks);
};

endpoint.post = function(url, httpOptions, callbackData, callbacks) {
    options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options, callbackData, callbacks);
};

endpoint.put = function(url, httpOptions, callbackData, callbacks) {
    options = checkHttpOptions(url, httpOptions);
    return endpoint._put(options, callbackData, callbacks);
};

endpoint.patch = function(url, httpOptions, callbackData, callbacks) {
    options = checkHttpOptions(url, httpOptions);
    return endpoint._patch(options, callbackData, callbacks);
};

endpoint.delete = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._delete(options, callbackData, callbacks);
};

endpoint.head = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._head(options, callbackData, callbacks);
};

endpoint.options = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._options(options, callbackData, callbacks);
};

endpoint.utils = {};

endpoint.utils.parseTimestamp = function(dateString) {
    if (!dateString) {
        return null;
    }
    var dt = dateString.split(/[: T\-]/).map(parseFloat);
    return new Date(dt[0], dt[1] - 1, dt[2], dt[3] || 0, dt[4] || 0, dt[5] || 0, 0);
};

endpoint.utils.formatTimestamp = function(date) {
    if (!date) {
        return null;
    }
    var pad = function(number) {
        var r = String(number);
        if ( r.length === 1 ) {
            r = '0' + r;
        }
        return r;
    };
    return date.getUTCFullYear()
        + '-' + pad( date.getUTCMonth() + 1 )
        + '-' + pad( date.getUTCDate() )
        + 'T' + pad( date.getUTCHours() )
        + ':' + pad( date.getUTCMinutes() )
        + ':' + pad( date.getUTCSeconds() )
        + '.' + String( (date.getUTCMilliseconds()/1000).toFixed(3) ).slice( 2, 5 )
        + 'Z';
};

endpoint.utils.fromDateToTimestamp = function(params) {
    if (!!params) {
        return {timestamp: new Date(params).getTime()};
    }
    return null;
};

endpoint.utils.fromMillisToDate = function(params) {
    if (!!params) {
        var sdf = new Intl.DateTimeFormat('en-US', {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            timeZone: 'UTC'
        });
        return {date: sdf.format(new Date(parseInt(params)))};
    }
    return null;
};

///////////////////////
//  Private helpers  //
///////////////////////

var mergeJSON = function (json1, json2) {
    const result = {};
    var key;
    for (key in json1) {
        if(json1.hasOwnProperty(key)) result[key] = json1[key];
    }
    for (key in json2) {
        if(json2.hasOwnProperty(key)) result[key] = json2[key];
    }
    return result;
}

var concatQuery = function (url, key, value) {
    return url + ((!url || url.indexOf('?') < 0) ? '?' : '&') + key + "=" + value;
}

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
}

var isObject = function (obj) {
    return !!obj && stringType(obj) === '[object Object]'
}

var stringType = Function.prototype.call.bind(Object.prototype.toString)

var parse = function (str) {
    try {
        if (arguments.length > 1) {
            var args = arguments[1], i = 0;
            return str.replace(/(:(?:\w|-)+)/g, () => {
                if (typeof (args[i]) != 'string') throw new Error('Invalid type of argument: [' + args[i] + '] for url [' + str + '].');
                return args[i++];
            });
        } else {
            if (str) {
                return str;
            }
            throw new Error('No arguments nor url were received when calling the helper. Please check it\'s definition.');
        }
    } catch (err) {
        sys.logs.error('Some unexpected error happened during the parse of the url for this helper.')
        throw err;
    }
}