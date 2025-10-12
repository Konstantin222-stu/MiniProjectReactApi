import React, { useState } from 'react'
import ProductCard from '../../components/productCard/ProductCard'

const ProductsMain = () => {
    const [category, setCategory] = useState()
        const data = [
        {
            src: "product/product.jpg",
            title: "Ladies yellow top",
            price: "$25",
            size: ["L", "S", "XL"],
            reviews: 4,
            stars: 5,
            tags: ["TOP", "SALE"],
            category: "Men"
        },
         {
            src: "product/product.jpg",
            title: "Ladies yellow top",
            price: "$25",
            size: ["L", "S", "XL"],
            reviews: 4,
            stars: 1,
            tags: ["TOP", "SALE"],
            category: "Men"
        },
         {
            src: "product/product.jpg",
            title: "Ladies yellow top",
            price: "$25",
            size: ["L", "S", "XL"],
            reviews: 4,
            stars: 5,
            tags: ["TOP", "SALE"],
            category: "Women"
        },
         {
            src: "product/product.jpg",
            title: "Ladies yellow top",
            price: "$25",
            size: ["L", "S", "XL"],
            reviews: 4,
            stars: 5,
            tags: ["TOP", "SALE"],
            category: "Kids"
        },
         {
            src: "product/product.jpg",
            title: "Ladies yellow top",
            price: "$250",
            size: ["L", "S", "XL"],
            reviews: 4,
            stars: 5,
            tags: ["TOPE", "SALE"],
            category: "Accessories"
        },
         {
            src: "product/product.jpg",
            title: "Ladies yellow top",
            price: "$25",
            size: ["L", "S", "XL"],
            reviews: 4,
            stars: 5,
            tags: ["TOP", "SALE"],
            category: "Accessories"
        },

    ]

    const choiseCategory = (e) => {
        e.preventDefault()
        setCategory(e.target.text)
    }
    
  return (
    <div class="product">
        <div class="product__content wrap">
            <h2 class="title title_lg">Featured Product</h2>
            <span>
                <p class="desc desc_lg">Showing our latest arrival on this summer</p>
                <div class="product__categoris">
                    <a onClick={choiseCategory} href="#" class="product__category">Men</a>
                    <a onClick={choiseCategory} href="#"  class="product__category">Women</a>
                    <a onClick={choiseCategory} href="#"  class="product__category">Kids</a>
                    <a onClick={choiseCategory} href="#"  class="product__category">Accessories</a>
                </div>
            </span>
            <div class="product__cards">
                {data.map((item)=>(
                    !category || item.category === category) && (
                    <ProductCard 
                    src={item.src} 
                    title={item.title} 
                    price={item.price}
                    size={item.size}
                    reviews={item.reviews}
                    stars={item.stars}
                    tags={item.tags}
                    />
                ))}
            </div>
        </div>
    </div>
  )
}

export default ProductsMain
