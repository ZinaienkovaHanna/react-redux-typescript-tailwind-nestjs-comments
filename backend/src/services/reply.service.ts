//src/services/reply.service.ts

import {
    getRepliesFromComment,
    getReplyFromComment,
    addReplyToComment,
    updateReplyToComment,
    deleteReplyFromComment,
} from '../repositories/reply.repository.ts';
import { RequestType, ResponseType } from '../types/comment.types.ts';
import {
    validateContentSchema,
    validateDataSchema,
} from '../models/validate.model.ts';

function handleError(res: ResponseType, error: any): void {
    res.status(500).json({ error: error.message });
}

export async function getReplies(
    req: RequestType,
    res: ResponseType
): Promise<void> {
    try {
        const replies = await getRepliesFromComment();
        res.status(200).json(replies);
    } catch (error) {
        handleError(res, error);
    }
}

export async function getReply(
    req: RequestType,
    res: ResponseType
): Promise<void> {
    try {
        const replyId = req.params.replyId;
        const reply = await getReplyFromComment(replyId);
        if (!reply) {
            res.status(404).json({ message: 'Reply not found' });
        } else {
            res.status(200).json(reply);
        }
    } catch (error) {
        handleError(res, error);
    }
}

export async function addReply(
    req: RequestType,
    res: ResponseType
): Promise<void> {
    try {
        const commentId = req.params.id;
        const newReplyData = req.body;

        await validateContentSchema.validate(newReplyData, {
            abortEarly: false,
        });

        const updateComment = await addReplyToComment(commentId, newReplyData);
        res.status(201).json(updateComment);
    } catch (error) {
        console.error(error);
        handleError(res, error);
    }
}

export async function updateReply(
    req: RequestType,
    res: ResponseType
): Promise<void> {
    try {
        const id = req.params.replyId;
        const updateReplyData = req.body;

        await validateDataSchema.validate(updateReplyData, {
            abortEarly: false,
        });
        const updateReply = await updateReplyToComment(id, updateReplyData);

        if (!updateReply) {
            res.status(404).json({ message: 'Reply not found' });
        } else {
            res.status(200).json(updateReply);
        }
    } catch (error) {
        handleError(res, error);
    }
}

export async function deleteReply(
    req: RequestType,
    res: ResponseType
): Promise<void> {
    try {
        const id = req.params.replyId;
        const reply = await deleteReplyFromComment(id);
        if (!reply) {
            res.status(404).json({ message: 'Reply not found' });
        } else {
            res.status(200).json(reply);
        }
    } catch (error) {
        handleError(res, error);
    }
}
