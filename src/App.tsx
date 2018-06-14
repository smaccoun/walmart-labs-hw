import * as React from 'react';
import './App.css';
import {IAppState, ViewState, ViewStateC} from "./State";
import {connect} from "react-redux";
import {SearchPage} from "./ModelActionView/SearchPage";

import logo from './walmart-logo.jpg'
import {ProductPage} from "./PureView/ProductPage";

interface IProps {
    viewState: ViewState
}

function App(props: IProps): JSX.Element {
    const {viewState} = props

    return (
        <div>
            <header>
                <img style={{width: '200px', height: 'auto'}} src={logo} alt="Logo" />;
            </header>
            {viewPage(viewState)}
        </div>
    )
}

function viewPage(viewState: ViewState): JSX.Element {
    switch(viewState.type){
        case ViewStateC.SEARCH_PAGE:
            return (<SearchPage />)
        case ViewStateC.PRODUCT_PAGE:
            return <ProductPage featuredProduct={viewState.product} recommendedProducts={[3,4,5,6]}/>
    }
}

const mapStateToProps = (state: IAppState): IProps => {
    return {
        viewState: state.viewState
    }
}

const AppR = connect(mapStateToProps, {})(App)

export default AppR
