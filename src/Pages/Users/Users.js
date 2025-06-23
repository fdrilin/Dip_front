import TableMain from "../../components/TableMain.js";

function Users(){
    let columns = ['id', 'login', 'name', 'email', 'document_id', 'number'];
    let checkboxFields = ['', '', '', '', '', '', ''];
    let fieldNames = ['id', 'Логін', 'Ім\'я', 'е-мейл', 'id документа', 'Номер'];

    return(
        <div className="Main">
            <h2>Користувачі</h2>
            <TableMain columns = {columns} name="user" editable={true} checkboxFields={checkboxFields} fieldNames={fieldNames}/> 
        </div>
    );
}

export default Users;
