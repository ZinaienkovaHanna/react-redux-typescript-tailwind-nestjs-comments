//src/services/comment.service.ts

import {
    getCommentsFromDB,
    getCommentFromDB,
    addCommentToDB,
    updateCommentToDB,
    deleteCommentFromDB,
} from '../repositories/comment.repository.ts';
import {
    RequestType,
    ResponseType,
    CommentType,
} from '../types/comment.types.ts';
import { validateContentSchema } from '../models/validate.model.ts';

function handleError(res: ResponseType, error: any): void {
    res.status(500).json({ error: error.message });
}

export async function getComments(
    req: RequestType,
    res: ResponseType
): Promise<void> {
    try {
        const comments = await getCommentsFromDB();
        res.status(200).json(comments);
    } catch (error) {
        handleError(res, error);
    }
}

export async function getComment(
    req: RequestType,
    res: ResponseType
): Promise<void> {
    try {
        const id = req.params.id;
        const comment = await getCommentFromDB(id);
        if (!comment) {
            res.status(404).json({ message: 'Comment not found' });
        } else {
            res.status(200).json(comment);
        }
    } catch (error) {
        handleError(res, error);
    }
}

export async function addComment(
    req: RequestType,
    res: ResponseType
): Promise<void> {
    try {
        const newCommentData: CommentType = req.body;

        await validateContentSchema.validate(newCommentData, {
            abortEarly: false,
        });

        const newComment = await addCommentToDB(newCommentData);
        res.status(201).json(newComment);
    } catch (error) {
        console.error(error);
        handleError(res, error);
    }
}

export async function updateComment(
    req: RequestType,
    res: ResponseType
): Promise<void> {
    try {
        const id = req.params.id;
        const updateCommentData = req.body;

        await validateContentSchema.validate(updateCommentData, {
            abortEarly: false,
        });

        const updateComment = await updateCommentToDB(id, updateCommentData);

        if (!updateComment) {
            res.status(404).json({ message: 'Comment not found' });
        } else {
            res.status(200).json(updateComment);
        }
    } catch (error) {
        handleError(res, error);
    }
}

export async function deleteComment(
    req: RequestType,
    res: ResponseType
): Promise<void> {
    try {
        const id = req.params.id;
        const comment = await deleteCommentFromDB(id);
        if (!comment) {
            res.status(404).json({ message: 'Comment not found' });
        } else {
            res.status(200).json(comment);
        }
    } catch (error) {
        handleError(res, error);
    }
}
