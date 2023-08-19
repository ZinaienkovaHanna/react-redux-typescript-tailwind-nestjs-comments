import React from 'react';
import data from './data/data.json';
import CommentList from './components/Comments/CommentList';

function App() {
    const comments = data.comments;

    return (
        <div className="container max-w-sm mx-auto font-rubik m-0 p-0 box-border border-2 border-red-500 bg-very-light-gray  lg:max-w-5xl">
            <CommentList comments={comments} />
        </div>
    );
}

export default App;
