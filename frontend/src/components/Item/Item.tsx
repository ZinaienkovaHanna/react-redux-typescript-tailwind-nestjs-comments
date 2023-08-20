import React from 'react';

import { ItemProps } from '../../types/types';

const Item: React.FC<ItemProps> = ({
    data,
    content,
    itemStyle,
    buttonReplyStyle,
}) => {
    return (
        <div
            className={`grid grid-cols-7 lg:grid-cols-12 gap-x-1 gap-y-4 grid-flow-row bg-text-white rounded-lg h-full m-auto p-4 my-4 ${itemStyle}`}
        >
            <img
                src={data.user.image.png}
                alt={data.user.username}
                className="col-span-1 w-8 h-8 lg:ml-2"
            />

            <p className="col-span-2 font-bold text-dark-blue flex items-center">
                {data.user.username}
            </p>

            <p className="col-span-4 pl-12  text-grayish-blue flex items-center">
                {data.createdAt}
            </p>

            <p className="col-span-7 lg:col-span-11 lg:col-start-2 text-grayish-blue lg:px-2">
                {content}
                {data.content}
            </p>

            <div className="col-span-3 lg:col-span-1 lg:col-start-1 lg:row-start-1 lg:row-span-2 flex lg:flex-col items-center justify-around w-24 h-10 lg:w-10 lg:h-24 bg-very-light-gray rounded-lg">
                <button>
                    <img src="images/icons/icon-plus.svg" alt="plus" />
                </button>
                <p className="font-bold text-moderate-blue">{data.score}</p>
                <button>
                    <img src="images/icons/icon-minus.svg" alt="minus" />
                </button>
            </div>

            <div className="col-span-4 lg:col-span-4 lg:col-start-9 lg:row-start-1 flex justify-between items-center ">
                <button
                    className={`flex items-center pl-24 ${buttonReplyStyle}`}
                >
                    <img
                        src="images/icons/icon-reply.svg"
                        alt="reply"
                        className="mr-2"
                    />
                    <span className="font-bold text-moderate-blue">Reply</span>
                </button>
            </div>
        </div>
    );
};

export default Item;
