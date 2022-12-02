import React from 'react';

import { Link } from "react-router-dom";

/* TODO: change to 'if logged in' using Auth util */

function Nav() {

  function showNavigation() {
    if (false) { // TODO: change to 'if logged in' using Auth util
      return (
        <ul className="flex flex-row">
          <li className="mx-1">
            {/* TODO: on click, logout using Auth logout util */}
            <a href="/" onClick=''>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex flex-row">
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

	return (
		<header className='flex flex-row px-1'>
      <h1>
        <Link to="/">
          Music Market
        </Link>
			</h1>

      <nav>
        {showNavigation()}
      </nav>
		</header>
	);
}

export default Nav;
