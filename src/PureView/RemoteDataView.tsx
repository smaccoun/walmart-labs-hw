import {RemoteDataC, WebData} from "../server/remote-data";
import * as React from 'react'


export function RemoteDataView(result: WebData<any>, successView: (r: any) => JSX.Element){
    switch(result.type){
        case RemoteDataC.NOT_ASKED:
            return (<div></div>)
        case RemoteDataC.LOADING:
            return (<div>Loading...</div>)
        case RemoteDataC.FAILURE:
            return (<div>{result.error}</div>)
        case RemoteDataC.SUCCESS:
            return <div>{successView(result.data)}</div>
    }
}