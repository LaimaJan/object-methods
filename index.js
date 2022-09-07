const submitBtn = document.querySelector("#submit-btn");
const firstNameInput = document.querySelector("#fname");
const lastNameInput = document.querySelector("#lname");
const phoneNumberInput = document.querySelector("#phoneNumber");
const printOutAddresses = document.querySelector(".output");

displayAddresses();
let ourAddresses = JSON.parse(localStorage.getItem("addressesInfo")) || [];

document.querySelector("form").addEventListener("submit", (e) => {
	e.preventDefault();

	const formData = new FormData(e.target);
	console.log(Object.fromEntries(formData));

	ourAddresses.unshift(Object.fromEntries(formData));
	console.log(ourAddresses);

	localStorage.setItem("addressesInfo", JSON.stringify(ourAddresses));

	displayAddresses();
});

function displayAddresses() {
	let ourAddresses = JSON.parse(localStorage.getItem("addressesInfo")) || [];
	// console.log(ourAddresses);
	const ourAddressList = document.querySelector("ul");
	if (ourAddressList !== null) {
		ourAddressList.remove();
	}
	const ul = document.createElement("ul");

	ourAddresses.forEach((ourAddress) => {
		let deleteButton = document.createElement("button");
		deleteButton.setAttribute("class", "deleteBtn");
		deleteButton.textContent = "Delete";

		let favoriteButton = document.createElement("button");
		favoriteButton.setAttribute("class", "favoriteBtn");
		favoriteButton.appendChild(document.createTextNode("Add to favorites"));

		let addressesHolder = document.createElement("div");
		addressesHolder.setAttribute("class", "addressHolderDiv");

		for (const key in ourAddress) {
			// console.log(`${key}: ${ourAddress[key]}`);
			let newAddress = document.createElement("li");
			newAddress.innerHTML += `${key}: ${ourAddress[key]}`;
			addressesHolder.appendChild(newAddress);

			//adding delete button to li element
			addressesHolder
				.appendChild(deleteButton)
				.addEventListener("click", deleteAddress);

			ul.appendChild(addressesHolder);

			//adding favorite button to li element
			addressesHolder
				.appendChild(favoriteButton)
				.addEventListener("click", addAsFavorite);

			ul.appendChild(addressesHolder);
		}

		printOutAddresses.appendChild(ul);
	});
}

function deleteAddress() {
	let deleteElements = document.getElementsByClassName("deleteBtn");
	for (let i = 0; i < deleteElements.length; i++) {
		deleteElements[i].addEventListener("click", removeItem);
	}

	function removeItem(e) {
		let item = e.target.parentNode;
		let experiment = ourAddresses.findIndex;
		console.log(item);
		item.remove();
		localStorage.removeItem(item);
		localStorage.setItem("addressesInfo", JSON.stringify(ourAddresses));
	}
}

function addAsFavorite() {
	let favoriteElements = document.getElementsByClassName("favoriteBtn");
	for (let i = 0; i < favoriteElements.length; i++) {
		favoriteElements[i].addEventListener("click", colouringInAddress);
	}

	function colouringInAddress() {
		const favoriteButton = document.querySelector(".favoriteBtn");
		favoriteButton.classList.toggle("favBtnChanged");
		this.parentNode.style.backgroundColor = "#f9ed69";
	}

	// let isFavorite = true;
	// ourAddresses.unshift(isFavorite);
	// console.log(ourAddresses); //nesamone
	// localStorage.setItem("addressesInfo", JSON.stringify(ourAddresses));
}

// function editAddress() {

// }

// function searchForAddress() {

// }
