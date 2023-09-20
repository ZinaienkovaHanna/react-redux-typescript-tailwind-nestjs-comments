//src/routes/comment.routes.ts

import express from 'express';
import { getComments } from '../services/comment.service.ts';

const router = express.Router();

router.get('/comments', getComments);

export default router;
