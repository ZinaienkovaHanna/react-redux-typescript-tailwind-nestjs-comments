import React from 'react';

import ReplyItem from './ReplyItem';
import { ReplyListProps } from '../../types/types';

const ReplyList: React.FC<ReplyListProps> = ({ replies }) => {
    return (
        <div>
            {replies.map((reply) => (
                <ReplyItem key={reply.id} reply={reply} />
            ))}
        </div>
    );
};

export default ReplyList;
