const TypeWriter = function(txtElement, words, wait = 5000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = "";
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

// Type Method
TypeWriter.prototype.type = function() {
  // current index of word
  const current = this.wordIndex % this.words.length;

  //Get full text of current word
  const fullTxt = this.words[current];

  //check if deleting
  if (this.isDeleting) {
    //Remove char
    this.txt = fullTxt.substring(0, this.txt.length + -1);
  } else {
    //Add char
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  // Insert txt into element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  //Initial Type Speed

  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  // If word is complete

  if (!this.isDeleting && this.txt === fullTxt) {
    // Make a puase at end
    typeSpeed = this.wait;
    //Set delete to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    //move to next word
    this.wordIndex++;

    // Pause before start typing
    typeSpeed = 500;
  }
  setTimeout(() => this.type(), 200);
};

// Init on DOM Load
document.addEventListener("DOMContentLoaded", init);

// Init App
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}

// Contact

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCI4kO5da4p8d-A63qwxo4JUeileOY9soc",
  authDomain: "contact-form-7efc2.firebaseapp.com",
  databaseURL: "https://contact-form-7efc2.firebaseio.com",
  projectId: "contact-form-7efc2",
  storageBucket: "contact-form-7efc2.appspot.com",
  messagingSenderId: "712976695586"
};
firebase.initializeApp(config);

// Refernce messages collection
var messageRef = firebase.database().ref("messages");

// Listen for form submit
document.getElementById("contactForm").addEventListener("submit", submitForm);

// Submit Form
function submitForm(e) {
  e.preventDefault();

  //Get values
  var name = getInputVal("name");
  var email = getInputVal("email");
  var phone = getInputVal("phone");
  var message = getInputVal("message");

  // Save Message
  saveMessage(name, email, phone, message);

  //Show alert
  document.querySelector(".alert").style.display = "block";

  //Hide alert after 3 second
  setTimeout(function() {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  // Clear Form
  document.getElementById("contactForm").reset();
}

// Function to get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, email, phone, message) {
  var newMessageRef = messageRef.push();
  newMessageRef.set({
    name: name,
    email: email,
    phone: phone,
    message: message
  });
}
