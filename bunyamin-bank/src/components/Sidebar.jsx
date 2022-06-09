import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { CustomNavLinks } from './CustomNavLink';

export const Sidebar = () => {
    const [showMenuItems, setShowMenuItems] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const userName = useSelector((state) => state.user.loggedInUser.name + ' ' + state.user.loggedInUser.surname);
    const roles = useSelector((state) => state.user.loggedInUser.roles ? state.user.loggedInUser.roles : []);
    const rolesString = useSelector((state) => state.user.loggedInUser.roles ? state.user.loggedInUser.roles.join(', ') : '-');    

    useEffect(() => {
        try
        {
            let routeItems = [
                { Route: '/', Text: 'Ana Sayfa', IconClass: 'icon-home' },
                { Route: '/accounts', Text: 'Hesaplarım', IconClass: 'fa fa-dashboard' }
            ];

            if(roles.indexOf("admin") !== -1)
            {
                routeItems.push({
                    Route: '/admin/create-user',
                    Text: "Kullanıcı Oluştur",
                    IconClass: 'fa fa-user'
                });
            }
            
            setMenuItems(routeItems);
            setShowMenuItems(true);
        }
        catch(err)
        {
            console.log("sidebar err", err);
        }
        
    }, []);
    
    return (
        <nav id='sidebar'>
            <div className="sidebar-header d-flex align-items-center">
                <div className="avatar">
                    <img src="/img/avatar-6.jpg" alt="..." class="img-fluid rounded-circle"/>
                </div>
                <div className="title">
                    <h1 class="h5">{ userName }</h1>
                    <p>{ rolesString }</p>
                </div>
            </div>
            {
                showMenuItems &&
                <ul className='list-unstyled text-left pl-1' >
                    <CustomNavLinks 
                        routeItems={ menuItems }>
                    </CustomNavLinks>
                </ul>
            }
        </nav>
    )
}
