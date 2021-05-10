import React, { Component } from 'react'
import {faPhoneVolume} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import '../style/video.css'


class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {
            room: [{
                id:123,
                name:'Java'
            },{
                id:243,
                name:'Matematika'
            },
            ]
        };

    }

    render(){
        let rooms=Array.from(this.state.room)
        let linkid="https://141.136.195.94:3000:8443/video/";
        return (
            <div className="container">
                <div className={'container'} id={'vid'}>
                    <h1>Rooms</h1>
                    <div className="row justify-content-md-center g-4 py-5 row-cols-1 row-cols-lg-3">
                    {rooms.map((room) =>
                    <div className="col" key={room.id} id={'vidcont'}>
                        <div className={'col col-12'}>
                           <h2>{room.name}</h2>
                    <div className="row justify-content-md-center">
                        <div className={'col col-12'}>
                            <button id={'vidb'}><a href={linkid.concat(room.id)}  id={'vida'}><FontAwesomeIcon icon={faPhoneVolume} /> Video Call</a></button>
                        </div></div></div></div>)}</div></div></div>
        )
    }
}

export default Video;