//src/routes/comment.routes.ts

import express from 'express';
import {
    getComments,
    getComment,
    addComment,
    addReply,
    updateComment,
    deleteComment,
    deleteReply,
} from '../services/comment.service.ts';

const router = express.Router();

router.get('/comments', getComments);

router.get('/comments/:id', getComment);

router.post('/comments', addComment);

router.post('/comments/:id/replies', addReply);

router.patch('/comments/:id', updateComment);

router.delete('/comments/:id', deleteComment);

router.delete('/comments/:commentId/replies/:replyId', deleteReply);

export default router;
