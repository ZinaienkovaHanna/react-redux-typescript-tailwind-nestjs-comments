import React from 'react';

interface DeleteCommentModalProps {
    onCancel: () => void;
    onConfirm: () => void;
}

const DeleteCommentModal: React.FC<DeleteCommentModalProps> = ({
    onCancel,
    onConfirm,
}) => {
    return (
        <div className="fixed inset-0  flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
            <div className="w-[344px] lg:w-[400px] h-56 lg:h-64 bg-white rounded-lg p-6 lg:p-8 shadow-md">
                <h2 className="text-dark-blue text-xl font-bold">
                    Delete Comment
                </h2>
                <p className="text-grayish-blue py-4">
                    Are you sure you want to delete this comment? This will
                    remove the comment and can’t be undone.
                </p>
                <div className="flex justify-between">
                    <button
                        className="bg-grayish-blue text-white font-semibold w-36 lg:w-40 h-12 rounded-lg"
                        onClick={onCancel}
                    >
                        NO, CANCEL
                    </button>
                    <button
                        className="bg-soft-red text-white font-semibold w-36 h-12 lg:w-40 rounded-lg"
                        onClick={onConfirm}
                    >
                        YES, DELETE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteCommentModal;
