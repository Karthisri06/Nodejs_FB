import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/formcomponents.css';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const [, setToken] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // Login API Call
        const response = await axios.post('http://localhost:5703/auth/login', { email, password });
        setMessage('Login successful!');
        setToken(response.data.token); 
        localStorage.setItem('token', response.data.token); 
        navigate('/dashboard'); // Redirect after login
      } else {
        // Register API Call
        await axios.post('http://localhost:5703/auth/register', { name, email, password });
        setMessage('Registration successful! Please log in.');
        setIsLogin(true);
      }
    } catch (error) {
      // setMessage('Error: ' + error.response?.data?.message || 'Something went wrong');
      let errorMessage = "Failed to do something exceptional";
  if (error instanceof Error) {
    errorMessage = error.message;
  }
  console.log(errorMessage);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input type="text" placeholder="Username" value={name} onChange={(e) => setUsername(e.target.value)} required />
        )}
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <p>
        {isLogin ? (
          <span>Don't have an account? <a href="#" onClick={() => setIsLogin(false)}>Sign Up</a></span>
        ) : (
          <span>Already have an account? <a href="#" onClick={() => setIsLogin(true)}>Log In</a></span>
        )}
      </p>
    </div>
  );
};

export default AuthForm;


