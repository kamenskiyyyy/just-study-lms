import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export const reduxStore = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
