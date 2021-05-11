import React, {Component, useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom";
import '../style/dash.css'
import {faAngleDoubleRight, faAngleRight, faPlus} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import {Button} from "react-bootstrap";

//komentar

const Dashboard=()=>{
    let { id } = useParams();
    let polje=[];
    const [state, setState] = useState([])
    useEffect(() => {
        axios.post('/temaid', id, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                polje=response.data;
                setState(response.data);
                provjera();
                return polje;
            })
            .catch(error => {
                console.log(error.response)
            });
    },[]);

    const provjera=()=>{
        console.log(state[0].content);
    }


        return (
            <div>
                <div className="container px-4 py-5" id="featured-3">
                    <h2 className="pb-2 border-bottom">Posts</h2>
                    <Button id={'dashb'}><Link className='dashbl' to={{ pathname: '/createpost', state: { id: id} }}><FontAwesomeIcon icon={faPlus} /> Create Post</Link></Button>
                    <div className="row g-4 py-5 row-cols-1 row-cols-lg-1">
                        {state.map(post => (
                            <div className="feature col" key={post.id} id={'dashcol'}>
                                <h2>{post.naslov}</h2>
                                <p>{post.content}</p>
                                <h2 className="pb-2 border-bottom"></h2>
                                <Link to={'/posts/' + post.id} key={post.id} className={'dashl'}><FontAwesomeIcon icon={faAngleDoubleRight} /> View comments</Link>
                                <br/>
                            </div>))}

                    </div>
                </div>
            </div>)
    }


export default Dashboard;

                /*
                    const postCards = posts.map(post => (
                    <ul>
                        <li>
                            key={post.id}
                            post={post}
                            deletePost={this.props.requestDeletePost}
                        </li></ul>))*/

/*  let posts = postsSelector.posts.map((post) => {
    return (
      <div  className="mt-2 style-card" key={post.id}>
         <Link to={'/posts/' + post.id} key={post.id}>
          <Post post={post} key={post.id} />
        </Link>
      </div>
    );
  })*/