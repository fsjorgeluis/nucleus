import express from 'express';
import helmet from 'helmet';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import { typeDefs, resolvers } from './graphql/schema.js';
import connectDB from './config/database.js';

dotenv.config(); // Access to .env file and get variables
connectDB(); // Enable database connection

// Express initialization and port assignment
const app = express();
const PORT = process.env.PORT || 4000;

// Parsing data with express.json() middleware
app.use(express.json());

// Apollo server definition
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.applyMiddleware({ app });

// Applying middlewares to routes
app.use(helmet());
app.use((req, res) => {
    res.status(200);
    res.send('Graphql API is running...');
    res.end();
});

// Launching server on designed port
app.listen({ port: PORT }, () =>
    console.log(`🚀 Server in ${process.env.NODE_ENV} mode, ready at http://localhost:${PORT}${server.graphqlPath}`)
);