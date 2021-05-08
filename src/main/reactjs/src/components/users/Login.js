import React, {Component} from 'react'
import axios from "axios";
import '../../style/login.css'


class Login extends Component{
    /*userEmpty = {
        username: '',
        pass: ''
    };

    constructor(props){
        super(props);
        this.state ={
            users:[],
            errors:{},
            user:{
                username:'',
                pass:''
            }}



        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);

    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let user = {...this.state.user};
        user[name] = value;
        this.setState({user});
    }


     componentDidMount(){
         axios.get("https://localhost:8443/api/")
             .then((res)=>{
                 this.setState({
                     username:'',
                     email:'',
                     pass:''
                 })
             })
     }

    submit = async () => {
        const res = await _http.get('/login');
        console.log(res);
        const { users } = res.data;
        const {user} = this.state;
        const { errors } = this.state;
        var i ;
        for(i=0; i < users.length; i++){
            if(users[i].username.localeCompare(user.username) && users[i].password.localeCompare(user.pass)){
                console.log('exists');
            }
            else{
                this.setState({
                    errors: {
                        ...errors,
                        error: 'Username or password wrong'
                    }
                })
            }}
        this.setState({user: this.userEmpty,errors:{}})
        axios.get("https://localhost:8443/login").then(res => {
            const users = res.data.results.map(obj => ({username: obj.username, password: obj.password}));
            this.setState.users({users});
            var i ;
            for(i=0; i < users.length; i++){
                if(users[i].username==this.state.username && users[i].password==this.state.pass){

                }
                else{
                    this.setState({
                        errors: {
                            ...errors,
                            error: 'Username or password wrong'
                        }
                })
        }}
            this.setState({user: this.userEmpty,errors:{}})
        })



    }

    render(){


        const {user} = this.state;
        const {errors} = this.state;
        const style = {
            fontSize: 13,
            marginLeft: 14,
            color: 'red'}
        return(
            <div className={"wrapper"}>
                <div className={"frm"}>

                    <form onSubmit={this.submit}>
                        <div>
                            <input type="text" name='username' value={user.username} placeholder={"Username"} onChange={this.handleChange} />
                        </div>
                        <div><input type="password" name='pass' value={user.pass} placeholder={"Password"} onChange={this.handleChange}/>
                        </div>
                        {this.state.errors.error &&
                        <p style={style}>Username or password wrong</p>
                        }
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        );

    }*/


    userEmpty = {
        username: '',
        password: ''
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
        axios.post('https://localhost:8443/authenticate', item, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
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
                    }
                })
                localStorage.setItem('token',response.data);
                localStorage.setItem('isLoggedIn',true);
                localStorage.setItem('user',item.username);
                setTimeout(function() {
                    window.location.href = "/";
                },1000);


            })
            .catch(error => {
                console.log(error.response)
                this.setState({
                    errors:{
                        ...errors,
                        succ: "Username or password wrong!",
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
        return (

            <div className="container" id="cont">

                <div className="form-container sign-in-container">
                    <form onSubmit={this.handleSubmit}>
                        <h1>Sign Up</h1>
                        <div className={'inp1'}>
                            <input type="text" name='username' value={item.username} placeholder={"Username"} onChange={this.handleChange}  />
                        </div >
                        <div className={'inp1'}><input type="password" name='password' value={item.password} placeholder={"Password"} onChange={this.handleChange} /></div>
                        {this.state.errors.succ &&
                        <p style={this.state.errors.style}>{this.state.errors.succ}</p>}
                        <button type={'submit'} className={'btn1'}>Sign Ip</button>
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
    }}

const mapStateToProps = state => {
    return {
        auth:state.auth
    }
};

export default Login;