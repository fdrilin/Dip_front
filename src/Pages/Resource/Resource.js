import TableMain from "../../components/TableMain.js";
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { isAdmin } from '../../components/AuthFunctions.js';

function Resource(props){
    let columns = ['id', 'resourceTypeId', 'serialNo'];
    if (isAdmin())
    {
        columns.push('available');
    }
    let checkboxFields = ['', '', '', 'available'];
    const [searchParams] = useSearchParams();
    let resource_type_id = searchParams.get("resource_type_id");
    let fieldNames = ["id","id ресурс типу","Серійний номер","Доступність",];

    return(
        <div className="Main">
            {/*<h2>Resource</h2>*/}
            <h2>Техніка</h2>
            <TableMain columns = {columns} name="resource" editable={isAdmin()} checkboxFields={checkboxFields} resource_type_id={resource_type_id} fieldNames={fieldNames}/>
        </div>
    );
}

export default Resource;
