import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { StoreProvider } from './utils/GlobalState';

import Home from './pages/Home';
import Nav from './components/Nav';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Success from './pages/Success';
import OrderHistory from './pages/OrderHistory';

const httpLink = createHttpLink({
	uri: 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('id_token');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<div class="min-h-screen bg-cover bg-center bg-no-repeat font-poppins ">
					<StoreProvider>
						<Nav />

						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/login" element={<Login />} />
							<Route path="/signup" element={<Signup />} />
							<Route path="/orderHistory" element={<OrderHistory />} />
							<Route path="/success" element={<Success />} />
						</Routes>
					</StoreProvider>
				</div>
			</Router>
		</ApolloProvider>
	);
}

export default App;
