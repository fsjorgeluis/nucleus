import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/database.js';
// Public and secure endpoints
import userRoutes from './routes/userRoutes.js';
import publisherRoutes from './routes/publisherRoutes.js';
import monthlyReportRoutes from './routes/monthlyReportRoutes.js';
import groupRoutes from './routes/groupRoutes.js';

dotenv.config(); // Access to .env file and get variables
connectDB(); // Enable database connection

// Express initialization and port assignment
const app = express();
const PORT = process.env.PORT || 4000;

// Preventing cors error 
// Parsing data with express.json() middleware
// Applying middlewares to routes
app.use(cors());
app.use(express.json());
app.use(helmet());

app.get('/', (req, res) => {
    res.status(200);
    res.json({
        "status": "API is running...",
        "name": "nucleus",
        "version": "0.2.1",
        "description": "REST API core for dashboard app",
        "author": {
            "name": "Jorge Fernandez",
            "email": "fsjorgeluis@gmail.com"
        },
        "contributors": [
            {
                "name": "Javier Mora",
                "email": "javmora04@gmail.com"
            }
        ],
    });
    res.end();
});

app.use('/api/users', userRoutes);
app.use('/api/publishers', publisherRoutes);
app.use('/api/monthlyreports', monthlyReportRoutes);
app.use('/api/groups', groupRoutes);


app.use(notFound);
app.use(errorHandler);

// Launching server on designed port
app.listen({ port: PORT }, () =>
    console.log(`🚀 Server in ${process.env.NODE_ENV} mode, ready at http://localhost:${PORT}`)
);