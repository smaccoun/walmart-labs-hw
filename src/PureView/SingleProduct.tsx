import * as React from 'react'
import {Product} from "../State";


export function SingleProductView(props: Product): JSX.Element {
    console.log('PRODUCT: ', props)
    return(
        <div className="card">
            {props.name}
            <img src={props.thumbnailImage} />
        </div>
        )
}