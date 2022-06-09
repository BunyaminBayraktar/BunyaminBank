import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export const CustomNavLinks = (props) => {
    const { routeItems } = props;
    const location = useLocation();
    console.log("props", props);

    var navItems = routeItems.map(navItem => {
        return (
            <li className={ location.pathname === navItem.Route ? 'active' : undefined }>
                <Link to={navItem.Route}>
                    {navItem.IconClass ? <i className={navItem.IconClass}></i> : ''} { navItem.Text }
                </Link>
            </li>
        )
    });

    console.log("navItems", navItems);

    return (
        navItems
    )
}