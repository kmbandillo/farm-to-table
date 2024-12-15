import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import image from '../../assets/logo.png';
import profile from '../../assets/pictureprofile.png';
import '@fortawesome/fontawesome-free/css/all.min.css';

function AdminNav({ title, name, func }) {
    const location = useLocation();

    return (
        <header>
            <div className="flex bg-[#75B27C] m-auto px-8 ">
                <ul className="flex w-[15%]">
                    <li><img src={image} className="size-[60px]" alt="Logo" /></li>
                    <li className="ml-2 my-auto text-xl font-bold">{title}</li>
                </ul>
                <ul className="flex justify-evenly w-[70%] my-auto text-white">
                    <li><Link to="/admin" className={`${location.pathname === '/admin' ? 'text-green-950 font-bold' : 'text-white'}`}>Home</Link></li>
                    <li><Link to="/admin/catalog" className={`${location.pathname === '/admin/catalog' ? 'text-green-950 font-bold' : 'text-white'}`}>Products</Link></li>
                    <li><Link to="/admin/accounts" className={`${location.pathname === '/admin/accounts' ? 'text-green-950 font-bold' : 'text-white'}`}>Users</Link></li>
                    <li><Link to="/admin/orders" className={`${location.pathname === '/admin/orders' ? 'text-green-950 font-bold' : 'text-white'}`}>Orders</Link></li>
                    <li><Link to="/admin/sales" className={`${location.pathname === '/admin/sales' ? 'text-green-950 font-bold' : 'text-white'}`}>Sales</Link></li>
                </ul>
                <ul className="flex ml-[160px] w-[15%]">
                    <li className='admin-nav-name m-auto mr-1'>{name}</li>
                    <li><img src={profile} className="size-[50px] mt-1" alt="Profile" /></li>
                    <li className='m-auto ml-1 p-3' onClick={func}><i className="fas fa-sign-out-alt"></i></li>
                </ul>
            </div>
        </header>
    );
}

export default AdminNav;
