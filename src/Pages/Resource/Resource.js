//import {Link} from 'react-router-dom';
import { eventWrapper } from '@testing-library/user-event/dist/utils';
import './Main.css';
import React, { useState, useEffect } from "react";
import TableMain from "../../components/TableMain.js";
import getToken, { isAdmin } from '../../components/AuthFunctions.js';

function Resource(props){
    const [filename, setFilename] = React.useState(null);
    const [resources, setResources] = useState([]);

    useEffect(() => {
    if (filename) {
        fetch(filename, {   
                headers: {
                    "Authorization": getToken()
                },
                method: 'GET',       
                crossorigin: true,    
            })
            .then(res => {
                if (!res.ok)
                    {
                        setResources([]);
                        throw new Error("blocked");
                    }
                    return res.json();
            })
            .then(res => setResources(res))
            .catch(_ => console.log(_));
    }
    }, [filename]);

    //Table(['id', 'title', 'description'], resources);  

    let columns = ['id', 'title', 'description', 'serialNo', 'available'];

    return(
        <div className="resourceMain">
            {/*<h2>Resource</h2>*/}
            <caption>Resource</caption>
            <div className='searchDiv'>
                <label><span>Search: </span><input name="search"/></label>
                <button id = "btnLoad" onClick={(event) => {
                    let url = "https://localhost:7089/api/ResourceItems";
                    let search =  document.querySelector(".searchDiv input[name=search]").value;
                    if (search) {
                        url += "?search=" + search;
                    }
                    setFilename(url);
                }} >load</button>
            </div>
            <TableMain columns = {columns} data={resources} url='resource' selectId={props.selectId} editable={isAdmin()}/>
            <br/>
            { isAdmin() &&
                <a href="resource/0">add</a>
            }
        </div>
    );
}

export default Resource;