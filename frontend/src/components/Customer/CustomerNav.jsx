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
            <div className="flex bg-[#75B27C] px-8 m-auto">
                <ul className="flex w-[23%]">
                    <li><img src={image} className="logo size-[60px]"/></li>
                    <li className="ml-2 my-auto text-xl font-bold">{title}</li>
                </ul>
                <ul className="flex justify-evenly w-[67%] my-auto text-white">
                    <li><Link to="/customer" className={`${activeLink === 'home' ? 'text-green-950 font-bold' : 'text-white'} active:font-bold`}>Home</Link></li>
                    <li><Link to="/customer/storepage" className={`${activeLink === 'storepage' ? 'text-green-950 font-bold' : 'text-white'} active:font-bold`}>Store</Link></li>
                    <li><Link to="/customer/orders" className={`${activeLink === 'orders' ? 'text-green-950 font-bold' : 'text-white'} active:font-bold`}>Orders</Link></li>
                    {/* <li><Link to="/customer/about" className={activeLink === 'about' ? 'active' : ''}>ABOUT</Link></li> */}
                </ul>
                 <ul className="flex ml-[160px] w-[10%]">
                    <li className='customer-nav-name m-auto mr-1'>{name}</li>
                    <li>
                        <Link to="/customer/profile size-[60px]">
                            <img src={profile} className="customer-nav-profile size-[50px] mt-1" alt="Profile" />
                        </Link>
                    </li>
                    <li className='m-auto ml-1 p-3' onClick={func}><i className="fas fa-sign-out-alt"></i></li>

                </ul>
            </div>
        </header>
        </>
    );
}

export default CustomerNav;