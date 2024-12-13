import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    try {
      const response = await fetch('http://localhost:3002/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          middleName,
          lastName,
          email,
          password,
          userType: "customer",
        }),
      });

      const data = await response.json();
      console.log(data); // Debug: inspect the server response

      if (response.ok && data.success) { // Check HTTP status and response success
        navigate('/'); // Redirect to sign-in page after successful sign-up
      } else {
        alert(data.message || 'Error: Unable to create account'); // Show server error message
      }
    } catch (error) {
      console.error('Error:', error); // Log any unexpected errors
      alert('An error occurred while creating the account.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };
  return (
    <div>
      <div
        className="bg-cover bg-center bg-no-repeat h-screen blur-sm brightness-75"
        style={{
          backgroundImage: `url(${'https://www.nicheagriculture.com/wp-content/uploads/2023/09/Are-agriculture-and-farming-the-same-Agriculture-vs-Farming-1024x680.jpg'})`,
        }}
      ></div>
      <div className="absolute bg-none rounded-xl shadow-lg items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-2">
        <div className="flex justify-center items-center pt-12">
          <img
            className="size-20 items-center"
            src="https://cdn-icons-png.flaticon.com/512/5994/5994257.png"
            alt="AgriLink Logo"
          />
        </div>
        <div className="text-white text-center mb-5">
          <p>JOIN US AT</p>
          <b className="text-3xl">AgriLink</b>
        </div>
        <div className="bg-white p-10 items-center shadow-xl">
          <div>
            <h2 className="text-left pb-2">
              <b>SIGN UP</b>
            </h2>
          </div>
          <form onSubmit={handleSignUp}>
            <div className="grid grid-cols-2 gap-8">
              <div className="signup-div-left">
                <div className="input-row">
                  <div className="input-container">
                    <label htmlFor="firstName" className="text-xs">
                      First Name
                    </label>
                    <input
                      className="text-sm container mx-auto bg-lime-50 p-2"
                      type="text"
                      id="firstName"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-container">
                    <label className="text-xs" htmlFor="middleName">
                      Middle Name
                    </label>
                    <input
                      className="text-sm container mx-auto bg-lime-50 p-2"
                      type="text"
                      id="middleName"
                      placeholder="Middle Name"
                      value={middleName}
                      onChange={(e) => setMiddleName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-container">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    className="text-sm container mx-auto bg-lime-50 p-2"
                    type="text"
                    id="lastName"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="signup-div-right">
                <div className="input-container">
                  <label htmlFor="email">Email Address</label>
                  <input
                    className="text-sm container mx-auto bg-lime-50 p-2"
                    type="email"
                    id="email"
                    placeholder="johndoe@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="password">Password</label>
                  <input
                    className="text-sm container mx-auto bg-lime-50 p-2"
                    type="password"
                    id="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-8 mt-5">
                  <div className="w-60">
                    <p className="text-sm">Already have an account?</p>
                    <b>
                      <p className="text-xs text-lime-800">
                        <Link to="/">Log in</Link>
                      </p>
                    </b>
                  </div>
                  <div>
                    <button
                      className="bg-lime-400 p-1 rounded-lg"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Creating...' : 'Sign Up'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;