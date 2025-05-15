//import {Link} from 'react-router-dom';
import { eventWrapper } from '@testing-library/user-event/dist/utils';
import './Main.css';
import React, { useState, useEffect } from "react";
import TableMain from "../../components/TableMain.js";

function Resource(props){
    const [filename, setFilename] = React.useState(null);
    const [resources, setResources] = useState([]);

    useEffect(() => {
    if (filename) {
        fetch(filename, {   
            method: 'GET',       
            crossorigin: true,    
            })
            .then(res => res.json())
            .then(res => setResources(res))
            .catch(_ => console.log(_));
    }
    }, [filename]);

    //Table(['id', 'title', 'description'], resources);  

    let columns = ['id', 'title', 'description', 'serialNo', 'available'];

    return(
        <div className="resourceMain">
            <h2>Resource</h2>
            <form className='resourceFilter' onSubmit={(e)=>{e.preventDefault();}}>
                <div className='searchDiv'><label><span>Search: </span><input name="search"/></label></div>
            </form>
            <TableMain columns = {columns} data={resources} url='resource' selectId={props.selectId}/>
            <br/>
            <button id = "btnLoad" onClick={(event) => {
                let url = "https://localhost:7089/api/ResourceItems";
                let search =  document.querySelector(".resourceFilter input[name=search]").value;
                if (search) {
                    url += "?search=" + search;
                }
                setFilename(url);
            }} >load</button>
            <a href="resource/0">add</a>
        </div>
    );
}

export default Resource;