import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider, connect } from "react-redux";
import store from "./redux/store";

require('dotenv').config();

const mapStateToProps =(state: any) =>({
  user: state
})

function AppReturn (props: any) {
  return(
  <>
  <App/>
  </>)
}

const RealApp = connect(mapStateToProps)(AppReturn);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <RealApp />
  </Provider>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
