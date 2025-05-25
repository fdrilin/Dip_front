//import {Link} from 'react-router-dom';
import { findAllByTitle } from '@testing-library/react';
import './Main.css';
import React, { useState, useEffect } from "react";
import { useLoaderData, useParams } from 'react-router-dom';
import getToken from '../../components/AuthFunctions';
import { getTagEls, getTagValues } from '../../components/TableMain';
import { formTagList } from './ResourceType';

function Resource(){
    const resourceId = useLoaderData();

    const [resource, setResource] = useState({title: "", description: ""});
    const [error, setError] = useState([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (resource.title === "" && resourceId != 0) {
            resource.title = "loading";
            fetch("https://localhost:7089/api/ResourceTypeItems/" + resourceId.toString(), {   
                method: 'GET',       
                crossorigin: true,
                })
                .then(res => res.json())
                .then(res => {setResource(res); setReady(true)})
                .catch(_ => console.log(_));
        }
        else 
        {
            setReady(true);
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
                <div className='softwareDiv'><label><span>software</span><input name="software" defaultValue={resource.software}/></label></div>
                { ready && getTagEls(formTagList(), !resource.tags ? [] : resource.tags.split(","))}
                <div className='ErrorDiv'><span>{error}</span></div>
                <button onClick={save}>save</button>
            </form>
        </div>
    );

    function save() 
    {
        var id = document.querySelector(".resourceEdit input[name=id]").value;
        var title = document.querySelector(".resourceEdit input[name=title]").value;
        var description = document.querySelector(".resourceEdit textarea[name=description]").value;
        var software = document.querySelector(".resourceEdit input[name=software]").value;
        var tags = getTagValues().join(",");

        let body = { title: title, description: description, software: software, tags: tags };
        let method = 'Post';
        let url = "https://localhost:7089/api/ResourceTypeItems";
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
