import React, { useEffect, useState } from 'react'
import { $authHost } from '../../http/handlerApi';
import ProductCardAdmin from '../../components/productCard/ProductCartAdmin';
import Modal from '../../components/modal/Modal';

const ProductAdmin = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        title: '', price: '', category: '', desc: '',
        size: '[]', tags: '[]', reviews: '0', stars: '0'
    });
    const [image, setImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [editingProduct, setEditingProduct] = useState(null);
    const [editFormData, setEditFormData] = useState({
        title: '', price: '', category: '', desc: '',
        reviews: '0', stars: '0'
    });
    const [editImage, setEditImage] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const response = await $authHost.get('product/');
            setProducts(response.data);
        } catch (error) {
            console.error('Ошибка загрузки:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                formDataToSend.append(key, formData[key]);
            });
            if (image) formDataToSend.append('image', image);

            await $authHost.post('product/', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            setFormData({ 
                title: '', price: '', category: '', desc: '', 
                size: '[]', tags: '[]', reviews: '0', stars: '0' 
            });
            setImage(null);
            loadData(); 
        } catch (error) {
            console.error('Ошибка добавления:', error);
        } finally {
            setLoading(false);
        }
    };

    const editProduct = (id) => {
        const productToEdit = products.find(product => product.id_products === id);
        if (productToEdit) {
            setEditingProduct(productToEdit);
            setEditFormData({
                title: productToEdit.title || '',
                price: productToEdit.price || '',
                category: productToEdit.category || '',
                desc: productToEdit.desc || '',
                reviews: productToEdit.reviews?.toString() || '0',
                stars: productToEdit.stars?.toString() || '0'
            });
            setIsModalOpen(true);
        }
    }

    const handleEdit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formDataToSend = new FormData();
            
            Object.keys(editFormData).forEach(key => {
                formDataToSend.append(key, editFormData[key]);
            });
            
            if (editImage) {
                formDataToSend.append('image', editImage);
            }

            await $authHost.put(`product/${editingProduct.id_products}`, formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            setIsModalOpen(false);
            setEditingProduct(null);
            setEditImage(null);
            loadData();
        } catch (error) {
            console.error('Ошибка обновления:', error);
        } finally {
            setLoading(false);
        }
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
        setEditImage(null);
    }

    const deleteProduct = async(id) =>{
      if (window.confirm('Удалить товар?')) {
            try {
              await $authHost.delete(`product/${id}`);
              loadData();
            } catch (error) {
              console.error('Ошибка удаления:', error);
            }
      }
    }

    if (loading && products.length === 0) {
        return <div className="loading">Загрузка...</div>;
    }

    return (
        <div className='wrap'>
            <h1 className="title title_lg">Продукты</h1>
            <button 
                onClick={loadData}
                className='button'
                disabled={loading}
            >
                {loading ? 'Загрузка...' : 'Обновить'}
            </button>

            <div>
                <h2>Товары</h2>
                <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc' }}>
                    <h3>Добавить товар</h3>
                    <input
                        type="text"
                        placeholder="Название"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        required
                        style={{ margin: '5px', padding: '5px' }}
                    />
                    <input
                        type="text"
                        placeholder="Описание"
                        value={formData.desc}
                        onChange={(e) => setFormData({...formData, desc: e.target.value})}
                        required
                        style={{ margin: '5px', padding: '5px' }}
                    />
                    <input
                        type="number"
                        placeholder="Цена"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        style={{ margin: '5px', padding: '5px' }}
                    />
                    <input
                        type="text"
                        placeholder="Категория"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        style={{ margin: '5px', padding: '5px' }}
                    />
                    <input
                        type="number"
                        placeholder="Кол-во отзывов"
                        value={formData.reviews}
                        onChange={(e) => setFormData({...formData, reviews: e.target.value})}
                        style={{ margin: '5px', padding: '5px' }}
                    />
                    <input
                        type="number"
                        placeholder="Кол-во звезд"
                        value={formData.stars}
                        onChange={(e) => setFormData({...formData, stars: e.target.value})}
                        style={{ margin: '5px', padding: '5px' }}
                    />
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        style={{ margin: '5px' }}
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Добавление...' : 'Добавить товар'}
                    </button>
                </form>
              
                <div style={{ border: '1px solid #ddd', padding: '15px', margin: '10px 0', display: "flex", flexWrap: "wrap" }}>
                    {products.map((item, index) => (
                        <ProductCardAdmin
                            key={`productMain${item.id_products}`} 
                            id={item.id_products}
                            src={item.image} 
                            title={item.title} 
                            price={item.price}
                            size={item.size}
                            reviews={item.reviews}
                            stars={item.stars}
                            tags={item.tags}
                            edit={editProduct}
                            deleteP={deleteProduct}
                        />
                    ))}

                    {isModalOpen && editingProduct && (
                        <Modal onClose={closeModal}>
                            <form onSubmit={handleEdit} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc' }}>
                                <h3>Изменить товар</h3>
                                <input
                                    type="text"
                                    placeholder="Название"
                                    value={editFormData.title}
                                    onChange={(e) => setEditFormData({...editFormData, title: e.target.value})}
                                    required
                                    style={{ margin: '5px', padding: '5px' }}
                                />
                                <input
                                    type="text"
                                    placeholder="Описание"
                                    value={editFormData.desc}
                                    onChange={(e) => setEditFormData({...editFormData, desc: e.target.value})}
                                    required
                                    style={{ margin: '5px', padding: '5px' }}
                                />
                                <input
                                    type="number"
                                    placeholder="Цена"
                                    value={editFormData.price}
                                    onChange={(e) => setEditFormData({...editFormData, price: e.target.value})}
                                    style={{ margin: '5px', padding: '5px' }}
                                />
                                <input
                                    type="text"
                                    placeholder="Категория"
                                    value={editFormData.category}
                                    onChange={(e) => setEditFormData({...editFormData, category: e.target.value})}
                                    style={{ margin: '5px', padding: '5px' }}
                                />
                                <input
                                    type="number"
                                    placeholder="Кол-во отзывов"
                                    value={editFormData.reviews}
                                    onChange={(e) => setEditFormData({...editFormData, reviews: e.target.value})}
                                    style={{ margin: '5px', padding: '5px' }}
                                />
                                <input
                                    type="number"
                                    placeholder="Кол-во звезд"
                                    value={editFormData.stars}
                                    onChange={(e) => setEditFormData({...editFormData, stars: e.target.value})}
                                    style={{ margin: '5px', padding: '5px' }}
                                />
                                <input
                                    type="file"
                                    onChange={(e) => setEditImage(e.target.files[0])}
                                    style={{ margin: '5px' }}
                                />
                                <button type="submit" disabled={loading}>
                                    {loading ? 'Обновление...' : 'Обновить товар'}
                                </button>
                            </form>
                        </Modal>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductAdmin