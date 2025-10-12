import React from 'react'
import { useParams } from 'react-router-dom';

const Product = () => {
    const { id } = useParams();
    const data = [
        {
            src: "/product/product.jpg",
            title: "Ladies yellow top",
            price: "$25",
            size: ["L", "S", "XL"],
            reviews: 4,
            desc:"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequa uis aute irure dolor",
            stars: 5,
            tags: ["TOP", "SALE"],
            category: "Accessories"
        },
    ]
  return (
    <div class="product-info">
        <div class="product-info__content wrap">
            <div class="product-info__img">
                <img src={data[0].src} alt="product"></img>
                <div class="tag">
                    {data[0].tags.map((item)=>( item == "SALE" ? <div className="tag_sale">SALE</div> : <div className="tag_hot">{item}</div>))}
                </div>
            </div>
            <div class="product-info__desc">
                <h1 class="title title_lg">{data[0].title}</h1>
                 <div class="product-card__reviews">
                    <div class="product-card__stars">
                        {Array.from({ length: 5 }, (_, index) => (
                            <img 
                            key={index}
                            src={index < data[0].stars ? "/product/star_t.svg" : "/product/star_f.svg"}
                            alt={`${index < data[0].stars ? 'active' : 'inactive'} star`}
                            />
                        ))}
                    </div>
                    <p class="desc desc_md">{data[0].reviews} Reviews</p>
                </div>
                <p class="desc desc_big">{data[0].desc}</p>
                <div class="product-card__size-price">
                <p class="price">{data[0].price}</p>
                <div class="product__size">
                    {data[0].size.map((item)=><p className="size desc desc_md">{item}</p>)}
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Product
