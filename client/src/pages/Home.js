import React from 'react';
import SongList from '../components/SongList';
import CategoryMenu from '../components/CategoryMenu';
import Cart from '../components/Cart';
import Upload from '../components/Upload';
import Gallery from '../components/Gallery';

const Home = () => {
	return (
		<div>
			<Upload />
			<CategoryMenu />
			<SongList />
			<Cart />
			<Gallery />
		</div>
	);
};

export default Home;
