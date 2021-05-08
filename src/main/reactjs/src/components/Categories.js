import React, {Component} from 'react'
import {Link} from "react-router-dom";

class Categories extends Component {



    constructor(props) {
        super(props);
        this.state = {
            categories: [ {id:1,
                name:'matematika'
            },
                {id:2,
                    title:'post 2',
                    name:'fizika'
                },
                {id:3,
                    title:'post 3',
                    name:'java'
                },
                {id:4,
                    title:'post 4',
                    name:'prog'
                }],
            errors: {}
        };
    }


    /*async getPost() {
        const { errors } = this.state;
        axios.get('/')
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
                posts:response.data
            })
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
};

    componentDidMount() {
        this.getPost();
    }*/


    render() {
        const cat =  Array.from(this.state.categories);
        return (
            <div>
                <div className="container px-4 py-5" id="featured-3">
                    <h2 className="pb-2 border-bottom">Categories</h2>
                    <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
                        {cat.map((categ) =>
                            <div className="feature col" key={categ.id}>
                                <h2>{categ.name}</h2>
                                <Link to={'/dashboard/' + categ.id} key={categ.id}>See more</Link>
                                <h2 className="pb-2 border-bottom"></h2>
                                <br/>
                            </div>)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Categories;