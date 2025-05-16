//import './Main.css';
import React, { useState, useEffect } from "react";
import TableMain from "../../components/TableMain.js";

function Users(){
    const [filename, setFilename] = React.useState(null);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
    if (filename) {
    fetch(filename)
        .then(res => res.json())
        .then(res => setBookings(res))
        .catch(_ => console.log(_));
    }
    }, [filename]); 

    let columns = ['id', 'login', 'name', 'email', 'document_id', 'admin', 'token'];

    return(
        <div className="Main">
            <h2>Users</h2>
            <form className='filter' onSubmit={(e)=>{e.preventDefault();}}>
                <div className='searchDiv'><label><span>Search: </span><input name="search"/></label></div>
            </form>
            <TableMain columns = {columns} data={bookings} url="booking"/>
            <button id = "btnLoad" onClick={(event) => {
                let url = "https://localhost:7089/api/UserItems";
                let search =  document.querySelector(".filter input[name=search]").value;
                if (search) {
                    url += "?search=" + search;
                }
                setFilename(url);
            }} >load</button>
            <a href="users/0">add</a>
        </div>
    );
}

export default Users;