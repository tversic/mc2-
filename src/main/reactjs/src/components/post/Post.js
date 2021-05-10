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
        axios.post('https://localhost:8443/tema', id1, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                provjera();
                localStorage.getItem('userId')
                setState({
                        ...state,
                        id: response.data.id,
                        naslov: response.data.naslov,
                        content: response.data.content
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
            .then(response => {

                setComment({...comment,
                    content:'',
                    creation_dat:'',
                    tema_id:'',
                    user_id:0
                })
                window.location.reload();
            })
            .catch(error => {
                console.log(error.response)
                console.log(comment);
            });}

    const change=(event)=> {

        setComment({...comment,
            content:event.target.value,
            creation_dat:Date().toString(),
            tema_id:id1,
            user_id:parseInt(localStorage.getItem('userid'))
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
                    <textarea id={'txta'} placeholder={'Comment'} name={'comment'} value={comment.content} onChange={change} cols={50}></textarea>
                </div>
                <div className={'row row-cols-lg-6 '}>
                    <button className={'btn btn-primary float-right'} id='btntxt' type={"submit"} onClick={handleChange}>Post</button>
            </div>
                <hr></hr>
                    <Comments/></div>
            </div>
    )
}

export default Post;

/*<Comments postID={post.id} />*/