//import {Link} from 'react-router-dom';
import { eventWrapper } from '@testing-library/user-event/dist/utils';
import './Main.css';
import React, { useState, useEffect } from "react";
import TableMain from "../../components/TableMain.js";

function Resource(){
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

    let columns = ['id', 'title', 'description'];

    return(
        <div className="Main">
            <h2>Resource</h2>
            <TableMain columns = {columns} data={resources}/>
            <br/><a href='users'>better option</a>
            <button id = "btnLoad" onClick={(event) => setFilename('https://localhost:7089/api/ResourceItems')} >load</button>
            <a href="resource/0">add</a>
            <a href="users/1">move</a>
        </div>
    );
}

export default Resource;