import React from 'react'
import Hero from '../../section/hero/Hero'
import Advantage from '../../section/advantage/Advantage'
import Lastest from '../../section/latest/Lastest'
import Promotion from '../../section/promotion/Promotion'
import ProductsMain from '../../section/prodictsMain/ProductsMain'

const Main = () => {
  const promotionData = [
    {
      src: "promotion/promotion.png",
      subdesc: "Featured Product",
      title: "Ulina Fashionable Jeans",
      desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequa uis aute irure dolor",
      price: "$399",
      sale: "$199",
      link: "#",
      time: 10
    },
    
  ]

  return (
    <>
      <Hero/>
      <Advantage/>
      <Lastest/>
      {promotionData[0].time == 0 ? null :
        <Promotion 
        subdesc = {promotionData[0].subdesc} 
        src={promotionData[0].src} 
        title={promotionData[0].title}
        desc={promotionData[0].desc}
        price={promotionData[0].price}
        sale={promotionData[0].sale}
        link={promotionData[0].link}
        time={promotionData[0].time} />
      }
      <ProductsMain/>
    </>
  )
}

export default Main
