//import {Link} from 'react-router-dom';
import { findAllByTitle } from '@testing-library/react';
import React, { useState, useEffect } from "react";
import { useLoaderData, useParams } from 'react-router-dom';
import getToken from '../../components/AuthFunctions';
import { getTagEls, getTagValues } from '../../components/TableMain';
import { formTagList } from './ResourceType';

function Resource(){
    const resourceId = useLoaderData();

    const [resource, setResource] = useState({});
    const [error, setError] = useState([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (!resource.title && resourceId != 0) {
            fetch("https://localhost:7089/api/ResourceTypeItems/" + resourceId.toString(), {   
                method: 'GET',       
                crossorigin: true,
                })
                .then(res => res.json())
                .then(res => {setResource(res); setReady(true)})
                .catch(_ => console.log(_));
        }
    }, [resource]);

    return(
        <div className="Main">
            <div className='formEdit'>
                <h2>Тип Техніки</h2>
                <form onSubmit={(e)=>{e.preventDefault();}}>
                    <input type = "hidden" name="id" defaultValue={resourceId}/>
                    <label className='labelInput'>title</label><input name="title" defaultValue={resource.title}/>
                    <label className='labelInput'>description</label><textarea defaultValue={resource.description} name="description"/>
                    <label className='labelInput'>software</label><input name="software" defaultValue={resource.software}/>
                    { ready && getTagEls(formTagList(), !resource.tags ? [] : resource.tags.split(","), !resource.tags ? [] : resource.tags.split(","))
                    }
                    <div className='ErrorDiv'><span>{error}</span></div>
                    <button className='button-save' onClick={save}>save</button>
                </form>
            </div>
        </div>
    );

    function save() 
    {
        console.log("saving...");
        var id = document.querySelector(".formEdit input[name=id]").value;
        var title = document.querySelector(".formEdit input[name=title]").value;
        var description = document.querySelector(".formEdit textarea[name=description]").value;
        var software = document.querySelector(".formEdit input[name=software]").value;
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
                    window.location.href = '/';
                } else {
                    data.then(res => setError(res.message));                        
                }
            })
            //.then(res => console.log(res))
            .catch(_ => console.log(_));
    }
        
}

export default Resource;
