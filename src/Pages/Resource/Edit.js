//import {Link} from 'react-router-dom';
import { findAllByTitle } from '@testing-library/react';
import './Main.css';
import React, { useState, useEffect } from "react";
import { useLoaderData, useParams } from 'react-router-dom';

function save() 
{
    var id = document.querySelector(".resourceEdit input[name=id]").value;
    var title = document.querySelector(".resourceEdit input[name=title]").value;
    var descpription = document.querySelector(".resourceEdit textarea[name=description]").value;

    if (id == 0) {
        fetch("https://localhost:7089/api/ResourceItems", {   
            method: 'Post',       
            crossorigin: true,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title, description: descpription })
            })
            .then(res => res.json())
            //.then(res => setResources(res))
            .catch(_ => console.log(_));
    } else {
        fetch("https://localhost:7089/api/ResourceItems/" + id.toString(), {   
            method: 'Put',       
            crossorigin: true,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, title: title, description: descpription })
            })
            .then(res => res.json())
            //.then(res => setResources(res))
            .catch(_ => console.log(_));
    }
}

function Resource(){
    const resourceId = useLoaderData();

    const [resource, setResource] = useState({title: "", description: ""});

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
                <div className='titleDiv'><label><span>title</span><input name="title" defaultValue={resource.title}/></label></div>
                <div className='descriptionDiv'><label><span>description</span><textarea defaultValue={resource.description} name="description"/></label></div>
                <button onClick={save}>OK</button>
            </form>
        </div>
    );
}

export default Resource;