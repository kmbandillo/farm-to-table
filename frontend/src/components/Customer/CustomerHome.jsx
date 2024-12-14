import image from '../../assets/mainbg.jpg';
import farm1 from '../../assets/pic1.jpg';
import farm2 from '../../assets/pic2.jpg';
import farm3 from '../../assets/pic3.jpg';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Carousel from "./Carousel"
import '@fortawesome/fontawesome-free/css/all.min.css';

function CustomerHome() {
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    let images = [farm3, farm1, farm2, farm3, farm1];

    const handleStorePage = () => {
        navigate("/customer/storepage");
    };
    
    return (
        <div className="customer-home">
            <div className='customer-home-top'>
                <div className='overflow-x-clip'>
                    <div className="w-full m-auto pt-8">
                        <Carousel images = {images}></Carousel>
                    </div>
                </div>
            </div>
            {/* Icons and Text Section */}
            <div className="features-section my-12 px-6 grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                {/* Feature 1 */}
                <div className="feature-item">
                    <div className="icon">
                        <i className="fas fa-handshake text-4xl text-green-600"></i>
                    </div>
                    <h3 className="font-bold text-lg mt-4">Direct Connection</h3>
                    <p>Bridging consumers and local farmers</p>
                </div>
                {/* Feature 2 */}
                <div className="feature-item">
                    <div className="icon">
                        <i className="fas fa-leaf text-4xl text-green-600"></i>
                    </div>
                    <h3 className="font-bold text-lg mt-4">Sustainability</h3>
                    <p>Promoting eco-friendly farming</p>
                </div>
                {/* Feature 3 */}
                <div className="feature-item">
                    <div className="icon">
                        <i className="fas fa-map-marker-alt text-4xl text-green-600"></i>
                    </div>
                    <h3 className="font-bold text-lg mt-4">Support Local</h3>
                    <p>Supporting and boosting farmers' income</p>
                </div>
                {/* Feature 4 */}
                <div className="feature-item">
                    <div className="icon">
                        <i className="fas fa-seedling text-4xl text-green-600"></i>
                    </div>
                    <h3 className="font-bold text-lg mt-4">Quality Produce</h3>
                    <p>Fresh, trustworthy food at your doorstep</p>
                </div>
            </div>
            <div className="mission-section my-12 px-6 flex flex-col md:flex-row items-center rounded-lg w-[1200px] m-auto bg-gradient-to-r from-slate-50 to-green-100">
                <div className="mission-image w-full md:w-1/2 mr-10">
                    <img
                        src={image} 
                        alt="Farm field" 
                        className="rounded-lg object-cover w-full h-full shadow-md"
                    />
                </div>
                <div className="mission-text w-full md:w-1/2 p-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">AgriLink's Mission</h2>
                    <p className="text-gray-700 leading-relaxed">
                        At <strong>AgriLink</strong>, our mission is to revolutionize the way people connect with their food by bridging the gap between farmers and consumers. We are committed to fostering a sustainable, transparent, and vibrant marketplace where local farmers can showcase their fresh, high-quality produce directly to the public.
                    </p>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default CustomerHome;
