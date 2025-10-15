import React from 'react'
import ProductCard from '../../components/productCard/ProductCard'
import { $host } from '../../http/handlerApi'
import { useEffect } from 'react'
import { useState } from 'react'
import type { ProductApiItem, ProductBaseProps } from '../../types/products.type'

const Lastest:React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [products, setProducts] = useState<ProductApiItem[]>([])

  useEffect(() => {
    const loadData = async ():Promise<void> => {
      setIsLoading(true);
      try {
        const response = await $host.get<ProductApiItem[]>('product/');
        setProducts(response.data); 
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        setProducts([]);
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
    <div className="latest">
        <div className="latest__content wrap">
            <h2 className="title title_lg">Latest Arrival</h2>
            <p className="desc desc_lg">Showing our latest arrival on this summer</p>
            <div className="latest__cards">
                {products.map((item:ProductApiItem,index:number)=>(
                    <ProductCard 
                    key={`latest${index}`}
                    id={item.id_products}
                    src={item.image} 
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
