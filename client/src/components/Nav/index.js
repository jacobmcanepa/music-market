import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

function Nav() {
	function showNavigation() {
		if (Auth.loggedIn()) {
			return (
				<ul className="flex flex-row">
          <li className="mx-2 is-size-4 drop-shadow-lg">
            <Link to="/orderHistory">Order History</Link>
					</li>
					<li className="mx-2 is-size-4 drop-shadow-lg">
						<a href="/" onClick={() => Auth.logout()}>
							Logout
						</a>
					</li>
				</ul>
			);
		} else {
			return (
				<ul className="flex flex-row">
					<li className="mx-2 is-size-4 drop-shadow-lg">
						<Link to="/signup">Signup</Link>
					</li>
					<li className="mx-2 is-size-4 drop-shadow-lg">
						<Link to="/login">Login</Link>
					</li>
				</ul>
			);
		}
	}

	return (
		<header className="flex px-1 transparent p-4">
			<h1 className="flex title is-1 drop-shadow-lg text-emerald-300 content-center mb-0">
				<Link to="/">Music Market</Link>
			</h1>

			<nav className="flex items-end has-text-white mx-5">
				{showNavigation()}
			</nav>
		</header>
	);
}

export default Nav;
