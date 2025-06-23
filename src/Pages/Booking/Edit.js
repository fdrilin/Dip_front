//import {Link} from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { useLoaderData, useParams } from 'react-router-dom';
import TableMain from '../../components/TableMain';
import { useSearchParams } from 'react-router-dom';
import getToken, { isAdmin } from "../../components/AuthFunctions";
import { formTagList } from "../ResourceType/ResourceType";

function Booking(props){
    const resourceId = useLoaderData();

    const [resource, setResource] = useState({beginDate: "", endDate: ""});
    const [error, setError] = useState([]);

    useEffect(() => {
        if (resource.beginDate === "" && resourceId != 0) {
            fetch("https://localhost:7089/api/BookingItems/" + resourceId.toString(), {
                method: 'GET',
                crossorigin: true,
                })
                .then(res => res.json())
                .then(res => setResource(res))
                .catch(_ => console.log(_));
        }
    }, [resource]);

    let columns = ['id', 'title', 'description', 'software', 'tags', 'available'];
    let checkboxFields = ['', '', '', '', '', ''];
    let fieldNames = ['id', 'Назва', 'Опис', 'ПЗ', 'Теги', 'Доступні'];
    //let resourceType = props.resource_type_id;
    let tags = formTagList();
    
    const params = new URLSearchParams(window.location.search);
    const resourceTypeId = params.get('resource_type_id');
    console.log(resourceTypeId);

    return(
        <div className='Main'>
            <div className="formEdit">
                <h2>Бронювання</h2>
                <form onSubmit={(e)=>{e.preventDefault();}}>
                    <input type = "hidden" name="id" defaultValue={resourceId}/>
                    <label  className='labelInput'>Дата початку:</label>
                    <div className='paramGroup'>
                        <label><span>рік</span></label><input type="number" min="2025" max="2030" name="beginDateYear" defaultValue={getDateArray(resource.beginDate)[0]}/>
                        <label><span>місяць</span></label><input type="number" min="1" max="12" name="beginDateMonth" defaultValue={getDateArray(resource.beginDate)[1]}/>
                        <label><span>день</span></label><input type="number" min="1" max="31" name="beginDateDay" defaultValue={getDateArray(resource.beginDate)[2]}/>
                    </div>
                    <label className='labelInput'>Дата кінця:</label>
                    <div className='paramGroup'>
                        <label><span>рік</span></label><input type="number" min="2025" max="2030" name="endDateYear" defaultValue={getDateArray(resource.endDate)[0]}/>
                        <label><span>місяць</span></label><input type="number" min="1" max="12" name="endDateMonth" defaultValue={getDateArray(resource.endDate)[1]}/>
                        <label><span>день</span></label><input type="number" min="1" max="31" name="endDateDay" defaultValue={getDateArray(resource.endDate)[2]}/>
                    </div>
                    <label style={{display: "none"}} className='labelInput'>Id типа ресурса</label><input hidden id="selectId" name="resourceTypeId" defaultValue={resourceId}/>
                    { isAdmin() &&
                        <TableMain columns = {columns} name="resourceType" editable={false} checkboxFields={checkboxFields} selectId={document.getElementById("selectId")}/>
                    }
                    <div className='ErrorDiv'><span>{error}</span></div>
                    <button className='button-save' onClick={(e) => save(resourceTypeId)}>Зберегти</button>
                </form>
            </div>
        </div>
    );

    function save(resourceTypeId) 
    {
        var id = document.querySelector(".formEdit input[name=id]").value;
        //var userId = document.querySelector(".formEdit textarea[name=userId]").value;
        var beginDate = document.querySelector(".formEdit input[name=beginDateYear]").value + "-" 
        + document.querySelector(".formEdit input[name=beginDateMonth]").value + "-" 
        + document.querySelector(".formEdit input[name=beginDateDay]").value;
        var endDate = document.querySelector(".formEdit input[name=endDateYear]").value + "-" 
        + document.querySelector(".formEdit input[name=endDateMonth]").value + "-" 
        + document.querySelector(".formEdit input[name=endDateDay]").value
        + " 23:59:59";
        var rented, returned, canceled;
    
        let body = { resourceTypeId: resourceTypeId, beginDate: beginDate, endDate: endDate, rented: rented, returned: returned, canceled: canceled };
        console.log(body);
        let method = 'Post';
        let url = "https://localhost:7089/api/BookingItems";
        if (id > 0)
        {
            method = 'Put';
            body.id = id;
            url += "/" + id.toString();
        }
        fetch(url, {
            method: method,
            crossorigin: true,
            headers: { 
                'Content-Type': 'application/json', 
                "Authorization": getToken()
            },
            body: JSON.stringify( body )
            })
            .then(res => {
                let data = res.json();
                if (res.status === 200) {
                    window.location.href = '/booking';
                } else {
                    data.then(res => setError(res.message));
                }
            })
            .catch(_ => console.log(_));
    }

    function getDateArray(date)
    {
        console.log((date.split(" "))[0].split("-"));
        return (date.split(" "))[0].split("-");
    }
}

export default Booking;
