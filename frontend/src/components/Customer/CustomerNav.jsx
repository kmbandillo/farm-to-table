import image from '../../assets/logo.png';
import profile from '../../assets/pictureprofile.png';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function CustomerNav({title, name, func}){
    const location = useLocation();
    
    const [activeLink, setActiveLink] = useState('');

    useEffect(() => {
        const path = location.pathname;
        if (path === '/customer') {
            setActiveLink('home');
        } else if (path === '/customer/storepage') {
            setActiveLink('storepage');
        } else if (path === '/customer/orders') {
            setActiveLink('orders');
        } else if (path === '/customer/about') {
            setActiveLink('about');
        }
    }, [location]);

    return (
        <>
        <header>
            <div className="flex bg-[#75B27C] m-auto">
                <ul className="flex">
                    <li><img src={image} className="size-[60px]"/></li>
                    <li className="m-auto font-bold">{title}</li>
                </ul>
                <ul className="flex justify-evenly w-[60%] my-auto text-white">
                    <li className='text' text-black-200><Link to="/customer" className={activeLink === 'home' ? 'active' : ''}>Home</Link></li>
                    <li><Link to="/customer/storepage" className={activeLink === 'storepage' ? 'active' : ''}>Store</Link></li>
                    <li><Link to="/customer/orders" className={activeLink === 'orders' ? 'active' : ''}>Orders</Link></li>
                    {/* <li><Link to="/customer/about" className={activeLink === 'about' ? 'active' : ''}>ABOUT</Link></li> */}
                </ul>
                 <ul className="flex ml-[300px]">
                    <li className='admin-nav-name m-auto mr-1'>{name}</li>
                    <li>
                        <Link to="/customer/profile">
                        <img src={profile} className="size-[50px] mt-1" alt="Profile" />
                        </Link>
                    </li>
                    <li className='m-auto ml-1 p-3' onClick={func}>
                        <i className="fas fa-sign-out-alt"></i>
                    </li>
                </ul>
            </div>
        </header>
        </>
    );
}

export default CustomerNav;
