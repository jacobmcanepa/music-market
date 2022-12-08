const cloudinary = require('cloudinary-core'); // If your code is for ES5
//const cloudinary = require('cloudinary').v2;

// const cloudinaryClient = new cloudinary.Cloudinary({
// 	cloud_name: 'dpi8jsakt',
// 	secure: true,
// });

// const cloudinaryClient = cloudinary.Cloudinary.new();
// cloudinaryClient.config('dpi8jsakt');

var cloudinaryClient = cloudinary.Cloudinary.new({ cloud_name: 'dpi8jsakt' });

// const cloudinaryClient = new cloudinary.Cloudinary({
// 	cloud_name: 'dpi8jsakt',
// 	api_key: '979989155931243',
// 	api_secret: '7C-yPQopdcfiimZfplpmNBhJf_Y',
// });

//console.log(cloudinaryClient);

const getIds = () => {
	return new Promise((resolve, reject) => {
		cloudinaryClient.api.resources({}, (error, result) => {
			if (error) {
				console.log('something went wrong');
				reject(error);
			} else {
				const publicIDs = result.resources
					.filter(
						(resource) => resource.public_id && resource.folder === 'songs'
					)
					.map((resource) => resource.public_id);
				console.log(result);
				resolve(publicIDs);
			}
		});
	});
};
module.exports = { getIds, cloudinary };
