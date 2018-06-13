import * as React from 'react'
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppAction, AppActionC, IAppState, searchPageMsg, ViewState, ViewStateC} from "../State";
import {ChangeEvent, FormEvent} from "react";
import {call, put, take} from "redux-saga/effects";
import {fetchItems} from "../server/api";
import {notAsked, RemoteDataC, WebData} from "../server/remote-data";

/* STATE */

export interface ISearchPageState {
    curSearchTerm: null | string,
    searchResults: WebData<any>
}

export const initialSearchPage: () => ViewState = () => (
    {type: ViewStateC.SEARCH_PAGE
    , searchPageState: {curSearchTerm: null, searchResults: notAsked}
    }
)

/* ACTION */

export type SearchPageAction =
      SetSearchTerm
    | SubmitSearch
    | SetSearchResults

interface SetSearchTerm {
    type: SearchPageActionC.SET_SEARCH_TERM
    term: string | null
}

interface SubmitSearch {
    type: SearchPageActionC.SUBMIT_SEARCH
    payload: string | null
}

interface SetSearchResults {
    type: SearchPageActionC.SET_SEARCH_RESULTS
    result: WebData<any>
}

export enum SearchPageActionC {
    SET_SEARCH_TERM = 'SET_SEARCH_TERM',
    SUBMIT_SEARCH = 'SUBMIT_SEARCH',
    SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS'
}

function setSeartchTerm(term: string | null): SetSearchTerm{
    return {type: SearchPageActionC.SET_SEARCH_TERM, term}
}

function submitSearch(term: string | null): SubmitSearch{
    return {type: SearchPageActionC.SUBMIT_SEARCH, payload: term}
}

function setSearchResults(result: WebData<any>): SetSearchResults{
    return {type: SearchPageActionC.SET_SEARCH_RESULTS, result}
}

export function searchPageReducer(state: ISearchPageState, action: SearchPageAction): ISearchPageState {
    switch(action.type){
        case SearchPageActionC.SET_SEARCH_TERM:
            return {...state, curSearchTerm: action.term}
        case SearchPageActionC.SUBMIT_SEARCH:
            console.log('SUBMITTING! ', action.payload)
            return state
        case SearchPageActionC.SET_SEARCH_RESULTS:
            console.log('RESULTS! ', action.result)
            return {...state, searchResults: action.result}
    }
}

/* Action Effects */

export function* searchItemWatcher() {
    while(true){
        const pageAction: AppAction = yield take(AppActionC.SEARCH_PAGE_MSG)
        if(pageAction.type == AppActionC.SEARCH_PAGE_MSG){
            if(pageAction.pageAction.type == SearchPageActionC.SUBMIT_SEARCH){
                yield put(searchPageMsg(setSearchResults(notAsked)))
                const remoteResult = yield call(fetchItems)
                yield put(searchPageMsg(setSearchResults(remoteResult)))
            }

        }
    }
}

export function* setSearchPageWorker(wd: WebData<any>){
    yield put(searchPageMsg(setSearchResults(wd)))
}


/* VIEW */

interface IProps {
    setSearchTerm: (inputEvent: ChangeEvent<HTMLInputElement>) => void | undefined
    fetchSearch: (e: FormEvent<HTMLFormElement>, term: string | null) => void
    curSearchTerm: string | null
    searchResults: WebData<any>
}

export function SearchPageV(props: IProps): JSX.Element {
    const {curSearchTerm, setSearchTerm, searchResults} = props
    console.log('IN VIEW! ', searchResults)
    return(
        <div>
            <form onSubmit={(e) => props.fetchSearch(e, props.curSearchTerm)}>
                <input value={curSearchTerm ? curSearchTerm : ''} onChange={setSearchTerm}/>
                <input type="submit" value="Submit" />
            </form>
            <div>
                Results:
                {ItemResultView(searchResults)}
            </div>
        </div>
    )
}

export function ItemResultView(itemResult: WebData<any>){
    console.log('RESULT! ', itemResult)
    switch(itemResult.type){
        case RemoteDataC.NOT_ASKED:
            return (<div>Not Asked</div>)
        case RemoteDataC.LOADING:
            return (<div>Loading...</div>)
        case RemoteDataC.FAILURE:
            return (<div>{itemResult.error}</div>)
        case RemoteDataC.SUCCESS:
            return (<div>{itemResult.data[0].userId}</div>)
    }
}


/* STATE CONSTRUCTORS */
function mapStateToProps(state: IAppState) {
    if(state.viewState.type == ViewStateC.SEARCH_PAGE){
        return {
            curSearchTerm: state.viewState.searchPageState.curSearchTerm,
            searchResults: state.viewState.searchPageState.searchResults
        }
    } else{
        console.error('impossible state')
        return undefined
    }
}

function mapDispatchToProps(dispatch: Dispatch<AppAction>) {
    return {
        setSearchTerm: (inputEvent: ChangeEvent<HTMLInputElement>) => {
            const term = inputEvent.currentTarget.value
            const pageAction: SearchPageAction = setSeartchTerm(term)
            dispatch(searchPageMsg(pageAction))
        },
        fetchSearch: (e: FormEvent<HTMLFormElement>, payload: string | null) => {
            e.preventDefault()
            const pageAction: SearchPageAction = submitSearch(payload)
            dispatch(searchPageMsg(pageAction))
        }
    }
}

export const SearchPage = connect(mapStateToProps, mapDispatchToProps)(SearchPageV)




