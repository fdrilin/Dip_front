import './Main.css';
import TableMain from "../../components/TableMain.js";
import { useState } from 'react';

export default function ResourceType(props){
    let columns = ['id', 'title', 'description', 'software', 'tags', 'available'];
    let checkboxFields = ['', '', '', '', '', ''];
    //let resourceType = props.resource_type_id;
    let tags = formTagList();

    return(
        <div className="resourceTypeMain">
            <caption>Resource type</caption>
            {/*<h2>Resource</h2>*/}
            <TableMain columns = {columns} name="resourceType" editable={true} checkboxFields={checkboxFields} tags={tags} style={props.style}/> 
        </div>
    );
}

export function formTagList()
{
    return ["for science", "powerful", "lightweight"];
}