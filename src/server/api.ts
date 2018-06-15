import {defaultGetRequestHttp, remoteRequest} from "./request";
import {notAsked, WebData} from "./remote-data";
const queryString = require('query-string');

const BASE_URL = new URL('https://api.walmartlabs.com/v1/')
const API_KEY = 'dbdwpck6aeu2yst592ee4buq'

const API_KEY_PARAM = {apiKey: API_KEY}

interface IFetchInfo {
    endpoint: string
    params: null | Object
}

const productUrl = (items: Array<number>): IFetchInfo => {
    if(items.length == 1){
        return {
            endpoint: `items/${items[0]}`,
            params: null
        }
    }else{
        return {
            endpoint: 'items',
            params: {ids: items}
        }
    }

}

const searchUrl = (query: string) => {
    return {
        endpoint: 'search',
        params:  {query}

    }
}

const recommendedUrl = (itemId: number) => {
    return {
        endpoint: 'nbp',
        params:  {itemId}

    }
}



export function getUrl(fetchInfo: IFetchInfo): URL {
    const authedParams = Object.assign(API_KEY_PARAM, fetchInfo.params)
    const params  = queryString.stringify(authedParams)
    const endpoint = `${fetchInfo.endpoint}?${params}`
    return new URL(endpoint, BASE_URL)
}

export function fetchItem(itemId: number){
    const url = getUrl(productUrl([itemId]))
    return remoteRequest(url.toString(), defaultGetRequestHttp)
}

export function fetchSearch(term: string | null): Promise<WebData<any>>{
    if(term == null){
        return Promise.resolve(notAsked)
    }else{
        const url = getUrl(searchUrl(term))
        return remoteRequest(url.toString(), defaultGetRequestHttp)
    }
}

export function fetchRecommended(productId: number){
    const url = getUrl(recommendedUrl(productId))
    return remoteRequest(url.toString(), defaultGetRequestHttp)
}