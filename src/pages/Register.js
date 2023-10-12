import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'; // Import Axios
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/mix.css';

const Register = () => {
  const [passhow, setPassShow] = useState(false);

  const [inputdata, setInputdata] = useState({
    name: '',
    contactnumber: '',
    email: '',
    password: '',
    role: 'Admin', // Add role field with a default value of 'user'
  });

  const navigate = useNavigate();

  // set input value
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputdata({ ...inputdata, [name]: value });
  };



  const registerUser = async (userData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', userData);
      return response.data;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with an error status code
        // console.error('Server responded with an error:', error.response.data);
        return { status: 'ERROR', message: error.response.data };
      } else if (error.request) {
        // The request was made, but no response was received (e.g., network error)
        console.error('Request was made, but no response was received:', error.request);
        return { status: 'ERROR', message: 'Network error. Please try again later.' };
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('An error occurred while setting up the request:', error.message);
        return { status: 'ERROR', message: 'An error occurred. Please try again later.' };
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, contactnumber, email, password, role } = inputdata;
  
    if (name === '') {
      toast.error('Enter Your Name');
    } else if (contactnumber === '') {
      toast.error('Enter Your Contact Number');
    } else if (email === '') {
      toast.error('Enter Your Email');
    } else if (!isValidEmail(email)) {
      toast.error('Invalid Email Address');
    } else if (password === '') {
      toast.error('Enter Your Password');
    } else if (password.length < 6) {
      toast.error('Password length should be a minimum of 6 characters');
    } else {
      try {

        
        const response = await registerUser(inputdata);
  
        if (response.status === 'SUCCESS') {
          setInputdata({ ...inputdata, name: '', contactnumber: '', email: '', password: '', role: 'Admin' });
          toast.success('Registration successful');
          navigate('/');
        } else {
          // Handle registration error
          toast.error(response.message || 'Registration failed');
        }
      } catch (error) {
        console.error('Client-side error:', error);
        toast.error('Error occurred during registration');
      }
    }
  };
  


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const { name, contactnumber, email, password, role } = inputdata;
  
  //   if (name === '') {
  //     toast.error('Enter Your Name');
  //   } else if (contactnumber === '') {
  //     toast.error('Enter Your Contact Number');
  //   } else if (email === '') {
  //     toast.error('Enter Your Email');
  //   } else if (!isValidEmail(email)) {
  //     toast.error('Invalid Email Address');
  //   } else if (password === '') {
  //     toast.error('Enter Your Password');
  //   } else if (password.length < 6) {
  //     toast.error('Password length should be a minimum of 6 characters');
  //   } else {
  //     try {
  //       // Check if the contact number already exists
  //       const checkResponse = await axios.post('http://localhost:5000/api/auth/checkContactNumber', { contactnumber });
  
  //       if (checkResponse.data.status === 'DUPLICATE') {
  //         toast.error('Contact number already exists');
  //       } else {
  //         // If contact number doesn't exist, proceed with registration
  //         const response = await registerUser(inputdata);
          
  //         if (response.status === 'SUCCESS') {
  //           setInputdata({ ...inputdata, name: '', contactnumber: '', email: '', password: '', role: 'Admin' });
  //           toast.success('Registration successful');
  //           setTimeout(() => {
  //             navigate('/');
  //           }, 5000); 
          
  //         } else {
  //           // Handle registration error
  //           toast.error('Registration failed');
  //         }
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       toast.error('Error occurred during registration');
  //     }
  //   }
  // };
  

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up</h1>
            <p style={{ textAlign: 'center', marginBottom: '-20px' }}>
              We are glad that you will be using Our Project your tasks! We hope that you will like it.
            </p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFoer="fname">Name</label>
              <input type="text" name="name" id="fname" onChange={handleChange} placeholder="Enter Your Name" />
            </div>
            <div className="form_input">
              <label htmlFor="role">Role</label>
              <select className="form_input" name="role" id="role" onChange={handleChange}>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
            <div className="form_input">
              <label htmlFor="contactnumber">Contact number</label>
              <input
                type="tel"
                name="contactnumber"
                id="contactnumber"
                onChange={handleChange}
                placeholder="Enter Your Contact Number"
                pattern="[0-9]{10}"
              />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" onChange={handleChange} placeholder="Enter Your Email" />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passhow ? 'password' : 'text'}
                  name="password"
                  id="password"
                  onChange={handleChange}
                  placeholder="Enter Your password"
                />
                <div className="showpass" onClick={() => setPassShow(!passhow)}>
                  {!passhow ? 'Show' : 'Hide'}
                </div>
              </div>
            </div>
            <button className="btn" onClick={handleSubmit}>
              Sign Up
            </button>
            <p>
              Already have an account <NavLink to="/">Login</NavLink>{' '}
            </p>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Register;
