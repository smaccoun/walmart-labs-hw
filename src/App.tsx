import * as React from 'react';
import './App.css';
import {IAppState, ViewState, ViewStateC} from "./State";
import {connect} from "react-redux";
import {SearchPage} from "./ModelActionView/SearchPage";

interface IProps {
    viewState: ViewState
}

function App(props: IProps): JSX.Element {
    const {viewState} = props

    return (
        <div>
            {viewPage(viewState)}
        </div>
    )
}

function viewPage(viewState: ViewState): JSX.Element {
    switch(viewState.type){
        case ViewStateC.SEARCH_PAGE:
            return (<SearchPage />)
        case ViewStateC.PRODUCT_PAGE:
            return (<div>PRODUCT PAGE: {viewState.product} </div>)
    }
}

const mapStateToProps = (state: IAppState): IProps => {
    return {
        viewState: state.viewState
    }
}

const AppR = connect(mapStateToProps, {})(App)

export default AppR
