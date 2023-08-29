//src/store/actions/commentActions.tsx

import { Comment, CommentActionTypes } from '../../types/types';

export const addCommentAction = (comment: Comment) => {
    return {
        type: CommentActionTypes.ADD_COMMENT,
        payload: comment,
    };
};

export const deleteCommentAction = (id: string) => {
    return {
        type: CommentActionTypes.DELETE_COMMENT,
        payload: id,
    };
};

export const deleteReplyAction = (id: string) => {
    return {
        type: CommentActionTypes.DELETE_REPLY,
        payload: id,
    };
};
