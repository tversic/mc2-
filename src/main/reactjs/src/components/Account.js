import React, { Component } from 'react'
import '../style/acc.css';



class Account extends Component {

    render(){
        return(
            <div className="container">
                <div className={'container'} id={'acc'}>
                <div className="row justify-content">
                    <div className={'col col-12'}>
                                <img alt="User Pic"
                                     src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"
                                     id="profile-image1"/></div></div>
                    <div className="row justify-content">
                        <div className={'col col-12'}>
                            <div className="panel-heading"><h4>User Profile</h4></div></div></div>
                        <div className="row justify-content">
                            <div className={'col col-12'}>
                        <p>@{localStorage.getItem('user')}</p>

                            </div></div></div></div>

        );
    }}

export default Account;