import React from 'react';
import ReactDOM from 'react-dom';
// Redux
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./state/reducers";
import App from './App';
import setAuthToken from './state/utils/setAuthToken'

if(localStorage.token){
  setAuthToken(localStorage.token)
}

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

ReactDOM.render(
  <Provider store={store}>
    <App /> 
  </Provider>
  , document.getElementById('root')
);