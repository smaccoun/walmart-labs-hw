import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./State";
import thunkMiddleware from 'redux-thunk'

function configureStore() {
    const store = createStore(
        rootReducer
        , {}
        , applyMiddleware(thunkMiddleware)
    )

    return store
}



export default configureStore