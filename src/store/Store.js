import { createStore, applyMiddleware } from 'redux';
import rootReducer from './RootReducer';
import thunk from 'redux-thunk';

export const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
