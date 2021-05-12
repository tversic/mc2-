
import React, { Component } from 'react'
import { Route,Switch,NavLink,Link,BrowserRouter as Router } from 'react-router-dom';
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import Video from "./components/Video";
import Home from "./components/Home";
import Account from "./components/Account";
import Dash from "./components/Dash";
import Posts from "./components/post/Posts";
import CreatePost from "./components/post/CreatePost";
import Categories from './components/Categories'
import Navbar from 'react-bootstrap/Navbar'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faUser,faSignInAlt, faBookReader, faPhoneVolume, faLaptopHouse, faAddressCard,faBars } from '@fortawesome/free-solid-svg-icons'
import './style/App.css';



class App extends Component {
  state={
    color:'lightgray',
    color1:'lightgray',
    color2:'lightgray'
  }

    constructor(props) {
        super(props);
        this.state = {
            menu: false
        };
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    logout() {
     localStorage.clear();
        window.location.href = "/";
    }

    toggleMenu(){
        this.setState({ menu: !this.state.menu })
    }



  render(){
      const show = (this.state.menu) ? "show" : "" ;
      const loggedIn = localStorage.getItem('isLoggedIn')
      let reg;
      let log;
      let video;
      let myposts;
      let dash;
      let id='123';
      let linkid="https://localhost:8443/video/";

      if (!loggedIn) {
          reg =  <NavLink className="nav-link btn btn-outline-primary" to="/register"><span className=''></span><FontAwesomeIcon icon={faUser} /> Sign Up</NavLink>;
          log=<NavLink className="nav-link btn btn-primary test" to="/login"><span className="fas fa-sign-in-alt"></span><FontAwesomeIcon icon={faSignInAlt} /> Login</NavLink>
      } else {
          log = <NavLink className="nav-link btn btn-primary" to="/" onClick={this.logout}><span className="fas fa-sign-in-alt"></span><FontAwesomeIcon icon={faSignInAlt} /> Logout</NavLink>;
          video=<NavLink className="nav-link" to={"/video"}><FontAwesomeIcon icon={faPhoneVolume} /> The Library</NavLink>
          reg= <NavLink className="nav-link" to="/account"><span className="fas fa-sign-in-alt"></span><FontAwesomeIcon icon={faUser} /> Account</NavLink>
          myposts=<NavLink className="nav-link" to="/account"><span className="fas fa-sign-in-alt"></span><FontAwesomeIcon icon={faAddressCard} /> My posts</NavLink>
          dash=<NavLink className="nav-link " to="/categories"><span className="fas fa-sign-in-alt"></span><FontAwesomeIcon icon={faBookReader} /> Forum</NavLink>
      }
    return (


        <Router>

            <nav className="navbar navbar-expand-md " id={'na'}>
                <a id="logo" className="navbar-brand" href="/">Study Room</a>
                <button className="colbut" type="button" onClick={this.toggleMenu}>
                    <FontAwesomeIcon icon={faBars}  color={'white'}/>
                </button>
                <div className={"collapse navbar-collapse " + show}>
                    <ul className="navbar-nav">
                        <li className="nav-item active lijevo">
                            <NavLink className="nav-link" to="/"><FontAwesomeIcon icon={faLaptopHouse} /> Home</NavLink>
                        </li>
                        <li id={'THElibrary'}> {video}</li>
                        <li className={'lijevo'}> {dash}</li>
                    </ul>

                    <ul className="nav navbar-nav ml-auto">

                        <li className="nav-item">
                            {reg}
                        </li>

                        <li className="nav-item">
                            {log}
                        </li>
                    </ul>
                </div>
            </nav>






          <Route exact path={"/"} component={Home}></Route>
          <Route path={"/login"} component={Login}></Route>
          <Route path={"/register"} component={Register}></Route>
            <Route path={"/video"} component={Video}></Route>
            <Route path={"/account"} component={Account}></Route>
            <Route path={"/categories"} component={Categories}></Route>
            <Route path={"/dashboard/:id"} component={Dash}></Route>
            <Route path={"/createpost"} component={CreatePost}></Route>
            <Route path='/posts/:id' component={Posts} />
        </Router>


    );
  }
}


export default App;
