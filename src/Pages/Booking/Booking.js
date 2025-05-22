import './Main.css';
import React, { useState, useEffect } from "react";
import TableMain from "../../components/TableMain.js";
import getToken, { isAdmin } from '../../components/AuthFunctions.js';

function Booking(){
    const [filename, setFilename] = React.useState(null);
    const [bookings, setBookings] = useState([]);

    let columns = ['id', 'beginDate', 'endDate', 'canceled'];
    if (isAdmin())
    {
        columns.push('rented', 'returned');
    }

    return(
        <div className="Main">
            <h2>Booking</h2>
            <form className='bookingFilter' onSubmit={(e)=>{e.preventDefault();}}>
                <div className='searchDiv'><label><span>Search: </span><input name="search"/></label></div>
            </form>
            <TableMain columns = {columns} data={bookings} url="booking" editable={true} checkboxFields={["","","","canceled","rented","returned"]}/> 
            <button id = "btnLoad" onClick={(event) => {
                let url = "https://localhost:7089/api/BookingItems";
                let search =  document.querySelector(".bookingFilter input[name=search]").value;
                if (search) {
                    url += "?search=" + search;
                }
                load(url, setBookings);
            }} >load</button>
            <a href="booking/0">add</a>
        </div>
    );
}

function load(filename, setBookings)
{
    if (filename) {
        fetch(filename, {   
            headers: {
                "Authorization": getToken()
            },
            method: 'GET',       
            crossorigin: true,    
        })
        .then(res => {
            if (!res.ok)
                {
                    setBookings([]);
                    throw new Error("blocked");
                }
                return res.json();
        })
        .then(res => setBookings(res))
        .catch(_ => console.log(_));
    }
}

export default Booking;