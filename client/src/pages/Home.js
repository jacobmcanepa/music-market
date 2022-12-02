import React from 'react';
import SongList from '../components/SongList';
import CategoryMenu from '../components/CategoryMenu';
import Cart from '../components/Cart';
import Upload from '../components/Upload';

const Home = () => {
	return (
		<div>
			<Upload />
			<CategoryMenu />
			<SongList />
			<Cart />
		</div>
	);
};

export default Home;
