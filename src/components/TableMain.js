//import
import React, { useState, useEffect } from "react";
import { isAdmin } from "./AuthFunctions";

function TableMain(props) {
    let definitions = props.data;
    let columns = props.columns;

return(
        <table>
            <thead>
                <tr>
                    {columns.map((item, idx) => 
                        <th key = {idx.toString()}>{item}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {definitions.map((item, idx) => 
                <tr key={item.id.toString()} onClick={(e) => { selectItem(e, item.id, props.selectId); }}>
                    {columns.map((col, colIdx) =>
                        <td key = {idx.toString() + '-' + colIdx.toString()} >
                        { 
                            props.checkboxFields[colIdx] == "" ?
                            item[col] :
                            <input type="checkbox" checked={ item[props.checkboxFields[colIdx]] } onChange={ 
                                (e) => 
                                { 
                                    update(e.target, item, props.url, props.checkboxFields[colIdx], definitions);
                                }
                            }/>
                        }
                        </td>
                    )}
                    { props.editable && 
                        <td>
                            <a href={props.url + "/" + item.id}>edit</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); deleteItem(item.id, props.url); }}>delete</a>
                        </td>
                    }  
                </tr>
                )}
            </tbody>
        </table>
    )
}

class CheckboxFiller
{
    isFirstTime = true;
    return
}

function deleteItem(id, url) 
{
    fetch("https://localhost:7089/api/" + url + "Items/" + id, {   
        method: 'Delete',       
        crossorigin: true,
        headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            let data = res.json();
            if (res.status === 200) {
                alert("deleted successfully");    
            } else {
                data.then(res => alert(res.message));                        
            }
        })
        //.then(res => console.log(res))
        .catch(_ => console.log(_));
}

function selectItem(e, id, selectId) 
{
    e.currentTarget.closest("table").querySelectorAll("tr").forEach(row => row.classList.remove("active"));
    e.currentTarget.classList.add("active");

    let idEl = document.getElementById(selectId);
    if (idEl) 
    {    
        idEl.value = id;
    }
}

function update(checkbox, item, url, field, definitions)
{
    fetchSingle(item, url, field, 0+checkbox.checked);
}

function fetchSingle(item, url, field, value, )
{
    var id = item.id;
    console.log(id, field, value);
    fetch("https://localhost:7089/api/" + url + "Items/" + field + "/" + id, {   
        method: 'Put',       
        crossorigin: true,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, [field]: value })
        })
        .then(res => {
            let data = res.json();
            if (res.status === 200) {
                console.log(field + " update success");
                item[field] = value;
                console.log(item);
            } else {
                data.then(res => alert(res.message));
            }
        })
        .catch(_ => console.log(_));
}

export default TableMain;