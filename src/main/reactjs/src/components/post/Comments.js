import React, {useEffect, useState} from 'react'

import Comment from './Comment'
import {Link, useParams} from "react-router-dom";
import '../../style/comment.css'
import axios from "axios";





const Comments = ({ postID }) => {
    let { id } = useParams();

   const [com,setCom]=useState([])
    let comments=[];
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
       if(com[i].tema_id==id){
           comments.push(com[i]);
       }
   }


    return (
        <div>
            <div className="row ">
                <div className="col-sm-8">
                    {comments.map((comment) =>
                        <div className="feature col" key={comment.id} id={'com'}>
                            <h2>Comments</h2>
                            <p>{comment.content}</p>
                                <div className="col-sm-4"></div>

                </div>)}
                <div className="col-sm-4"></div>
            </div>
            </div></div>
    )
}

export default Comments