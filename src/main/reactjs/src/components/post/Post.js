import React, {Component, useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import { useParams } from 'react-router-dom';
import Comments from './Comments'
import '../../style/post.css'
import axios from "axios";



const Post = () => {
    let { id } = useParams();
    let id1=parseInt(id);
    const [state,setState]=useState({id:'',naslov:''});
    const [comment,setComment]=useState({content:'',creation_dat:'',user_id:'',tema_id:'',komentar_id:''})
    useEffect(() => {
        axios.post('https://localhost:8443/tema',id1, {headers: {
            'Content-Type': 'application/json'
        }})
            .then(response => {
                provjera();
                setState({...state,
                    id:response.data.id,
                    naslov:response.data.naslov,
                    content:response.data.content
                    }
                )
                return state;
            })
            .catch(error => {
                console.log(error.response)
            });
    },[]);

    const provjera=()=>{
        console.log(state);
    }

    let handleChange=()=>{
        axios.post('https://localhost:8443/dodajKoment',{
                content:comment.content,
                creation_dat:comment.creation_dat,
                tema_id:comment.tema_id,
                komentar_id:0,
                user_id:comment.user_id
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .catch(error => {
                console.log(error.response)
            });}

    const change=(event)=> {
        setComment({...state,
            content:event.target.comment,
            creation_dat:Date().toString(),
            tema_id:id1,
            user_id:1
        })
    }




    return (
        <div>
            <div className="container px-4 py-5" id="featured-3">
                <div className="row row-justify-content g-4 py-5 row-cols-1 row-cols-lg-1">
                        <div className="feature col" id={'postcol'}>
                            <h2>{state.naslov}</h2>
                            <p>{state.content}</p>
                            <br/>
                        </div>
                    <textarea placeholder={'Comment'} name={'comment'} onChange={change} cols={50}></textarea>
                    <button type={"submit"} onClick={handleChange}>Post</button>
                    <Comments/>
                </div>
            </div>
        </div>
    )
}

export default Post;

/*<Comments postID={post.id} />*/