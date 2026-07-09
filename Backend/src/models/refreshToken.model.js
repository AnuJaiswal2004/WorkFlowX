import mongoose from 'mongoose';

const refreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expires: 0 } // TTL index to automatically delete token after expiration
    }
}, {
    timestamps: true
});

export const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);
