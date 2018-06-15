import * as React from 'react'
import {Product} from "../State";


export function SingleProductView(item: Product): JSX.Element {
    const linkUrl = "product/" + item.itemId.toString()
    return (
        <div className={'level columns'}>
            <div className={'level-item column'} style={{maxWidth: '100px'}}>
                <img src={item.thumbnailImage} />
            </div>
            <div className={'column columns is-mobile'}>
                <div className={'column'}>
                    <a href={linkUrl}>{item.name} className={'level-item'}</a>
                    <div>{`${item.shortDescription.slice(0, 100)}...`}</div>
                </div>
                <div style={{padding: '16px 0px 0px 24px'}} className={'column has-text-dark has-text-weight-bold'} >
                    {`\$${item.salePrice.toString()}`}
                </div>

            </div>
        </div>
    )
}