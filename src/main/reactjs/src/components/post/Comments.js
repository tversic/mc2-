import React, { useEffect } from 'react'

import Comment from './Comment'
import {Link, useParams} from "react-router-dom";





const Comments = ({ postID }) => {
    let { id } = useParams();

    let comment=[{
        id:1,
        body:'iejfiejf',
        postId:1,
        comments:[
            {
                id:1,
                body:'huehdued',
                idComment:1
            }
        ]
    },
        {
            id:2,
            body:'gegreg',
            postId:1,
            comments:[
                {
                    id:1,
                    body:'huehdued',
                    idComment:2
                },
                {id:2,
                body:'foperofrf',
                    idComment:2}
            ]
        },
        {
            id:3,
            body:'gegreg',
            postId:2,
            comments:[
                {
                    id:1,
                    body:'huehdued',
                    idComment:3
                },
                {id:2,
                    body:'foperofrf',
                    idComment:3}
            ]
        }]
    let comments1=[];
    for(let i=0;i<comment.length;i++){
        if(comment[i].postId==id){
            comments1[i]=comment[i];
        }
    }


    return (
        <div>
            <div className="container px-4 py-5" id="featured-3">

                <h2 className="pb-2 border-bottom">Comments</h2>
                <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
                    {comments1.map((comment) =>
                        <div className="feature col" key={comment.id}>
                            <p>{comment.body}</p>
                            <h2 className="pb-2 border-bottom"></h2>
                            <p>Sub Comments</p>
                            {comment.comments.map((comm) =>
                                <p>{comm.body}</p>)}
                            <h2 className="pb-2 border-bottom"></h2>
                            <br/>
                        </div>)}

                </div>
            </div>
        </div>
    )
}

export default Comments