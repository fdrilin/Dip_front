//import {Link} from 'react-router-dom';
import './Main.css';
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

function Resource(){
    /*const [filename, setFilename] = React.useState(null);
    const [resources, setResources] = useState([]);

    useEffect(() => {
    if (filename) {
    fetch(filename)
        .then(res => res.json())
        .then(res => setResources(res))
        .catch(_ => console.log(_));
    }
    }, [filename]);

    let resourceId = useParams().resourceId;
    console.log(resourceId);*/

    return(
        <div className="Main">
            <h2>EDIT</h2>
            <form>
                <div><label><span>title</span><input name="title" defaultValue="title"/></label></div>
                <div><label><span>description</span><textarea defaultValue="description" name="description"/></label></div>
                <button>OK</button>
            </form>
        </div>
    );
}

export default Resource;