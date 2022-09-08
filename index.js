const submitBtn = document.querySelector("#submit-btn");
const firstNameInput = document.querySelector("#fname");
const lastNameInput = document.querySelector("#lname");
const phoneNumberInput = document.querySelector("#phoneNumber");
const printOutAddresses = document.querySelector(".output");

displayAddresses();
// let ourAddresses = JSON.parse(localStorage.getItem("addressesInfo")) || [];

document.querySelector("form").addEventListener("submit", (e) => {
	e.preventDefault();

	const formData = new FormData(e.target);
	console.log(Object.fromEntries(formData));

	let ourData = Object.fromEntries(formData);
	ourData.isFavorite = false;

	let ourAddresses = JSON.parse(localStorage.getItem("addressesInfo")) || [];

	ourAddresses.unshift(ourData);
	// console.log(ourAddresses);

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

	ourAddresses.forEach((ourAddress, index) => {
		let deleteButton = document.createElement("button");
		deleteButton.setAttribute("class", "deleteBtn");
		deleteButton.setAttribute("id", index);
		deleteButton.textContent = "Delete";

		let favoriteButton = document.createElement("button");
		favoriteButton.setAttribute("class", "favoriteBtn");
		favoriteButton.setAttribute("id", index);
		favoriteButton.appendChild(document.createTextNode("Add to favorites"));

		let changeAddress = document.createElement("button");
		changeAddress.setAttribute("class", "changeAddress");
		changeAddress.setAttribute("id", index);
		changeAddress.appendChild(document.createTextNode("Change address"));

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
				.addEventListener("click", onDeleteButtonClick);

			ul.appendChild(addressesHolder);

			//adding favorite button to li element
			addressesHolder
				.appendChild(favoriteButton)
				.addEventListener("click", addAsFavorite);

			ul.appendChild(addressesHolder);

			addressesHolder
				.appendChild(changeAddress)
				.addEventListener("click", editAddress);

			ul.appendChild(addressesHolder);
		}

		printOutAddresses.appendChild(ul);
	});
}

function onDeleteButtonClick(e) {
	let id = e.target.id;
	console.log(id);
	let item = e.target.parentNode;
	item.remove();

	let ourAddresses = JSON.parse(localStorage.getItem("addressesInfo")) || [];

	ourAddresses.splice(id, 1);
	localStorage.setItem("addressesInfo", JSON.stringify(ourAddresses));
}

function addAsFavorite(e) {
	let id = e.target.id;

	let ourAddresses = JSON.parse(localStorage.getItem("addressesInfo")) || [];

	if (ourAddresses[id].isFavorite === true) {
		ourAddresses[id].isFavorite = false;
	} else {
		ourAddresses[id].isFavorite = true;
	}

	console.log(ourAddresses);
	localStorage.setItem("addressesInfo", JSON.stringify(ourAddresses));

	displayAddresses();
}

function editAddress(e) {
	// perpiesiam adresu knyga, sugeneruot input fieldus su tekstu ir tuomet pakeisti juose ir issaugoti

	let id = e.target.id;
	console.log(id);
	let ourAddresses = JSON.parse(localStorage.getItem("addressesInfo")) || [];
}

// function searchForAddress() {

// }
