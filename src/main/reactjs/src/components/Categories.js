import React, {Component} from 'react'
import {Link} from "react-router-dom";
import '../style/categories.css'
import {faAngleRight, faBookReader} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";

class Categories extends Component {



    constructor(props) {
        super(props);
        this.state = {
            kolegij: []
        };

    }


    async getKolegij() {
        const { errors } = this.state;
        axios.get('/kolegij')
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
                },
                kolegij:response.data
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
};

    componentDidMount() {
        this.getKolegij();
    }


    render() {
        const cat =  Array.from(this.state.kolegij);
        return (
            <div>
                <div className="container px-4 py-5" id="featured-3">
                    <h2 className="pb-2 border-bottom">Categories</h2>
                    <div className="row justify-content-md-center g-4 py-5 row-cols-1 row-cols-lg-3">
                        {cat.map((categ) =>
                            <div className="feature col" key={categ.id} id={'catcon'}>
                                <h2>{categ.naziv}</h2>
                                <button id={'catb'}><Link className={'catlink'} to={'/dashboard/' + categ.id} key={categ.id}><FontAwesomeIcon icon={faAngleRight} /> See more</Link></button>
                                <br/>
                            </div>)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Categories;