import React, { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { $authHost } from '../../http/handlerApi';
import ProductCardAdmin from '../../components/productCard/ProductCartAdmin';
import Modal from '../../components/modal/Modal';
import type { EditProductFormData, ProductApiItem, ProductFormData } from '../../types/products.type';

const ProductAdmin: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<ProductApiItem[]>([]);
    const [formData, setFormData] = useState<ProductFormData>({
        title: '', price: '', category: '', desc: '',
        size: '[]', tags: '[]', reviews: '0', stars: '0'
    });
    const [image, setImage] = useState<File | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingProduct, setEditingProduct] = useState<ProductApiItem | null>(null);
    const [editFormData, setEditFormData] = useState<EditProductFormData>({
        title: '', price: '', category: '', desc: '',
        reviews: '0', stars: '0'
    });
    const [editImage, setEditImage] = useState<File | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async ():Promise<void> => {
        setLoading(true);
        try {
            const response = await $authHost.get<ProductApiItem[]>('product/');
            setProducts(response.data);
        } catch (error) {
            console.error('Ошибка загрузки:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                formDataToSend.append(key, formData[key as keyof ProductFormData]);
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

    const editProduct = (id: number) => {
        const productToEdit = products.find(product => product.id_products === id);
        if (productToEdit) {
            setEditingProduct(productToEdit);
            setEditFormData({
                title: productToEdit.title || '',
                price: productToEdit.price?.toString() || '',
                category: productToEdit.category || '',
                desc: productToEdit.desc || '',
                reviews: productToEdit.reviews?.toString() || '0',
                stars: productToEdit.stars?.toString() || '0'
            });
            setIsModalOpen(true);
        }
    }

    const handleEdit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (!editingProduct) return;
        
            const formDataToSend = new FormData();
        
            Object.keys(editFormData).forEach(key => {
                formDataToSend.append(key, editFormData[key as keyof EditProductFormData]);
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

    const closeModal = ():void => {
        setIsModalOpen(false);
        setEditingProduct(null);
        setEditImage(null);
    }

    const deleteProduct = async(id:number):Promise<void> =>{
      if (window.confirm('Удалить товар?')) {
            try {
              await $authHost.delete(`product/${id}`);
              loadData();
            } catch (error) {
              console.error('Ошибка удаления:', error);
            }
      }
    }

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>, 
        setter: React.Dispatch<React.SetStateAction<any>>
        ): void => {
        const { name, value } = e.target;
        setter((prev: any) => ({
            ...prev,
            [name]: value
        }));
        };


    const handleFileChange = (
        e: ChangeEvent<HTMLInputElement>,
        setter: React.Dispatch<React.SetStateAction<File | null>>
    ):void =>{
        if(e.target.files && e.target.files[0]){
            setter(e.target.files[0])
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
                        name="title"
                        placeholder="Название"
                        value={formData.title}
                        onChange={(e) => handleInputChange(e, setFormData)}
                        required
                        style={{ margin: '5px', padding: '5px' }}
                    />
                    <input
                        type="text"
                        name="desc"
                        placeholder="Описание"
                        value={formData.desc}
                        onChange={(e) => handleInputChange(e, setFormData)}
                        required
                        style={{ margin: '5px', padding: '5px' }}
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Цена"
                        value={formData.price}
                        onChange={(e) => handleInputChange(e, setFormData)}
                        style={{ margin: '5px', padding: '5px' }}
                    />
                    <input
                        type="text"
                        name="category"
                        placeholder="Категория"
                        value={formData.category}
                        onChange={(e) => handleInputChange(e, setFormData)}
                        style={{ margin: '5px', padding: '5px' }}
                    />
                    <input
                        type="number"
                        name="reviews"
                        placeholder="Кол-во отзывов"
                        value={formData.reviews}
                        onChange={(e) => handleInputChange(e, setFormData)}
                        style={{ margin: '5px', padding: '5px' }}
                    />
                    <input
                        type="number"
                        name="stars"
                        placeholder="Кол-во звезд"
                        value={formData.stars}
                        onChange={(e) => handleInputChange(e, setFormData)}
                        style={{ margin: '5px', padding: '5px' }}
                    />
                    <input
                        type="file"
                        onChange={(e) => handleFileChange(e,setImage)}
                        style={{ margin: '5px' }}
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Добавление...' : 'Добавить товар'}
                    </button>
                </form>
              
                <div style={{ border: '1px solid #ddd', padding: '15px', margin: '10px 0', display: "flex", flexWrap: "wrap" }}>
                    {products.map((item: ProductApiItem) => (
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
                                    name="title"
                                    placeholder="Название"
                                    value={editFormData.title}
                                    onChange={(e) => handleInputChange(e, setEditFormData)}
                                    required
                                    style={{ margin: '5px', padding: '5px' }}
                                />
                                <input
                                    type="text"
                                    name="desc"
                                    placeholder="Описание"
                                    value={editFormData.desc}
                                    onChange={(e) => handleInputChange(e, setEditFormData)}
                                    required
                                    style={{ margin: '5px', padding: '5px' }}
                                />
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Цена"
                                    value={editFormData.price}
                                    onChange={(e) => handleInputChange(e, setEditFormData)}
                                    style={{ margin: '5px', padding: '5px' }}
                                />
                                <input
                                    type="text"
                                    name="category"
                                    placeholder="Категория"
                                    value={editFormData.category}
                                    onChange={(e) => handleInputChange(e, setEditFormData)}
                                    style={{ margin: '5px', padding: '5px' }}
                                />
                                <input
                                    type="number"
                                    name="reviews"
                                    placeholder="Кол-во отзывов"
                                    value={editFormData.reviews}
                                    onChange={(e) => handleInputChange(e, setEditFormData)}
                                    style={{ margin: '5px', padding: '5px' }}
                                />
                                <input
                                    type="number"
                                    name="stars"
                                    placeholder="Кол-во звезд"
                                    value={editFormData.stars}
                                    onChange={(e) => handleInputChange(e, setEditFormData)}
                                    style={{ margin: '5px', padding: '5px' }}
                                />
                                <input
                                    type="file"
                                    onChange={(e) => handleFileChange(e,setEditImage)}
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