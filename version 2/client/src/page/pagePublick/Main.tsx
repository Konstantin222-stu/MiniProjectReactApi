import React from 'react'
import Hero from '../../section/hero/Hero'
import Advantage from '../../section/advantage/Advantage'
import Lastest from '../../section/latest/Lastest'
import Promotion from '../../section/promotion/Promotion'
import ProductsMain from '../../section/prodictsMain/ProductsMain'
import { useEffect, useState } from 'react'
import { $host } from '../../http/handlerApi'
import type { PromotionItem } from '../../types/promotion.type'

const Main: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [promotion, setPromotion] = useState<PromotionItem[]>([])

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const response = await $host.get<PromotionItem[]>('promotions/');
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

  const currentPromotion: PromotionItem | undefined = promotion[0];
  const showPromotion: boolean =Boolean(currentPromotion && currentPromotion.timeLeft > 0);

  return (
    <>
      <Hero/>
      <Advantage/>
      <Lastest/>
      
      {showPromotion && currentPromotion ? (
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