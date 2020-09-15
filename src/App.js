import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { Router } from "react-router-dom";
import { Provider } from 'react-redux';
import Routes from "./routes";
import store, { history } from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routes />
      </Router>
    </Provider>
  );
}
