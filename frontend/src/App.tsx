//src/App.tsx

import CommentsList from './components/Comments/CommentsList';

function App() {
    return (
        <div className="container max-w-sm mx-auto font-rubik m-0 p-0 box-border border-2 border-red-500 bg-very-light-gray  lg:max-w-5xl">
            <CommentsList />
        </div>
    );
}

export default App;
