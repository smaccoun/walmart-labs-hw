import {applyMiddleware, createStore} from "redux";
import {ChangeViewState, changeViewState, rootReducer, ViewState, ViewStateC} from "./State";
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware, {SagaIterator} from "redux-saga";
import {all, call, fork, put} from "redux-saga/effects";
import {searchItemWatcher} from "./ModelActionView/SearchPage";
const { router , createBrowserHistory } = require('redux-saga-router')

const history = createBrowserHistory();

const routes = {
    '/product': function* usersSaga() {
        const setProductView: ChangeViewState = changeViewState({type: ViewStateC.PRODUCT_PAGE})
        yield put(setProductView);
    },

    '/items': function* usersSaga() {
        const searchPage: ViewState = {type: ViewStateC.SEARCH_PAGE, searchPageState: {curSearchTerm: null}}
        const setSearchPageView: ChangeViewState = changeViewState(searchPage)
        yield put(setSearchPageView);
    }
};

function* rootSaga(): SagaIterator {
    yield all([
        call(searchItemWatcher),
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

