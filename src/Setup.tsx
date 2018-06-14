import {applyMiddleware, createStore} from "redux";
import {
    ChangeViewState,
    changeViewState,
    IProductPage,
    Product,
    productPageMsg,
    rootReducer,
    ViewState,
    ViewStateC
} from "./State";
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware, {SagaIterator} from "redux-saga";
import {all, call, fork, put} from "redux-saga/effects";
import {initialSearchPage, searchItemWatcher} from "./ModelActionView/SearchPage";
import {loading, WebData} from "./server/remote-data";
import {fetchRecommended} from "./server/api";
const { router , createBrowserHistory } = require('redux-saga-router')

const history = createBrowserHistory();

const routes = {
    '/product/:id': function* usersSaga(b: {id: number}) {
        console.log(b.id)
        const featuredProduct: Product = {itemId: b.id, name: 'fake', thumbnailImage: 'fake'}
        yield put(productPageMsg(loading))
        const recommendedProducts: WebData<Array<Product>> = yield call(fetchRecommended,b.id)
        const productPage: IProductPage = {featuredProduct, recommendedProducts}
        const productPageView: ViewState = {type: ViewStateC.PRODUCT_PAGE, productPage}
        const setProductView: ChangeViewState = changeViewState(productPageView)
        yield put(setProductView);
    },

    '/items': function* usersSaga() {
        const setSearchPageView: ChangeViewState = changeViewState(initialSearchPage())
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

