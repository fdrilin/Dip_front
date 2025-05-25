import './Main.css';
import TableMain from "../../components/TableMain.js";
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function Resource(props){
    let columns = ['id', 'resourceTypeId', 'serialNo', 'available'];
    let checkboxFields = ['', '', '', '', ''];
    console.log(props);
    const [searchParams] = useSearchParams();
    let resource_type_id = searchParams.get("resource_type_id");

    return(
        <div className="resourceMain">
            {/*<h2>Resource</h2>*/}
            <h2>Resource</h2>
            <TableMain columns = {columns} name="resource" editable={true} checkboxFields={checkboxFields} resource_type_id={resource_type_id}/> 
        </div>
    );
}

export default Resource;
