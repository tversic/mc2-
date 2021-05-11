import React, {Component, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import '../../style/reply.css'
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faReply } from '@fortawesome/free-solid-svg-icons'



const CreateReply = ({komentID}) => {
    let { id } = useParams();
    const [comment,setComment]=useState({content:'',creation_date:'',user_id:'',tema_id:'',komentar_id:''})
    const [state, setState] = useState('hidden')


let handleChange=()=>{
    axios.post('https://localhost:8443/dodajKoment',{
            content:comment.content,
            creation_date:comment.creation_date,
            tema_id:comment.tema_id,
            komentar_id:comment.komentar_id,
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
    let today=Date().toLocaleString();
    let polj=today.split(" ");
    let day=polj[1];
    let m=polj[2];
    let y=polj[3];
    let date=day+'-'+m+'-'+y;
    setComment({...comment,
        content:event.target.value,
        creation_date:date,
        tema_id:parseInt(id),
        user_id:localStorage.getItem('userid'),
        komentar_id: parseInt(komentID)
    })
}

const hide=()=>{
    if(state=='hidden'){
        setState('start');
    }
    else{
        setState('hidden');
    }

}





return (
    <div>
        <div className={'container'} id={'replycont'}>
<div className={'row'}>
    <button id='btnreply' onClick={hide.bind(hide)}><FontAwesomeIcon icon={faReply} color={'white'} flip="both"/> Reply</button></div>
    <div className={'row'}>
        {state === 'start' && (<textarea id={'txta'} placeholder={'Comment'} name={'comment'} value={comment.content} onChange={change.bind(change)} cols={30}></textarea>)}
        {state=='hidden'}
    </div>
        <div className={'row'}>
            {state === 'start' && (<button id='btnreply' type={"submit"} onClick={handleChange.bind(handleChange)}><FontAwesomeIcon icon={faReply} color={'white'} flip="both"/> Send</button>)}
            {state=='hidden'}
        </div>
            </div></div>
)
}

export default CreateReply;
