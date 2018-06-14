import * as React from 'react'

interface IProps {
    product: any
}

export function SingleProductView(props: IProps): JSX.Element {
    console.log('PRODUCT: ', props.product)
    return(
        <div className="card">
            PRODUCT PAGE: {props.product}
        </div>
        )
}