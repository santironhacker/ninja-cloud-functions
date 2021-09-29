const authSwitchLinks = document.querySelectorAll(".switch");
const authModals = document.querySelectorAll(".auth .modal"); // to only grab the modals inside the auth div
const authWrapper = document.querySelector(".auth");

authSwitchLinks.forEach((link) => {
	link.addEventListener("click", () => {
		authModals.forEach((modal) => {
			modal.classList.toggle("active");
		});
	});
});
