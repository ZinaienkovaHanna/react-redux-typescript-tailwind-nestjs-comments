//src/Comments/CommentList

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Item from '../Item/Item';
import Form from '../Form/Form';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import {
    addReplyAction,
    deleteCommentAction,
    deleteReplyAction,
} from '../../store/actions/commentActions';

import { Comment, Reply } from '../../types/types';

const CommentList: React.FC = () => {
    const { comments, currentUser } = useTypedSelector(
        (state) => state.commentsData
    );
    const [newReply, setNewReply] = useState('qqqqqq');
    const [activeReplyForm, setActiveReplyForm] = useState<string | null>(null);
    const dispatch = useDispatch();

    console.log(comments);

    const addReplyHandler = (parentId: string, replyingTo: string) => {
        const newReplyData = {
            id: uuidv4(),
            content: newReply,
            createdAt: new Date().toISOString(),
            score: 0,
            replyingTo: replyingTo,
            user: currentUser,
        };

        dispatch(addReplyAction(newReplyData, parentId));
        setNewReply('');
    };

    const deleteCommentHandler = (id: string) => {
        dispatch(deleteCommentAction(id));
    };

    const deleteReplyHandler = (id: string) => {
        dispatch(deleteReplyAction(id));
    };

    return (
        <div>
            {comments.map((comment: Comment) => (
                <div key={comment.id}>
                    <Item
                        data={comment}
                        currentUser={currentUser}
                        itemStyle="w-[344px] lg:w-[732px]"
                        buttonReplyStyle="lg:pl-36"
                        buttonDeleteStyle="pl-[26px] lg:pl-14"
                        deleteItemHandler={() =>
                            deleteCommentHandler(comment.id)
                        }
                        onClickReply={() => {
                            setActiveReplyForm(comment.id);
                            setNewReply(`@${comment.user.username}`);
                        }}
                    />
                    {activeReplyForm === comment.id && (
                        <Form
                            currentUser={currentUser}
                            button="REPLY"
                            onClick={() => {
                                addReplyHandler(
                                    comment.id,
                                    comment.user.username
                                );
                                setActiveReplyForm(null);
                            }}
                            value={newReply}
                            onChange={(e) => setNewReply(e.target.value)}
                        />
                    )}

                    {comment.replies.map((reply: Reply) => (
                        <div
                            key={reply.id}
                            className="w-[344px] lg:w-[660px] m-auto border-l-2 border-light-gray"
                        >
                            <Item
                                data={reply}
                                currentUser={currentUser}
                                content={
                                    <span className="font-bold text-moderate-blue">{`@${reply.replyingTo} `}</span>
                                }
                                itemStyle="w-[332px] lg:w-[660px] ml-3 lg:ml-9"
                                buttonReplyStyle="lg:pl-[116px]"
                                buttonDeleteStyle="pl-4 lg:pl-8"
                                deleteItemHandler={() =>
                                    deleteReplyHandler(reply.id)
                                }
                                onClickReply={() => {
                                    setNewReply(`@${reply.user.username}`);
                                    setActiveReplyForm(reply.id);
                                }}
                            />

                            {activeReplyForm === reply.id && (
                                <Form
                                    currentUser={currentUser}
                                    button="REPLY"
                                    onClick={() => {
                                        addReplyHandler(
                                            comment.id,
                                            reply.user.username
                                        );
                                        setActiveReplyForm(null);
                                    }}
                                    value={newReply}
                                    onChange={(e) =>
                                        setNewReply(e.target.value)
                                    }
                                    formStyle="w-[332px] lg:w-[660px] ml-3 lg:ml-9"
                                    textareaStyle="lg:w-[460px]"
                                />
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default CommentList;
