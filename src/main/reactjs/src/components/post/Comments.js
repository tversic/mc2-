import React, { useEffect } from 'react'

import Comment from './Comment'
import {Link, useParams} from "react-router-dom";
import '../../style/comment.css'





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
            <div className="row ">
                <div className="col-sm-8">
                    {comments1.map((comment) =>
                        <div className="feature col" key={comment.id} id={'com'}>
                            <h2>Comments</h2>
                            <p>{comment.body}</p>
                            <div className="row">
                                <div className="row justify-content-md-center">
                                <div className="col col-lg-2" id={'subcom'}>
                                    <p>Sub Comments</p>
                                    {comment.comments.map((comm) =>
                                        <p>{comm.body}</p>)}
                                </div>
                                </div></div>
                                <div className="col-sm-4"></div>

                </div>)}
                <div className="col-sm-4"></div>
            </div>
            </div></div>
    )
}

export default Comments