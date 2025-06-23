//import {Link} from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { useLoaderData, useSearchParams } from 'react-router-dom';
import getToken, { isAdmin } from '../../components/AuthFunctions';
import TableMain from '../../components/TableMain';

function Resource(props){
    const resourceId = useLoaderData();
    
    const [resource, setResource] = useState({resourceTypeId: ""});
    const [error, setError] = useState([]);

    useEffect(() => {
        if (resource.resourceTypeId == "" && resourceId != 0) {
            console.log("loading");
            fetch("https://localhost:7089/api/ResourceItems/" + resourceId.toString(), {
                method: 'GET',
                crossorigin: true,
                })
                .then(res => res.json())
                .then(res => setResource(res))
                .catch(_ => console.log(_));
        }
    }, [resource]);

    let columns = ['id', 'title', 'description', 'software', 'tags', 'available'];
    let checkboxFields = ['', '', '', '', '', ''];
    console.log(props);

    return(
        <div className="Main">
            <div className='formEdit'>
            <h2>Техніка</h2>
                <form onSubmit={(e)=>{e.preventDefault();}}>
                    {/*Needs fetch to function properly*/}
                    <input type = "hidden" name="id" defaultValue={resourceId}/>
                    <label className='labelInput'>Серійний номер</label><input name="serialNo" defaultValue={resource.serialNo}/>
                    <label className='labelInput'>Доступність</label><span><input type="checkbox" name="available" defaultChecked={resource.available}/></span>
                    <input hidden id="selectId" name="resourceTypeId" defaultValue={resource.resourceTypeId}/>
                    {console.log(document.getElementById("selectId"))}
                    <TableMain columns = {columns} name="resourceType" editable={false} checkboxFields={checkboxFields} selectId={"selectId"}/> 
                    <div className='ErrorDiv'><span>{error}</span></div>
                    <button className='button-save' onClick={(e) => {save();}}>save</button>
                </form>
            </div>
        </div>
    );

    function save() 
    {
        console.log("saving");
        var id = document.querySelector(".formEdit input[name=id]").value;
        var serialNo = document.querySelector(".formEdit input[name=serialNo]").value;
        var available = +document.querySelector(".formEdit input[name=available]").checked;
        var resourceTypeId = parseInt(document.querySelector(".formEdit input[name=resourceTypeId]").value);

        let body = { serialno: serialNo, available: available, resourceTypeId: resourceTypeId };
        console.log(body);
        let method = 'Post';
        let url = "https://localhost:7089/api/ResourceItems";
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
                    window.location.href = '/resource';
                } else {
                    data.then(res => setError(res.message));                        
                }
            })
            //.then(res => console.log(res))
            .catch(_ => console.log(_));
    }
        
}

export default Resource;
