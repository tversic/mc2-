import './style/App.css';
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
          reg =  <NavLink className="nav-link" to="/register"><span className=''></span><FontAwesomeIcon icon={faUser} /> Sign Up</NavLink>;
          log=<NavLink className="nav-link" to="/login"><span className="fas fa-sign-in-alt"></span><FontAwesomeIcon icon={faSignInAlt} /> Login</NavLink>
      } else {
          log = <NavLink className="nav-link" to="/" onClick={this.logout}><span className="fas fa-sign-in-alt"></span><FontAwesomeIcon icon={faSignInAlt} /> Logout</NavLink>;
          video=<NavLink className="nav-link" to={"/video"}><FontAwesomeIcon icon={faPhoneVolume} /> Video Rooms</NavLink>
          reg= <NavLink className="nav-link" to="/account"><span className="fas fa-sign-in-alt"></span><FontAwesomeIcon icon={faUser} /> Account</NavLink>
          myposts=<NavLink className="nav-link" to="/account"><span className="fas fa-sign-in-alt"></span><FontAwesomeIcon icon={faAddressCard} /> My posts</NavLink>
          dash=<NavLink className="nav-link" to="/categories"><span className="fas fa-sign-in-alt"></span><FontAwesomeIcon icon={faBookReader} /> Dashboard</NavLink>
      }
    return (


        <Router>


            <nav className="navbar navbar-expand-md " id={'na'}>
                <a className="navbar-brand" href="/">Study Room</a>
                <button className="colbut" type="button" onClick={this.toggleMenu}>
                    <FontAwesomeIcon icon={faBars}  color={'white'}/>
                </button>
                <div className={"collapse navbar-collapse " + show}>
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/"><FontAwesomeIcon icon={faLaptopHouse} /> Home</NavLink>
                        </li>
                        <li> {video}</li>
                        <li> {dash}</li>
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


/*<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
             <Navbar.Brand href="/">Study Room</Navbar.Brand>
             <Navbar.Toggle aria-controls="responsive-navbar-nav" />
             <Navbar.Collapse id="responsive-navbar-nav">
                 <Nav className="mr-auto">
                     <Nav.Link href="/">Home</Nav.Link>
                 </Nav>
                 <Nav>
                     <Nav.Link href="/login">Sign-In</Nav.Link>
                     <Nav.Link href="/register">Sign-Up</Nav.Link>
                 </Nav>
             </Navbar.Collapse>
         </Navbar>

         <Navbar expand="lg" variant="dark" bg="dark" fixed="bottom" >
                    <Navbar.Collapse className="justify-content-center">
                        <Navbar.Text>
                           Study Room
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>*/

/*export default function App() {


    return (
        <Router>
            <NavigationBar/>

                        <Switch>
                            <Route path="/" exact component={Home}/>
                            <Route path={"/login"} component={Login}></Route>
                            <Route path={"/register"} component={Register}></Route>
                        </Switch>

        </Router>
    );
}*/

/*
     <nav className="navb">
            <div className="container-fluid">
              <ul className="nav navbar-nav">
                <li><h3>Study Room</h3></li>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>

              </ul>
            </div>
          </nav>
 */

export default App;
