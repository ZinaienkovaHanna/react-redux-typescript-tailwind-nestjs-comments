import React from 'react';
import data from './data/data.json';
import CommentList from './components/Comments/CommentList';
import Form from './components/Form/Form';

function App() {
    const comments = data.comments;
    const currentUser = data.currentUser;

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
