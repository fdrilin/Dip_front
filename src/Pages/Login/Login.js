import { findAllByTitle } from '@testing-library/react';
import React, { useState, useEffect } from "react";
import { useLoaderData, useParams } from 'react-router-dom';

function Login(){
    const [error, setError] = useState([]);

    return(
        <div className="Main">
            <div className="formEdit">
                <h2>Авторізація</h2>
                <form onSubmit={(e)=>{e.preventDefault();}}>
                    {/*Needs fetch to function properly*/}
                    <label className='labelInput'>Логін</label><input name="login"/>
                    <label className='labelInput'>Пароль</label><input type='password' name="password"/>
                    <div className='ErrorDiv'><span>{error}</span></div>
                    <button className='button-save' onClick={save}>Авторізація</button>
                    <div className='text-align-center'><a href="register">Зареєструватися</a></div>
                </form>
            </div>
        </div>
    );

    function save() 
    {
        var login = document.querySelector(".formEdit input[name=login]").value;
        var password = document.querySelector(".formEdit input[name=password]").value;
        
        fetch("https://localhost:7089/api/Auth", {   
            method: 'Post',       
            crossorigin: true,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login: login, password: password })
            })
            .then(res => {
                let data = res.json();
                console.log(res);
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

export default Login;
