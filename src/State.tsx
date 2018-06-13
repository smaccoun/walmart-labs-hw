import {ISearchPageState, SearchPageAction, searchPageReducer} from "./ModelActionView/SearchPage";

export type ViewState = SearchView | ProductView

export enum ViewStateC {
    SEARCH_PAGE = 'SEARCH_PAGE',
    PRODUCT_PAGE = 'PRODUCT_PAGE'
}

interface SearchView {
    type: ViewStateC.SEARCH_PAGE
    searchPageState: ISearchPageState
}

interface ProductView {
    type: ViewStateC.PRODUCT_PAGE
}


const INITIAL_VIEW_STATE: ViewState = {type: ViewStateC.SEARCH_PAGE, searchPageState: {curSearchTerm: null}}

export interface ChangeViewState {
    type: AppActionC.CHANGE_VIEW_STATE,
    viewState: ViewState
}

export function changeViewState(viewState: ViewState): ChangeViewState {
    return {
        type: AppActionC.CHANGE_VIEW_STATE,
        viewState
    }
}

export enum AppActionC {
   SEARCH_PAGE_MSG = 'SEARCH_PAGE_MSG',
   CHANGE_VIEW_STATE = 'CHANGE_VIEW_STATE'
}

export type AppAction =
      ChangeViewState
    | SearchPageMsg

interface SearchPageMsg {
    type: AppActionC.SEARCH_PAGE_MSG
    pageAction: SearchPageAction
}

export function searchPageMsg(pageAction: SearchPageAction): AppAction{
    return {
        type: AppActionC.SEARCH_PAGE_MSG,
        pageAction
    }
}


export interface IAppState {
    viewState: ViewState
}

export const rootReducer = (state: IAppState = {viewState: INITIAL_VIEW_STATE}, action: AppAction): IAppState => {
    switch (action.type) {
        case AppActionC.CHANGE_VIEW_STATE:
            return {...state, viewState: action.viewState}
        case AppActionC.SEARCH_PAGE_MSG:
            if(state.viewState.type == ViewStateC.SEARCH_PAGE){
                const updatedSearchPageState = searchPageReducer(state.viewState.searchPageState, action.pageAction)
                const updatedViewState: ViewState = {type: state.viewState.type, searchPageState: updatedSearchPageState}
                return {...state, viewState: updatedViewState}
            }else{
                console.error('IMPOSSIBLE MSG STATE', {state, action})
            }
        default:
            return {viewState: INITIAL_VIEW_STATE}
    }
};



