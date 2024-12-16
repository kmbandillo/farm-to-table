import React, { useState, useEffect } from 'react';
import image from '../../assets/pictureprofile.png';
import backgroundImage from '../../assets/mainbg.jpg';

function ProfilePage({ initialUser }) {
    const [user, setUser] = useState(initialUser || {});
    const [formValues, setFormValues] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [transactions, setTransactions] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const userId = localStorage.getItem('user');
            if (!userId) {
                console.error('User ID not found');
                return;
            }

            try {
                const response = await fetch(`http://localhost:3002/user-deets/${userId}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch user: ${response.statusText}`);
                }

                const userData = await response.json();
                setUser(userData);
                setFormValues({
                    firstName: userData.firstName || '',
                    middleName: userData.middleName || '',
                    lastName: userData.lastName || '',
                    email: userData.email || '',
                    password: ''
                });
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchTransactions = async () => {
            const userId = localStorage.getItem('user');
            if (!userId) {
                console.error('User ID not found');
                return;
            }

            try {
                const response = await fetch(`http://localhost:3002/user-transactions/${userId}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch transactions: ${response.statusText}`);
                }

                const transactionsData = await response.json();
                console.log('Fetched transactions data:', transactionsData);

                setTransactions(transactionsData);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem('user');
            if (!userId) {
                throw new Error('User ID not found');
            }

            const response = await fetch(`http://localhost:3002/user/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });

            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            const responseData = await response.json();
            setUser(responseData.user);
            setFormValues({
                firstName: '',
                middleName: '',
                lastName: '',
                email: '',
                password: '',
            });

            console.log('User updated successfully:', responseData);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const formatProducts = (products) => {
        return products.map(product => `${product.productId.productName} - ${product.quantity}`).join(', ');
    };

    return (
        <>
        <div className="fixed inset-0 opacity-80 -z-10">
            <img src={backgroundImage} alt="Background" className="object-cover w-full h-full" />
        </div>
        <div className="bg-green-200 max-w-3xl mx-auto mt-16 p-6 border rounded-2xl shadow-xl relative z-10 hover:shadow-xl-2xl transition-shadow-xl">
            <div className="bg-white flex flex-col rounded-2xl relative z-10">
                <div className="flex flex-row">
                    <h2 className="text-5xl mt-12 ml-12 text-black font-bold">Profile</h2>
                    <img src={image} alt="Profile" className="m-7 ml-auto w-32 h-32 rounded-full shadow-xl" />
                </div>
                <div className="bg-white/80 p-6 rounded-2xl shadow-xl w-11/12 mx-auto mb-5">
                    <p className="text-[#31454D] my-1"><strong>First Name:</strong> {user.firstName}</p>
                    <p className="text-[#31454D] my-1"><strong>Middle Name:</strong> {user.middleName}</p>
                    <p className="text-[#31454D] my-1"><strong>Last Name:</strong> {user.lastName}</p>
                    <p className="text-[#31454D] my-1"><strong>User Type:</strong> {user.userType}</p>
                    <p className="text-[#31454D] my-1"><strong>Email:</strong> {user.email}</p>
                </div>
                <button
                    className="p-3 bg-[#75B27C] text-white font-bold w-11/12 mx-auto rounded-2xl shadow-xl hover:bg-[#659a6b]"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? 'Hide Form' : 'Edit Profile'}
                </button>
                {showForm && (
                    <form className="bg-white/80 p-6 rounded-2xl shadow-xl w-11/12 mx-auto mt-5" onSubmit={handleUpdate}>
                        <div>
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formValues.firstName}
                                onChange={handleChange}
                                required
                                autoComplete="given-name"
                                className="w-full p-2 border rounded mb-3"
                            />
                        </div>
                        <div>
                            <label htmlFor="middleName">Middle Name:</label>
                            <input
                                type="text"
                                id="middleName"
                                name="middleName"
                                value={formValues.middleName}
                                onChange={handleChange}
                                autoComplete="additional-name"
                                className="w-full p-2 border rounded mb-3"
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName">Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formValues.lastName}
                                onChange={handleChange}
                                required
                                autoComplete="family-name"
                                className="w-full p-2 border rounded mb-3"
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formValues.email}
                                onChange={handleChange}
                                required
                                autoComplete="email"
                                className="w-full p-2 border rounded mb-3"
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formValues.password}
                                onChange={handleChange}
                                required
                                autoComplete="new-password"
                                className="w-full p-2 border rounded mb-3"
                            />
                        </div>
                        <button type="submit" className="p-3 bg-[#75B27C] font-bold text-white w-full rounded-2xl hover:bg-[#659a6b]">
                            Update Profile
                        </button>
                    </form>
                )}
                <div className="w-11/12 mx-auto m-5 bg-white/80 p-6 rounded-2xl shadow-xl">
                    <h3 className="text-xl font-extrabold">Transactions</h3>
                    <div className="border-b border-black/30 mb-3"></div>
                    {transactions.length > 0 ? (
                        <ul>
                            {transactions.map((transaction) => (
                                <li key={transaction._id}>
                                    <p><strong>Order ID:</strong> {transaction._id}</p>
                                    <p><strong>Products Purchased:</strong> {formatProducts(transaction.products)}</p>
                                    <p><strong>Date and Time:</strong> {`${new Date(transaction.date).toLocaleDateString()} at ${transaction.time}`}</p>
                                    <div className="border-b border-black/30 my-3"></div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No transactions found.</p>
                    )}
                </div>
            </div>
        </div>
        </>
    );
}

export default ProfilePage;
