var roomID = window.location.href.split("/video/")[1];
var conn = new WebSocket('wss://localhost:8443/socket/'+roomID);
//ovaj connection koristiti kada se koristi u LAN-u
//var conn = new WebSocket('wss://localhost:8443/socket'+roomID);

const messageBox = document.getElementById('messageBox')
const videoGrid = document.getElementById('video-grid')
const myVideo = document.createElement('video')
const input = document.getElementById("messageInput");
myVideo.muted = true

let myID;


const configuration = {
    "iceServers": [{
        "urls": "stun:stun.l.google.com:19302"
    }]
};
connections = {}
dataChannels = {}
remoteStream = {}
remoteVideo = {}

conn.onopen = function() {
    console.log("Connected to the signaling server");
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    }).
    then(stream => {
        addVideoStream(myVideo, stream)
    }).catch(function(err) {
        /* handle the error */
    });
};

conn.onmessage = function(msg) {
    console.log("Got message", msg.data);
    var content = JSON.parse(msg.data);
    var data = content.data;
    switch (content.event) {
        //upon a new user joining we will be getting an offer from them
        case "offer":
            if(content.to!=myID) break;
            var from = content.from;
            //peerConnecting(content.from);
            handleOffer(data,connections[from],from);
            break;
        //the joined user gets answers and handles them
        case "answer":
            if(content.to!=myID) break;
            handleAnswer(data,connections[content.from]);
            break;
        // when a remote peer sends an ice candidate to us
        case "candidate":
            if(content.to!=myID) break;
            handleCandidate(data,connections[content.from]);
            break;
        //when a user joins he gets list of all users with the event of NEW_CONNECTION, he creates offers which are sent
        // to all the users
        case "NEW_CONNECTION":
            peerConnecting(data);
            console.log(data);
            break;
        //upon joining the room we get sent our own id so we can check which messages are meant for us
        case "OWN_ID":
            myID=data;
            break;
        case "PREPARE_CONNECTION":
            peerConnecting(data);
            break;
        case "DISCONNECT":
            closeConnection(data);
            break;
        default:
            break;
    }
};

//sends message to the socket handler
function send(message) {
    conn.send(JSON.stringify(message));
}

//creating new RTCPeerConnection for user with the ID
function peerConnecting(ID){
    connections[ID]= new RTCPeerConnection(configuration);

    connections[ID].onicecandidate = function(event) {
        if (event.candidate) {
            send({
                event : "candidate",
                data : event.candidate,
                from : myID,
                to : ID,
                roomID : roomID
            });
        }
    };

    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    }).
    then(stream => {
        stream.getTracks().forEach(track => {
            connections[ID].addTrack(track,stream),
                console.log("track added")
        });
    }).catch(function(err) {
        /* handle the error */
    });

    dataChannels[ID] = connections[ID].createDataChannel("dataChannel",{
        reliable : true
    });

    dataChannels[ID].onerror = function(error) {
        console.log("Error occured on datachannel:", error);
    };

    // when we receive a message from the other peer, printing it on the console
    dataChannels[ID].onmessage = function(event) {
        console.log("message:", event.data);
        appendMessage(event.data)
    };

    dataChannels[ID].onclose = function() {
        console.log("data channel is closed");
    };

    connections[ID].ondatachannel = function (event) {
        console.log("data channel is open");
        dataChannels[ID] = event.channel;
    };

    //adding src to remotevideo element
    remoteStream[ID] = new MediaStream();
    remoteVideo[ID] = document.createElement("video");
    remoteVideo[ID].srcObject = remoteStream[ID];
    remoteVideo[ID].setAttribute("playsinline",1);
    remoteVideo[ID].setAttribute("id",ID);
    remoteVideo[ID].play();
    videoGrid.append(remoteVideo[ID])


    connections[ID].addEventListener('track', async (event) => {
        remoteStream[ID].addTrack(event.track)
    });


}


function createOffer(peerConnection,ID) {
    peerConnection.createOffer({
        offerToReceiveAudio:1,
        offerToReceiveVideo:1
    }).then(offer => {
        send({
            event : "offer",
            data : offer,
            from : myID,
            to : ID,
            roomID : roomID
        });
        peerConnection.setLocalDescription(offer);
    }, function(error) {
        alert("Error creating an offer");
    });
}

function handleOffer(offer,peerConnection,ID) {
    peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    // create and send an answer to an offer
    peerConnection.createAnswer({
        offerToReceiveAudio:1,
        offerToReceiveVideo:1
    }).then(answer=> {
        peerConnection.setLocalDescription(answer);
        send({
            event : "answer",
            data : answer,
            from : myID,
            to : ID,
            roomID : roomID
        });
    }, function(error) {
        alert("Error creating an answer");
    });

};

function handleCandidate(candidate,peerConnection) {
    peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
};

function handleAnswer(answer, peerConnection) {
    peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    console.log("connection established successfully!!");
};

function sendMessage() {
    for (const [key, value] of Object.entries(dataChannels)) {
        value.send(input.value)
    }
    appendMessage(input.value);
    input.value = "";
}


function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video)
}

function appendMessage(value){
    var messageElement = document.createElement('li');
    var textElement = document.createElement('p');
    var messageText = document.createTextNode(value);
    textElement.appendChild(messageText);
    messageElement.appendChild(textElement);
    messageBox.appendChild(messageElement);
}

function closeConnection(ID){
    if(connections.hasOwnProperty(ID)) delete connections[ID];
    if(dataChannels.hasOwnProperty(ID)) delete dataChannels[ID];
    if(remoteStream.hasOwnProperty(ID)) delete remoteStream[ID];
    if(remoteVideo.hasOwnProperty(ID)) delete remoteVideo[ID];
    document.getElementById(ID).remove();
}

function joinRoom(){
    for (const [key, value] of Object.entries(connections)) {
        createOffer(value,key);
    }
    document.getElementById("room").style.display="block";
    document.getElementById("joinbutton").style.display="none";
}