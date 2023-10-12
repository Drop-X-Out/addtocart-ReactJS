import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios'; // Import Axios
import '../styles/mix.css';

const Login = () => {
  const [contactno, setContactno] = useState('');
  const [spiner, setSpiner] = useState(false);
  const [selectedRole, setSelectedRole] = useState('user'); // Initialize with the default role 'user'
  const navigate = useNavigate();

  // Check if the contact number exists for the selected role
  const checkContactNumberExist = async (contactno, role) => {
    // Implement your backend logic to check if the contact number exists for the selected role
    // Return true if it exists, false otherwise
    try {
      const response = await axios.get(`/check-contact-exists?contactno=${contactno}&role=${role}`);
      return response.data.exists;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  // Send OTP
  const sendOtp = async (e) => {
    e.preventDefault();

    if (contactno === '') {
      toast.error('Enter Your Contact Number!');
    } else {
      setSpiner(true);

      // Check if the contact number exists based on the selected role
      const contactExists = await checkContactNumberExist(contactno, selectedRole);

      if (contactExists) {
        const data = {
          contactno: contactno,
          role: selectedRole,
        };

        try {
          // Send the request to the backend using Axios
          const response = await axios.post('/send-otp', data);

          if (response.status === 200) {
            setSpiner(false);
            navigate('/user/otp', { state: contactno });
          } else {
            toast.error('Error in sending OTP.');
            setSpiner(false);
          }
        } catch (error) {
          console.error(error);
          toast.error('Error in sending OTP.');
          setSpiner(false);
        }
      } else {
        toast.error('Contact Number does not exist for the selected role.');
        setSpiner(false);
      }
    }
  };

  // Handle change in the selected role
  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back, Log In</h1>
            <p>Hi, we are glad you are back. Please log in.</p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="role">Role</label>
              <select className="form_input" name="role" id="role" onChange={handleRoleChange} value={selectedRole}>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="form_input">
              <label htmlFor="contactno">Contact number</label>
              <input
                type="tel"
                name="contactno"
                id="contactno"
                onChange={(e) => setContactno(e.target.value)}
                placeholder="Enter Your Contact Number"
              />
            </div>
            <button className="btn" onClick={sendOtp}>
              Login
              {spiner ? <span><Spinner animation="border" /></span> : ''}
            </button>
            <p>
              Don't have an account? <NavLink to="/register">Sign up</NavLink>
            </p>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Login;
