import React from 'react';

import CommentItem from './CommentItem';

import { CommentListProps } from '../../types/types';

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
    return (
        <div>
            {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
            ))}
        </div>
    );
};

export default CommentList;
