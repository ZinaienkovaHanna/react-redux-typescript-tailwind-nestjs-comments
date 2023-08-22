//src/store/reducers/commentReducer

import commentsData from '../../data/data.json';

import {
    CommentStateType,
    CommentActionTypes,
    CommentAction,
} from '../../types/types';

const initialState: CommentStateType = {
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

        default:
            return state;
    }
};

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

export default commentsReducer;
