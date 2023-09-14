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
    editCommentAction,
    editReplyAction,
} from '../../store/actions/commentActions';
import {
    newCommentSchema,
    newReplySchema,
    editSchema,
} from '../../validation/validationSchemes';

import Item from '../Item/Item';
import Form from '../Form/Form';

import { Comment, Reply } from '../../types/types';

const CommentsList: React.FC = () => {
    const { comments, currentUser } = useTypedSelector(
        (state) => state.commentsData
    );
    const dispatch = useDispatch();

    const [newComment, setNewComment] = useState('');
    const [newReply, setNewReply] = useState('');
    const [activeReplyForm, setActiveReplyForm] = useState<null | string>(null);
    const [activeEditForm, setActiveEditForm] = useState<null | string>(null);

    const [validationErrorComment, setValidationErrorComment] = useState(null);
    const [validationErrorReply, setValidationErrorReply] = useState(null);
    const [validationErrorEdit, setValidationErrorEdit] = useState(null);

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

        newCommentSchema
            .validate(newCommentData)
            .then((validComment) => {
                dispatch(addCommentAction(validComment));
                setNewComment('');
                setValidationErrorComment(null);
            })
            .catch((validationError) => {
                console.error('Validation Error:', validationError);
                setValidationErrorComment(validationError.message);
            });
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

        newReplySchema
            .validate(newReplyData)
            .then((validReply) => {
                dispatch(addReplyAction(validReply, parentId));
                setNewReply('');
                setValidationErrorReply(null);
                setActiveReplyForm(null);
            })
            .catch((validationError) => {
                console.error('Validation Error:', validationError);
                setValidationErrorReply(validationError.message);
            });
    };

    const editedCommentHandler = (id: string, newContent: string) => {
        editSchema
            .validate({ content: newContent })
            .then((validContent) => {
                dispatch(editCommentAction(validContent.content, id));
                setActiveEditForm(null);
            })
            .catch((validationError) => {
                console.error('Validation Error:', validationError);
                setValidationErrorEdit(validationError.message);
            });
    };

    const editedReplyHandler = (
        commentId: string,
        replyId: string,
        newContent: string
    ) => {
        editSchema
            .validate({ content: newContent })
            .then((validContent) => {
                dispatch(
                    editReplyAction(commentId, replyId, validContent.content)
                );
                setActiveEditForm(null);
            })
            .catch((validationError) => {
                console.error('Validation Error', validationError);
                setValidationErrorEdit(validationError.message);
            });
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
                        addReply={() => {
                            setActiveReplyForm(comment.id);
                        }}
                        setActiveEditForm={() => setActiveEditForm(comment.id)}
                        activeEditForm={activeEditForm}
                        saveEditedItem={(newContent: string) =>
                            editedCommentHandler(comment.id, newContent)
                        }
                        error={validationErrorEdit}
                        deleteItem={() => deleteCommentHandler(comment.id)}
                        itemStyle="w-[344px] lg:w-[732px]"
                        buttonReplyStyle="lg:pl-36"
                        buttonDeleteStyle="pl-[26px] lg:pl-14"
                        textareaEditStyle="w-[312px] lg:w-[626px]"
                        buttonEditStyle="ml-9 lg:ml-[120px]"
                    />

                    {activeReplyForm === comment.id && (
                        <Form
                            currentUser={currentUser}
                            button="REPLY"
                            placeholder={`@${comment.user.username}`}
                            onClick={() =>
                                addReplyHandler(
                                    comment.id,
                                    comment.user.username
                                )
                            }
                            value={newReply}
                            onChange={(e) => setNewReply(e.target.value)}
                            formStyle="w-[344px] lg:w-[732px]"
                            textareaStyle="w-[312px] lg:w-[506px]"
                            error={validationErrorReply}
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
                                deleteItem={() => deleteReplyHandler(reply.id)}
                                addReply={() => {
                                    setActiveReplyForm(reply.id);
                                }}
                                saveEditedItem={(newContent: string) =>
                                    editedReplyHandler(
                                        comment.id,
                                        reply.id,
                                        newContent
                                    )
                                }
                                setActiveEditForm={() =>
                                    setActiveEditForm(reply.id)
                                }
                                activeEditForm={activeEditForm}
                                error={validationErrorEdit}
                                itemStyle="w-[332px] lg:w-[660px] ml-3 lg:ml-9"
                                buttonReplyStyle="lg:pl-[116px]"
                                buttonDeleteStyle="pl-4 lg:pl-8"
                                textareaEditStyle="w-[302px] lg:w-[560px]"
                                buttonEditStyle="ml-8 lg:ml-24"
                            />

                            {activeReplyForm === reply.id && (
                                <Form
                                    currentUser={currentUser}
                                    button="REPLY"
                                    placeholder={`@${reply.user.username}`}
                                    onClick={() =>
                                        addReplyHandler(
                                            comment.id,
                                            reply.user.username
                                        )
                                    }
                                    value={newReply}
                                    onChange={(e) =>
                                        setNewReply(e.target.value)
                                    }
                                    formStyle="w-[332px] lg:w-[660px] ml-3 lg:ml-9"
                                    textareaStyle="w-[302px] lg:w-[460px]"
                                    error={validationErrorReply}
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
                formStyle="w-[344px] lg:w-[732px] "
                textareaStyle="w-[312px] lg:w-[506px]"
                error={validationErrorComment}
            />
        </div>
    );
};

export default CommentsList;
