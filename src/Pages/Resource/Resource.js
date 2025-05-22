import './Main.css';
import TableMain from "../../components/TableMain.js";

function Resource(props){
    let columns = ['id', 'title', 'description', 'serialNo', 'available'];
    let checkboxFields = ['', '', '', '', ''];
    //let resourceType = props.resource_type_id;

    return(
        <div className="resourceMain">
            {/*<h2>Resource</h2>*/}
            <caption>Resource</caption>
            <TableMain columns = {columns} name="resource" editable={true} checkboxFields={checkboxFields}/> 
        </div>
    );
}

export default Resource;