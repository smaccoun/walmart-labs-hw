import * as React from 'react'
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {IAppState, ViewStateC} from "../State";

/* STATE */

export interface ISearchPageState {
    curSearchTerm: null | string
}

/* ACTION */

export type SearchPageAction = SetSearchTerm

interface SetSearchTerm {
    type: SearchPageActionC.SET_SEARCH_TERM
    term: string
}

export enum SearchPageActionC {
    SET_SEARCH_TERM = 'SET_SEARCH_TERM'
}

export function searchPageReducer(state: ISearchPageState, action: SearchPageAction): ISearchPageState {
    switch(action.type){
        case SearchPageActionC.SET_SEARCH_TERM:
            return {...state, curSearchTerm: action.term}
    }
}


/* VIEW */

interface IProps {
    setSearchTerm: (term: string) => void
    curSearchTerm: string | null
}

export function SearchPageV(props: IProps): JSX.Element {
    console.log(props.curSearchTerm)
    return(
        <div>
            <button onClick={() => props.setSearchTerm('a sample search')}>Search for A </button>
            {props.curSearchTerm ? props.curSearchTerm : ''}
        </div>
    )
}


function mapStateToProps(state: IAppState) {
    console.log(state)
    if(state.viewState.type == ViewStateC.SEARCH_PAGE){
        return {
            curSearchTerm: state.viewState.searchPageState.curSearchTerm
        }
    } else{
        console.error('impossible state')
        return undefined
    }
}

function mapDispatchToProps(dispatch: Dispatch<SearchPageAction>) {
    return {
        setSearchTerm: (term: string) => dispatch({type: SearchPageActionC.SET_SEARCH_TERM, term})
    }
}

export const SearchPage = connect(mapStateToProps, mapDispatchToProps)(SearchPageV)




