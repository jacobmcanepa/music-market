import React, { useState } from 'react';

import { Link } from 'react-router-dom';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log('login submit');
  };

  const handleChange = (event) => {
    console.log('handle change');
  };

  return (
    <div>
      <Link to="/signup">← Go to Signup</Link>

      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="email">Email address:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        
        
        <div>
          <button type='submit' className='px-5 py-2 bg-emerald-200 hover:bg-teal-300 rounded-md'>Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;