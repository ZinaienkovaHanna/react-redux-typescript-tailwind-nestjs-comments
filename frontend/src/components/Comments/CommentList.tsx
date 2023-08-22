import React from 'react';

import Item from '../Item/Item';
import { CommentListProps } from '../../types/types';

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
    return (
        <div>
            {comments.map((comment) => (
                <div>
                    <Item
                        key={comment.id}
                        data={comment}
                        itemStyle="w-[344px] lg:w-[732px]"
                        buttonReplyStyle="lg:pl-36"
                    />
                    {comment.replies.map((reply) => (
                        <div className="w-[344px] lg:w-[660px] m-auto border-l-2 border-light-gray">
                            <Item
                                key={reply.id}
                                data={reply}
                                content={
                                    <span className="font-bold text-moderate-blue">{`@${reply.replyingTo} `}</span>
                                }
                                itemStyle="w-[332px] lg:w-[660px] ml-3 lg:ml-9"
                                buttonReplyStyle="lg:pl-[116px]"
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default CommentList;
