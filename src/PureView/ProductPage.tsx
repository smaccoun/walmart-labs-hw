import * as React from 'react'
import {SingleProductView} from "./SingleProduct";
import {IProductPage, Product} from "../State";


export function ProductPage(props: {productModel: IProductPage}){
   const {productModel} = props
   return(
       <div>
           <div>
               <div className="title">Featured</div>
               <SingleProductView product={productModel.featuredProduct}/>
           </div>
           < RecommendationsView products={productModel.recommendedProducts}  />
       </div>
   )
}

export function RecommendationsView(props: {products: Array<Product>}): JSX.Element {
    console.log('PRODUCT: ', props.products)
    return(
        <div>
            <div className="title">Recommended</div>
            {props.products.map(p => {
                return <SingleProductView product={p}/>
            })}
        </div>
    )
}