//import {Link} from 'react-router-dom';
import { findAllByTitle } from '@testing-library/react';
import React, { useState, useEffect } from "react";
import { useLoaderData, useParams } from 'react-router-dom';
import getToken from '../../components/AuthFunctions';

function Resource(){
    const resourceId = useLoaderData();
    const [resource, setResource] = useState({login: ""});
    const [error, setError] = useState([]);

    useEffect(() => {
        if (resource.login === "" && resourceId != 0) {
            console.log("loading");
            fetch("https://localhost:7089/api/userItems/" + resourceId.toString(), {   
                method: 'GET',       
                crossorigin: true,      
                headers: {
                    "Authorization": getToken()
                },
                })
                .then(res => res.json())
                .then(res => setResource(res))
                .catch(_ => console.log(_));
        }
    }, [resource]);

    return(
        <div className="Main">
            <div className='formEdit'>
                <h2>Користувач</h2>
                <form onSubmit={(e)=>{e.preventDefault();}}>
                    {/*Needs fetch to function properly*/}
                    <input type = "hidden" name="id" defaultValue={resourceId}/>
                    <label className='labelInput'>login</label><input name="login" defaultValue={resource.login}/>
                    { resourceId == 0 &&
                        <><label className='labelInput'>password</label><input name="password"/></>
                    }
                    <label className='labelInput'>name</label><input name="name" defaultValue={resource.name}/>
                    <label className='labelInput'>email</label><input name="email" defaultValue={resource.email}/>
                    <label className='labelInput'>number</label><input name="number" defaultValue={resource.number}/>
                    <label className='labelInput'>documentId</label><input name="documentId" defaultValue={resource.documentId}/>
                    <div className='ErrorDiv'><span>{error}</span></div>
                    <button onClick={save} className='button-save'>save</button>
                </form>
            </div>
        </div>
    );

    function save() 
    {
        var id = document.querySelector(".formEdit input[name=id]").value;
        var login = document.querySelector(".formEdit input[name=login]").value;
        if (document.querySelector(".formEdit input[name=password]")) 
        {
            var password = document.querySelector(".formEdit input[name=password]").value;
        }
        var name = document.querySelector(".formEdit input[name=name]").value;
        var email = document.querySelector(".formEdit input[name=email]").value;
        var number = document.querySelector(".formEdit input[name=number]").value;
        var documentId = document.querySelector(".formEdit input[name=documentId]").value;

        let body = { login: login, password: password, number: number, name: name, email: email, documentId: documentId };
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
                    window.location.href = '/user';
                } else {
                    data.then(res => setError(res.message));                        
                }
            })
            //.then(res => console.log(res))
            .catch(_ => console.log(_));
    }
        
}

export default Resource;
