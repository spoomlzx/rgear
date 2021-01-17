import { applyMiddleware, combineReducers, compose, createStore, Middleware, Reducer } from "redux";
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';
import { IAction, IStoreState } from "./types";
import userReducer from "./module/user";


const reducers: Reducer<IStoreState, IAction<any>> = combineReducers<IStoreState>({
  user: userReducer,
})

const middleware: Middleware[] = [reduxThunk];
if (process.env.NODE_ENV === 'development') {
  middleware.push(reduxLogger);
}

function createMyStore() {
  // @ts-ignore
  return window.__REDUX_DEVTOOLS_EXTENSION__ ?
    createStore(
      // @ts-ignore
      reducers, compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__({})),
    ) : createStore(reducers, applyMiddleware(...middleware));
}

const store = createMyStore();

export default store;
