import { isAdmin, isLoggedIn } from '../../components/AuthFunctions';
import './Header.css';
import {NavLink} from 'react-router-dom';

function Header(){
    return(
        <div className="Header">
            <div className="page-logo">
                <a href="/">
                    <img src="/logo.png" alt="logo"/> 
                </a>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">Головна</NavLink>
                    </li>
                    <li>
                        <NavLink to="/resourceType">Типи техніки</NavLink>
                    </li>
                    { isLoggedIn() &&
                        <li>
                            <NavLink to="/booking">Попередні бронювання</NavLink>
                        </li>
                    }
                    { isAdmin() &&
                        <>
                            <li>
                                <NavLink to="/resource">Техніка</NavLink>
                            </li>
                            <li>
                                <NavLink to="/user">Користувачі</NavLink>
                            </li>
                        </>
                    }
                    <li>
                        <NavLink to="/about">Про нас</NavLink>
                    </li>
                </ul>
            </nav>
            <NavLink to="/login"><button className="login">Авторізація</button></NavLink>
        </div>
    );
}

export default Header;
