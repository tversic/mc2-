/*import React, {Component} from 'react';
import {Link,NavLink} from 'react-router-dom';


class NavigationBar extends Component {

    render() {
        const guestLinks = (
            <>
                <div className="mr-auto"></div>
                <NavLink className="navbar-right">
                    <Link to={"register"} className="nav-link"> Register</Link>
                    <Link to={"login"} className="nav-link">  Login</Link>
                </NavLink>
            </>
        );
        const userLinks = (
            <>
                <NavLink className="mr-auto">

                </NavLink>
                <NavLink className="navbar-right">

                </NavLink>
            </>
        );

        return (
            <NavLink >


            </NavLink>
        );
    };
};

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

/*const mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => dispatch(logoutUser())
    };
};*/

//export default connect(mapStateToProps,MapDispatchToProps)(NavigationBar);
//<Link to={"logout"} className="nav-link" onClick={this.logout}> Logout</Link>
//{this.props.auth.isLoggedIn ? userLinks : guestLinks}
//export default NavigationBar;