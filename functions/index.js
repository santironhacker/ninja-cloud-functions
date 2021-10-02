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

// http callable function
// we don't get a response object so we just return wathever we want to the endpoint
exports.sayHello = functions.https.onCall((data, context) => {
	const user = data.name;
	return `Hello ${user}`;
});

/* USER AUTH LISTENERS */
const admin = require("firebase-admin");
admin.initializeApp();

// auth trigger (new user signup)
exports.newUserSignUp = functions.auth.user().onCreate((user) => {
	// for background triggers you must return a value/promise
	return admin.firestore().collection("users").doc(user.uid).set({
		email: user.email,
		upvotedOn: [],
	});
});

// auth trigger (user deleted)
exports.userDeleted = functions.auth.user().onDelete((user) => {
	const doc = admin.firestore().collection("users").doc(user.uid);
	return doc.delete();
});

// http callable function (adding a request)
exports.addRequest = functions.https.onCall((data, context) => {
	if (!context.auth) {
		throw new functions.https.HttpsError(
			"unauthenticated", // this is an error code from the list https://firebase.google.com/docs/reference/functions/providers_https_#functionserrorcode
			"only authenticated users can add requests"
		);
	}
	if (data.text.length > 30) {
		throw new functions.https.HttpsError(
			"invalid-argument",
			"request must be no more than 30 characters long"
		);
	}
	// when we call we need to return something to the user
	return admin.firestore().collection("requests").add({
		text: data.text,
		upvotes: 0,
	});
});
