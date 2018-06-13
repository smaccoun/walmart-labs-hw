import {HttpResponse, RemoteDataC, RemoteError, RemoteErrorC, WebData} from "./remote-data";

export interface Get_HTTP {
    method: string
    headers: any
}

export interface Mutate_HTTP {
    method: string
    headers: any
    body: any
}

export type REQUEST_HTTP = Get_HTTP | Mutate_HTTP

export const defaultGetRequestHttp = (): Get_HTTP => (
    {
        method: 'GET',
        headers: GET_HEADER()
    }
)

const GET_HEADER = () => {
    return {
        'Accept': 'application/json',
    }
}

interface IRemoteFuture<a> {
    fork: (onStateChange: ((s: WebData<a>) => void)) => Promise<string>
}

export function remoteRequestEffect<a>(url: string, requestHttpInfo: REQUEST_HTTP): IRemoteFuture<any> {
    let resultState: WebData<any> = {type: RemoteDataC.NOT_ASKED}

    function fork(onStateChange: ((s: WebData<a>) => void)): Promise<string>{
        function setResultState(newState: WebData<any>): WebData<any>{
            resultState = newState
            onStateChange(resultState)
            return resultState
        }

        setResultState({type: RemoteDataC.LOADING})
        return new Promise((resolve, reject) => {
            fetch(url, requestHttpInfo)
                .then(response => {
                    mapHttpStatuses(url, response, onStateChange)
                    resolve('success')
                })
                .catch(error => {
                    const remoteError: WebData<RemoteError> =  
                            { type: RemoteDataC.FAILURE 
                            , error: {type: RemoteErrorC.NETWORK_ERROR} 
                            }
                    setResultState(remoteError)
                    resolve('failure')
                })
        })

    }

    return {fork} 

}

export function remoteRequest<a>(url: string, requestHttpInfo: REQUEST_HTTP): Promise<WebData<any>> {
        return new Promise((resolve, reject) => {
            fetch(url, requestHttpInfo)
                .then(response => {
                    const {status} = response
                    if (status == 200) {
                        response.json()
                            .then(body => {
                                resolve({type: RemoteDataC.SUCCESS, data: body})
                            })
                    }else{
                        const error: RemoteError = mapRemoteError(url, status)
                        resolve(webDataError(error))
                    }
                })
                .catch(error => {
                    resolve(webDataError({type: RemoteErrorC.NETWORK_ERROR}))
                })
        })

}

export interface IRequestState<a> {
    getValue : () => WebData<a>;
    set: (r: WebData<a>) => WebData<a>
}

export function requestState(): IRequestState<any> {
    let value: WebData<any> = {type: RemoteDataC.NOT_ASKED}
    function set(r: WebData<any>){
        value = r
        console.log('VALUE! ', value)
        return value
    }


    function getValue() {
        return value
    }

    return {getValue, set}
}

function mapHttpStatuses<a>(url: string, response: Response, callback: ((w: WebData<any>) => any)): void {
    const {status} = response
    if (status == 200) {
        response.json()
            .then(body => {
                callback({type: RemoteDataC.SUCCESS, data: body})
            })
    }
    else {
        const error: RemoteError = mapRemoteError(url, status)
        callback(webDataError(error))
    }
}

function webDataError(error: RemoteError): WebData<any> {
    return {type: RemoteDataC.FAILURE, error}
}

function mapRemoteError(url: string, status: number): RemoteError {
    const lookupMessage: string | undefined = STATUS_ERROR_MSG_MAP.get(status)
    const message = lookupMessage ? lookupMessage : 'invalid status code'
    const errorResponse: HttpResponse = {url, status: {code: status, message}}
    const error: RemoteError = {type: RemoteErrorC.BAD_STATUS, response: errorResponse}
    return error
}

const STATUS_ERROR_MSG_MAP: Map<number, string> =
    new Map(
        [[404, 'Invalid URL']
            ,[500, 'Something went wrong']
        ]
    )

