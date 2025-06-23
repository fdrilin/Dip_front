import React, { useState, useEffect } from "react";
import getToken, { isAdmin, isLoggedIn } from "./AuthFunctions";

function TableMain(props) {
    let columns = props.columns;
    let name = props.name;
    if (!props.checkboxFields)
    {
        props.checkboxFields = new Array(columns.length).fill("");
    }

    const [definitions, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    if (loaded == false) {
        load(formUrl(name, props.resource_type_id), setData, setLoaded);
    }

return(
        <div>
            <div className='searchDiv'>
                <label><span>Пошук: </span></label><input name="search"/>
                <button id = "btnLoad" onClick={(event) => {
                        load(formUrl(name, props.resource_type_id), setData, setLoaded);
                    }} >Знайти</button>
                {getTagEls(props.tags, [])}
            </div>
            { props.style == "card" 
                ? showCard(props, definitions)
                : showTable(props, definitions, setLoaded)
            }
            { (props.editable && props.style != "card") &&
                <a href={ name + "/0?resource_type_id=" + (props.resource_type_id) }><button className="button-add">Додати</button></a>
            }
        </div>
    )
}

function showTable(props, definitions, setLoaded)
{
    let columns = props.columns;
    let name = props.name;
    let checkboxFields = props.checkboxFields;
    let fieldNames;
    if (props.fieldNames != undefined)
    {
        fieldNames = props.fieldNames;
    }
    else 
    {
        fieldNames = [];
    }

    return(
        <table>
            <thead>
                <tr>
                    {columns.map((item, idx) =>
                        <th key = {idx.toString()}>{ fieldNames?.[idx] ?? item}</th>
                    )}
                    <th/>
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
                    <td>
                        { name=="resourceType" &&
                        <> 
                            { isLoggedIn() ?
                                <a href={"booking/0?resource_type_id=" + item.id}><button className="button-book">Бронювати</button></a>
                                : <a href={"login"}><button className="button-book">Бронювати</button></a>
                            }
                        </>
                        }
                        { props.editable && 
                            <>
                                { name=="resourceType" && 
                                    <a href={"resource?resource_type_id=" + item.id}><button className="button-resource">Ресурси</button></a>
                                }
                                <a href={props.name + "/" + item.id}><button className="button-edit">Редагувати</button></a>
                                <a href="#" onClick={(e) => { e.preventDefault(); deleteItem(item.id, props.name, setLoaded); }}><button className="button-delete">Видалити</button></a>
                            </>
                        }  
                    </td>
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
                    <div className="image">
                        <img src={
                                item.pictureLink ? item.pictureLink : "/logo.png"
                            } width="150" height="150"/>
                    </div>
                    <div className="description">{item.description}</div>
                    <div className="software">{item.software}</div>
                    <div className="tags">{item.tags}</div>
                    <div className="available">Кількість: {item.available}</div>
                    { isLoggedIn() && 
                        <div className="available"><a href={"booking/0?resource_type_id=" + item.id}><button>Бронювати</button></a></div>
                    }
                </div>
            )}
            <div className="clear-fix"/>
        </div>
    )
}

function load(filename, setData, setLoaded)
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
            setLoaded(true);
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
    let search = ""; 
    try {
        search = document.querySelector(".searchDiv input[name=search]").value;
    }
    catch{
        console.log("loading first time");
    }
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
                <span key={idx}>
                    {console.log(item)}
                    <label className="labelInput" name={item[0]}>{item[1]??item[0]}</label>
                    <input defaultChecked={values.includes(item[0])} name={item[0]} value={item[0]} type="checkbox"/>
                </span>
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

function deleteItem(id, url, setLoaded) 
{
    fetch("https://localhost:7089/api/" + url + "Items/" + id, {   
        method: 'Delete',       
        crossorigin: true,
        headers: { 
            'Content-Type': 'application/json' , 
            "Authorization": getToken()
        }
        })
        .then(res => {
            let data = res.json();
            if (res.status === 200) {
                setLoaded(false);
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

    let selectDom = document.getElementById(selectId);

    console.log(selectDom);
    if (selectDom) 
    {
        selectDom.value = id;
    }
}

function update(checkbox, item, url, field, definitions)
{
    if (!isAdmin) 
    {
        if (checkbox.checked)
        {
            if (window.confirm("Ви впевнені, що хочете відмінити?"))
            {
                fetchSingle(item, url, field, 0+checkbox.checked);
            }
        }
    }
    else 
    {
        fetchSingle(item, url, field, 0+checkbox.checked);
    }
}

function fetchSingle(item, url, field, value, )
{
    var id = item.id;
    console.log(id, field, value);
    fetch("https://localhost:7089/api/" + url + "Items/" + field + "/" + id, {   
        method: 'Put',       
        crossorigin: true,
        headers: { 
            'Content-Type': 'application/json', 
            "Authorization": getToken()
        },
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
