import './Main.css';
import TableMain from "../../components/TableMain.js";
import { isAdmin } from '../../components/AuthFunctions.js';

function Booking(){
    let columns = ['id', 'beginDate', 'endDate', 'canceled'];
    if (isAdmin())
    {
        columns.push('rented', 'returned');
    }
    let checkboxFields=["","","","canceled","rented","returned"];

    return(
        <div className="Main">
            <h2>Booking</h2>
            <TableMain columns = {columns} name="booking" editable={true} checkboxFields={checkboxFields}/> 
        </div>
    );
}

export default Booking;