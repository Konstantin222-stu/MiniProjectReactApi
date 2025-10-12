import React from 'react'
import ProductCard from '../../components/productCard/ProductCard'

const Lastest = () => {
    const data = [
        {
            src: "product/product.jpg",
            title: "Ladies yellow top",
            price: "$25",
            size: ["L", "S", "XL"],
            reviews: 4,
            stars: 5,
            tags: ["TOP", "SALE"]
        },
         {
            src: "product/product.jpg",
            title: "Ladies yellow top",
            price: "$25",
            size: ["L", "S", "XL"],
            reviews: 4,
            stars: 1,
            tags: ["TOP", "SALE"]
        },
         {
            src: "product/product.jpg",
            title: "Ladies yellow top",
            price: "$25",
            size: ["L", "S", "XL"],
            reviews: 4,
            stars: 5,
            tags: ["TOP", "SALE"]
        },
         {
            src: "product/product.jpg",
            title: "Ladies yellow top",
            price: "$25",
            size: ["L", "S", "XL"],
            reviews: 4,
            stars: 5,
            tags: ["TOP", "SALE"]
        },
         {
            src: "product/product.jpg",
            title: "Ladies yellow top",
            price: "$250",
            size: ["L", "S", "XL"],
            reviews: 4,
            stars: 5,
            tags: ["TOPE", "SALE"]
        },
         {
            src: "product/product.jpg",
            title: "Ladies yellow top",
            price: "$25",
            size: ["L", "S", "XL"],
            reviews: 4,
            stars: 5,
            tags: ["TOP", "SALE"]
        },

    ]
  return (
    <div className="latest">
        <div className="latest__content wrap">
            <h2 className="title title_lg">Latest Arrival</h2>
            <p className="desc desc_lg">Showing our latest arrival on this summer</p>
            <div className="latest__cards">
                {data.map((item)=>(
                    <ProductCard 
                    src={item.src} 
                    title={item.title} 
                    price={item.price}
                    size={item.size}
                    reviews={item.reviews}
                    stars={item.stars}
                    tags={item.tags} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default Lastest
