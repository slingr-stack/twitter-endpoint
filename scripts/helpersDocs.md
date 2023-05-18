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

*MANUALLY ADD THE DOCUMENTATION OF THESE FLOW STEPS HERE...*


</details>

## Additional Helpers
*MANUALLY ADD THE DOCUMENTATION OF THESE HELPERS HERE...*