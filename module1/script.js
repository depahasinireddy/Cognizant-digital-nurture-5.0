// Registration success message

document.getElementById("eventForm").onsubmit = function(event) {

    event.preventDefault();

    document.getElementById("successMessage").innerHTML =
    "Registration submitted successfully!";
};

// Validate phone number

function validatePhone() {

    let phone =
    document.getElementById("phone").value;

    if(phone.length != 10) {

        alert("Please enter a valid 10-digit phone number");
    }
}

// Display event fee

function showFee(value) {

    if(value === "") {

        document.getElementById("fee").innerHTML = "";

    } else {

        document.getElementById("fee").innerHTML =
        "Event Fee: ₹" + value;
    }
}

// Confirmation alert

function confirmRegistration() {

    alert("Your registration has been submitted.");
}

// Count feedback characters

function countCharacters() {

    let text =
    document.getElementById("feedback").value;

    document.getElementById("charCount").innerHTML =
    text.length;
}

// Zoom image on double click

function zoomImage(image) {

    image.style.width = "420px";
    image.style.height = "420px";
}

// Video ready alert

function videoReady() {

    alert("Video is ready to play");
}

// Save event preference

function savePreference() {

    let selectedEvent =
    document.getElementById("eventType").value;

    localStorage.setItem(
        "preferredEvent",
        selectedEvent
    );

    alert("Preference saved successfully");
}

// Load saved preference

window.onload = function() {

    let savedEvent =
    localStorage.getItem("preferredEvent");

    if(savedEvent) {

        document.getElementById("eventType").value =
        savedEvent;
    }
}

// Clear preferences

function clearPreferences() {

    localStorage.clear();

    sessionStorage.clear();

    alert("Preferences cleared");
}

// Geolocation feature

function findLocation() {

    if(navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(
            showPosition,
            showError
        );

    } else {

        alert("Geolocation is not supported");
    }
}

function showPosition(position) {

    document.getElementById("location").innerHTML =

    "Latitude: " +
    position.coords.latitude +

    "<br>Longitude: " +

    position.coords.longitude;
}

function showError() {

    alert("Unable to retrieve location");
}

// Warning before leaving page

window.onbeforeunload = function() {

    return "Your form may not be saved.";
}