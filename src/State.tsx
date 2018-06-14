import {initialSearchPage, ISearchPageState, SearchPageAction, searchPageReducer} from "./ModelActionView/SearchPage";
import {WebData} from "./server/remote-data";

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
    productPage: IProductPage
}

export interface Product{
    itemId: number
    name: string
    thumbnailImage: string
}

export interface IProductPage {
    featuredProduct: Product
    recommendedProducts: WebData<Array<Product>>
}

const INITIAL_VIEW_STATE: ViewState = initialSearchPage()

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
   PRODUCT_PAGE_MSG = 'PRODUCT_PAGE_MSG',
   CHANGE_VIEW_STATE = 'CHANGE_VIEW_STATE'
}

export type AppAction =
      ChangeViewState
    | SearchPageMsg
    | ProductPageMsg

interface SearchPageMsg {
    type: AppActionC.SEARCH_PAGE_MSG
    pageAction: SearchPageAction
}

interface ProductPageMsg {
    type: AppActionC.PRODUCT_PAGE_MSG
    setRecommendedResult: WebData<Array<Product>>
}

export function productPageMsg(setRecommendedResult: WebData<Array<any>>): AppAction{
    return {
        type: AppActionC.PRODUCT_PAGE_MSG,
        setRecommendedResult
    }
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



