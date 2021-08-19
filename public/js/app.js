const requestModal = document.querySelector(".new-request");
const requestLink = document.querySelector(".add-request");

// open request modal
requestLink.addEventListener("click", () => {
	requestModal.classList.add("open");
});

// close request modal
requestModal.addEventListener("click", (e) => {
	if (e.target.classList.contains("new-request")) {
		requestModal.classList.remove("open");
	}
});

// say hello function call
const button = document.querySelector('.call');
button.addEventListener('click', () => {
	// get function reference
	// this functions is from the firebase SDK
	// loops through all of our cloud functions till it finds one with name "sayHello"
	const sayHello = firebase.functions().httpsCallable('sayHello');
	// Invoke the function which returns a promise
	// you can pass data to the function
	sayHello({ name: santi })
	.then(result => {
		// the result.data is exactly what we have in the return statement
		console.log(result.data);
	});
})