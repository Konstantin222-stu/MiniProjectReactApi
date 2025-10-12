import React from 'react'

const ProductCard = ({src, title, price, size, reviews, stars, tags}) => {
  return (
    <div className="product__card">
        
        <div className="tag">
            {tags.map((item)=>(
                item == "SALE" ? <div className="tag_sale">SALE</div> : <div className="tag_hot">{item}</div>
            ))}
        </div>
        <img src={src} alt="product"></img>
        <div className="product-card__reviews">
            <div className="product-card__stars">
                {Array.from({ length: 5 }, (_, index) => (
                    <img 
                    key={index}
                    src={index < stars ? "product/star_t.svg" : "product/star_f.svg"}
                    alt={`${index < stars ? 'active' : 'inactive'} star`}
                    />
                ))}
            </div>
            <p className="desc desc_md">{reviews} Reviews</p>
        </div>
        <h3 className="title title_md">{title}</h3>
        <div className="product-card__size-price">
            <p className="price">{price}</p>
            <div className="product__size">
                {size.map((item)=><p className="size desc desc_md">{item}</p>)}
            </div>
        </div>
    </div>
  )
}

export default ProductCard
