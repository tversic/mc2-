import React, { Component } from 'react'
import '../style/home.css';
import '../style/App.css';
import {Container,CardDeck,Card,Carousel} from 'react-bootstrap/'
import Navbar from "react-bootstrap/Navbar";



class Home extends Component {

    render(){
        return(
            <div id={'bod'}>
                <div id={'#page-container'}>
                <div className={'container'}>
                        <h1>Welcome to Study Room</h1>
                        <div className={'row gx-5 gy-4 row-cols-3 row-cols-lg-3 row-cols-md-1 row-cols-sm-1 row-cols-xs-1'} id={'row1'}>
                            <div className={'col-lg-3'}>
                                <img className="card-img-top" src="https://www.careeraddict.com/uploads/article/58655/illustration-men-desktop.jpg" alt="Card image cap"></img>
                                <a href={'#about'}>
                                <div className="card-body">
                                    <h5 className="card-title">About Us</h5>
                                    <p className="card-text">Hi, we are team BigBrainTime! We are a team of developers aiming to make it easier for students to connect
                                        and learn together.</p>

                                </div></a>
                            </div>
                                <div className={'col-lg-3'}>
                                <img className="card-img-top" src="data:image/png;base64,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" alt="Card image cap"></img>
                                    <a href={'#study'}>
                                    <div className="card-body">
                                    <h5 className="card-title">Study Room</h5>
                                    <p className="card-text">With Study Room we want to help students make their online studying experience easier.
                                        With video calls and threads we want to connect students and encourage them to study together.</p>

                                    </div></a></div>
                            <div className={'col-lg-3'}>
                                <img className="card-img-top" src="https://specials-images.forbesimg.com/imageserve/5f302109ffad89f9130e07db/960x0.jpg?cropX1=0&cropX2=4800&cropY1=243&cropY2=2943" alt="Card image cap"></img>
                                <a href={'#technologies'}>
                                <div className="card-body">
                                    <h5 className="card-title">Technologies we use</h5>
                                    <p className="card-text">Study Room was made with Spring-Boot and ReactJS. The video calls are based on peer-to-peer technology.
                                        It was realized with the help of WebRTC and JavaScript.</p>

                                </div></a>
                        </div></div></div>

                <div className={'responsive'}>
                    <div className={'container'}>
                    <div className={'r'}>
                    <img className="card-img-top" src="https://www.careeraddict.com/uploads/article/58655/illustration-men-desktop.jpg" alt="Card image cap"></img>
                    <a href={'#about'}>
                        <div className="card-body">
                            <h5 className="card-title">About Us</h5>
                            <p className="card-text">Hi, we are team BigBrainTime! We are a team of developers aiming to make it easier for students to connect
                                and learn together.</p>

                        </div></a></div>
                    <div className={'r'}>
                        <img className="card-img-top" src="data:image/png;base64,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" alt="Card image cap"></img>
                        <a href={'#study'}>
                        <div className="card-body">
                            <h5 className="card-title">Study Room</h5>
                            <p className="card-text">With Study Room we want to help students make their online studying experience easier.
                                With video calls and threads we want to connect students and encourage them to study together.</p>

                        </div></a>
                    </div>
                        <div className={'r'}>
                            <img className="card-img-top" src="https://specials-images.forbesimg.com/imageserve/5f302109ffad89f9130e07db/960x0.jpg?cropX1=0&cropX2=4800&cropY1=243&cropY2=2943" alt="Card image cap"></img>
                            <a href={'#technologies'}>
                                <div className="card-body">
                                    <h5 className="card-title">Technologies we use</h5>
                                    <p className="card-text">Study Room was made with Spring-Boot and ReactJS. The video calls are based on peer-to-peer technology.
                                        It was realized with the help of WebRTC and JavaScript.</p>

                                </div></a>
                        </div>
                    </div></div>
                <div className={'container px-4 py-5'} id={'about'} >
                    <h2>About Us</h2>
                    <p className={'hide'}>Hello, we are Team BigBrainTime. we are a team of 3 students from TVZ. We are currently in our second year of university.</p>
                <div className={'row  g-4 py-5 row-cols-2 row-cols-lg-2 row-cols-md-1 row-cols-sm-1'}>
                    <div className={'col align-self-center'}>
                    <p>Hello, we are Team BigBrainTime. we are a team of 3 students from TVZ. We are currently in our second year.</p></div>
                    <div className={'col '}>
                    <img src={'https://cdn.dribbble.com/users/333243/screenshots/5343222/hiring-manager-for-codility_4x.png?compress=1&resize=400x300'}/>
                    </div>
                </div></div>

                <div className={'container px-4 py-5'} id={'study'} >
                    <h2>Study Room</h2>
                    <p className={'hide'}>Study Room is a social media website made for students from all across the country. Our idea comes from the recent events in the world
                    when our whole student life go turned upside down. Everything was online so it was harder to keep up with everything.
                    It was also hard to make friends and to get into contact with other students.
                    Our goal was to create a platform that would unite students and help them.
                    Recent studies also show that students learns better in groups.</p>
                    <div className={'row  g-4 py-5 row-cols-2 row-cols-lg-2 row-cols-md-1 row-cols-sm-1'}>
                        <div className={'col '}>
                            <img src={'https://cdn.dribbble.com/users/333243/screenshots/5343222/hiring-manager-for-codility_4x.png?compress=1&resize=400x300'}/>
                        </div>
                        <div className={'col align-self-center'}>
                            <p>Study Room is a social media website made for students from all across the country. Our idea comes from the recent events in the world
                                when our whole student life go turned upside down. Everything was online so it was harder to keep up with everything.
                                It was also hard to make friends and to get into contact with other students.
                                Our goal was to create a platform that would unite students and help them.
                                Recent studies also show that students learns better in groups.</p></div>
                       </div></div>

        <div className={'container px-4 py-5'} id={'technologies'} >
            <h2>Technologies</h2>
            <p className={'hide'}>For our project we combined Spring and ReactJS.</p>
                <p className={'hide'}>The Spring Framework is an application framework and inversion of control container for the Java platform.
            It was used to build the backend of the app.</p>
            <p className={'hide'}>React is an open-source, front end, JavaScript library for building user interfaces or UI components.</p>
            <div className={'row  g-4 py-5 row-cols-2 row-cols-lg-2 row-cols-md-1 row-cols-sm-1'}>
                <div className={'col align-self-center'}>
                    <p>For our project we combined Spring and ReactJS.</p>
                    <p>The Spring Framework is an application framework and inversion of control container for the Java platform.
                        It was used to build the backend of the app.</p>
                    <p>React is an open-source, front end, JavaScript library for building user interfaces or UI components.</p></div>
                <div className={'col '}>
                    <img  src={'https://cdn.dribbble.com/users/333243/screenshots/5343222/hiring-manager-for-codility_4x.png?compress=1&resize=400x300'}/>
                </div>

                </div>
            </div></div></div>

        );
    }}

export default Home;


