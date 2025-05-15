//import
import React, { useState, useEffect } from "react";

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
                <tr key={item.id.toString()} onClick={(e) => { e.preventDefault(); selectItem(item.id, props.selectId); }}>
                    {columns.map((col, colIdx) =>
                        <td key = {idx.toString() + '-' + colIdx.toString()} >{item[col]}</td>
                    )}
                    <td>
                        <a href={props.url + "/" + item.id}>edit</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); deleteItem(item.id, props.url); }}>delete</a>
                    </td>
                </tr>
                )}
            </tbody>
        </table>
    )
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

function selectItem(id, selectId) 
{
    document.getElementById(selectId).value = id;
}

export default TableMain;