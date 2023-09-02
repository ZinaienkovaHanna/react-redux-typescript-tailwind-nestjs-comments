import React from 'react';

import { FormProps } from '../../types/types';

const Form: React.FC<FormProps> = ({
    button,
    placeholder,
    currentUser,
    onClick,
    value,
    onChange,
    formStyle,
    textareaStyle,
}) => {
    return (
        <div
            className={`grid grid-cols-2 lg:grid-cols-10 w-[344px] lg:w-[732px] ${formStyle} bg-white rounded-lg h-full m-auto min-h-[188px] lg:min-h-[144px] mb-8 `}
        >
            <form className="col-span-2 lg:col-span-7 lg:col-start-2">
                <textarea
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`w-[312px] lg:w-[506px] ${textareaStyle} mx-4 mt-4 h-24 lg:mt-6 lg:mx-0 lg:ml-1 border-2 border-light-gray rounded-lg pl-6 pt-3`}
                />
            </form>

            <img
                src={currentUser.image.png}
                alt={currentUser.username}
                className="col-span-1 lg:col-start-1 lg:row-start-1 w-8 h-8 ml-4 mt-2 lg:ml-6 lg:mt-6"
            />

            <button
                onClick={() => {
                    onClick();
                }}
                className="col-span-1 lg:col-span-2 lg:col-start-9 bg-moderate-blue text-white w-24 h-12 ml-[60px] lg:ml-[20px] lg:mt-6 rounded-lg "
            >
                {button}
            </button>
        </div>
    );
};

export default Form;
