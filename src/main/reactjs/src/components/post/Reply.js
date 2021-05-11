import React, {useEffect} from 'react'
import { useParams} from "react-router-dom";
import '../../style/comment.css'






const Reply = ({ commentID, comments }) => {
    let { id } = useParams();
    let polje=[];

    useEffect(() => {
    });

    for(let i=0;i<comments.length;i++){
        if(comments[i].tema_id==id && comments[i].komentar_id==commentID){
            polje.push(comments[i]);
        }
    }

    return (
        <div>
            <div className="row ">
                <div className="col-sm-8 col-lg-8 col-xs-8">
                    {polje.map((comment) =>
                        <div className="feature col" key={comment.id} id={'rep'}>
                            <h4><h2>{comment.creation_date}</h2>@{comment.users.username} said:</h4>
                            <p>{comment.content}</p>
                        </div>)}
                    <div className="col-sm-4"></div>
                </div>
            </div></div>
    )
}

export default Reply