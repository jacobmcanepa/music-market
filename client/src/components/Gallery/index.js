import React, { useState, useEffect } from 'react';
import { Image } from 'cloudinary-react';

function Gallery() {
	const [imageIds, setImageIds] = useState();

	const loadImages = async () => {
		try {
			const res = await fetch('api/images');
			const data = await res.json();
			setImageIds(data);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		loadImages();
	}, []);
	return (
		<div>
			<h1>Art</h1>
			{imageIds &&
				imageIds.map((imageId, index) => (
					<Image
						key={index}
						cloudName="dpi8jsakt"
						publicId={imageId}
						width="300"
						crop="scale"
					/>
				))}
		</div>
	);
}

export default Gallery;
