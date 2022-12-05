import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">
      
      <div className=' flex justify-center'>
        <div className='w-8/12 bg-stone-100 p-6'>
          <h2 className="text-center text-xl pb-2">Login</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="field">
              <label htmlFor="email" className='label'>Email:</label>
              <div className='control'>
                <input
                  placeholder="youremail@test.com"
                  name="email"
                  type="email"
                  id="email"
                  onChange={handleChange}
                  className="input"
                />
              </div>

            </div>
            <div className="field">
              <label htmlFor="pwd" className='label'>Password:</label>
              <div className='control'>
                <input
                  placeholder="******"
                  name="password"
                  type="password"
                  id="pwd"
                  onChange={handleChange}
                  className="input"
                />
              </div>
              
            </div>
            {error ? (
              <div>
                <p>The provided credentials are incorrect</p>
              </div>
            ) : null}
            
            <div className='text-center'>
              <div className='field'>
                <button type='submit' className='px-5 py-2 bg-emerald-200 hover:bg-teal-300 rounded-md'>Log In</button>
              </div>
              <p>Need an account? <Link to="/signup"><span className='underline font-bold hover:no-underline'>Sign up here!</span></Link></p>
            </div>
            

          </form>
        </div>
      </div>
      
      
    </div>
  );
}

export default Login;