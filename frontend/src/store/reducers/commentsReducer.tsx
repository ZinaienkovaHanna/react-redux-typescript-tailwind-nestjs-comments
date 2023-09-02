//src/store/reducers/commentReducer

import commentsData from '../../data/data.json';

import {
    CommentsDataStateType,
    CommentActionTypes,
    CommentAction,
} from '../../types/types';

const initialState: CommentsDataStateType = {
    currentUser: commentsData.currentUser,
    comments: commentsData.comments,
};

const commentsReducer = (state = initialState, action: CommentAction) => {
    switch (action.type) {
        case CommentActionTypes.ADD_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.payload],
            };

        case CommentActionTypes.DELETE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(
                    (comment) => comment.id !== action.payload
                ),
            };

        case CommentActionTypes.ADD_REPLY:
            return {
                ...state,
                comments: state.comments.map((comment) => {
                    if (comment.id === action.payload.parentId) {
                        return {
                            ...comment,
                            replies: [...comment.replies, action.payload.reply],
                        };
                    } else {
                        return comment;
                    }
                }),
            };

        case CommentActionTypes.DELETE_REPLY:
            return {
                ...state,
                comments: state.comments.map((comment) => {
                    return {
                        ...comment,
                        replies: comment.replies.filter(
                            (reply) => reply.id !== action.payload
                        ),
                    };
                }),
            };

        default:
            return state;
    }
};

export default commentsReducer;

// const commentsReducer = (state = initialState, action: CommentAction) => {
//     switch (action.type) {
//         case CommentActionTypes.ADD_COMMENT:
//             return {
//                 ...state,
//                 comments: [...state.comments, action.payload],
//             };
//         case CommentActionTypes.DELETE_COMMENT:
//             return {
//                 ...state,
//                 comments: state.comments.filter(
//                     (comment) => comment.id !== action.payload
//                 ),
//             };
//         case CommentActionTypes.EDIT_COMMENT:
//             return {
//                 ...state,
//                 notes: state.comments.map((comment) =>
//                     comment.id === action.id ? action.payload : comment
//                 ),
//             };
//         default:
//             return state;
//     }
// };
