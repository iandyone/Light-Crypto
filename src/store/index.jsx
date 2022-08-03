import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { inputReducer } from "./reducers/inputReducer";

const rootReducer = combineReducers({
    input: inputReducer,
});

export const store = createStore(rootReducer, composeWithDevTools())
