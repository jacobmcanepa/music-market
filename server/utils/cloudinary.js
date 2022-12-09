//const cloudinary = require('cloudinary-core'); // If your code is for ES5
//const cloudinary = require('cloudinary').v2;

// const cloudinaryClient = new cloudinary.Cloudinary({
// 	cloud_name: 'dpi8jsakt',
// 	secure: true,
// });

// const cloudinaryClient = cloudinary.Cloudinary.new();
// cloudinaryClient.config('dpi8jsakt');
const cloudinary = require('cloudinary').v2;

// configure the Cloudinary Node.js SDK with your Cloudinary account details
cloudinary.config({
	cloud_name: 'dpi8jsakt',
	api_key: '979989155931243',
	api_secret: '7C-yPQopdcfiimZfplpmNBhJf_Y',
});

// define the GraphQL query to collect public IDs from a specific folder
const query = `
query {
  folder(path: "songs") {
    public_ids
  }
}
`;

// execute the GraphQL query using the `graphql` method
cloudinary.graphql(query).then((result) => {
	// the `public_ids` field in the query result contains an array of the public IDs
	// of the assets in the specified folder
	const publicIds = result.folder.public_ids;

	// do something with the public IDs
	console.log(publicIds);
});
module.exports = cloudinary;
