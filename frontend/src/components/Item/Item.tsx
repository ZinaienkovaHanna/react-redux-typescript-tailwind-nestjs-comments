//src/Item/Item.tsx

import { useState } from 'react';
import DeleteItemModal from './DeleteItemModal';
import { formatDate } from '../../utils/utils';
import { ItemProps } from '../../types/types';

const Item: React.FC<ItemProps> = ({
    data,
    currentUser,
    content,
    itemStyle,
    buttonReplyStyle,
    buttonDeleteStyle,
    onClickReply,
    deleteItemHandler,
    // editHandler,
}) => {
    const [score, setScore] = useState(data.score);
    const [isCurrentUserComment, setIsCurrentUserComment] = useState(
        data.user.username === currentUser.username
    );
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
        <>
            <div
                className={`grid grid-cols-7 lg:grid-cols-12 gap-x-1 gap-y-4 grid-flow-row bg-white rounded-lg h-full m-auto p-4 my-4 w-[344px] lg:w-[732px] ${itemStyle}`}
            >
                <img
                    src={data.user.image.png}
                    alt={data.user.username}
                    className="col-span-1 w-8 h-8 lg:ml-2"
                />

                <p className="col-span-3 font-bold text-dark-blue flex items-center">
                    {data.user.username}{' '}
                    {isCurrentUserComment && (
                        <span className="ml-2 text-xs text-white bg-moderate-blue w-9 h-5 rounded-sm flex items-center justify-center">
                            you
                        </span>
                    )}
                </p>

                <p className="col-span-3 pl-4  text-grayish-blue flex items-center">
                    {formatDate(data.createdAt)}
                </p>

                <p className="col-span-7 lg:col-span-11 lg:col-start-2 text-grayish-blue lg:px-2 break-words">
                    {content}
                    {data.content}
                </p>

                <div className="col-span-3 lg:col-span-1 lg:col-start-1 lg:row-start-1 lg:row-span-2 flex lg:flex-col items-center justify-around w-24 h-10 lg:w-10 lg:h-24 bg-very-light-gray rounded-lg">
                    <button onClick={() => setScore(score + 1)}>
                        <img src="images/icons/icon-plus.svg" alt="plus" />
                    </button>
                    <p className="font-bold text-moderate-blue">{score}</p>
                    <button
                        onClick={() => {
                            if (score > 0) setScore(score - 1);
                        }}
                    >
                        <img src="images/icons/icon-minus.svg" alt="minus" />
                    </button>
                </div>

                <div className="col-span-4 lg:col-span-4 lg:col-start-9 lg:row-start-1 flex justify-between items-center ">
                    {isCurrentUserComment ? (
                        <>
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className={`flex items-center pl-[26px] lg:pl-14  ${buttonDeleteStyle}`}
                            >
                                <img
                                    src="images/icons/icon-delete.svg"
                                    alt="delete"
                                    className="mr-2"
                                />
                                <span className="font-bold text-soft-red">
                                    Delete
                                </span>
                            </button>
                            <button
                                // onClick={editHandler}
                                className={`flex items-center pr-3 lg:pr-6`}
                            >
                                <img
                                    src="images/icons/icon-edit.svg"
                                    alt="edit"
                                    className="mr-2"
                                />
                                <span className="font-bold text-moderate-blue">
                                    Edit
                                </span>
                            </button>
                        </>
                    ) : (
                        <button
                            className={`flex items-center pl-24 lg:pl-36 ${buttonReplyStyle}`}
                            onClick={onClickReply}
                        >
                            <img
                                src="images/icons/icon-reply.svg"
                                alt="reply"
                                className="mr-2"
                            />
                            <span className="font-bold text-moderate-blue">
                                Reply
                            </span>
                        </button>
                    )}
                </div>
            </div>

            {showDeleteModal && (
                <DeleteItemModal
                    onCancel={() => setShowDeleteModal(false)}
                    onConfirm={deleteItemHandler}
                />
            )}
        </>
    );
};

export default Item;
