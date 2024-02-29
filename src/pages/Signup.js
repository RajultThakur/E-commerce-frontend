import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import config from '../config/config';

function Signup () {
  // Define state variables for form fields
  const toastId = React.useRef(null);
  const navigate = useNavigate();
  const [credential, setCredential] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredential({ ...credential, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.backendEndPoint}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password })
      })
      const data = await response.json();
      toast.dismiss(toastId.current)
      if (data.success) {
        toast.success("SignUp successfully!", {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 2000
        })
        navigate("/auth/login");
        setCredential({
          name: "",
          email: "",
          password: ""
        })
      } else {
        toast.error(data.message, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 2000
        })
      }
    } catch (err) {
      toast.error('internal server issue')
    }
  };

  return (
    <div className="
    w-[100%] h-[100%] 
    flex justify-center items-center 
    mt-[100px]">
      <ToastContainer />
      <form className='text-gray-400' onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="name"
            name="name"
            placeholder='name'
            value={credential.name}
            onChange={handleInputChange}
            className='text-black 
            outline-none
            border-none
            round-lg
            bg-gray-200
            px-3
            py-1
            mb-4'
          />
        </div>

        <div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder='email'
            value={credential.email}
            onChange={handleInputChange}
            className='text-black
            outline-none
            border-none
            round-lg
            bg-gray-200
            px-3
            py-1
            mb-4'
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder='password'
            value={credential.password}
            onChange={handleInputChange}
            className='text-black
            outline-none
            border-none
            round-lg
            bg-gray-200
            px-3
            py-1
            mb-4'
          />
        </div>
        <div>
          <button type="submit" className='bg-green-400 text-white font-medium p-1 w-[100%]'>Signup</button>
        </div>
        <div>
          <h1 className='text-sm mt-1'>Already have an account. <Link className='text-blue-600 underline' to="/auth/login">Login</Link></h1>
        </div>
      </form>
    </div>
  );
}

export default Signup;
