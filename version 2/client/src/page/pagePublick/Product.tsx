import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { $host } from '../../http/handlerApi';
import type { ProductApiItem } from '../../types/products.type';

const Product: React.FC = () => {
    const { id } = useParams<{id:string}>();
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [product, setProduct] = useState<ProductApiItem | null>(null);

    useEffect(() => {
        const loadData = async (): Promise<void> => {
            setIsLoading(true);
            try {
                const response = await $host.get<ProductApiItem>(`product/${id}`);
                setProduct(response.data); 
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
                setProduct(null);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            loadData();
        }
    }, [id]);

    if (isLoading) {
        return <div className="loading">Загрузка...</div>;
    }

    if (!product) {
        return <div className="error">Товар не найден</div>;
    }

  return (
    <div className="product-info">
        <div className="product-info__content wrap">
            <div className="product-info__img">
                <img src={'http://localhost:3001/products/' + product.image} alt="product"></img>
                <div className="tag">
                    {product.tags.map((item: string)=>( item == "SALE" ? <div className="tag_sale" key={item}>SALE</div> : <div className="tag_hot" key={item}>{item}</div>))}
                </div>
            </div>
            <div className="product-info__desc">
                <h1 className="title title_lg">{product.title}</h1>
                 <div className="product-card__reviews">
                    <div className="product-card__stars">
                        {Array.from({ length: 5 }, (_, index: number) => (
                            <img 
                            key={index}
                            src={index < product.stars ? "/product/star_t.svg" : "/product/star_f.svg"}
                            alt={`${index < product.stars ? 'active' : 'inactive'} star`}
                            />
                        ))}
                    </div>
                    <p className="desc desc_md">{product.reviews} Reviews</p>
                </div>
                <p className="desc desc_big">{product.desc}</p>
                <div className="product-card__size-price">
                <p className="price">${product.price}</p>
                <div className="product__size">
                    {product.size.map((item: string)=><p className="size desc desc_md" key={item}>{item}</p>)}
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Product
