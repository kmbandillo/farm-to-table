import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  var userType = localStorage.getItem('userType');

  useEffect(() => {
    console.log(`Effect to navigate, isLoggedIn: ${isLoggedIn}, userType: ${userType}`);
    if (isLoggedIn) {
        console.log(`Navigating as ${userType}`);
      if(userType === "admin") {
        console.log("Redirecting to admin page.");
        navigate("/admin");
      }else if(userType === "customer") {
        console.log("Redirecting to customer page.");
        navigate("/customer");
      }
    }
  }, [isLoggedIn, navigate, userType]);

  useEffect(() => {
    console.log("isLoggedIn status changed to:", isLoggedIn); // To confirm state update
  }, [isLoggedIn]);

  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log("Submitting form");
    const success = await loginUser();
    if (success) {
        console.log("Login successful, updating isLoggedIn");
      setIsLoggedIn(true);
    }
  };

  const loginUser = async () => {
    try {
      const response = await fetch('http://localhost:3002/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const body = await response.json();
      if (body.success) {
        // Store token and user type in localStorage
        const cookies = new Cookies();
        cookies.set('authToken', body.token, { path: '/', age: 60 * 60, sameSite: false });
        localStorage.setItem('user', body.user);
        localStorage.setItem('userType', body.userType);
        localStorage.setItem('firstName', body.firstName);
        localStorage.setItem('email', body.email);
        console.log("User authenticated, userType set in storage");
        return true;
      } else {
        alert('Invalid email or password');
        return false;
      }
    } catch (error) {
      console.error('Error logging in:', error);
      return false;
    }
  };

  return (
    <div>
      <div>
      <div
        className="bg-cover bg-center bg-no-repeat h-screen blur-sm brightness-75"
        style={{
          backgroundImage: `url(${'https://www.nicheagriculture.com/wp-content/uploads/2023/09/Are-agriculture-and-farming-the-same-Agriculture-vs-Farming-1024x680.jpg'})`,
        }}
      ></div>
    <div className="absolute flex flex-col items-center justify-center bg-none rounded-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-2">
    <div className="shadow-lg justify-center items-center w-1/2 h-1/2">
        <img
            className="object-cover items-center"
            src='https://www.nicheagriculture.com/wp-content/uploads/2023/09/Are-agriculture-and-farming-the-same-Agriculture-vs-Farming-1024x680.jpg'
            alt="AgriLink Logo"
          />
    </div>
    <div className="shadow-lg bg-white p-5 mt-0 h-1/2 w-1/2">
    <div className="text-black text-left mb-5">
          <p className="text-2xl"><b>LOG IN</b></p>
        </div>
      <div className='pb-3'>
        <form onSubmit={handleSubmit}>
          <div className='input-container'>
            <label htmlFor="email" className="text-xs">Email Address</label>
            <input
            className="text-sm container mx-auto bg-lime-50 p-2"
              type="email"
              placeholder="Email Address"
              value={email}
              onInput={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='input-container'>
            <label htmlFor="email" className="text-xs">Password</label>
            <input
              className="text-sm container mx-auto bg-lime-50 p-2"
              type="password"
              placeholder="********"
              value={password}
              onInput={e => setPassword(e.target.value)} 
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-48 mt-5">
            <div className="w-60">
              <p className="text-xs">
                Don't have an account?&nbsp;
                <b>
                  <p className="text-xs text-lime-800">
                  <Link to="/signup"> Sign Up</Link>
                  </p>
                </b>
              </p>
            </div>
            <div className='justify-right'>
              <button
                type="submit"
                className="bg-lime-400 p-1 rounded-lg">Log in</button>
            </div>
          </div>
        </form>
        
      </div>
    </div>
    </div>
    </div>
    </div>
  );
}