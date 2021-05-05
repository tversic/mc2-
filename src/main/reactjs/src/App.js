import './style/App.css';
import React, { Component } from 'react'
import { Route,Switch,NavLink,Link,BrowserRouter as Router } from 'react-router-dom';
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import Video from "./components/Video";
import Home from "./components/Home";
import Account from "./components/Account";
import Navbar from 'react-bootstrap/Navbar'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faUser,faSignInAlt } from '@fortawesome/free-solid-svg-icons'



class App extends Component {
  state={
    color:'lightgray',
    color1:'lightgray',
    color2:'lightgray'
  }

    logout() {
     localStorage.clear();
        window.location.reload();
    }



  render(){
      const loggedIn = localStorage.getItem('isLoggedIn')
      let reg;
      let log;
      let video;

      if (!loggedIn) {
          reg =  <NavLink className="nav-link" to="/register"><span className=''></span><FontAwesomeIcon icon={faUser} /> Sign Up</NavLink>;
          log=<NavLink className="nav-link" to="/login"><span className="fas fa-sign-in-alt"></span><FontAwesomeIcon icon={faSignInAlt} /> Login</NavLink>
      } else {
          log = <NavLink className="nav-link" to="/" onClick={this.logout}><span className="fas fa-sign-in-alt"></span><FontAwesomeIcon icon={faSignInAlt} /> Logout</NavLink>;
          video=<a href={"https://localhost:8443/video"} className={'link'}>Video Call</a>
          reg= <NavLink className="nav-link" to="/account"><span className="fas fa-sign-in-alt"></span><FontAwesomeIcon icon={faUser} /> Account</NavLink>
      }
    return (
        <Router>

            <nav className="navbar navbar-expand-md  sticky-top" id={'na'}>
                <NavLink className="navbar-brand" to="/">Study Room</NavLink>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                        data-target="#navb" aria-expanded="true">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div id="navb" className="navbar-collapse collapse hide">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                       <li> {video}</li>
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



            <Navbar expand="lg"  fixed="bottom" id={'foot'}>
                <Navbar.Collapse className="justify-content-center">
                    <Navbar.Text id={'txt'}>
                        Study Room
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>

          <Route exact path={"/"} component={Home}></Route>
          <Route path={"/login"} component={Login}></Route>
          <Route path={"/register"} component={Register}></Route>
            <Route path={"/video"} component={Video}></Route>
            <Route path={"/account"} component={Account}></Route>
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
