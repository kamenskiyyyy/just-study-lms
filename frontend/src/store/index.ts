import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers/rootReducer";

export const reduxStore = createStore(rootReducer, applyMiddleware(thunk));
