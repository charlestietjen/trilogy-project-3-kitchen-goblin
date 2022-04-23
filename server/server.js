const express = require('express');
const path = require('path');
const {ApolloServer} = require('apollo-server-express');
const {graphqlUploadExpress} = require('graphql-upload');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const authMiddleware = require('./utils/auth');

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: authMiddleware,
    });
    await server.start();

    app.use(graphqlUploadExpress());
    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'build')));
    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });

    server.applyMiddleware({ app });
    console.log(`GraphQL available at http://localhost:${PORT}${server.graphqlPath}`);
};

startServer();

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`);
    });
});