import React, {Component} from 'react'
import axios from "axios";
import '../../style/register.css'
import SimpleReactValidator from 'simple-react-validator';


class Register extends Component {
    /*constructor(){
        super();
        this.state = {
            user:
                {
                    username: null,
                    email: null,
                    pass: null
                }
        };
    };

    componentDidMount() {
        axios.get("https://localhost:8443/register")
            .then((res) => {
                this.setState({
                    user: {
                        username: '',
                        email: '',
                        pass: ''
                    }
                })
            })
    }

    handleUserChanged(event) {
        var user = this.state.user;

        var modifiedValue = event.target.value;

        user.username = modifiedValue;

        this.setState({
            user: user
        });
    }

    handleMailChanged(event) {
        var user = this.state.user;

        var modifiedValue = event.target.value;

        user.email = modifiedValue;

        this.setState({
            user: user
        });
    }

    handlePassChanged(event) {
        var user = this.state.user;

        var modifiedValue = event.target.value;

        user.pass = modifiedValue;

        this.setState({
            user: user
        });
    }

    register(event) {
        event.preventDefault();
        /*const users=this.state.user;
        axios.post("http://localhost:8080/register", users)
            .then((response) => {
                console.log(response);
            })*/

    /*alert('A form was submitted: ' + this.state.user);

     fetch('https://localhost:8443/register', {
         method: 'POST',
         body: JSON.stringify(this.state.user)
     }).then(function(response) {
         console.log(response)
         return response.json();
     });

     event.preventDefault();

 }

 handleButtonClicked() {
     console.log(this.state.user);
 }

 render() {
     return (
         <div className={"wrapper"}>
             <div className={"frm"}>

             <form onSubmit={(e) => this.register(e)} method="post" action={"#"}>
                 <div><input type="text" name={this.state.user.username} placeholder={"Username"} onChange={this.handleUserChanged.bind(this)}/></div>
                 <div> <input type="email" name={this.state.email} placeholder={"E-mail"} onChange={this.handleMailChanged.bind(this)}/> </div>
                 <div> <input type="password" name={this.state.pass} placeholder={"Password"} onChange={this.handlePassChanged.bind(this)}/> </div>
                 <button type="submit" onClick={this.handleButtonClicked.bind(this)}>Sign Up</button>
             </form>
             </div>
         </div>
     );
 }*/
    userEmpty = {
        username: '',
        email: '',
        pass: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.userEmpty,
            errors: {}
        };




        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
        const { errors } = this.state;

            console.log(item);
            axios.post('https://localhost:8443/register', item, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    console.log(response.data)
                        this.setState({
                            errors:{
                                ...errors,
                                succ: response.data,
                                style:{
                                    fontSize: 13,
                                    marginLeft: 14,
                                    color: 'black'

                                }
                            }
                        })
                    this.setState({item: this.userEmpty});
                    setTimeout(function() {
                        window.location.href = "/login";
                    }, 1000);

                })
                .catch(error => {
                    console.log(error.response.data)
                    this.setState({
                        errors:{
                            ...errors,
                            succ: error.response.data,
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





    render() {
        const {item} = this.state;
        const {errors} = this.state;
        /*const style = {
            fontSize: 13,
            marginLeft: 14,
            color: 'red'

        }*/
        return (
           /* <div className={"wrapper"}>
                <div className={"frm"}>

                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <input type="text" name='username' value={item.username} placeholder={"Username"} onChange={this.handleChange}  />
                        </div>
                        <div><input type="email" name='email' value={item.email} placeholder={"E-mail"} onChange={this.handleChange} />
                        </div>
                        <div>
                            <input type="password" name='pass' value={item.pass} placeholder={"Password"} onChange={this.handleChange} />
                        </div>
                        {this.state.errors.succ &&
                        <p style={this.state.errors.style}>{this.state.errors.succ}</p>}
                        <input type="submit" value="Sign Up" />
                    </form>
                </div>
            </div>*/

            <div className="container" id="cont">

                <div className="form-container sign-in-container">
                    <form onSubmit={this.handleSubmit}>
                        <h1>Sign Up</h1>
                        <div className={'inp1'}>
                            <input type="text" name='username' value={item.username} placeholder={"Username"} onChange={this.handleChange}  />
                        </div >
                           <div className={'inp1'}> <input type="email" name='email' value={item.email} placeholder={"E-mail"} onChange={this.handleChange} /></div>
                        <div className={'inp1'}><input type="password" name='pass' value={item.pass} placeholder={"Password"} onChange={this.handleChange} /></div>
                        {this.state.errors.succ &&
                        <p style={this.state.errors.style}>{this.state.errors.succ}</p>}
                        <button type={'submit'} className={'btn1'}>Sign Up</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" id="signIn">Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export
default
Register;