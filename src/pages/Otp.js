import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { userVerify } from '../services/Apis';

const Otp = () => {
  const [otp, setOtp] = useState('');
  const [contactno, setContactno] = useState('');
  const [selectedRole, setSelectedRole] = useState('user'); // Initialize with the default role 'user'

  const location = useLocation();
  const navigate = useNavigate();

  const LoginUser = async (e) => {
    e.preventDefault();

    if (otp === '') {
      toast.error('Enter Your OTP');
    } else if (!/^[0-9]{6}$/.test(otp)) {
      toast.error('Enter Valid 6-digit OTP');
    } else if (contactno === '') {
      toast.error('Enter Your Contact Number');
    } else if (!/^[0-9]{10}$/.test(contactno)) {
      toast.error('Enter Valid 10-digit Contact Number');
    } else {
      const data = {
        otp,
        email: location.state,
        contactno, // Include the contact number in the data sent to the backend
        role: selectedRole, // Include the selected role in the data sent to the backend
      };

      try {
        const response = await userVerify(data);

        if (response.status === 200) {
          localStorage.setItem('userdbtoken', response.data.userToken);
          toast.success(response.data.message);
          setTimeout(() => {
            navigate('/dashboard');
          }, 5000);
        } else {
          toast.error(response.response.data.error);
        }
      } catch (error) {
        console.error(error);
        toast.error('Error in verifying OTP.');
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
          <p style={{ textAlign: 'center', marginBottom:'-20px' }}>
            <h1>Please Enter Your OTP and Contact Number Here</h1>
            </p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="role">Role</label>
              <select
                className="form_input"
                name="role"
                id="role"
                onChange={handleRoleChange}
                value={selectedRole}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="form_input">
              <label htmlFor="contactno">Contact Number</label>
              <input
                type="tel"
                name="contactno"
                id="contactno"
                onChange={(e) => setContactno(e.target.value)}
                placeholder="Enter Your Contact Number"
              />
            </div>
            <div className="form_input">
              <label htmlFor="otp">OTP</label>
              <input
                type="text"
                name="otp"
                id=""
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter Your OTP"
              />
            </div>
            <button className="btn" onClick={LoginUser}>
              Submit
            </button>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Otp;
