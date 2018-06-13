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

export function remoteRequest<a>(url: string, requestHttpInfo: REQUEST_HTTP): IRemoteFuture<any> {
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

export function remoteFetch<a>(url: string, requestHttpInfo: REQUEST_HTTP): () => WebData<a> {
    let value: WebData<any> = {type: RemoteDataC.LOADING}
    const set = (r: WebData<any>) => {
        value = r
        console.log('WORD: ', value)
        return value
    }

    const getValue = () => {
        console.log('VALUE! ', value)
        return value
    }

    remoteRequest(url, requestHttpInfo).fork(set)

    return getValue 
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
        const errorResponse: HttpResponse = {url, status: {code: status, message: STATUS_ERROR_MSG_MAP[status]}}
        const error: RemoteError = {type: RemoteErrorC.BAD_STATUS, response: errorResponse}
        callback({type: RemoteDataC.FAILURE, error})
    }
}

const STATUS_ERROR_MSG_MAP = 
  {404: 'Invalid URL'
  ,500: 'Something went wrong'
  }