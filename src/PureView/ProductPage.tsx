import * as React from 'react'
import {SingleProductView} from "./SingleProduct";
import {IProductPage, Product} from "../State";
import {WebData} from "../server/remote-data";
import {RemoteDataView} from "./RemoteDataView";


export function ProductPage(props: {productModel: IProductPage}){
   const {productModel} = props
   return(
       <div>
           <div>
               <div className="title">Featured</div>
               <SingleProductView product={productModel.featuredProduct}/>
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

export function RecommendationsList(products: Array<Product>): JSX.Element {
    const showProducts = products.slice(0, NUM_RECOMMENDATIONS_TO_DISPLAY)
    console.log(showProducts)
    return(
        <div className={'columns'}>
            {showProducts.map((p, i) => {
                return <div key={i} className={'column'}>{p.name}</div>
            })}
        </div>
    )
}
