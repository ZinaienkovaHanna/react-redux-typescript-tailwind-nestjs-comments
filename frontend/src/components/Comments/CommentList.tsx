//src/Comments/CommentList

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import {
    addCommentAction,
    addReplyAction,
    deleteCommentAction,
    deleteReplyAction,
} from '../../store/actions/commentActions';

import Item from '../Item/Item';
import Form from '../Form/Form';

import { Comment, Reply } from '../../types/types';

const CommentList: React.FC = () => {
    const { comments, currentUser } = useTypedSelector(
        (state) => state.commentsData
    );
    const dispatch = useDispatch();

    const [newComment, setNewComment] = useState('');
    const [newReply, setNewReply] = useState('');
    const [activeReplyForm, setActiveReplyForm] = useState<string | null>(null);

    console.log(comments);

    const addCommentHandler = () => {
        const newCommentData = {
            id: uuidv4(),
            content: newComment,
            createdAt: new Date().toISOString(),
            score: 0,
            user: currentUser,
            replies: [],
        };

        dispatch(addCommentAction(newCommentData));
        setNewComment('');
    };

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
                                itemStyle="w-[330px] lg:w-[658px] ml-3 lg:ml-9"
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

            <Form
                currentUser={currentUser}
                button="SEND"
                placeholder="Add a comment…"
                onClick={addCommentHandler}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
            />
        </div>
    );
};

export default CommentList;
