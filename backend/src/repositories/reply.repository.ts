// src/repositories/reply.repository.ts

import { Comment } from '../models/comment.model.ts';
import { Reply } from '../models/reply.model.ts';
import { CommentType, ReplyType } from '../types/comment.types.ts';

export async function getRepliesFromComment(): Promise<CommentType[]> {
    try {
        return await Reply.find().exec();
    } catch (err) {
        console.error(err);
        throw new Error('Error getting data');
    }
}

export async function getReplyFromComment(
    id: string
): Promise<CommentType | null> {
    try {
        return await Reply.findById(id).exec();
    } catch (error) {
        console.error(error);
        throw new Error('Error getting reply');
    }
}

export async function addReplyToComment(
    commentId: string,
    replyContent: { content: string }
): Promise<ReplyType> {
    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            throw new Error('Comment not found');
        }

        const newReply = new Reply(replyContent);

        newReply.commentId = comment._id;
        newReply.replyingTo = comment.user.username;

        await newReply.save();
        return newReply.toObject();
    } catch (error) {
        console.error(error);
        throw new Error('Error adding record');
    }
}

export async function updateReplyToComment(
    id: string,
    updateComment: ReplyType
) {
    try {
        return await Reply.findByIdAndUpdate(id, updateComment, {
            new: true,
        }).exec();
    } catch (error) {
        console.error(error);
        throw new Error('Error updating reply');
    }
}

export async function deleteReplyFromComment(
    id: string
): Promise<ReplyType | null> {
    try {
        return await Reply.findByIdAndDelete(id).exec();
    } catch (error) {
        console.error(error);
        throw new Error('Error deleting reply');
    }
}
