import {RemoteDataC, WebData} from "../server/remote-data";
import * as React from 'react'
import {RingLoader} from "react-spinners";


export function RemoteDataView(result: WebData<any>, successView: (r: any) => JSX.Element){
    console.log('REMOTE RESULT! ', result)
    switch(result.type){
        case RemoteDataC.NOT_ASKED:
            return (<div></div>)
        case RemoteDataC.LOADING:
            return (
                <div>
                    <RingLoader
                        color={'#123abc'}
                        loading={true}
                    />
                </div>
            )
        case RemoteDataC.FAILURE:
            return (<div>{result.error.type}</div>)
        case RemoteDataC.SUCCESS:
            return <div>{successView(result.data)}</div>
    }
}