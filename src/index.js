import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter,
createRoutesFromElements,
RouterProvider, 
Route, Outlet } from 'react-router-dom';

import Header from './Pages/Header/Header';
//import Sidebar from './Pages/Sidebar/Sidebar';
import Home from './Pages/Home/Home';
import Booking from './Pages/Booking/Booking';
import Resource from './Pages/Resource/Resource';
import About from './Pages/About/About';
import Users from './Pages/Users/Users';
import UserEdit from './Pages/Users/Edit';
import './global.css';
import ErrorPage from './Pages/Error/Error';
import ResourceEdit from './Pages/Resource/Edit'
import BookingEdit from './Pages/Booking/Edit'
import LoginPage from './Pages/Login/Login'
import RegisterPage from './Pages/Login/Register'

const Root = () =>{
return(
    <div className='container'>
            <Header />
            {/*<Sidebar />*/}
            <Outlet />
    </div>
)
}

const router = createBrowserRouter(
   createRoutesFromElements(
    <Route path='/' element={<Root />}>
        <Route index element={<Home/>}/>
        <Route path='booking' element={<Booking/>}/>
        <Route path='booking/:id' loader={idLoader} element={<BookingEdit/>}/>
        <Route path='resource' element={<Resource/>}/>
        <Route path='resource/:id' loader={idLoader} element={<ResourceEdit/>}/>
        <Route path='about' element={<About/>}/>
        <Route path='user' loader={getUsers} element={<Users/>}/>
        <Route path='user/:userId' loader={loader} element={<UserEdit/>} errorElement={<ErrorPage/>}/>
        <Route path='login' element={<LoginPage/>}/>
        <Route path='register' element={<RegisterPage/>}/>
        <Route path='*' element={<ErrorPage/>} />
    </Route>
   ) 
)

function idLoader({params}) {
    //add fetch here
    return params.id;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <RouterProvider router={router} />
);

async function getUsers() {
    const promise = await fetch("https://dummyjson.com/users");
    const json = await promise.json();
    return json;
}

async function loader({params}){
    const users = await getUsers();
    //console.log(users);
    console.log(users.users.filter(e => e.id == 1));
//console.log(params.userId);
const user = users.users.filter(e => e.id == params.userId);
//const user = usersData.filter(e => e.id === params.userId);
return user[0];
}