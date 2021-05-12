import React, {Component} from 'react'
import axios from "axios";
import '../../style/createpost.css'


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
        let today=Date().toLocaleString();
        let polj=today.split(" ");
        let day=polj[1];
        let m=polj[2];
        let y=polj[3];
        let date=day+'-'+m+'-'+y;
        let id=this.props.location.state.id;
        event.preventDefault();
        console.log(this.state.tema.id);
        const {tema} = this.state;
        const { errors } = this.state;
        console.log(tema);
        axios.post('https://localhost:8443/createtema', {
            id: this.state.tema.id,
            naslov: this.state.tema.naslov,
            datumKreiranja:date,
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
                    let link="/dashboard/";
                    console.log(id);
                    window.location.href = link.concat(id);
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
            <div className="container" id="conts">
                    <form onSubmit={this.handleSubmit}>
                        <h1>Create Post</h1>
                        <div className={'inp1'}>
                            <input id={'naslov'} type={"text"} name="naslov" value={tema.naslov} placeholder={"Header"} onChange={this.handleChange}/>
                        </div >
                        <div className={'inp1'}>
                            <textarea id={'textc'} name="content" value={tema.content} placeholder={"Content"} onChange={this.handleChange}/>
                        </div>
                        {this.state.errors.succ &&
                        <p style={this.state.errors.style}>{this.state.errors.succ}</p>}
                        <div className={'inp1'}>
                            <button type={'submit'} className={'btn1'} id={'createPostBtn'}>Create Post</button>
                        </div>
                    </form>
                </div>


        );
    }}


export default CreatePost;