import {defaultGetRequestHttp, remoteRequest} from "./request";

const BASE_URL = new URL('https://api.walmartlabs.com/v1/')
const API_KEY = 'apiKey=dbdwpck6aeu2yst592ee4buq'

export function getUrl(endpoint: string): URL {
    return new URL(endpoint, BASE_URL)
}


export function fetchItems(term: string | null){
    const itemNumber = term ? term : ''
    console.log(itemNumber)
    const url = getUrl('search?'+ ('query=' + term)  + '&format=json' + ('&' + API_KEY))
    return remoteRequest(url.toString(), defaultGetRequestHttp)
}

export function fetchRecommended(productId: number){
    const url = getUrl('nbp?' + API_KEY + ('&itemId=' + productId))
    return remoteRequest(url.toString(), defaultGetRequestHttp)
}