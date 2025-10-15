import ProductCard from '../../components/productCard/ProductCard'
import { useEffect, useState } from 'react'
import { $host } from '../../http/handlerApi'
import type { ProductApiItem } from '../../types/products.type'

const ProductsMain: React.FC = () => {
    const [category, setCategory] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [products, setProducts] = useState<ProductApiItem[]>([])

    useEffect(() => {
        const loadData = async (): Promise<void> => {
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
    

    const choiseCategory = (e: React.MouseEvent<HTMLAnchorElement>): void => {
        e.preventDefault()
        const target = e.target as HTMLAnchorElement
        setCategory(target.textContent || "" )
    }

    const filteredProducts = category 
        ? products.filter(item => item.category === category)
        : products
    
  return (
    <div className="product">
        <div className="product__content wrap">
            <h2 className="title title_lg">Featured Product</h2>
            <span>
                <p className="desc desc_lg">Showing our latest arrival on this summer</p>
                <div className="product__categoris">
                    <a onClick={choiseCategory} href="#" className="product__category">Men</a>
                    <a onClick={choiseCategory} href="#"  className="product__category">Women</a>
                    <a onClick={choiseCategory} href="#"  className="product__category">Kids</a>
                    <a onClick={choiseCategory} href="#"  className="product__category">Accessories</a>
                </div>
            </span>
            <div className="product__cards">
                {filteredProducts.map((item: ProductApiItem, index: number) => (
                    <ProductCard 
                        key={`productMain${index}`}
                        id={item.id_products}
                        src={item.image} 
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
