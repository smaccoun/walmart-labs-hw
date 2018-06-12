import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import configureStore from "./Setup";
import {Provider} from "react-redux";

ReactDOM.render(
<Provider store={configureStore()}>
        <App />
    </Provider>,
    document.getElementById('root')
)

registerServiceWorker();
