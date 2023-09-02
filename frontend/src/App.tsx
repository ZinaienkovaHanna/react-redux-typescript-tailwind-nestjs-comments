//src/App.tsx

import CommentList from './components/Comments/CommentList';

function App() {
    return (
        <div className="container max-w-sm mx-auto font-rubik m-0 p-0 box-border border-2 border-red-500 bg-very-light-gray  lg:max-w-5xl">
            <CommentList />
        </div>
    );
}

export default App;
