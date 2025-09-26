import { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// const API_BASE_URL = 'http://localhost:5000/api/auth'; // Update if needed

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // const res = await axios.post(`${API_BASE_URL}/signin`, formData);
      // localStorage.setItem('token', res.data.token);
      navigate('/shorten'); // Redirect after login
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>
        Don't have an account? <a href="/signup">Signup</a>
      </p>
    </div>
  );
}

export default Login;