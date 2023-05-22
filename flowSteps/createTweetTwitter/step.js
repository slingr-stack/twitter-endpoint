step.createTweetTwitter = function (inputs) {

    var inputsLogic = {
        text: inputs.text || ""
    };

    var options = {
        path: "/2/tweets",
        body: inputsLogic
    }

    return endpoint._post(options);

}