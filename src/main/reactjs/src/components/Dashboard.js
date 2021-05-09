import React, {Component, useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom";
import '../style/dash.css'
import {faAngleDoubleRight, faAngleRight} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";

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
        /*let postsa= [ {id:1,
                title:'post 1',
                body: 'this is the first post',
                catId:1
            },
                {id:2,
                    title:'post 2',
                    body: 'this is the second post',
                    catId:1
                },
                {id:3,
                    title:'post 3',
                    body: 'this is the first post',
                    catId:1
                },
                {id:4,
                    title:'post 4',
                    body: 'this is the first post',
                    catId:2
                }];*/




        /*const posts =  Array.from(postsa);
        let posts1=[];
        for(let i=0;i<posts.length;i++){
            if(posts[i].catId==id){
                posts1[i]=posts[i];
            }
        }*/

        return (
            <div>
                <div className="container px-4 py-5" id="featured-3">
                    <h2 className="pb-2 border-bottom">Posts</h2>
                    <button id={'dashb'}><Link className='dashbl' to={{ pathname: '/createpost', state: { id: id} }}>Create Post</Link></button>
                    <div className="row g-4 py-5 row-cols-1 row-cols-lg-1">
                        {state.map(post => (
                            <div className="feature col" key={post.id} id={'dashcol'}>
                                <h2>{post.naslov}</h2>
                                <p>{post.content}</p>
                                <h2 className="pb-2 border-bottom"></h2>
                                <Link to={'/posts/' + post.id} key={post.id} className={'dashl'}><FontAwesomeIcon icon={faAngleDoubleRight} /> See more</Link>
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