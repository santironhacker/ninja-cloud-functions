const functions = require("firebase-functions");

// Deploy command
// Use: firebase deploy --only functions

// http request 1
// https.onRequest will generate like an endpoint we can reach out from the front
exports.randomNumber = functions.https.onRequest((request, response) => {
	const number = Math.round(Math.random() * 100);
	console.log("random number", number);
	response.send(number.toString());
});

exports.toTheDojo = functions.https.onRequest((request, response) => {
	// response.redirect('https://www.thenetninja.co.uk');
	response.redirect("https://www.codewars.com");
});
