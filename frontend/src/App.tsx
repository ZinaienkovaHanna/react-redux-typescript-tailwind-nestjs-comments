import React from 'react';
import CommentList from './components/Comments/CommentList';
import Form from './components/Form/Form';
import { useTypedSelector } from './hooks/useTypedSelector';

function App() {
    const { comments, currentUser } = useTypedSelector(
        (state) => state.commentsData
    );

    console.log(comments);
    console.log(currentUser);

    return (
        <div className="container max-w-sm mx-auto font-rubik m-0 p-0 box-border border-2 border-red-500 bg-very-light-gray  lg:max-w-5xl">
            <CommentList comments={comments} />
            <Form
                currentUser={currentUser}
                button="SEND"
                placeholder="Add a comment…"
            />
        </div>
    );
}

export default App;
