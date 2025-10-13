import ProductCard from '../../components/productCard/ProductCard'
import { useEffect, useState } from 'react'
import { $host } from '../../http/handlerApi'

const ProductsMain = () => {
    const [category, setCategory] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [products, setProducts] = useState([])

    useEffect(() => {
        const loadData = async () => {
        setIsLoading(true);
        try {
            const response = await $host('product/');
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
    

    const choiseCategory = (e) => {
        e.preventDefault()
        setCategory(e.target.text)
    }
    
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
                {products.map((item,index)=>(
                    !category || item.category === category) && (
                    <ProductCard 
                    key={`productMain${index}`}
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
