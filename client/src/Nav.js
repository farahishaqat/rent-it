import React from 'react';
import {Link} from 'react-router-dom'

const Nav =()=>(
    <nav>
        <ul className="nav nav-tabs">

            <li className="nav-item pr-3 pt-3 pb-3">
                <Link to="/"> HOME PAGE </Link>
            </li> 
    
            <li className="nav-item pr-3 pt-3 pb-3">
                    <Link to="/create"> ADD RENTALS </Link>
            </li>
            
            <li className="nav-item pr-3 pt-3 pb-3">
                    <Link to="/contact"> CONTACT US </Link>
            </li>
        
        </ul>
    </nav>
);

export default Nav;