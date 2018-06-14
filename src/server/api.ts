import {defaultGetRequestHttp, remoteRequest} from "./request";

const BASE_URL = new URL('https://jsonplaceholder.typicode.com')

export function getUrl(endpoint: string): URL {
    return new URL(endpoint, BASE_URL)
}


export function fetchItems(term: string | null){
    const itemNumber = term ? term : ''
    console.log(itemNumber)
    const url = getUrl('posts/')
    return remoteRequest(url.toString(), defaultGetRequestHttp())
}

export function fetchRecommended(product: any){
    const url = getUrl('posts')
    return remoteRequest(url.toString(), defaultGetRequestHttp())
}