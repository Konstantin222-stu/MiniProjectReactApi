import React from 'react'
import { useParams } from 'react-router-dom';

const Product = () => {
    const { id } = useParams();
  return (
    <div class="product-info">
        <div class="product-info__content wrap">
            <div class="product-info__img">
                <img src="product/product.jpg" alt="product"></img>
                <div class="tag">
                    <div class="tag_sale">TOP</div>
                    <div class="tag_hot">SALE</div>
                </div>
            </div>
            <div class="product-info__desc">
                <h1 class="title title_lg"> Ladies yellow top</h1>
                 <div class="product-card__reviews">
                    <div class="product-card__stars">
                        <img src="star_t.svg" alt="star_true"></img>
                        <img src="star_t.svg" alt="star_true"></img>
                        <img src="star_t.svg" alt="star_true"></img>
                        <img src="star_t.svg" alt="star_true"></img>
                        <img src="star_t.svg" alt="star_true"></img>
                    </div>
                    <p class="desc desc_md">4 Reviews</p>
                </div>
                <p class="desc desc_big">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequa uis aute irure dolor</p>
                <div class="product-card__size-price">
                <p class="price">$25</p>
                <div class="product__size">
                    <p class="size desc desc_md">L</p>
                    <p class="size desc desc_md">S</p>
                    <p class="size desc desc_md">XL</p>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Product
