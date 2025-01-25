import {Link, useLoaderData} from 'react-router-dom';

export default function UserPage(){
    const user = useLoaderData();
    //console.log(user)
    return (
        <div className="Main user-page">
            <div>
                <Link to="/users">Back</Link>
            </div>
            <img src={user.image} alt='avatar' />
            <h2>User: {user.firstName} {user.lastName}</h2>
            <h2>Gender: {user.gender}</h2>
            <h2>{user.email}</h2>
        </div>
    );
}