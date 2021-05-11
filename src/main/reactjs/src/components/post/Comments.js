import React, {useEffect, useState} from 'react'

import Comment from './Comment'
import { useParams} from "react-router-dom";
import '../../style/comment.css'
import axios from "axios";
import CreateReply from "./CreateReply";
import Reply from "./Reply";





const Comments = ({ postID }) => {
    let {id}=useParams();
    let comments=[];
    const [com,setCom]=useState([]);

    useEffect(() => {
        axios.get('https://localhost:8443/getkoments')
            .then(response => {
                setCom(response.data);
                return com;
            })
            .catch(error => {
                console.log(error.response)
            });
    },[]);

    for(let i=0;i<com.length;i++){
        if(com[i].tema_id==postID && com[i].komentar_id==0){
            comments.push(com[i]);
        }
    }









    return (
        <div>
            <div className="row ">
                <div className="col-sm-12 col-lg-12 col-xs-12">
                    {comments.map((comment) =>
                        <div className="feature col" key={comment.id} id={'com'}>
                            <h4><h2>{comment.creation_date}</h2>@{comment.users.username} said:</h4>
                            <p>{comment.content}</p>
                            <hr></hr>
                            <CreateReply komentID={comment.id}/>
                            <Reply commentID={comment.id} comments={com}/>
                        </div>)}
                    <div className="col-sm-4"></div>
                </div>
            </div></div>
    )
}

export default Comments
/*<CreateReply komentID={comment.id}/>*/