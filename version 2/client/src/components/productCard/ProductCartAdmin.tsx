import React from 'react'
import type { ProductCartAdminProps } from '../../types/products.type'

const ProductCartAdmin:React.FC<ProductCartAdminProps> = ({src, title, price, size, reviews, stars, tags, id, edit, deleteP}) => {
  return (
        <div className="product__card" onClick={()=> edit(id)}>
            <div className="tag">
                {tags.map((item: string)=>(
                    item == "SALE" ? <div className="tag_sale" key={item}>SALE</div> : <div className="tag_hot" key={item}>{item}</div>
                ))}
            </div>
            <img src={'http://localhost:3001/products/' + src} alt="product"></img>
            <div className="product-card__reviews">
                <div className="product-card__stars">
                    {Array.from({ length: 5 }, (_, index: number) => (
                        <img 
                        key={index}
                        src={index < stars ? "/product/star_t.svg" : "/product/star_f.svg"}
                        alt={`${index < stars ? 'active' : 'inactive'} star`}
                        />
                    ))}
                </div>
                <p className="desc desc_md">{reviews} Reviews</p>
            </div>
            <h3 className="title title_md">{title}</h3>
            <div className="product-card__size-price">
                <p className="price">${price}</p>
                <div className="product__size">
                    {size.map((item: string)=><p className="size desc desc_md" key={item}>{item}</p>)}
                </div>
            </div>
            <button onClick={
                (e:React.MouseEvent)=> {
                e.stopPropagation() 
                deleteP(id) }
                } 
                style={{background: "red", color: "#fff"}
                }>
                    Удалить
                </button>
        </div>
  )
}

export default ProductCartAdmin
