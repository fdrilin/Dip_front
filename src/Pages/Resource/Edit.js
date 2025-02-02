//import {Link} from 'react-router-dom';
import { findAllByTitle } from '@testing-library/react';
import './Main.css';
import React, { useState, useEffect } from "react";
import { useLoaderData, useParams } from 'react-router-dom';

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
                <div className='titleDiv'><label><span>title</span><input name="title" defaultValue={resource.title}/></label></div>
                <div className='descriptionDiv'><label><span>description</span><textarea defaultValue={resource.description} name="description"/></label></div>
                <div className='ErrorDiv'><span>{error}</span></div>
                <button onClick={save}>OK</button>
            </form>
        </div>
    );

    function save() 
    {
        var id = document.querySelector(".resourceEdit input[name=id]").value;
        var title = document.querySelector(".resourceEdit input[name=title]").value;
        var description = document.querySelector(".resourceEdit textarea[name=description]").value;
    
        if (id == 0) {
            fetch("https://localhost:7089/api/ResourceItems", {   
                method: 'Post',       
                crossorigin: true,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: title, description: description })
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
        } else {
            fetch("https://localhost:7089/api/ResourceItems/" + id.toString(), {   
                method: 'Put',       
                crossorigin: true,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id, title: title, description: description})
                })
                .then(res => res.json())
                //.then(res => setResources(res))
                .catch(_ => console.log(_));
        }
    }
        
}

export default Resource;