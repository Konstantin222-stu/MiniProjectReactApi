import React from 'react'
import Hero from '../../section/hero/Hero'
import Advantage from '../../section/advantage/Advantage'
import Lastest from '../../section/latest/Lastest'
import Promotion from '../../section/promotion/Promotion'
import ProductsMain from '../../section/prodictsMain/ProductsMain'
import { useEffect, useState } from 'react'
import { $host } from '../../http/handlerApi'

const Main = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [promotion, setPromotion] = useState([])

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const response = await $host('promotions/');
        setPromotion(response.data); 
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        setPromotion([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return <div className="loading">Загрузка...</div>;
  }

  console.log(promotion);

  const currentPromotion = promotion[0];
  const showPromotion = currentPromotion && currentPromotion.timeLeft > 0;

  return (
    <>
      <Hero/>
      <Advantage/>
      <Lastest/>
      
      {showPromotion ? (
        <Promotion 
          subdesc={currentPromotion.subdesc} 
          src={currentPromotion.image} 
          title={currentPromotion.title}
          desc={currentPromotion.desc}
          price={currentPromotion.price}
          sale={currentPromotion.sale}
          link={currentPromotion.link}
          time={currentPromotion.timeLeft} 
        />
      ) : null}
      
      <ProductsMain/>
    </>
  )
}

export default Main