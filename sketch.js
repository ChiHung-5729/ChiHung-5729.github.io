  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDqSRMXfLbz66BWbplXyaRCIKgoV24TuQg",
    authDomain: "esp32car-516ab.firebaseapp.com",
    databaseURL: "https://esp32car-516ab-default-rtdb.firebaseio.com",
    projectId: "esp32car-516ab",
    storageBucket: "esp32car-516ab.appspot.com",
    messagingSenderId: "476394450045",
    appId: "1:476394450045:web:f154eeef3efa3a19065514",
    measurementId: "G-F7RE1HERMH"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics();

var db = firebase.database();

let socket = io();

function sendMood(msg){
  db.ref("/face").set({
    mood: msg
  })
}
function sendDir(msg){
  db.ref("/direction").set({
    dir: msg
  })
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#8D8D8D');
  socket.on('mouse',
    function(data) {
      // Draw a blue circle
      fill(0,0,255);
      noStroke();
      ellipse(data.x,data.y,20,20);
    }
  );
  
}

function draw() {
  // background(220);
  
}

function mouseDragged() {
  // Make a little object with mouseX and mouseY
  let data = {
    x: mouseX,
    y: mouseY
  };
  // Send that object to the socket
  socket.emit('mouse',data);
  fill(255);
  ellipse(mouseX,mouseY,20,20);
}