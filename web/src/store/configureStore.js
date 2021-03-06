import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from '../reducers';

import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

const logger = createLogger({
    collapsed: true,
    predicate: () => process.env.NODE_ENV === `development` // eslint-disable-line no-unused-vars
});

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    logger
)(createStore);

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(
        reducer,
        initialState,
        window.devToolsExtension ? window.devToolsExtension() : undefined);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers/index').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}