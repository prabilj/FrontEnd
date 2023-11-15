import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function UpdateProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
  });

  const [message, setMessage] = useState('');
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    // Fetch user profile data here and update the `formData` state
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/Users/${userId}`); 
        if (response.status === 200) {
          const userData = response.data; 
          setFormData(userData);
        } else {
          setMessage('Failed to fetch user profile');
        }
      } catch (error) {
        console.error('Error:', error);
        
      }
    };

    fetchUserProfile();
  }, []); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.put(`http://localhost:3000/updateProfile/${userId}`, formData);

      if (response.status === 200) {
        setMessage('Profile updated successfully');
        // const navigate = useNavigate();
        navigate('/');
      } else {
        setMessage('Failed to update profile');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while updating the profile');
    }
  };

  return (
    <ProfileWrapper>
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="userName">User Name:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="email">Email:</label>
          <input style={{outline:"1px solid rgb(78,75,75)"}}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <SubmitButton type="submit">Update Profile</SubmitButton>
      </form>

      {message && <p>{message}</p>}
    </ProfileWrapper>
  );
}





const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  text-decoration: none;
  width:auto;

`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  color: white;
  background: #990000;
  border: none;
  font-weight: 600;
  cursor: pointer;
`;

const Message = styled.p`
  margin: 1rem 0;
  color: #990000;
  font-weight: 600;
`;
const ProfileWrapper = styled.div`
  margin: 100px 450px;
  text-align: center;
  min-width:400px;
  height: auto;
  padding: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;
export default UpdateProfile;
