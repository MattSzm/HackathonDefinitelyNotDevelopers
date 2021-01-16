import Thunk from "redux-thunk";
import {createStore, applyMiddleware, combineReducers} from "redux";
import reducer from './reducer';

const rootReducer = combineReducers({
    reducer: reducer
});

const store = createStore(rootReducer, applyMiddleware(Thunk));

export default store;
