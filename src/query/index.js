import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';

import store from './store';
import './index.scss';
import App from './App.js';
import * as serviceWorker from '../serviceWorker';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

if (process.env.NODE_ENV === 'production') {
    serviceWorker.register();
} else {
    serviceWorker.unregister();
}
