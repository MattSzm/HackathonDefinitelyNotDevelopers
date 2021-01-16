import Thunk from "redux-thunk";
import {createStore, applyMiddleware, combineReducers} from "redux";

const rootReducer = combineReducers({

});


const store = createStore(rootReducer, applyMiddleware(Thunk));

export default store;
