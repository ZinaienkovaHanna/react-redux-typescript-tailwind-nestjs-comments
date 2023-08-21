import { combineReducers } from 'redux';

import commentsReducer from './commentsReducer';

const rootReducer = combineReducers({
    commentsData: commentsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
