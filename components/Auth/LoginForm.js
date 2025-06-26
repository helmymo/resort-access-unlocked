import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // Basic validation
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    // Placeholder for API call
    try {
      // Simulate API call
      console.log('Attempting to log in with:', { email, password });
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email, password }),
      // });

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || 'Login failed');
      // }

      // const data = await response.json();
      // localStorage.setItem('token', data.token);
      // window.location.href = '/resorts';

      // Mock successful login for now
      if (email === "user@example.com" && password === "password") {
        localStorage.setItem('token', 'fake-jwt-token');
        console.log('Login successful, redirecting to /resorts');
        window.location.href = '/resorts';
      } else {
        throw new Error('Invalid email or password');
      }

    } catch (err) {
      setError(err.message);
      console.error('Login error:', err);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Login
        </button>
      </form>
      <div style={{ textAlign: 'center', marginTop: '15px' }}>
        <a href="/forgot-password" style={{ color: '#007bff', textDecoration: 'none' }}>Forgot Password?</a>
      </div>
    </div>
  );
};

export default LoginForm;
