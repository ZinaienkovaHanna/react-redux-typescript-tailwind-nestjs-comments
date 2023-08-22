//src/App.tsx

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import CommentList from './components/Comments/CommentList';
import Form from './components/Form/Form';
import { useTypedSelector } from './hooks/useTypedSelector';
import { addCommentAction } from './store/actions/commentActions';

function App() {
    const { comments, currentUser } = useTypedSelector(
        (state) => state.commentsData
    );
    const [newComment, setNewComment] = useState('');
    const dispatch = useDispatch();

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

    return (
        <div className="container max-w-sm mx-auto font-rubik m-0 p-0 box-border border-2 border-red-500 bg-very-light-gray  lg:max-w-5xl">
            <CommentList comments={comments} />
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
}

export default App;
