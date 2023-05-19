---
title: Twitter endpoint
keywords: 
last_updated: May 24, 2018
tags: []
summary: "Detailed description of the API of the Twitter endpoint."
---

## Overview

Twitter endpoint allows to easy interact with Twitter platfrom as an app or a user. It provides the following features:

- OAuth for users
- Make operations for apps and users context
- Shortcuts to access the REST API

In order to take advantage of this endpoint we strongly recommend to understand how Twitter Apps work and
what you can do with the REST API:

- [Twitter Apps](https://apps.twitter.com/)
- [Twitter REST API](https://developer.twitter.com/en/docs/basics/getting-started)

## Configuration

In order to configure the endpoint you will need to create a Twitter App. This can be done in your personal
account or under an organization. Here you can create your app:

[Creating Twitter Apps](https://apps.twitter.com/app/new)

Once you have created your app you will be able to configure the endpoint.

### Consumer Key (API Key) 

This is the api key used for Oauth, it will allow to endpoint to connect to target application.

### Consumer Secret (API Secret)

This is the api key used for Oauth, it will allow to endpoint to sign requests to target application.

### OAuth callback

This is the URL where Twitter will redirect after user authentication. I must be set in Twitter app as valid `Callback URL`

## Quick start

Once you endpoint is configured, you can search a tweet like this:

```js
var tweets = app.endpoints.twitter.app.searchTweets({q: 'Test'});
```

And can post a tweet with this code:

```js
var newTweet = app.endpoints.twitter.user.tweet({status: 'Tweet with geo 4', lat: -32.8982686, long: -68.8502522, display_coordinates:true});
```

## Javascript API

The Javascript API of the endpoint is based on the [Twitter REST API for tweets](https://developer.twitter.com/en/docs/tweets/post-and-engage/overview),
so developer should see their documentation for details on parameters and data formats. If there are differences
they will be explained here.

Be sure to honor required fields describe by mentioned API, otherwise the result will be an error.

### HTTP requests

You can make `GET`, and `POST` request to the [Twitter REST API](https://developer.twitter.com/en/docs.html) 
like this:

```js
var timeline = app.endpoints.twitter.get('/1.1/statuses/home_timeline.json'); //requires user authentication
var trends = app.endpoints.twitter.appGet('/1.1/trends/place.json', {id: 332471}); //public functions
var tweet = {
    status: 'Hello world!'
};

var newTweet = app.endpoints.twitter.post('/1.1/statuses/update.json', {params: tweet}); //requires user authentication
```

Please take a look at the documentation of the [HTTP endpoint]({{site.baseurl}}/endpoints_http.html#javascript-api)
for more information.

### App

This namespace allow to interact using API without any user login. Therefore, its methods only can read public information.


#### Search Tweets

Gets a list of statuses (tweets) matching with criteria. Keep in mind it will only retrieve public information.
For details of search process check [official documentation](https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets.html).

Samples:

```js
var res = app.endpoints.twitter.app.searchTweets({q: 'Test', result_type: 'popular'});

if (res.statuses) {
    //do something
}
```

### User

This namespace allow to interact using API as a user. To do this, user needs to connect to Twitter through his integrations
in SLINGR app and grant access.

#### Search Tweets

This works in the same way than for `app` namespace, but will retrieve results that authenticated user has access.

Samples:

```js
var tweets = app.endpoints.twitter.user.searchTweets({q: 'Test', lang: 'es'});
```

#### Tweet

Post a status (tweet) as logged in user. `status` field is required by API, then it must be present always in body.
For details of update status check [official documentation](https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-update).

Samples:

```js
var newTweet = app.endpoints.twitter.user.tweet({status: 'Tweet with geo 4', lat: -32.8982686, long: -68.8502522, display_coordinates:true});
```

#### Show

Gets detail of a tweet based on its `id`. For details of show method see [official documentation](https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-show-id).

Samples:

```js
var tweet = app.endpoints.twitter.user.show('999405915102154753');
```

#### Lookup

Gets hydrated detail of a list of tweets based on their `id`s disposed as a comma separated string. This list is passed as an 
attribute in criteria object. For details of lookup method see [official documentation](https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-lookup).

Samples:

```js
var tweets = app.endpoints.twitter.user.lookup({id: '999405915102154753,84927983912,47298374982', map: true});
```

#### Remove

Deletes a status based on its `id`. For details of remove method see [official documentation](https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-destroy-id).

Samples:

```js
var deleted = app.endpoints.twitter.user.remove('999405915102154753');
```

#### Retweet

Retweets a status based on its `id`. For details of retweet method see [official documentation](https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-retweet-id).

Samples:

```js
var retweeted = app.endpoints.twitter.user.retweet('999405915102154753');
```

#### Undo Retweet

Untweets a retweeted status based on its `id`. For details of unretweet method see [official documentation](https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-unretweet-id).

Samples:

```js
var unretweeted = app.endpoints.twitter.user.unretweet('999405915102154753');
```

#### Retweets

Get a list of retwees of a status based on its `id`. For details of retweets check [official documentation](https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-retweets-id).

Samples:

```js
var retweetsOfTests = app.endpoints.twitter.user.retweets('999405915102154753');
```

#### Retweets of me

Get a list of tweets of current user that has been retweeted by others. For details of retweets of me method check [official documentation](https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-retweets_of_me).

Samples:

```js
var retweetsOfMe = app.endpoints.twitter.user.retweetsOfMe();
```

#### Retweeters

Get a list of ID of users who have retweeted a status based on its `id`. For details of retweets check [official documentation](https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-retweeters-ids).

Samples:

```js
var retweetersOfTests = app.endpoints.twitter.user.retweeters('999405915102154753');
```

#### Like (Favourite)

Mark a status as favourite (like) based on its `id`. For details of favourite method see [official documentation](https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-favorites-create).

Samples:

```js
var liked = app.endpoints.twitter.user.like('999405915102154753');
```

#### Unmark as favourite (Undo like)

Unfavorites (un-likes) a status based on its `id`. For details of unlike method see [official documentation](https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-favorites-destroy).

Samples:

```js
var unliked = app.endpoints.twitter.user.undoLike('999405915102154753');
```

#### My likes

Gets list of tweets marked by current user as favourite (like). For details of lookup method see [official documentation](https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-favorites-list).

Samples:

```js
var likedTweets = app.endpoints.twitter.user.myLikes();
```

#### Upload

Uploads a file as logged in user using a `fileId` valid into SLINGR. This method will do three steps describes in API.
Any fail in upload process will be thrown as exception excepts when `FINALIZE` step will end in `failed` where user must
check the response of this method. Keep in mind this method will wait until Twitter responses a final state for upload.
For details of upload check [official documentation](https://developer.twitter.com/en/docs/media/upload-media/api-reference).

Samples:

```js
var mediaResponse = app.endpoints.twitter.user.upload(record.field('logo').id());
if (!mediaResponse.processing_info || mediaResponse.processing_info.state == 'succeeded') {
    var tweet = app.endpoints.twitter.user.tweet({status: 'Example of tweet with media', media_ids:mediaResponse.media_id_string})
}
```

## Events

This endpoint does not provide any event for now.

# Javascript API

The Javascript API of the twitter endpoint has three pieces:

- **HTTP requests**: These allow to make regular HTTP requests.
- **Shortcuts**: These are helpers to make HTTP request to the API in a more convenient way.
- **Additional Helpers**: These helpers provide additional features that facilitate or improves the endpoint usage in SLINGR.

## HTTP requests
You can make `GET`,`POST`,`DELETE`,`PUT` requests to the [twitter API](API_URL_HERE) like this:
```javascript
var response = app.endpoints.twitter.get('/2/dm_conversations/with/:participant_id/dm_events')
var response = app.endpoints.twitter.post('/2/users/:id/likes', body)
var response = app.endpoints.twitter.post('/2/users/:id/likes')
var response = app.endpoints.twitter.delete('/2/tweets/:id')
var response = app.endpoints.twitter.put('/2/tweets/:id/hidden', body)
var response = app.endpoints.twitter.put('/2/tweets/:id/hidden')
```

Please take a look at the documentation of the [HTTP endpoint](https://github.com/slingr-stack/http-endpoint#javascript-api)
for more information about generic requests.

## Shortcuts

Instead of having to use the generic HTTP methods, you can (and should) make use of the helpers provided in the endpoint:
<details>
    <summary>Click here to see all the helpers</summary>

<br>

* API URL: '/2/tweets/:id'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.tweets.get(id)
```
---
* API URL: '/2/tweets'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.tweets.get()
```
---
* API URL: '/2/users/:id'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.users.get(id)
```
---
* API URL: '/2/users'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.users.get()
```
---
* API URL: '/2/users/by/username/:username'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.users.by.username.get(username)
```
---
* API URL: '/2/users/by'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.users.by.get()
```
---
* API URL: '/2/users/:id/followers'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.users.followers.get(id)
```
---
* API URL: '/2/users/:id/following'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.users.following.get(id)
```
---
* API URL: '/2/users/:id/blocking'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.users.blocking.get(id)
```
---
* API URL: '/2/lists/:id'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.lists.get(id)
```
---
* API URL: '/2/users/:id/owned_lists'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.users.ownedLists.get(id)
```
---
* API URL: '/2/lists/:id/tweets'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.lists.tweets.get(id)
```
---
* API URL: '/2/lists/:id/members'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.lists.members.get(id)
```
---
* API URL: '/2/users/:id/list_memberships'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.users.listMemberships.get(id)
```
---
* API URL: '/2/lists/:id/followers'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.lists.followers.get(id)
```
---
* API URL: '/2/users/:id/followed_lists'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.users.followedLists.get(id)
```
---
* API URL: '/2/users/:id/pinned_lists'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.users.pinnedLists.get(id)
```
---
* API URL: '/2/users/:id/muting'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.users.muting.get(id)
```
---
* API URL: '/2/tweets/:id/quote_tweets'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.tweets.quoteTweets.get(id)
```
---
* API URL: '/2/tweets/search/recent'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.tweets.search.recent.get()
```
---
* API URL: '/2/tweets/search/all'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.tweets.search.all.get()
```
---
* API URL: '/2/tweets/counts/recent'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.tweets.counts.recent.get()
```
---
* API URL: '/2/tweets/counts/all'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.tweets.counts.all.get()
```
---
* API URL: '/2/tweets/search/stream/rules'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.tweets.search.stream.rules.get()
```
---
* API URL: '/2/tweets/search/stream'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.tweets.search.stream.get()
```
---
* API URL: '/2/tweets/sample/stream'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.tweets.sample.stream.get()
```
---
* API URL: '/2/spaces/:id'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.spaces.get(id)
```
---
* API URL: '/2/spaces'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.spaces.get()
```
---
* API URL: '/2/spaces/by/creator_id'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.spaces.by.creatorId.get()
```
---
* API URL: '/2/spaces/:id/buyers'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.spaces.buyers.get(id)
```
---
* API URL: '/2/spaces/search'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.spaces.search.get()
```
---
* API URL: '/2/compliance/jobs'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.compliance.jobs.get()
```
---
* API URL: '/2/compliance/jobs/:id'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.compliance.jobs.get(id)
```
---
* API URL: '/2/users/:id/liked_tweets'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.users.likedTweets.get(id)
```
---
* API URL: '/2/tweets/:id/liking_users'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.tweets.likingUsers.get(id)
```
---
* API URL: '/2/tweets/:id/retweeted_by'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.tweets.retweetedBy.get(id)
```
---
* API URL: '/2/users/:id/bookmarks'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.users.bookmarks.get(id)
```
---
* API URL: '/2/users/:id/timelines/reverse_chronological'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.users.timelines.reverseChronological.get(id)
```
---
* API URL: '/2/users/:id/tweets'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.users.tweets.get(id)
```
---
* API URL: '/2/users/:id/mentions'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.users.mentions.get(id)
```
---
* API URL: '/2/dm_conversations/with/:participant_id/dm_events'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.dmConversations.with.dmEvents.get(participantId)
```
---
* API URL: '/2/dm_conversations/:dm_conversation_id/dm_events'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.dmConversations.dmEvents.get(dmConversationId)
```
---
* API URL: '/2/dm_events'
* HTTP Method: 'GET'
```javascript
app.endpoints.twitter.dmEvents.get()
```
---
* API URL: '/2/users/:id/following'
* HTTP Method: 'POST'
```javascript
app.endpoints.twitter.users.following.post(id, body)
```
---
* API URL: '/2/users/:id/blocking'
* HTTP Method: 'POST'
```javascript
app.endpoints.twitter.users.blocking.post(id, body)
```
---
* API URL: '/2/lists'
* HTTP Method: 'POST'
```javascript
app.endpoints.twitter.lists.post(body)
```
---
* API URL: '/2/lists/:id/members'
* HTTP Method: 'POST'
```javascript
app.endpoints.twitter.lists.members.post(id, body)
```
---
* API URL: '/2/users/:id/followed_lists'
* HTTP Method: 'POST'
```javascript
app.endpoints.twitter.users.followedLists.post(id, body)
```
---
* API URL: '/2/users/:id/pinned_lists'
* HTTP Method: 'POST'
```javascript
app.endpoints.twitter.users.pinnedLists.post(id, body)
```
---
* API URL: '/2/tweets'
* HTTP Method: 'POST'
```javascript
app.endpoints.twitter.tweets.post(body)
```
---
* API URL: '/2/users/:id/muting'
* HTTP Method: 'POST'
```javascript
app.endpoints.twitter.users.muting.post(id, body)
```
---
* API URL: '/2/tweets/search/stream/rules'
* HTTP Method: 'POST'
```javascript
app.endpoints.twitter.tweets.search.stream.rules.post(body)
```
---
* API URL: '/2/compliance/jobs'
* HTTP Method: 'POST'
```javascript
app.endpoints.twitter.compliance.jobs.post(body)
```
---
* API URL: '/2/users/:id/likes'
* HTTP Method: 'POST'
```javascript
app.endpoints.twitter.users.likes.post(id, body)
```
---
* API URL: '/2/users/:id/retweets'
* HTTP Method: 'POST'
```javascript
app.endpoints.twitter.users.retweets.post(id, body)
```
---
* API URL: '/2/users/:id/bookmarks'
* HTTP Method: 'POST'
```javascript
app.endpoints.twitter.users.bookmarks.post(id, body)
```
---
* API URL: '/2/dm_conversations/with/:participant_id/messages'
* HTTP Method: 'POST'
```javascript
app.endpoints.twitter.dmConversations.with.messages.post(participantId, body)
```
---
* API URL: '/2/dm_conversations'
* HTTP Method: 'POST'
```javascript
app.endpoints.twitter.dmConversations.post(body)
```
---
* API URL: '/2/dm_conversations/:dm_conversation_id/messages'
* HTTP Method: 'POST'
```javascript
app.endpoints.twitter.dmConversations.messages.post(dmConversationId, body)
```
---
* API URL: '/2/users/:source_user_id/following/:target_user_id'
* HTTP Method: 'DELETE'
```javascript
app.endpoints.twitter.users.following.delete(sourceUserId, targetUserId)
```
---
* API URL: '/2/users/:source_user_id/blocking/:target_user_id'
* HTTP Method: 'DELETE'
```javascript
app.endpoints.twitter.users.blocking.delete(sourceUserId, targetUserId)
```
---
* API URL: '/2/lists/:id'
* HTTP Method: 'DELETE'
```javascript
app.endpoints.twitter.lists.delete(id)
```
---
* API URL: '/2/lists/:id/members/:user_id'
* HTTP Method: 'DELETE'
```javascript
app.endpoints.twitter.lists.members.delete(id, userId)
```
---
* API URL: '/2/users/:id/followed_lists/:list_id'
* HTTP Method: 'DELETE'
```javascript
app.endpoints.twitter.users.followedLists.delete(id, listId)
```
---
* API URL: '/2/lists/:id/pinned_lists/:list_id'
* HTTP Method: 'DELETE'
```javascript
app.endpoints.twitter.lists.pinnedLists.delete(id, listId)
```
---
* API URL: '/2/tweets/:id'
* HTTP Method: 'DELETE'
```javascript
app.endpoints.twitter.tweets.delete(id)
```
---
* API URL: '/2/users/:source_user_id/muting/:target_user_id'
* HTTP Method: 'DELETE'
```javascript
app.endpoints.twitter.users.muting.delete(sourceUserId, targetUserId)
```
---
* API URL: '/2/users/:id/likes/:tweet_id'
* HTTP Method: 'DELETE'
```javascript
app.endpoints.twitter.users.likes.delete(id, tweetId)
```
---
* API URL: '/2/users/:id/retweets/:source_tweet_id'
* HTTP Method: 'DELETE'
```javascript
app.endpoints.twitter.users.retweets.delete(id, sourceTweetId)
```
---
* API URL: '/2/users/:id/bookmarks/:tweet_id'
* HTTP Method: 'DELETE'
```javascript
app.endpoints.twitter.users.bookmarks.delete(id, tweetId)
```
---
* API URL: '/2/lists/:id'
* HTTP Method: 'PUT'
```javascript
app.endpoints.twitter.lists.put(id, body)
```
---
* API URL: '/2/tweets/:id/hidden'
* HTTP Method: 'PUT'
```javascript
app.endpoints.twitter.tweets.hidden.put(id, body)
```
---

</details>

## Flow Step

As an alternative option to using scripts, you can make use of Flows and Flow Steps specifically created for the endpoint:
<details>
    <summary>Click here to see the Flow Steps</summary>

<br>



### Generic Flow Step

Generic flow step for full use of the entire endpoint and its services.

<h3>Inputs</h3>

<table>
    <thead>
    <tr>
        <th>Label</th>
        <th>Type</th>
        <th>Required</th>
        <th>Default</th>
        <th>Visibility</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>URL (Method)</td>
        <td>choice</td>
        <td>yes</td>
        <td> - </td>
        <td>Always</td>
        <td>
            This is the http method to be used against the endpoint. <br>
            Possible values are: <br>
            <i><strong>GET,POST,DELETE,PUT</strong></i>
        </td>
    </tr>
    <tr>
        <td>URL (Path)</td>
        <td>choice</td>
        <td>yes</td>
        <td> - </td>
        <td>Always</td>
        <td>
            The url to which this endpoint will send the request. This is the exact service to which the http request will be made. <br>
            Possible values are: <br>
            <i><strong>/2/tweets/{id}<br>/2/tweets<br>/2/users/{id}<br>/2/users<br>/2/users/by/username/{username}<br>/2/users/by<br>/2/users/{id}/followers<br>/2/users/{id}/following<br>/2/users/{id}/blocking<br>/2/lists/{id}<br>/2/users/{id}/owned_lists<br>/2/lists/{id}/tweets<br>/2/lists/{id}/members<br>/2/users/{id}/list_memberships<br>/2/lists/{id}/followers<br>/2/users/{id}/followed_lists<br>/2/users/{id}/pinned_lists<br>/2/users/{id}/muting<br>/2/tweets/{id}/quote_tweets<br>/2/tweets/search/recent<br>/2/tweets/search/all<br>/2/tweets/counts/recent<br>/2/tweets/counts/all<br>/2/tweets/search/stream/rules<br>/2/tweets/search/stream<br>/2/tweets/sample/stream<br>/2/spaces/{id}<br>/2/spaces<br>/2/spaces/by/creator_id<br>/2/spaces/{id}/buyers<br>/2/spaces/search<br>/2/compliance/jobs<br>/2/compliance/jobs/{id}<br>/2/users/{id}/liked_tweets<br>/2/tweets/{id}/liking_users<br>/2/tweets/{id}/retweeted_by<br>/2/users/{id}/bookmarks<br>/2/users/{id}/timelines/reverse_chronological<br>/2/users/{id}/tweets<br>/2/users/{id}/mentions<br>/2/dm_conversations/with/{participant_id}/dm_events<br>/2/dm_conversations/{dm_conversation_id}/dm_events<br>/2/dm_events<br>/2/users/{id}/following<br>/2/users/{id}/blocking<br>/2/lists<br>/2/lists/{id}/members<br>/2/users/{id}/followed_lists<br>/2/users/{id}/pinned_lists<br>/2/tweets<br>/2/users/{id}/muting<br>/2/tweets/search/stream/rules<br>/2/compliance/jobs<br>/2/users/{id}/likes<br>/2/users/{id}/retweets<br>/2/users/{id}/bookmarks<br>/2/dm_conversations/with/{participant_id}/messages<br>/2/dm_conversations<br>/2/dm_conversations/{dm_conversation_id}/messages<br>/2/users/{source_user_id}/following/{target_user_id}<br>/2/users/{source_user_id}/blocking/{target_user_id}<br>/2/lists/{id}<br>/2/lists/{id}/members/{user_id}<br>/2/users/{id}/followed_lists/{list_id}<br>/2/lists/{id}/pinned_lists/{list_id}<br>/2/tweets/{id}<br>/2/users/{source_user_id}/muting/{target_user_id}<br>/2/users/{id}/likes/{tweet_id}<br>/2/users/{id}/retweets/{source_tweet_id}<br>/2/users/{id}/bookmarks/{tweet_id}<br>/2/lists/{id}<br>/2/tweets/{id}/hidden<br></strong></i>
        </td>
    </tr>
    <tr>
        <td>Headers</td>
        <td>keyValue</td>
        <td>no</td>
        <td> - </td>
        <td>Always</td>
        <td>
            Used when you want to have a custom http header for the request.
        </td>
    </tr>
    <tr>
        <td>Query Params</td>
        <td>keyValue</td>
        <td>no</td>
        <td> - </td>
        <td>Always</td>
        <td>
            Used when you want to have a custom query params for the http call.
        </td>
    </tr>
    <tr>
        <td>Body</td>
        <td>json</td>
        <td>no</td>
        <td> - </td>
        <td>Always</td>
        <td>
            A payload of data can be sent to the server in the body of the request.
        </td>
    </tr>
    <tr>
        <td>Override Settings</td>
        <td>boolean</td>
        <td>no</td>
        <td> false </td>
        <td>Always</td>
        <td></td>
    </tr>
    <tr>
        <td>Follow Redirect</td>
        <td>boolean</td>
        <td>no</td>
        <td> false </td>
        <td> overrideSettings </td>
        <td>Indicates that the resource has to be downloaded into a file instead of returning it in the response.</td>
    </tr>
    <tr>
        <td>Download</td>
        <td>boolean</td>
        <td>no</td>
        <td> false </td>
        <td> overrideSettings </td>
        <td>If true the method won't return until the file has been downloaded, and it will return all the information of the file.</td>
    </tr>
    <tr>
        <td>File name</td>
        <td>text</td>
        <td>no</td>
        <td></td>
        <td> overrideSettings </td>
        <td>If provided, the file will be stored with this name. If empty the file name will be calculated from the URL.</td>
    </tr>
    <tr>
        <td>Full response</td>
        <td> boolean </td>
        <td>no</td>
        <td> false </td>
        <td> overrideSettings </td>
        <td>Include extended information about response</td>
    </tr>
    <tr>
        <td>Connection Timeout</td>
        <td> number </td>
        <td>no</td>
        <td> 5000 </td>
        <td> overrideSettings </td>
        <td>Connect timeout interval, in milliseconds (0 = infinity).</td>
    </tr>
    <tr>
        <td>Read Timeout</td>
        <td> number </td>
        <td>no</td>
        <td> 60000 </td>
        <td> overrideSettings </td>
        <td>Read timeout interval, in milliseconds (0 = infinity).</td>
    </tr>
    </tbody>
</table>

<h3>Outputs</h3>

<table>
    <thead>
    <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>response</td>
        <td>object</td>
        <td>
            Object resulting from the response to the endpoint call.
        </td>
    </tr>
    </tbody>
</table>


</details>

For more information about how shortcuts or flow steps works, and how they are generated, take a look at the [slingr-helpgen tool](https://github.com/slingr-stack/slingr-helpgen).

## Additional Flow Step


<details>
    <summary>Click here to see the Customs Flow Steps</summary>

<br>



### Custom Flow Steps Name

Description of Custom Flow Steps

### Create Tweet

Creates a Tweet on behalf of an authenticated user.

<h3>Inputs</h3>

<table>
    <thead>
    <tr>
        <th>Label</th>
        <th>Type</th>
        <th>Required</th>
        <th>Default</th>
        <th>Visibility</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>Text</td>
        <td>text</td>
        <td>yes</td>
        <td> - </td>
        <td>Always</td>
        <td>
            Text of the Tweet being created.
        </td>
    </tr>
    </tbody>
</table>

<h3>Outputs</h3>

<table>
    <thead>
    <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>response</td>
        <td>object</td>
        <td>
            Object resulting from the response to the endpoint call.
        </td>
    </tr>
    </tbody>
</table>


### Delete a tweet

Allows a user or authenticated user ID to delete a Tweet.

<h3>Inputs</h3>

<table>
    <thead>
    <tr>
        <th>Label</th>
        <th>Type</th>
        <th>Required</th>
        <th>Default</th>
        <th>Visibility</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>Tweet Id</td>
        <td>text</td>
        <td>yes</td>
        <td> - </td>
        <td>Always</td>
        <td>
            The Tweet ID you are deleting.
        </td>
    </tr>
    </tbody>
</table>

<h3>Outputs</h3>

<table>
    <thead>
    <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>response</td>
        <td>object</td>
        <td>
            Object resulting from the response to the endpoint call.
        </td>
    </tr>
    </tbody>
</table>


### User lookup

Returns a variety of information about one user specified by the requested ID.

<h3>Inputs</h3>

<table>
    <thead>
    <tr>
        <th>Label</th>
        <th>Type</th>
        <th>Required</th>
        <th>Default</th>
        <th>Visibility</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>User Id</td>
        <td>text</td>
        <td>yes</td>
        <td> - </td>
        <td>Always</td>
        <td>
            Unique identifier of this user. This is returned as a string in order to avoid complications with languages and tools that cannot handle large integers.
        </td>
    </tr>
    </tbody>
</table>

<h3>Outputs</h3>

<table>
    <thead>
    <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>response</td>
        <td>object</td>
        <td>
            Object resulting from the response to the endpoint call.
        </td>
    </tr>
    </tbody>
</table>


</details>

## Additional Helpers
*MANUALLY ADD THE DOCUMENTATION OF THESE HELPERS HERE...*

## About SLINGR

SLINGR is a low-code rapid application development platform that accelerates development, with robust architecture for integrations and executing custom workflows and automation.

[More info about SLINGR](https://slingr.io)

## License

This endpoint is licensed under the Apache License 2.0. See the `LICENSE` file for more details.
