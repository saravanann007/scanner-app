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

// Access the device camera and stream to cameraView
function cameraStart() {
	
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
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
		spinner.style.visibility="hidden";
         if (this.readyState == 4 && this.status == 200) {
             console.log(this.responseText);
         }
    };
    xhttp.open("GET", "https://jsonplaceholder.typicode.com/todos/1", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send("Data to be sent to our API");
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {

    cameraTrigger.style.visibility="hidden";
	cameraView.style.visibility="hidden";
	spinner.style.visibility="visible";
	setTimeout(5000,UserAction);
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

