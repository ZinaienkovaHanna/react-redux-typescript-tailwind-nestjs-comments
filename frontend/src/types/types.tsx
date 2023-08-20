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

export interface ItemProps {
    key: number | string;
    data: any;
    content?: React.ReactNode;
    itemStyle: string;
    buttonReplyStyle: string;
}

export interface CommentListProps {
    comments: Comment[];
}

export interface CommentItemProps {
    comment: Comment;
}

export interface ReplyListProps {
    replies: Reply[];
}

export interface ReplyItemProps {
    reply: Reply;
}
