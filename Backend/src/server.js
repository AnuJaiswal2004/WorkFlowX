import http from 'http';
import app from './app.js';
import { config } from './config/index.js';
import { connectDB } from './database/db.js';
import { logger } from './utils/logger.js';
import mongoose from 'mongoose';

const server = http.createServer(app);

const startServer = async () => {
    try {
        // Establish database connection (failsafe - exits process if connection fails)
        await connectDB();

        server.listen(config.port, () => {
            logger.info(`Server successfully started on port ${config.port} in ${config.nodeEnv} mode`);
        });

    } catch (err) {
        logger.error(`Critical failure starting server: ${err.message}`);
        process.exit(1);
    }
};

// Graceful Shutdown Handler
const gracefulShutdown = (signal) => {
    logger.info(`Received ${signal}. Starting graceful shutdown...`);
    
    server.close(async () => {
        logger.info('Express server closed.');
        try {
            await mongoose.connection.close();
            logger.info('MongoDB connection closed.');
            process.exit(0);
        } catch (err) {
            logger.error(`Error closing MongoDB connection: ${err.message}`);
            process.exit(1);
        }
    });

    // Forced shutdown fallback if closing takes too long (e.g. 10s timeout)
    setTimeout(() => {
        logger.warn('Forcing immediate shutdown as graceful termination timed out.');
        process.exit(1);
    }, 10000);
};

// Process listeners for system signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Unhandled Exception / Rejection logs
process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});

process.on('uncaughtException', (error) => {
    logger.error(`Uncaught Exception thrown: ${error.message}`);
    gracefulShutdown('Uncaught Exception');
});

startServer();
