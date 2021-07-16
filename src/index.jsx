import React from 'react';
import ReactDOM from 'react-dom';
import 'react-skeleton-css/styles/skeleton.2.0.4.css';
import 'react-skeleton-css/styles/normalize.3.0.2.css';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
