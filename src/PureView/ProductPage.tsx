import * as React from 'react'
import {getProductLinkUrl, SingleProductView} from "./SingleProduct";
import {IProductPage, Product} from "../State";
import {WebData} from "../server/remote-data";
import {RemoteDataView} from "./RemoteDataView";
import * as R from 'ramda'


export function ProductPage(props: {productModel: IProductPage}){
   const {productModel} = props
   return(
       <div>
           <div style={{marginBottom: '36px'}}>
               <div className="title">Featured</div>
               {RemoteDataView(productModel.featuredProduct, SingleProductView)}
           </div>
           < RecommendationsPanel products={productModel.recommendedProducts}  />
       </div>
   )
}

export function RecommendationsPanel(props: {products: WebData<Array<Product>>}): JSX.Element {
    console.log('PRODUCT: ', props.products)
    return(
        <div>
            <div className="title">Recommended</div>
            {RemoteDataView(props.products, RecommendationsList)}
        </div>
    )
}


const NUM_RECOMMENDATIONS_TO_DISPLAY = 8

export function RecommendationsList(products: Array<any>): JSX.Element {
    console.log(products)
    if(R.has('errors')(products) || R.type(products) != 'Array'){
        return (<div>No recommended results</div>)
    }else{
        const showProducts = products.slice(0, NUM_RECOMMENDATIONS_TO_DISPLAY)
        console.log(showProducts)
        return(
            <div className={'columns'}>
                {showProducts.map((item, i) => RecommendedProduct(item, i))}
            </div>
        )
    }
}

function RecommendedProduct(item: Product, key: number): JSX.Element{
    return(
            <a key={key} href={getProductLinkUrl(item)} className={'card column'}>
                <div className={'level'}>
                    <img src={item.thumbnailImage} />
                </div>
                <div className={'level'}>{item.name}</div>
            </a>
    )
}
