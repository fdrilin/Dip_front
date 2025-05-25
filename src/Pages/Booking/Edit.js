//import {Link} from 'react-router-dom';
import { findAllByTitle } from '@testing-library/react';
import './Main.css';
import React, { useState, useEffect } from "react";
import { useLoaderData, useParams } from 'react-router-dom';
import TableMain from '../../components/TableMain';
import Resource from '../Resource/Resource';

function Booking(){
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
        <div className="bookingEdit">
            <h2>EDIT</h2>
            <form onSubmit={(e)=>{e.preventDefault();}}>
                {/*Needs fetch to function properly*/}
                <input type = "hidden" name="id" defaultValue={resourceId}/>
                <div className='beginDate'><label><span>begin date</span><input name="beginDate" defaultValue={resource.title}/></label></div>
                <div className='endDate'><label><span>end date</span><input name="endDate" defaultValue={resource.title}/></label></div>
                <div className='resourceId'><label><span>resource id</span><input id="resourceId" name="resourceId" defaultValue={resource.resourceId}/></label></div>
                <Resource selectId="resourceId"/>
                <div className='ErrorDiv'><span>{error}</span></div>
                <button onClick={save}>save</button>
            </form>
        </div>
    );

    function save() 
    {
        var id = document.querySelector(".resourceEdit input[name=id]").value;
        var resourceId = document.querySelector(".resourceEdit input[name=resourceId]").value;
        //var userId = document.querySelector(".resourceEdit textarea[name=userId]").value;
        var beginDate = document.querySelector(".resourceEdit input[name=beginDate]").value;
        var endDate = document.querySelector(".resourceEdit input[name=endDate]").value;
        //var rented = document.querySelector(".resourceEdit input[name=rented]").value;
        var rented, returned, canceled;
        //var returned = document.querySelector(".resourceEdit input[name=returned]").value;
        //var canceled = document.querySelector(".resourceEdit input[name=canceled]").value;
    
        let body = { resourceId: resourceId, beginDate: beginDate, endDate: endDate, rented: rented, returned: returned, canceled: canceled };
        let method = 'Post';
        let url = "https://localhost:7089/api/BookingItems";
        if (id > 0)
        {
            method = 'Put';
            body.id = id;
            url += "/" + id.toString();
        }
        fetch(url, {
                method: method,
                crossorigin: true,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( body )
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

export default Booking;
