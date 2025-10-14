import React, { useEffect, useState } from 'react'
import { $authHost } from '../../http/handlerApi';
import Modal from '../../components/modal/Modal';
import PromotionAdminCard from '../../components/promotionAdmin/PromotionAdminCard';

const PromotionAdmin = () => {
    const [loading, setLoading] = useState(false);
    const [promotion, setPromotion] = useState([]);
    const [formData, setFormData] = useState({
        title: '', subdesc: '', desc: '', price: '', sale: '', link: '', time: ''
      });
    const [image, setImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPromotion, setEditingPromotion] = useState(null);
    const [editFormData, setEditFormData] = useState({
        title: '', subdesc: '', desc: '', price: '',
        sale: '', link: '', time: ''
    });
    const [editImage, setEditImage] = useState(null);

    useEffect(() => {
        loadData();
    }, []);


    const loadData = async () => {
        setLoading(true);
        try {
            const response = await $authHost.get('promotions/');
            setPromotion(response.data);
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

            await $authHost.post('promotions/', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            setFormData({ 
                title: '', subdesc: '', desc: '', price: '', sale: '', link: '', time: '' 
            });
            setImage(null);
            loadData(); 
        } catch (error) {
            console.error('Ошибка добавления:', error);
        } finally {
            setLoading(false);
        }
    };

    const editPromotion = (id) => {
        const promotionToEdit = promotion.find( promotion => promotion.id_promotion === id);
        if (promotionToEdit) {
            setEditingPromotion(promotionToEdit);
            setEditFormData({
                title: promotionToEdit.title || '',
                subdesc: promotionToEdit.subdesc || '',
                desc: promotionToEdit.desc || '',
                price: promotionToEdit.price?.toString() || '0',
                sale: promotionToEdit.sale?.toString() || '0', 
                link: promotionToEdit.link|| '',
                time: promotionToEdit.time|| '',
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

            await $authHost.put(`promotions/${editingPromotion.id_promotion}`, formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            setIsModalOpen(false);
            setEditingPromotion(null);
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
        setEditingPromotion(null);
        setEditImage(null);
    }

    if (loading && promotion.length === 0) {
        return <div className="loading">Загрузка...</div>;
    }


  return (
    <div className='wrap'>
            <h1 className="title title_lg">Акция</h1>
            <button 
                onClick={loadData}
                className='button'
                disabled={loading}
            >
                {loading ? 'Загрузка...' : 'Обновить'}
            </button>

            <div>
                <h2>Акция</h2>
                <div style={{ border: '1px solid #ddd', padding: '15px', margin: '10px 0', display: "flex", flexWrap: "wrap" }}>
                    {promotion.map((item, index) => (
                        <PromotionAdminCard 
                            subdesc={item.subdesc} 
                            src={item.image} 
                            title={item.title}
                            desc={item.desc}
                            price={item.price}
                            sale={item.sale}
                            link={item.link}
                            time={item.timeLeft}
                            id={item.id_promotion} 
                            edit={editPromotion}
                        />
                    ))}

                    {isModalOpen && editingPromotion && (
                        <Modal onClose={closeModal}>
                            <form onSubmit={handleEdit} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc' }}>
                                <h3>Изменить акцию</h3>
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
                                    placeholder="Надзаголовок"
                                    value={editFormData.subdesc}
                                    onChange={(e) => setEditFormData({...editFormData, subdesc: e.target.value})}
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
                                    type="number"
                                    placeholder="Цена со скидкой"
                                    value={editFormData.sale}
                                    onChange={(e) => setEditFormData({...editFormData, sale: e.target.value})}
                                    style={{ margin: '5px', padding: '5px' }}
                                />
                                <input
                                    type="text"
                                    placeholder="Ссылка на товар"
                                    value={editFormData.link}
                                    onChange={(e) => setEditFormData({...editFormData, link: e.target.value})}
                                    required
                                    style={{ margin: '5px', padding: '5px' }}
                                />
                                <input
                                    type="text"
                                    placeholder="2025-10-13 14:30:00"
                                    value={editFormData.time}
                                    onChange={(e) => setEditFormData({...editFormData, time: e.target.value})}
                                    required
                                    style={{ margin: '5px', padding: '5px' }}
                                />
                                <input
                                    type="file"
                                    onChange={(e) => setEditImage(e.target.files[0])}
                                    style={{ margin: '5px' }}
                                />
                                <button type="submit" disabled={loading}>
                                    {loading ? 'Обновление...' : 'Обновить акцию'}
                                </button>
                            </form>
                        </Modal>
                    )}
                </div>
            </div>
        </div>
  )
}

export default PromotionAdmin

