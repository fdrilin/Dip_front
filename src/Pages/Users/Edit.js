//import {Link} from 'react-router-dom';
import { findAllByTitle } from '@testing-library/react';
import './Main.css';
import React, { useState, useEffect } from "react";
import { useLoaderData, useParams } from 'react-router-dom';
import getToken from '../../components/AuthFunctions';

function Resource(){
    const resourceId = useLoaderData();
    const [resource, setResource] = useState({title: "", description: ""});
    const [error, setError] = useState([]);

    useEffect(() => {
        if (resource.title === "" && resourceId != 0) {
            resource.title = "loading";
            fetch("https://localhost:7089/api/ResourceItems/" + resourceId.toString(), {   
                method: 'GET',       
                crossorigin: true,    
                })
                .then(res => res.json())
                .then(res => setResource(res))
                .catch(_ => console.log(_));
        }
    }, [resource]);

    return(
        <div className="resourceEdit">
            <h2>EDIT</h2>
            <form onSubmit={(e)=>{e.preventDefault();}}>
                {/*Needs fetch to function properly*/}
                <input type = "hidden" name="id" defaultValue={resourceId}/>
                <div className='loginDiv'><label><span>login</span><input name="login" defaultValue={resource.login}/></label></div>
                {/*<div className='passwordDiv'><label><span>password</span><input name="password" defaultValue={resource.password}/></label></div>*/}
                <div className='nameDiv'><label><span>name</span><input name="name" defaultValue={resource.name}/></label></div>
                <div className='emailDiv'><label><span>email</span><input name="email" defaultValue={resource.email}/></label></div>
                <div className='documentIdDiv'><label><span>documentId</span><input name="documentId" defaultValue={resource.documentId}/></label></div>
                <div className='adminDiv'><label><span>admin</span><input name="admin" defaultValue={resource.admin}/></label></div>
                <div className='ErrorDiv'><span>{error}</span></div>
                <button onClick={save}>save</button>
            </form>
        </div>
    );

    function save() 
    {
        var id = document.querySelector(".resourceEdit input[name=id]").value;
        var login = document.querySelector(".resourceEdit input[name=login]").value;
        var name = document.querySelector(".resourceEdit textarea[name=name]").value;
        var email = document.querySelector(".resourceEdit input[name=email]").value;
        var documentId = document.querySelector(".resourceEdit input[name=documentId]").value;
        var admin = document.querySelector(".resourceEdit input[name=admin]").value;

        let body = { login: login, name: name, email: email, documentId: documentId, admin: admin };
        let method = 'Post';
        let url = "https://localhost:7089/api/UserItems";
        if (id > 0) 
        {
            method = 'Put';
            body.id = id;
            url += "/" + id.toString();
        }

        fetch(url, {   
            method: method,       
            crossorigin: true,
            headers: { 
                'Content-Type': 'application/json' ,
                "Authorization": getToken()
            },
            body: JSON.stringify(body)
            })
            .then(res => {
                let data = res.json();
                if (res.status === 200) {
                    setError("saved successfully");    
                } else {
                    data.then(res => setError(res.message));                        
                }
            })
            //.then(res => console.log(res))
            .catch(_ => console.log(_));
    }
        
}

export default Resource;
