import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

const requiredEnvs = [
    'MONGODB_URI',
    'JWT_ACCESS_SECRET',
    'JWT_REFRESH_SECRET'
];

const missingEnvs = [];
for (const envName of requiredEnvs) {
    if (!process.env[envName]) {
        missingEnvs.push(envName);
    }
}

if (missingEnvs.length > 0) {
    console.error(`CRITICAL CONFIGURATION ERROR: Missing required environment variables: ${missingEnvs.join(', ')}`);
    console.error('Please configure them in your .env file. Shutting down server immediately.');
    process.exit(1);
}

export const config = {
    port: parseInt(process.env.PORT, 10) || 5000,
    mongodbUri: process.env.MONGODB_URI ? process.env.MONGODB_URI.trim() : '',
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    corsOrigin: (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',').map(o => o.trim()),
    nodeEnv: process.env.NODE_ENV || 'development'
};
