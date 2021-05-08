import React, {Component, useEffect} from 'react'
import {Link} from "react-router-dom";
import { useParams } from 'react-router-dom';
import Comments from './Comments'



const Post = () => {
    let { id } = useParams();
    /*constructor(props) {
        super(props);
        this.state = {
            posts: [ {id:1,
                title:'post 1',
                body: 'this is the first post'
            },
                {id:2,
                    title:'post 2',
                    body: 'this is the second post'
                },
                {id:3,
                    title:'post 3',
                    body: 'this is the first post'
                },
                {id:4,
                    title:'post 4',
                    body: 'this is the first post'
                }],
            errors: {}
        };
    }*/



    return (
        <div>
            <div className="container px-4 py-5" id="featured-3">
                <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
                        <div className="feature col">
                            <h2>{id}</h2>
                            <Comments/>
                            <h2 className="pb-2 border-bottom"></h2>
                            <br/>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Post;

/*<Comments postID={post.id} />*/