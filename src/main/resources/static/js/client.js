//ovaj connection koristiti kada se koristi u LAN-u
var conn = new WebSocket('wss://192.168.5.11:8443/socket');
//var conn = new WebSocket('wss://localhost:8443/socket');

const messageBox = document.getElementById('messageBox')
const videoGrid = document.getElementById('video-grid')
const myVideo = document.createElement('video')
myVideo.muted = true

let myID;
var input = document.getElementById("messageInput");

const configuration = {
    "iceServers": [{
        "urls": "stun:stun.l.google.com:19302"
    }]
};
connections = {}
dataChannels = {}


conn.onopen = function() {
    console.log("Connected to the signaling server");
    //initialize();
};

conn.onmessage = function(msg) {
    console.log("Got message", msg.data);
    var content = JSON.parse(msg.data);
    var data = content.data;
    switch (content.event) {
        // when somebody wants to call us
        case "offer":
            if(content.to!=myID) break;
            var from = content.from;
            peerConnecting(content.from);
            handleOffer(data,connections[from],from);
            break;
        case "answer":
            if(content.to!=myID) break;
            //peerConnecting(from);
            handleAnswer(data,connections[content.from]);
            break;
        // when a remote peer sends an ice candidate to us
        case "candidate":
            if(content.to!=myID) break;
            handleCandidate(data,connections[content.from]);
            break;
        case "NEW_CONNECTION":
            peerConnecting(data);
            createOffer(connections[data],data);
            console.log(data);
            break;
        case "OWN_ID":
            myID=data;
            break;
        case "PREPARE_CONNECTION":
            peerConnecting(content.from);
            break;
        default:
            break;
    }
};

function send(message) {
    conn.send(JSON.stringify(message));
}

function peerConnecting(ID){
    connections[ID]= new RTCPeerConnection(configuration);
    connections[ID].onicecandidate = function(event) {
        if (event.candidate) {
            send({
                event : "candidate",
                data : event.candidate,
                from : myID,
                to : ID
            });
        }
    };

    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    }).
    then(stream => {
        addVideoStream(myVideo, stream)
        stream.getTracks().forEach(track => connections[ID].addTrack(track,stream),console.log(track.value))
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
        messageBox.append("them:"+event.data);
    };

    dataChannels[ID].onclose = function() {
        console.log("data channel is closed");
    };

    connections[ID].ondatachannel = function (event) {
        dataChannels[ID] = event.channel;
    };


    connections[ID].ontrack = async function(event){
        document.getElementById("remoteVideo").srcObject = navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });
    }


}


function createOffer(peerConnection,ID) {
    peerConnection.createOffer(function(offer) {
        send({
            event : "offer",
            data : offer,
            from : myID,
            to : ID
        });
        peerConnection.setLocalDescription(offer);
    }, function(error) {
        alert("Error creating an offer");
    });
}

function handleOffer(offer,peerConnection,ID) {
    peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    // create and send an answer to an offer
    peerConnection.createAnswer(function(answer) {
        peerConnection.setLocalDescription(answer);
        send({
            event : "answer",
            data : answer,
            from : myID,
            to : ID
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

function checkTracks(){
    for (const [key, value] of Object.entries(connections)) {
       value.getTracks().forEach(track=>console.log(track.id));
    }
}