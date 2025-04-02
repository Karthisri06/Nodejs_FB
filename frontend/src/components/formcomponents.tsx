import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/formcomponents.css';

const AuthForm = () => {

  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); 

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted!");

    try {
      if (isLogin) {
        console.log("Attempting login...", email, password);
        const response = await axios.get('http://localhost:6000/auth/users')
        
          // const url = "http://localhost:6000/auth/users"
          // try {
          //   const response = await fetch(url,{
          //     method:'GET',
          //     mode:'cors',
          //     headers:{
          //       'Access-Control-Allow-Origin':'*',
          //     }
          //   });
          //   if (!response.ok) {
          //     throw new Error(`Response status: ${response.status}`);
          //   }
        
          //   const json = await response.json();
          //   console.log(json);
          // } catch (error) {
          //   console.error(error);
          // }
        console.log("lO?'.g,likmnjkl;",response)
        // const response = await axios.post('http://localhost:6000/auth/login', { email, password });

        // console.log("Login successful:", response.data);
        // localStorage.setItem('token', response.data.token);
        setMessage('Login successful! Redirecting...');
        
        navigate('/dashboard'); 
      } else {
        console.log("Attempting registration...");

        await axios.post('http://localhost:6000/auth/register', { name, email, password });

        console.log("Registration successful!");
        setMessage('Registration successful! Please log in.');
        setIsLogin(true);
      
      }
    } catch (error : unknown) {
      console.error("Error during request:",error);
      let errormessage="Something went wrong. Please try again.";
      setMessage(errormessage);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input 
            type="text" 
            placeholder="Username" 
            value={name} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        )}
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <p>
        {isLogin ? (
          <span>Don't have an account? <a href="#" onClick={(e) => {e.preventDefault(); setIsLogin(false);}}>Sign Up</a></span>
        ) : (
          <span>Already have an account? <a href="#" onClick={(e) => {e.preventDefault(); setIsLogin(true);}}>Log In</a></span>
        )}
      </p>
    </div>
  );
};

export default AuthForm;



