//import {Link} from 'react-router-dom';
import { findAllByTitle } from '@testing-library/react';
import React, { useState, useEffect } from "react";
import { useLoaderData, useParams } from 'react-router-dom';

function Register(){
    const [error, setError] = useState([]);

    return(
        <div className="Main">
            <div className='formEdit'>
                <h2>Реєстрація</h2>
                <form onSubmit={(e)=>{e.preventDefault();}}>
                    {/*Needs fetch to function properly*/}
                    <label className='labelInput'>Логін*</label><input name="login"/>
                    <label className='labelInput'>Пароль*</label><input type="password" name="password"/>
                    <label className='labelInput'>Е-мейл*</label><input name="email"/>
                    <label className='labelInput'>Номер</label><input name="number"/>
                    <label className='labelInput'>Ім'я</label><input name="name"/>
                    <div className='ErrorDiv'><span>{error}</span></div>
                    <button className='button-save' onClick={save}>Зберегти</button>
                </form>
            </div>
        </div>
    );

    function save() 
    {
        var login = document.querySelector(".formEdit input[name=login]").value;
        var password = document.querySelector(".formEdit input[name=password]").value;
        var name = document.querySelector(".formEdit input[name=name]").value;
        var number = document.querySelector(".formEdit input[name=number]").value;
        var email = document.querySelector(".formEdit input[name=email]").value;
        
        fetch("https://localhost:7089/api/Auth/register", {   
            method: 'Post',       
            crossorigin: true,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login: login, number: number, password: password, name: name, email: email })
            })
            .then(res => {
                let data = res.json();
                if (res.status === 200) {
                    data.then(res => 
                        {
                            sessionStorage.setItem("currentUser", JSON.stringify(res)); 
                            window.location.href = '/';
                        });
                } else {
                    data.then(res => setError(res.message));
                }
            })
            //.then(res => console.log(res))
            .catch(_ => console.log(_));
    }  
}

export default Register;
