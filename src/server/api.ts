import {defaultGetRequestHttp, remoteFetch} from "./request";

const BASE_URL = new URL('http://api.walmartlabs.com/v1')

export function getUrl(endpoint: string): URL {
    return new URL(endpoint, BASE_URL)
}


export function fetchItems(){
    const url = getUrl('items')
    return remoteFetch(url.toString(), defaultGetRequestHttp())
}