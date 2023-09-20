import { Comments } from '../models/comment.model.ts';
import { CommentsType } from '../types/comment.types.ts';

export async function getCommentsFromDB(): Promise<CommentsType | null> {
    try {
        const data = await Comments.findOne().exec();
        console.log(data);
        return data as CommentsType | null;
    } catch (error) {
        throw new Error('Error getting comments');
    }
}
