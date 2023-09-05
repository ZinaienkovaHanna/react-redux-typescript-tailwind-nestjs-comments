//types

// components

interface UserImage {
    png: string;
    webp: string;
}

export interface User {
    image: UserImage;
    username: string;
}

export interface Reply {
    id: string;
    content: string;
    createdAt: string;
    score: number;
    replyingTo: string;
    user: User;
}

export interface Comment {
    id: string;
    content: string;
    createdAt: string;
    score: number;
    user: User;
    replies: Reply[];
}

export interface ItemProps {
    data: any;
    currentUser: User;
    content?: React.ReactNode;
    itemStyle?: string;
    buttonReplyStyle?: string;
    buttonDeleteStyle?: string;
    deleteItem: () => void;
    addReply: () => void;
    saveEditedItem: (newContent: string) => void;
    textareaEditStyle: string;
    buttonEditStyle: string;
}

export interface FormProps {
    button: string;
    placeholder?: string;
    currentUser: User;
    onClick: () => void;
    value: string;
    onChange: (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => void;
    formStyle?: string;
    textareaStyle?: string;
    defaultValue?: string;
}

//store

export interface CommentsDataStateType {
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
    ADD_REPLY = 'ADD_REPLY',
    DELETE_REPLY = 'DELETE_REPLY',
    EDIT_REPLY = 'EDIT_REPLY',
}

interface AddCommentAction {
    type: CommentActionTypes.ADD_COMMENT;
    payload: Comment;
}

interface AddReplyAction {
    type: CommentActionTypes.ADD_REPLY;
    payload: {
        reply: Reply;
        parentId: string;
    };
}

interface DeleteCommentAction {
    type: CommentActionTypes.DELETE_COMMENT;
    payload: string;
}

interface DeleteReplyAction {
    type: CommentActionTypes.DELETE_REPLY;
    payload: string;
}

interface EditCommentAction {
    type: CommentActionTypes.EDIT_COMMENT;
    payload: {
        content: string;
        id: string;
    };
}

interface EditReplyAction {
    type: CommentActionTypes.EDIT_REPLY;
    payload: {
        content: string;
        commentId: string;
        replyId: string;
    };
}

export type CommentAction =
    | AddCommentAction
    | DeleteCommentAction
    | EditCommentAction
    | AddReplyAction
    | EditReplyAction
    | DeleteReplyAction;
