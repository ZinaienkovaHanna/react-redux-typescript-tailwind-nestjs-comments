// components

export interface UserImage {
    png: string;
    webp: string;
}

export interface User {
    image: UserImage;
    username: string;
}

export interface Comment {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    user: User;
    replies: Reply[];
}

export interface Reply {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    replyingTo: string;
    user: User;
}

export interface CommentListProps {
    comments: Comment[];
}

export interface ItemProps {
    key: number | string;
    data: any;
    content?: React.ReactNode;
    itemStyle: string;
    buttonReplyStyle: string;
}

export interface FormProps {
    button: string;
    placeholder: string;
    currentUser: any;
}

//store

export interface CommentStateType {
    currentUser: {
        image: UserImage;
        username: string;
    };
    comments: Comment[];
}

export enum CommentActionTypes {
    ADD_COMMENT = 'ADD_COMMENT',
    DELETE_COMMENT = 'DELETE_COMMENT',
    EDIT_COMMENT = 'EDIT_COMMENT',
}

interface AddCommentAction {
    type: CommentActionTypes.ADD_COMMENT;
    payload: Comment;
}

interface DeleteCommentAction {
    type: CommentActionTypes.DELETE_COMMENT;
    payload: string;
}

interface EditCommentAction {
    type: CommentActionTypes.EDIT_COMMENT;
    id: string | number;
    payload: Comment[];
}

export type CommentAction =
    | AddCommentAction
    | DeleteCommentAction
    | EditCommentAction;
