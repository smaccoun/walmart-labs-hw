import {combineReducers} from "redux";

export type ViewState = SearchView | ProductView

export enum ViewStateC {
    SEARCH_PAGE = 'SEARCH_PAGE',
    PRODUCT_PAGE = 'PRODUCT_PAGE'
}

interface SearchView {
    type: ViewStateC.SEARCH_PAGE
}

interface ProductView {
    type: ViewStateC.PRODUCT_PAGE
}


const INITIAL_VIEW_STATE: ViewState = {type: ViewStateC.SEARCH_PAGE}

export enum ViewStateActionC {
    CHANGE_VIEW_STATE = 'CHANGE_VIEW_STATE',
}

interface ChangeViewState {
    type: ViewStateActionC.CHANGE_VIEW_STATE,
    viewState: ViewState
}

export function changeViewState(viewState: ViewState): ChangeViewState {
    return {
        type: ViewStateActionC.CHANGE_VIEW_STATE,
        viewState
    }
}


const viewStateReducer = (state: ViewState = INITIAL_VIEW_STATE, action: ChangeViewState): ViewState => {
    switch (action.type) {
        case ViewStateActionC.CHANGE_VIEW_STATE:
            return action.viewState
        default:
            return INITIAL_VIEW_STATE
    }
};


export interface IAppState {
    viewState: ViewState
}

export const rootReducer = combineReducers<IAppState>({
    viewState: viewStateReducer
})
