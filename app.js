// Set constraints for the video stream
var constraints = { video: { facingMode: "environment" }, audio: false };
var track = null;

// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger");
	startButton = document.querySelector("#start-button");
	spinner = document.querySelector("#spinner");
       checkmark = document.querySelector("#checkmark");

// Access the device camera and stream to cameraView
function cameraStart() {
	checkmark.style.visibility='Hidden';
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
			cameraView.style.visibility="visible";
			cameraTrigger.style.visibility="visible";
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
}

function initializeControls() {
	cameraOutput.style.visibility="hidden";
	spinner.style.visibility="hidden"
	
}

//API Consumption Part
function UserAction() {
	 checkmark.style.visibility='visible';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
		spinner.style.visibility="hidden";
         if (this.readyState == 4 && this.status == 200) {
             console.log(this.responseText);
         document.getElementById("checkmark").innerHTML='<svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>'+
            '<path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>';

         }
    };
    xhttp.open("GET", "http://172.20.10.6:8080/pour", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send("Data to be sent to our API");
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {

    cameraTrigger.style.visibility="hidden";
	cameraView.style.visibility="hidden";
	spinner.style.visibility="visible";
	setTimeout(UserAction,5000);
    //cameraOutput.src = cameraSensor.toDataURL("image/webp");
   // cameraOutput.classList.add("taken");
    //track.stop();
};


startButton.onclick=function(){
	cameraStart();
}
// Start the video stream when the window loads
window.addEventListener("load", initializeControls, false);


// Install ServiceWorker
if ('serviceWorker' in navigator) {
  console.log('CLIENT: service worker registration in progress.');
  navigator.serviceWorker.register( '/camera-app/part-2/sw.js' , { scope : ' ' } ).then(function() {
    console.log('CLIENT: service worker registration complete.');
  }, function() {
    console.log('CLIENT: service worker registration failure.');
  });
} else {
  console.log('CLIENT: service worker is not supported.');
}

