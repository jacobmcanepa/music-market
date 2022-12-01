import React from 'react';
import SongList from '../components/SongList';
import CategoryMenu from '../components/CategoryMenu';
import Cart from '../components/Cart';

const Home = () => {
	return (
		<div>
			<CategoryMenu />
			<SongList />
			<Cart />
		</div>
	);
};

export default Home;
