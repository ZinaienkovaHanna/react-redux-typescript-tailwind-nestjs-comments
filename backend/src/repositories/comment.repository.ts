// src/repositories/comment.repository.ts
import mongoose from 'mongoose';

import { Comment } from '../models/comment.model.ts';
import { CommentType } from '../types/comment.types.ts';
import currentUser from '../data/currentUser.json' assert { type: 'json' };

export async function getCommentsFromDB(): Promise<CommentType[]> {
    try {
        return await Comment.find().exec();
    } catch (err) {
        console.error(err);
        throw new Error('Error getting data');
    }
}

export async function getCommentFromDB(
    id: string
): Promise<CommentType | null> {
    try {
        return await Comment.findById(id).exec();
    } catch (err) {
        console.error(err);
        throw new Error('Error getting comment');
    }
}

export async function addCommentToDB(
    commentData: CommentType
): Promise<CommentType> {
    try {
        const newComment = new Comment(commentData);
        await newComment.save();
        return newComment.toObject();
    } catch (err) {
        console.error(err);
        throw new Error('Error adding record');
    }
}

export async function addReplyToComment(
    commentId: string,
    replyContent: { content: string }
): Promise<CommentType> {
    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            throw new Error('Comment not found');
        }

        const newReply = {
            _id: new mongoose.Types.ObjectId(),
            content: replyContent.content,
            createdAt: new Date(),
            score: 0,
            replyingTo: comment.user.username,
            user: {
                image: {
                    png: currentUser.image.png,
                    webp: currentUser.image.webp,
                },
                username: currentUser.username,
            },
        };

        comment.replies.push(newReply);

        await comment.save();

        return comment;
    } catch (err) {
        console.error(err);
        throw new Error('Error adding record');
    }
}

export async function updateCommentToDB(
    id: string,
    updateComment: CommentType
) {
    try {
        return await Comment.findByIdAndUpdate(id, updateComment, {
            new: true,
        }).exec();
    } catch (err) {
        console.error(err);
        throw new Error('Error updating comment');
    }
}

export async function deleteCommentFromDB(
    id: string
): Promise<CommentType | null> {
    try {
        return await Comment.findByIdAndDelete(id).exec();
    } catch (err) {
        console.error(err);
        throw new Error('Error deleting comment');
    }
}

export async function deleteReplyFromComment(
    commentId: string,
    replyId: string
): Promise<CommentType | null> {
    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            throw new Error('Comment not found');
        }

        const replyToDelete = comment.replies.find(
            (reply) => reply._id.toString() === replyId
        );

        if (!replyToDelete) {
            throw new Error('Reply not found');
        }

        comment.replies = comment.replies.filter(
            (reply) => reply._id.toString() !== replyId
        );

        await comment.save();

        return comment;
    } catch (err) {
        console.error(err);
        throw new Error('Error deleting reply');
    }
}
