import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import AdminRoot from './pages/AdminRoot';
import CustomerRoot from './pages/CustomerRoot';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import StorePage from './components/Customer/StorePage.jsx';
import CustomerHome from './components/Customer/CustomerHome.jsx';
import CustomerOrders from './components/Customer/CustomerOrders.jsx';
import AdminHome from './components/Admin/AdminHome.jsx';
import AdminCatalog from './components/Admin/AdminCatalog.jsx';
import AdminAccounts from './components/Admin/AdminAccounts.jsx';
import AdminOrders from './components/Admin/AdminOrders.jsx';
import AdminSales from './components/Admin/AdminSales.jsx';
import CheckoutPage from './components/Customer/CheckoutPage.jsx';
import './styles/index.css';

import ProfilePage from './components/Customer/ProfilePage.jsx';

// function to redirect logged-in users from home/signin page
const checkIfLoggedInOnHome = async () => {

  const res = await fetch("http://localhost:3002/checkifloggedin",
    {
      method: "POST",
      credentials: "include" 
    });
  
  // parse server response
  const payload = await res.json();
  console.log(`checkIfLoggedInHome: isLoggedIn: ${payload.isLoggedIn}, userType: ${payload.userType}`);
  
  // redirect based on user login status and user type
  if (payload.isLoggedIn) {
    if(payload.userType=== "customer"){
      return redirect("/customer"); // redirect customers to Customer Homepage/Landing Page
    }else if(payload.userType=== "admin"){
      return redirect("/admin"); // redirect admin to Admin Dashboard
    }
  } else {
    return 0;
  }
}

// function to check admin access for admin routes
const checkIfLoggedInOnDash = async () => {
  const res = await fetch("http://localhost:3002/checkifloggedin",
    {
      method: "POST",
      credentials: "include" 
    });

  const payload = await res.json();
  console.log(`checkIfLoggedInOnDash: isLoggedIn: ${payload.isLoggedIn}, userType: ${payload.userType}`);
    if (payload.isLoggedIn && payload.userType === "admin") {
      return true; // allow access
    } else {
      return redirect("/"); // redicrect unauthorized users to signin page
    }
}

// functio to check customer acces for customer routes
const checkIfLoggedInOnCustomerPage = async () => {
  const res = await fetch("http://localhost:3002/checkifloggedin", {
    method: "POST",
    credentials: "include"
  });

  const payload = await res.json();
  console.log(`checkIfLoggedInOnCustomerPage: isLoggedIn: ${payload.isLoggedIn}, userType: ${payload.userType}`);

  if (payload.isLoggedIn && payload.userType === "customer") {
    return true; // allow access
  } else {
    return redirect("/"); // redicrect unauthorized users to signin page
  }
}

// define application routes
const router = createBrowserRouter([
  // sign in
  { path: '/', element: <SignIn />, loader: checkIfLoggedInOnHome},
  // sign up
  { path: '/signup', element: <SignUp />, loader: checkIfLoggedInOnHome},
  // customer routes
  { path: '/customer', element: <CustomerRoot />, loader: checkIfLoggedInOnCustomerPage, children:[
    { path: '/customer', element: <CustomerHome />},
    { path: '/customer/storepage', element: <StorePage />},
    { path: '/customer/orders', element: <CustomerOrders />},
    { path: '/customer/checkout', element: <CheckoutPage />},
    { path: '/customer/profile', element: <ProfilePage />},
  ]},
  // admin routes
  { path: '/admin', element: <AdminRoot />, loader: checkIfLoggedInOnDash, children:[
    {path: '/admin', element: <AdminHome />},
    {path: '/admin/catalog', element: <AdminCatalog />},
    {path: '/admin/accounts', element: <AdminAccounts />},
    {path: '/admin/orders', element: <AdminOrders />},
    {path: '/admin/sales', element: <AdminSales />},
  ]},
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />    
  </React.StrictMode>
);
