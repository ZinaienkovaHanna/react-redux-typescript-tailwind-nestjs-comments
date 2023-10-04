import mongoose, { Schema } from 'mongoose';
import currentUser from '../data/currentUser.json' assert { type: 'json' };
import { ReplyType } from '../types/comment.types.ts';

const replySchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },

        commentId: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: () => Date.now(),
        },
        score: {
            type: Number,
            default: 0,
        },
        replyingTo: {
            type: String,
        },
        user: {
            image: {
                png: {
                    type: String,
                    default: currentUser.image.png,
                },
                webp: {
                    type: String,
                    default: currentUser.image.webp,
                },
            },
            username: {
                type: String,
                default: currentUser.username,
            },
        },
    },
    { collection: 'replies', versionKey: false }
);

export const Reply = mongoose.model<ReplyType>('Reply', replySchema);
