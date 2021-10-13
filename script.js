var enterButton = document.getElementById("enter");
var input = document.getElementById("userInput");
var ul = document.querySelector("ul");
var item = document.getElementsByTagName("li");

/* Registraion and login window */
function fnc_login() {
    var enteredEmail = document.getElementById("email").value;
    var enteredPassword = document.getElementById("password").value;
	var emailKey = enteredEmail;
	var passwordKey = `${enteredEmail}-password`;
	var namesKey = `${enteredEmail}-names`;
    var storedEmail = localStorage.getItem(emailKey);
    var storedPassword = localStorage.getItem(passwordKey);

    if ((enteredEmail == storedEmail) && (enteredPassword == storedPassword)) {
        location = "bulletjournal.html";

    } else if (enteredEmail == "") {
        alert("The email cannot be empty");
    } else if (enteredPassword == "") {
		alert("The password cannot be empty");
	} else if (storedEmail == "") {
		alert("The email address does not exist.  Please register.");
	} else if ((storedEmail != enteredEmail) || (storedPassword != enteredPassword)) {
		alert("The email and password combination does not exist.");
	}
}

function fnc_register() {
    var enteredNames = document.getElementById("names").value;
	var enteredEmail = document.getElementById("email").value;
    var enteredPassword = document.getElementById("password").value;

    if (enteredNames == "") {
		alert ("Please enter your names");
	} else if (enteredEmail == "") {
		alert ("Please enter your email address");
	} else if (enteredPassword == "") {
		alert ("Please enter your password");
	} else {
		localStorage.setItem(`${enteredEmail}-names`,enteredNames);
        localStorage.setItem(enteredEmail, enteredEmail);
        localStorage.setItem(`${enteredEmail}-password`, enteredPassword);
		localStorage.setItem("names", enteredNames);
        location = "bulletjournal.html";
    }
}


/* Bullet Journal window */
function inputLength() {
	return input.value.length;
}

function listLength() {
	return item.length;
}

function createListElement() {
	var li = document.createElement("li"); // creates an element "li"
	li.appendChild(document.createTextNode(todo.value)); //makes text from input field the li text
	ul.appendChild(li); //adds li to ul
	todo.value = ""; //Reset text input field


	//START STRIKETHROUGH
	// because it's in the function, it only adds it for new items
	function crossOut() {
		li.classList.toggle("done");
	}

	li.addEventListener("click", crossOut);
	//END STRIKETHROUGH


	// START ADD DELETE BUTTON
	var dBtn = document.createElement("button");
	dBtn.appendChild(document.createTextNode("X"));
	li.appendChild(dBtn);
	dBtn.addEventListener("click", deleteListItem);
	// END ADD DELETE BUTTON


	//ADD CLASS DELETE (DISPLAY: NONE)
	function deleteListItem() {
		li.classList.add("delete")
	}
	//END ADD CLASS DELETE
}

function addListAfterClick() {
	if (inputLength() > 0) { //makes sure that an empty input field doesn't create a li
		createListElement();
	}
}

function addListAfterKeypress(event) {
	if (inputLength() > 0 && event.which === 13) { //this now looks to see if you hit "enter"/"return"
		//the 13 is the enter key's keycode, this could also be display by event.keyCode === 13
		createListElement();
	}
}

enterButton.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);