import * as React from 'react'
import {SingleProductView} from "./SingleProduct";

interface IPageProps {
    featuredProduct: any,
    recommendedProducts: any
}

export function ProductPage(props: IPageProps){
   return(
       <div>
           <div>
               <div className="title">Featured</div>
               <SingleProductView product={props.featuredProduct}/>
           </div>
           < RecommendationsView products={props.recommendedProducts}  />
       </div>
   )
}

interface IRecommendationProps {
    products: Array<any>
}

export function RecommendationsView(props: IRecommendationProps): JSX.Element {
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