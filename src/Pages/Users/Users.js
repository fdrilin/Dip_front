import './Main.css';
import TableMain from "../../components/TableMain.js";

function Users(){
    let columns = ['id', 'login', 'name', 'email', 'document_id', 'admin', 'token'];

    return(
        <div className="Main">
            <h2>Users</h2>
            <TableMain columns = {columns} name="user" editable={true}/> 
        </div>
    );
}

export default Users;
