import TableMain from "../../components/TableMain.js";
import { useState } from 'react';
import { isAdmin } from '../../components/AuthFunctions.js';

export default function ResourceType(props){
    let columns = ['id', 'title', 'description', 'software', 'tags', 'available'];
    let checkboxFields = ['', '', '', '', '', ''];
    let fieldNames = ['id', 'Назва', 'Опис', 'ПЗ', 'Теги', 'Доступні'];
    //let resourceType = props.resource_type_id;
    let tags = formTagList();

    return(
        <div className="Main">
            { props.style != "card" &&
               <h2>Типи техніки</h2>
            }
            {/*<h2>Resource</h2>*/}
            <TableMain columns = {columns} name="resourceType" editable={isAdmin()} checkboxFields={checkboxFields} tags={tags} style={props.style} fieldNames={fieldNames}/> 
        </div>
    );
}

export function formTagList()
{
    return [["Науковий"], ["Сильний"], ["Легкий"], ["Ігровий"]];
}