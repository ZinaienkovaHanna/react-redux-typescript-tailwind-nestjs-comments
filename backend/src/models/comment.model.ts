import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    image: {
        png: String,
        webp: String,
    },
    username: String,
});

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
    user: userSchema,
});

const commentSchema = new Schema({
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
    user: userSchema,
    replies: {
        type: [replySchema],
        default: [],
    },
});

const commentsSchema = new Schema(
    {
        currentUser: userSchema,
        comments: [commentSchema],
    },
    { collection: 'comments' }
);

export const Comments = mongoose.model('Comments', commentsSchema);
