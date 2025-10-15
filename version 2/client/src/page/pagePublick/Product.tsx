import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { $host } from '../../http/handlerApi';

const Product = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [product, setProduct] = useState([])

    useEffect(() => {
        const loadData = async () => {
        setIsLoading(true);
        try {
            const response = await $host(`product/${id}`);
            setProduct(response.data); 
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
            setProduct([]);
        } finally {
            setIsLoading(false);
        }
        };

    loadData();
    }, []);

    if (isLoading) {
        return <div className="loading">Загрузка...</div>;
    }

  return (
    <div class="product-info">
        <div class="product-info__content wrap">
            <div class="product-info__img">
                <img src={product.image} alt="product"></img>
                <div class="tag">
                    {product.tags.map((item)=>( item == "SALE" ? <div className="tag_sale" key={item}>SALE</div> : <div className="tag_hot" key={item}>{item}</div>))}
                </div>
            </div>
            <div class="product-info__desc">
                <h1 class="title title_lg">{product.title}</h1>
                 <div class="product-card__reviews">
                    <div class="product-card__stars">
                        {Array.from({ length: 5 }, (_, index) => (
                            <img 
                            key={index}
                            src={index < product.stars ? "/product/star_t.svg" : "/product/star_f.svg"}
                            alt={`${index < product.stars ? 'active' : 'inactive'} star`}
                            />
                        ))}
                    </div>
                    <p class="desc desc_md">{product.reviews} Reviews</p>
                </div>
                <p class="desc desc_big">{product.desc}</p>
                <div class="product-card__size-price">
                <p class="price">${product.price}</p>
                <div class="product__size">
                    {product.size.map((item)=><p className="size desc desc_md" key={item}>{item}</p>)}
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Product
