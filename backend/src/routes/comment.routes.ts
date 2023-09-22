//src/routes/comment.routes.ts

import express from 'express';
import {
    getComments,
    getComment,
    addComment,
} from '../services/comment.service.ts';

const router = express.Router();

router.get('/comments', getComments);

router.get('/comments/:id', getComment);

router.post('/comments', addComment);

export default router;
