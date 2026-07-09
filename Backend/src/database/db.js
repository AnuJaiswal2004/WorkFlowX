import mongoose from 'mongoose';
import { config } from '../config/index.js';
import { logger } from '../utils/logger.js';

export const connectDB = async () => {
    try {
        logger.info('Connecting to MongoDB...');
        const conn = await mongoose.connect(config.mongodbUri);
        logger.info(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        logger.error(`Database Connection Failure: ${error.message}`);
        // Rethrow the error so that the server bootstrap process exits immediately
        throw error;
    }
};

mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB disconnected. Attempting to reconnect...');
});

mongoose.connection.on('error', (err) => {
    logger.error(`MongoDB connection error: ${err.message}`);
});
