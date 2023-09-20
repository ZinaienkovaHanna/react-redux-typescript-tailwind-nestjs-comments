import { Request, Response } from 'express';
import { getCommentsFromDB } from '../repositories/comment.repository.ts';

function handleError(res: Response, error: any): void {
    res.status(500).json({ error: error.message });
}

export async function getComments(req: Request, res: Response): Promise<void> {
    try {
        const comments = await getCommentsFromDB();
        res.status(200).json(comments);
    } catch (error) {
        handleError(res, error);
    }
}
