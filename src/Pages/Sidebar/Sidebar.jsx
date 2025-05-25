import './Sidebar.css';
import {NavLink} from 'react-router-dom';

function Sidebar(){
    return(
        <div className="Sidebar">
            <nav>
                <ul>
                   
                    <li>
                        <NavLink to="/community">Main</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">Booking</NavLink>
                    </li>
                    <li>
                        <NavLink to="/users">Resource</NavLink>
                    </li>
                    <li>
                        <NavLink to="/users">About</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
