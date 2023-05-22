step.getUserTwitter = function (inputs) {

	var inputsLogic = {
		userId : inputs.userId || ""
	};

	var options = {
		path: "/2/users/" + inputsLogic.userId
	}

	return endpoint._get(options);

}