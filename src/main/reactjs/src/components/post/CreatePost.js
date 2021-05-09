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
                /*kol:{
                    id:0,
                    naziv:''
                }*/},
        kolegij_id: this.props.location.state.id,
            errors:{}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /*componentDidMount() {
        this.getKolegij();
    }


    async getKolegij() {
        const {errors} = this.state;
        axios.post('/kolegijid', id, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response.data)
                this.setState(prevState => ({
                    tema: {
                        ...prevState.tema,
                        kol: {
                            ...prevState.tema.kol,
                            id: response.data.id,
                            naziv:response.data.naziv
                        }
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
    };*/


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
        const {tema} = this.state;
        const { errors } = this.state;
        console.log(tema);
        axios.post('https://localhost:8443/createtema', tema.tema,tema.kolegij_id,
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
                            <textarea name="naslov" value={tema.naslov} placeholder={"Text"} onChange={this.handleChange}  rows="4" cols="50"/>
                        </div >
                        {this.state.errors.succ &&
                        <p style={this.state.errors.style}>{this.state.errors.succ}</p>}
                        <button type={'submit'} className={'btn1'}>Create Post</button>
                    </form>
                </div>


        );
    }}


export default CreatePost;