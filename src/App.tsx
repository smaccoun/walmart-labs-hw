import * as React from 'react';
import './App.css';
import {IAppState, ViewState, ViewStateC} from "./State";
import {connect} from "react-redux";

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
        case ViewStateC.PRODUCT_PAGE:
            return (<div>This is a product page</div>)
        case ViewStateC.SEARCH_PAGE:
            return (<div>SEARCH PAGE! </div>)
    }
}

const mapStateToProps = (state: IAppState): IProps => {
    return {
        viewState: state.viewState
    }
}

const AppR = connect(mapStateToProps, {})(App)

export default AppR
