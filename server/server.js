const express = require('express');
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

    server.applyMiddleware({ app });
    console.log(`GraphQL available at http://localhost:${PORT}${server.graphqlPath}`);
};

startServer();

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`);
    });
});