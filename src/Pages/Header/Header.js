import './Header.css';
import {NavLink} from 'react-router-dom';

function Header(){
    return(
        <div className="Header">
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/booking">Booking</NavLink>
                    </li>
                    <li>
                        <NavLink to="/resource">Resource</NavLink>
                    </li>
                    <li>
                        <NavLink to="/resourceType">Resource_Types</NavLink>
                    </li>
                    <li>
                        <NavLink to="/user">Users</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/login">Login</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;
