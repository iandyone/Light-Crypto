import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { coinReducer } from "./reducers/coinsReducer";
import { inputReducer } from "./reducers/inputReducer";

const rootReducer = combineReducers({
    input: inputReducer,
    coins: coinReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

