//src/routes/comment.routes.ts

import express from 'express';
import {
    getComments,
    getComment,
    addComment,
    updateComment,
    deleteComment,
} from '../services/comment.service.ts';

import {
    getReplies,
    getReply,
    addReply,
    updateReply,
    deleteReply,
} from '../services/reply.service.ts';

const router = express.Router();

router.get('/comments', getComments);

router.get('/comments/:commentId/replies', getReplies);

router.get('/comments/:commentId/replies/:replyId', getReply);

router.get('/comments/:id', getComment);

router.post('/comments', addComment);

router.post('/comments/:id/replies', addReply);

router.patch('/comments/:id', updateComment);

router.patch('/comments/:commentId/replies/:replyId', updateReply);

router.delete('/comments/:id', deleteComment);

router.delete('/comments/:commentId/replies/:replyId', deleteReply);

export default router;
