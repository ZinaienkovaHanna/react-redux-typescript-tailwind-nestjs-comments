import { Request, Response } from 'express';
import { Document } from 'mongoose';

export type RequestType = Request;
export type ResponseType = Response;

interface UserType {
    image: {
        png: string;
        webp: string;
    };
    username: string;
}

export interface ReplyType {
    commentId: string;
    content: string;
    createdAt: string | Date;
    score: number;
    replyingTo: string;
    user: UserType;
}

export interface CommentType extends Document {
    content: string;
    createdAt: string | Date;
    score: number;
    user: UserType;
}

// export interface CommentType {
//     id?: string;
//     content: string;
//     createdAt: string | Date;
//     score: number;
//     user: UserType;
//     replies: ReplyType[] | [];
// }

// export interface UserDocument extends Document {
//     image: {
//         png: string;
//         webp: string;
//     };
//     username: string;
// }

// export interface ReplyDocument extends Document {
//     content: string;
//     createdAt: Date;
//     score: number;
//     user: UserDocument;
//     replyingTo: string;
// }

// export interface CommentDocument extends Document {
//     content: string;
//     createdAt: Date;
//     score: number;
//     user: UserDocument;
//     replies: ReplyDocument[];
// }
