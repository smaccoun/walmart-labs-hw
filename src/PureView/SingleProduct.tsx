import * as React from 'react'
import {Product} from "../State";

interface IProps {
    product: Product
}

export function SingleProductView(props: IProps): JSX.Element {
    console.log('PRODUCT: ', props.product)
    return(
        <div className="card">
            PRODUCT PAGE: {props.product.itemId}
        </div>
        )
}