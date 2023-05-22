step.deleteTweetTwitter = function (inputs) {

	var inputsLogic = {
		tweetId : inputs.tweetId || ""
	};

	var options = {
		path: "/2/tweets/" + inputsLogic.tweetId
	}

	return endpoint._delete(options);
}