// import image from '../assets/uplogo.png';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

function AdminTitle({title}){
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Navigate to the previous page
    };

    return (
        <div className='bg-green-200'>
        <div className='py-5 px-8'>
            <div className='flex justify-between'>
                <h2 className='text-xl font-extrabold'>{title}</h2>
                <button onClick={handleBack} className='backbutton'><i id='backbtn-icon' className="fas fa-chevron-left" /> Back</button>
            </div>
        </div>
        </div>
    );
}

export default AdminTitle;