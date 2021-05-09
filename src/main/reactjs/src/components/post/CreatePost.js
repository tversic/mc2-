import React, {Component} from 'react'
import axios from "axios";
import '../../style/login.css'


class CreatePost extends Component{
    constructor(props) {
        super(props);
        this.state = {
            tema:{
                id:'',
                naslov:'',
                datumKreiranja:Date().toLocaleString(),
                content:''
               },
            kol:{
                id:0,
                naziv:''
            },
            errors:{}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getKolegij();
    }


    async getKolegij() {
        let id=this.props.location.state.id;
        const {errors} = this.state;
        axios.post('/kolegijid', id, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response.data)
                /*this.setState(prevState => ({
                    tema: {
                        ...prevState.tema,
                        kol: {
                            ...prevState.tema.kol,
                            id: response.data.id,
                            naziv:response.data.naziv
                        }
                    }
                }))*/
                this.setState(prevState => ({
                  kol: {
                       ...prevState.kol,
                           id: response.data.id,
                           naziv:response.data.naziv

                   }
               }))
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
    };


    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let tema = {...this.state.tema};
        tema[name] = value;
        this.setState({tema});
    }

    async handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.tema.id);
        let id=this.state.tema.id;
        const {tema} = this.state;
        const { errors } = this.state;
        console.log(tema);
        axios.post('https://localhost:8443/createtema', {
            id: this.state.tema.id,
            naslov: this.state.tema.naslov,
            datumKreiranja:this.state.tema.datumKreiranja,
            idKolegij:this.state.kol.id,
            content:this.state.tema.content
        },
            {
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
                setTimeout(function() {
                    window.location.href = "/categories";
                }, 2000);
            })
            .catch(error => {
                console.log(error.response)
                this.setState({
                    errors:{
                        ...errors,
                        succ: "Failed to create post!",
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
        let {tema} = this.state;
        return (
            <div className="container" id="cont">
                    <form onSubmit={this.handleSubmit}>
                        <h1>Create Post</h1>
                        <div className={'inp1'}>
                            <input type={"text"} name="naslov" value={tema.naslov} placeholder={"Header"} onChange={this.handleChange} />
                        </div >
                        <textarea name="content" value={tema.content} placeholder={"Content"} onChange={this.handleChange}  rows="4" cols="50"/>
                        {this.state.errors.succ &&
                        <p style={this.state.errors.style}>{this.state.errors.succ}</p>}
                        <button type={'submit'} className={'btn1'}>Create Post</button>
                    </form>
                </div>


        );
    }}


export default CreatePost;