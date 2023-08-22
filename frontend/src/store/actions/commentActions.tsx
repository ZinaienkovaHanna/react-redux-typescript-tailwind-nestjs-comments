//src/store/actions/commentActions.tsx

import { Comment, CommentActionTypes } from '../../types/types';

export const addCommentAction = (comment: Comment) => {
    return {
        type: CommentActionTypes.ADD_COMMENT,
        payload: comment,
    };
};
