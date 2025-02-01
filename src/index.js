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
import UserPage from './Pages/Users/UserPage';
import './global.css';
import ErrorPage from './Pages/Error/Error';
import ResourceEdit from './Pages/Resource/Edit'

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
        <Route path='resource' element={<Resource/>}/>
        <Route path='resource/:resourceId' loader={resourceLoader} element={<ResourceEdit/>}/>
        <Route path='about' element={<About/>}/>
        <Route path='users' loader={getUsers} element={<Users/>}/>
        <Route path='users/:userId' loader={loader} element={<UserPage/>} 
        errorElement={<ErrorPage/>}/>
        <Route path='*' element={<ErrorPage/>} />
    </Route>
   ) 
)

function resourceLoader({params}) {
    //add fetch here
    return params.resourceId;
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