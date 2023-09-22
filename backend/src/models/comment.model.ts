import mongoose, { Schema } from 'mongoose';
import currentUser from '../data/currentUser.json' assert { type: 'json' };
import { CommentDocument } from '../types/comment.types.ts';

const replySchema = new Schema({
    content: {
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
        required: true,
    },
    user: {
        image: {
            png: {
                type: String,
                required: true,
                default: currentUser.image.png,
            },
            webp: {
                type: String,
                required: true,
                default: currentUser.image.webp,
            },
        },
        username: {
            type: String,
            required: true,
            default: currentUser.username,
        },
    },
});

const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            required: true,
            default: () => Date.now(),
        },
        score: {
            type: Number,
            required: true,
            default: 0,
        },
        user: {
            image: {
                png: {
                    type: String,
                    required: true,
                    default: currentUser.image.png,
                },
                webp: {
                    type: String,
                    required: true,
                    default: currentUser.image.webp,
                },
            },
            username: {
                type: String,
                required: true,
                default: currentUser.username,
            },
        },
        replies: {
            type: [replySchema],
            required: true,
            default: [],
        },
    },
    { collection: 'comments', versionKey: false }
);

export const Comment = mongoose.model<CommentDocument>(
    'Comment',
    commentSchema
);
