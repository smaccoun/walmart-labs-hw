import * as React from 'react'
import {Product} from "../State";

interface IProps {
    product: Product
}

export function SingleProductView(props: IProps): JSX.Element {
    console.log('PRODUCT: ', props.product.id)
    return(
        <div className="card">
            PRODUCT PAGE: {props.product.id}
        </div>
        )
}