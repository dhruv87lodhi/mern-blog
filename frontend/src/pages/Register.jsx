import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Register = ({ setUser }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = await authService.register(formData);
      setUser(data.user);
      navigate("/");

    } catch (error) {
      setError(error.message);

    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Register Form</h1>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name='name'
          placeholder='Enter Name'
          value={formData.name}
          onChange={handleChange}
          required />

        <input
          type="text"
          name='email'
          placeholder='Enter email'
          value={formData.email}
          onChange={handleChange}
          required />

        <input
          type="text"
          name='password'
          placeholder='Enter password'
          value={formData.password}
          onChange={handleChange}
          required />

        <button type='submit' disabled={loading}>
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  )
}

export default Register