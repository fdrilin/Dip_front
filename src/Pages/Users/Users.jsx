import {Link, useLoaderData} from 'react-router-dom';

export default function Users(){
    const users = useLoaderData().users;
    console.log(users);
    return (
        <div className="Main">
            <h1>USERS</h1>
            <ul>
                {users.map((item,idx)=>
                    <li key={item.id}><Link to={"/users/" + item.id}>{item.firstName} {item.LastName}</Link></li>
                )}
            </ul>
        </div>
    );
}