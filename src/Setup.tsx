import {applyMiddleware, createStore} from "redux";
import {ChangeViewState, changeViewState, rootReducer, ViewStateC} from "./State";
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware, {SagaIterator} from "redux-saga";
import {all, fork, put} from "redux-saga/effects";
const { router , createBrowserHistory } = require('redux-saga-router')

const history = createBrowserHistory();

const routes = {
    '/product': function* usersSaga() {
        const setProductView: ChangeViewState = changeViewState({type: ViewStateC.PRODUCT_PAGE})
        yield put(setProductView);
    }
};

function* rootSaga(): SagaIterator {
    yield all([
        fork(router, history, routes),
    ])
}


function configureStore() {
    const sagaMiddleWare = createSagaMiddleware()


    const store = createStore(
        rootReducer
        , {}
        , applyMiddleware(sagaMiddleWare, thunkMiddleware)
    )

    sagaMiddleWare.run(rootSaga)

    return store
}



export default configureStore

