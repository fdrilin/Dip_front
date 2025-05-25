//import {Link} from 'react-router-dom';
import { findAllByTitle } from '@testing-library/react';
import './Main.css';
import React, { useState, useEffect } from "react";
import { useLoaderData, useParams } from 'react-router-dom';

function Login(){
    const [error, setError] = useState([]);

    return(
        <div className="loginForm">
            <h2>Login</h2>
            <form onSubmit={(e)=>{e.preventDefault();}}>
                {/*Needs fetch to function properly*/}
                <div className='login'><label><span>login</span><input name="login"/></label></div>
                <div className='password'><label><span>password</span><input name="password"/></label></div>
                <div className='ErrorDiv'><span>{error}</span></div>
                <button onClick={save}>OK</button>
                <a href="register">register</a>
            </form>
        </div>
    );

    function save() 
    {
        var login = document.querySelector(".loginForm input[name=login]").value;
        var password = document.querySelector(".loginForm input[name=password]").value;
        
        fetch("https://localhost:7089/api/Auth", {   
            method: 'Post',       
            crossorigin: true,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login: login, password: password })
            })
            .then(res => {
                let data = res.json();
                if (res.status === 200) {
                    setError("logged in successfully");
                    data.then(res => sessionStorage.setItem("currentUser", JSON.stringify(res)));
                } else {
                    data.then(res => setError(res.message));
                }
            })
            //.then(res => console.log(res))
            .catch(_ => console.log(_));
    }  
}

export default Login;
