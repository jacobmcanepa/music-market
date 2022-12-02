const express = require('express');
const path = require('path');
const { cloudinary } = require('./utils/cloudinary');
const { ApolloServer } = require('apollo-server-express');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

const app = express();

app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')));
}

const startApolloServer = async (typeDefs, resolvers) => {
	await server.start();
	server.applyMiddleware({ app });

	db.once('open', () => {
		app.get('/api/images', async (req, res) => {
			const { resources } = await cloudinary.search
				.expression('folder:art')
				.sort_by('public_id', 'desc')
				.max_results(30)
				.execute();
			const publicIds = resources.map((file) => file.public_id);
			res.send(publicIds);
		});

		app.post('/api/upload', async (req, res) => {
			try {
				const fileStr = req.body.data;
				const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
					upload_preset: 'proj_3',
				});
				console.log(uploadedResponse);
				res.json({ msg: 'YAAAY' });
			} catch (error) {
				console.error(error);
				res.status(500).json({ err: 'something went wrong' });
			}
		});
		app.listen(PORT, () => {
			console.log(`API server running on port ${PORT}`);
			console.log(
				`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
			);
		});
	});
};

startApolloServer(typeDefs, resolvers);
