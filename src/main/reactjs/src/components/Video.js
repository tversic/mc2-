import React, { Component } from 'react'
import {faPhoneVolume} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import '../style/video.css'
import axios from "axios";


class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {
            VideoRooms: []
        };
    }

    async getVideoRooms(){
        const { errors } = this.state;
        axios.get('/rooms')
            .then(response => {
                console.log(response.data)
                this.setState({
                    errors:{
                        ...errors,
                        succ: "Success!",
                        style:{
                            fontSize: 13,
                            marginLeft: 14,
                            color: 'black'

                        }
                    },
                    VideoRooms:response.data
                })
            })
            .catch(error => {
                console.log(error.response)
                this.setState({
                    errors:{
                        ...errors,
                        succ: "Couldn't load categories",
                        style:{
                            fontSize: 13,
                            marginLeft: 14,
                            color: 'red'

                        }
                    }
                })
            });

        this.setState({errors: {}}) ;
    }

    componentDidMount(){
        this.getVideoRooms();
    }

    render(){
        let rooms=Array.from(this.state.VideoRooms)
        let linkid="https://bbtstudyroom.ddns.net:8443/video/";
        return (
            <div className="container">
                <div className={'container'} id={'vid'}>
                    <h1>Rooms</h1>
                    <div className="row justify-content-md-center g-4 py-5 row-cols-1 row-cols-lg-3">
                    {rooms.map((room) =>
                    <div className="col" key={room.startTime} id={'vidcont'}>
                        <div className={'col col-12'}>
                           <h2>{room.kolegij.naziv}</h2>
                    <div className="row justify-content-md-center">
                        <div className={'col col-12'}>
                            <button id={'vidb'}><a href={linkid.concat(room.id)}  id={'vida'}><FontAwesomeIcon icon={faPhoneVolume} /> Video Call</a></button>
                        </div></div></div></div>)}
                    </div>
                </div>
            </div>
        )
    }
}

export default Video;