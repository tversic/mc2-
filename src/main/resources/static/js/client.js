//ovaj connection koristiti kada se koristi u LAN-u
var conn = new WebSocket('wss://192.168.5.11:8443/socket');
//var conn = new WebSocket('wss://localhost:8443/socket');

const messageBox = document.getElementById('messageBox')
const videoGrid = document.getElementById('video-grid')
const myVideo = document.createElement('video')
myVideo.muted = true


conn.onopen = function() {
    console.log("Connected to the signaling server");
    initialize();
};

conn.onmessage = function(msg) {
    console.log("Got message", msg.data);
    var content = JSON.parse(msg.data);
    var data = content.data;
    switch (content.event) {
        // when somebody wants to call us
        case "offer":
            handleOffer(data);
            break;
        case "answer":
            handleAnswer(data);
            break;
        // when a remote peer sends an ice candidate to us
        case "candidate":
            handleCandidate(data);
            break;
        default:
            break;
    }
};

function send(message) {
    conn.send(JSON.stringify(message));
}

var peerConnection;
var dataChannel;
var input = document.getElementById("messageInput");

function initialize() {
    var configuration = {
        "iceServers" : [ {
            "url" : "stun:stun2.1.google.com:19302"
        } ]
    };

    peerConnection = new RTCPeerConnection(configuration);

    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    }).
    then(stream => {
        addVideoStream(myVideo, stream)
        stream.getTracks().forEach(track => peerConnection.addTrack(track,stream))
    }).catch(function(err) {
        /* handle the error */
    });

    // Setup ice handling
    peerConnection.onicecandidate = function(event) {
        if (event.candidate) {
            send({
                event : "candidate",
                data : event.candidate
            });
        }
    };

    // creating data channel
    dataChannel = peerConnection.createDataChannel("dataChannel", {
        reliable : true
    });


    dataChannel.onerror = function(error) {
        console.log("Error occured on datachannel:", error);
    };

    // when we receive a message from the other peer, printing it on the console
    dataChannel.onmessage = function(event) {
        console.log("message:", event.data);
        messageBox.append("them:"+event.data);
    };

    dataChannel.onclose = function() {
        console.log("data channel is closed");
    };

    peerConnection.ondatachannel = function (event) {
        dataChannel = event.channel;
    };

    /*peerConnection.ontrack = (event) => {
        const video = document.createElement('video');
         if (event.streams && event.streams[0]) {
             addVideoStream(video,event.streams[0]);
         }
    };*/

    const remoteStream = new MediaStream();
    const remoteVideo = document.querySelector('#remoteVideo');
    remoteVideo.srcObject = remoteStream;

    peerConnection.addEventListener('track', async (event) => {
        remoteStream.addTrack(event.track);
    });

}


function createOffer() {
    peerConnection.createOffer(function(offer) {
        send({
            event : "offer",
            data : offer
        });
        peerConnection.setLocalDescription(offer);
    }, function(error) {
        alert("Error creating an offer");
    });
}

function helloWorld(){
    console.log('hello');
}

function handleOffer(offer) {
    peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

    // create and send an answer to an offer
    peerConnection.createAnswer(function(answer) {
        peerConnection.setLocalDescription(answer);
        send({
            event : "answer",
            data : answer
        });
    }, function(error) {
        alert("Error creating an answer");
    });

};

function handleCandidate(candidate) {
    peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
};

function handleAnswer(answer) {
    peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    console.log("connection established successfully!!");
};

function sendMessage() {
    dataChannel.send(input.value);
    messageBox.append("me:"+input.value);
    input.value = "";
}


function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video)
}