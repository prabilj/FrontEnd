import React, { useState } from 'react';
import './Signup.css';
import { Link ,useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [firstname, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleSignup = async () => {
    if (password === confirmPassword) {
      try {
       const response = await axios.post('http://localhost:3000/Users', {
        firstname,
        lastname,
        username,
        email,
        password,
       })
       console.log('Signing up with:', email, password);
     
       if (response.status === 201) {

        Swal.fire(
          'Congrats',
          'Registered successfully!',
          'success'
        );
        navigate('/signin')
       }


       
        //  console.log('Signing up with:', email, password);

        // After successful signup, you can show a success message
        // Swal.fire(
        //   'Congrats',
        //   'Registered successfully!',
        //   'success'
        // );
      } catch (error) {
        console.error('Signup failed:', error);

        if(ErrorEvent.response) {
          console.error('Response:', error.response)
        }
        Swal.fire({
          icon: 'error',
          title: 'Invalid credentials!!!',
          text: 'Username already exists',
        });
      }
    } else {
      setPasswordsMatch(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <div className="signup-form">
        <input
          type="text"
          placeholder="Name"
          value={firstname}
          onChange={(e) => setName(e.target.value)}
        />
        <input
        type="text"
        placeholder="LastName"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {passwordsMatch ? null : <p className="error">Passwords do not match</p>}
        <button onClick={handleSignup}>Sign Up</button>
        <p>Already have an account? <Link style={{textDecoration:"none"}} to="/signin">  <span style={{color:"black"}}>Login </span></Link></p>
        
      </div>
    </div>
  );
};

export default Signup;
