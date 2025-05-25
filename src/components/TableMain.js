//import
import React, { useState, useEffect } from "react";
import getToken, { isAdmin } from "./AuthFunctions";

function TableMain(props) {
    let columns = props.columns;
    let name = props.name;
    let checkboxFields = props.checkboxFields;
    if (!checkboxFields)
    {
        checkboxFields = new Array(columns.length).fill("");
    }

    const [definitions, setData] = useState([]);

return(
        <div>
            <div className='searchDiv'>
                <label><span>Search: </span><input name="search"/></label>
                {getTagEls(props.tags)}
            </div>
            { props.style == "card" 
                ? showCard(props, definitions)
                : showTable(props, definitions)
            }
            <button id = "btnLoad" onClick={(event) => {
                    load(formUrl(name, props.resource_type_id), setData);
                }} >load</button>
            <a href={ name + "/0" }>add</a>
        </div>
    )
}

function showTable(props, definitions)
{
    let columns = props.columns;
    let name = props.name;
    let checkboxFields = props.checkboxFields;
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
                            checkboxFields[colIdx] == "" ?
                            item[col] :
                            <input type="checkbox" checked={ item[checkboxFields[colIdx]] } onChange={ 
                                (e) => 
                                {
                                    update(e.target, item, props.name, checkboxFields[colIdx], definitions);
                                }
                            }/>
                        }
                        </td>
                    )}
                    { name=="resourceType" && 
                        <td>
                            <a href={"resource?resource_type_id=" + item.id}>resources</a>
                        </td>
                    }
                    { props.editable && 
                        <td>
                            <a href={props.name + "/" + item.id}>edit</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); deleteItem(item.id, props.name); }}>delete</a>
                        </td>
                    }  
                </tr>
                )}
            </tbody>
        </table>
    )
}

function showCard(props, definitions) 
{
    let columns = props.columns;
    let name = props.name;
    let checkboxFields = props.checkboxFields;
    
    return(
        <div>
            { definitions.map((item, idx) => 
                <div className="card" name={item.title} key={idx}>
                    <div className="title">{item.title}</div>
                    <div className="description">{item.description}</div>
                    <div className="software">{item.software}</div>
                    <div className="tags">{item.tags}</div>
                    <div className="available">Кількість: {item.available}</div>
                </div>
            )}
            <div className="clear-fix"/>
        </div>
    )
}

function load(filename, setData)
{
    if (filename) {
        console.log("loading from:", filename);
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
                    setData([]);
                    throw new Error("blocked");
                }
                return res.json();
        })
        .then(res => setData(res))
        .catch(_ => console.log(_));
    }
    getTagValues();
}

function formUrl(name, resource_type_id)
{
    let url = "https://localhost:7089/api/" + name +"Items";
    let search =  document.querySelector(".searchDiv input[name=search]").value;
    let tags = getTagValues();
    url += "?search=" + search;

    if (tags)
    {
        url += "&tags=" + tags.join(",");
    }
    if (resource_type_id)
    {
        url += "&resource_type_id=" + resource_type_id;
    }

    return url;
}

export function getTagEls(tags, values = [])
{
    if (!tags)
    {
        return "";
    }
    return (
        <div className="tags">
            { tags.map((item, idx) =>
                <label key={idx} name={item}>{item}<input defaultChecked={values.includes(item)} name={item} value={item} type="checkbox"/></label>
            )}
        </div>
    )
}

export function getTagValues()
{
    let values = [];
    document.querySelectorAll(".tags input").forEach((el) => {
        if (el.checked)
        {
            values.push(el.value);
        }
    });
    return values;
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
                document.getElementById("btnLoad").click();
            } else {
                data.then(res => alert(res.message));
            }
        })
        .catch(_ => console.log(_));
}

export default TableMain;
