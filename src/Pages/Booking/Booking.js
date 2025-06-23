import TableMain from "../../components/TableMain.js";
import { isAdmin } from '../../components/AuthFunctions.js';

function Booking(){
    let columns = ['id', 'resourceTypeTitle', 'beginDate', 'endDate', 'canceled'];
    if (isAdmin())
    {
        columns.push('rented', 'returned', 'userId', 'resourceId');
    }
    let checkboxFields=["","","","","canceled","rented","returned", "", ""];
    let fieldNames=["id","Назва","Початок","Закінчення","Відміна","Взято","Повернуто", "id користувача", "id ресурса"];
    let tags = [["rented", "Взято"], ["returned","Повернено"], ["overdue", "Прострочені"]];

    return(
        <div className="Main">
            <h2>Бронювання</h2>
            <TableMain columns = {columns} name="booking" editable={isAdmin()} checkboxFields={checkboxFields} tags={tags} fieldNames={fieldNames}/>
        </div>
    );
}

export default Booking;
