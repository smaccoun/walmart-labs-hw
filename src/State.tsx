import {ISearchPageState, SearchPageAction, SearchPageActionC, searchPageReducer} from "./ModelActionView/SearchPage";

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


type AppAction =
      ChangeViewState
    | SearchPageAction


export interface IAppState {
    viewState: ViewState
}

export const rootReducer = (state: IAppState = {viewState: INITIAL_VIEW_STATE}, action: AppAction): IAppState => {
    switch (action.type) {
        case ViewStateActionC.CHANGE_VIEW_STATE:
            return {...state, viewState: action.viewState}
        case SearchPageActionC.SET_SEARCH_TERM:
            if(state.viewState.type == ViewStateC.SEARCH_PAGE){
                const updatedSearchPageState = searchPageReducer(state.viewState.searchPageState, action)
                const updatedViewState: ViewState = {type: state.viewState.type, searchPageState: updatedSearchPageState}
                return {...state, viewState: updatedViewState}
            }else{
                console.error('IMPOSSIBLE MSG STATE', {state, action})
            }
        default:
            return {viewState: INITIAL_VIEW_STATE}
    }
};



