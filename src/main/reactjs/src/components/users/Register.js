import React, {Component} from 'react'
import axios from "axios";
import '../../style/register.css'
import SimpleReactValidator from 'simple-react-validator';


class Register extends Component {
    userEmpty = {
        username: '',
        email: '',
        pass: '',
        id_faks:''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.userEmpty,
            errors: {},
            fakulteti: []
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
                if(error.response.data.status==500){
                    this.setState({
                        errors:{
                            ...errors,
                            succ: 'Choose an university!',
                            style:{
                                fontSize: 13,
                                marginLeft: 14,
                                color: 'red'

                            }
                }})}else{
                this.setState({
                    errors:{
                        ...errors,
                        succ: error.response.data.message,
                        style:{
                            fontSize: 13,
                            marginLeft: 14,
                            color: 'red'

                        }
                    }
                })}
            });

        this.setState({errors: {}}) ;

    }


    componentDidMount(){
        const { errors } = this.state;

        axios.get('/register')
            .then(response => {
                console.log(response.data)
                this.setState({
                    errors:{
                        ...errors,
                        succ: '',
                        style:{
                            fontSize: 13,
                            marginLeft: 14,
                            color: 'black'

                        }
                    },
                    fakulteti:response.data
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


    render() {
        const {item} = this.state;
        const {errors} = this.state;
        let faksevi=Array.from(this.state.fakulteti)

        return (
            <div>
            <div className="container" id="cont">

                <div className="form-container sign-in-container">
                    <form onSubmit={this.handleSubmit}>
                        <h1>Sign Up</h1>
                        <div className={'inp1'}>
                            <input type="text" name='username' value={item.username} placeholder={"Username"} onChange={this.handleChange}  />
                        </div >
                        <div className={'inp1'}> <input type="email" name='email' value={item.email} placeholder={"E-mail"} onChange={this.handleChange} /></div>
                        <div className={'inp1'}>
                            <select id='dropdwn' name={'id_faks'} value={item.id_faks}
                                   onChange={this.handleChange} >
                                <option value={0} >Choose University</option>
                                {faksevi.map((faks)=>
                                    <option value={faks.id}>{faks.naziv}</option>
                                )}
                            </select>
                        </div>
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
<div id={'mob'}>
    <form onSubmit={this.handleSubmit}>
        <h1>Sign Up</h1>
        <div className={'inp1'}>
            <input type="text" name='username' value={item.username} placeholder={"Username"} onChange={this.handleChange}  />
        </div >
        <div className={'inp1'}> <input type="email" name='email' value={item.email} placeholder={"E-mail"} onChange={this.handleChange} /></div>
        <div className={'inp1'}>
            <select id='dropdwn' name={'id_faks'} value={item.id_faks}
                    onChange={this.handleChange} >
                <option value={0} >Choose University</option>
                {faksevi.map((faks)=>
                    <option value={faks.id}>{faks.naziv}</option>
                )}
            </select>
        </div>
        <div className={'inp1'}><input type="password" name='pass' value={item.pass} placeholder={"Password"} onChange={this.handleChange} /></div>
        {this.state.errors.succ &&
        <p style={this.state.errors.style}>{this.state.errors.succ}</p>}
        <button type={'submit'} className={'btn1'}>Sign Up</button>
    </form>
</div></div>


        );
    }
}

export
default
Register;