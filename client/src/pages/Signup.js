import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

/* TODO: "I AM AN ARTIST BOOLEAN" */

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        displayName: formState.displayName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
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
          <h2 className="text-center text-xl pb-2">Signup</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="field">
              <label htmlFor="displayName" className='label'>Display Name:</label>
              <div className='control'>
                <input
                  placeholder="display name"
                  name="displayName"
                  type="displayName"
                  id="displayName"
                  onChange={handleChange}
                  className="input"
                />
              </div>
              
            </div>
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

            <div className='text-center'>
              <label className="checkbox">
                <input type="checkbox" /> I am an artist.
              </label>
              <div className="my-2">
                <button type='submit' className='px-5 py-2 bg-emerald-200 hover:bg-teal-300 rounded-md'>Sign Up</button>
              </div>
              <p>Already have an account? <Link to="/login"><span className='underline font-bold hover:no-underline'>Log in here!</span></Link></p>
            </div>
            
          </form>
        </div>
      </div>

      

    </div>
  );
}

export default Signup;