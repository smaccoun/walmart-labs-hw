import * as React from 'react'
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppAction, AppActionC, IAppState, searchPageMsg, ViewStateC} from "../State";
import {ChangeEvent, FormEvent} from "react";
import {take} from "redux-saga/effects";
import {fetchItems} from "../server/api";
import {requestState} from "../server/request";

/* STATE */

export interface ISearchPageState {
    curSearchTerm: null | string
}

/* ACTION */

export type SearchPageAction = SetSearchTerm | SubmitSearch

interface SetSearchTerm {
    type: SearchPageActionC.SET_SEARCH_TERM
    term: string | null
}

interface SubmitSearch {
    type: SearchPageActionC.SUBMIT_SEARCH
    payload: string | null
}

export enum SearchPageActionC {
    SET_SEARCH_TERM = 'SET_SEARCH_TERM',
    SUBMIT_SEARCH = 'SUBMIT_SEARCH'
}

function setSeartchTerm(term: string | null): SetSearchTerm{
    return {type: SearchPageActionC.SET_SEARCH_TERM, term}
}

function submitSearch(term: string | null): SubmitSearch{
    return {type: SearchPageActionC.SUBMIT_SEARCH, payload: term}
}

export function searchPageReducer(state: ISearchPageState, action: SearchPageAction): ISearchPageState {
    switch(action.type){
        case SearchPageActionC.SET_SEARCH_TERM:
            return {...state, curSearchTerm: action.term}
        case SearchPageActionC.SUBMIT_SEARCH:
            console.log('SUBMITTING! ', action.payload)
            return state
    }
}

/* Action Effects */

export function* searchItemWatcher() {
    while(true){
        const pageAction: AppAction = yield take(AppActionC.SEARCH_PAGE_MSG)
        if(pageAction.type == AppActionC.SEARCH_PAGE_MSG){
            if(pageAction.pageAction.type == SearchPageActionC.SUBMIT_SEARCH){
                let resultState = requestState()
                fetchItems().fork(resultState.set)
            }

        }
    }
}


/* VIEW */

interface IProps {
    setSearchTerm: (inputEvent: ChangeEvent<HTMLInputElement>) => void | undefined
    fetchSearch: (e: FormEvent<HTMLFormElement>, term: string | null) => void
    curSearchTerm: string | null
}

export function SearchPageV(props: IProps): JSX.Element {
    const {curSearchTerm, setSearchTerm} = props
    return(
        <div>
            <form onSubmit={(e) => props.fetchSearch(e, props.curSearchTerm)}>
                <input value={curSearchTerm ? curSearchTerm : ''} onChange={setSearchTerm}/>
                <input type="submit" value="Submit" />
            </form>
            <div>
                {curSearchTerm ? curSearchTerm : ''}
            </div>
        </div>
    )
}


function mapStateToProps(state: IAppState) {
    if(state.viewState.type == ViewStateC.SEARCH_PAGE){
        return {
            curSearchTerm: state.viewState.searchPageState.curSearchTerm
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




