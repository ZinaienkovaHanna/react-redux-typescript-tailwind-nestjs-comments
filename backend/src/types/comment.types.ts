interface UserImage {
    png: string;
    webp: string;
}
interface User {
    image: UserImage;
    username: string;
}

interface Reply {
    id?: string;
    content: string;
    createdAt: string | Date;
    score: number;
    replyingTo: string;
    user: User;
}

interface Comment {
    id?: string;
    content: string;
    createdAt: string | Date;
    score: number;
    user: User;
    replies: Reply[];
}

export interface CommentsType {
    currentUser: User;
    comments: Comment[];
}
