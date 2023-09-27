// src/repositories/comment.repository.ts
import { Comment, Reply } from '../models/comment.model.ts';
import { CommentType, ReplyType } from '../types/comment.types.ts';

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
    replyData: ReplyType
): Promise<CommentType> {
    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            throw new Error('Comment not found');
        }

        const newReply = new Reply(replyData);
        newReply.replyingTo = comment.user.username;

        comment.replies.push(newReply);

        await newReply.save();
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
