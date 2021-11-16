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

## About SLINGR

SLINGR is a low-code rapid application development platform that accelerates development, with robust architecture for integrations and executing custom workflows and automation.

[More info about SLINGR](https://slingr.io)

## License

This endpoint is licensed under the Apache License 2.0. See the `LICENSE` file for more details.
