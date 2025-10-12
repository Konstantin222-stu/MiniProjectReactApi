import React from 'react'
import AdvantageCard from '../../components/advantageCard/AdvantageCard'

const Advantage = () => {
    const data = [
        {
            src: "advantage/free.svg",
            title: "Free Shipping",
            desc: "Ut enim ad minim veniam liquip ami tomader"
        },
        {
            src: "advantage/secure.svg",
            title: "Secure Payments",
            desc: "Eonim ad minim veniam liquip tomader"
        },
        {
            src: "advantage/easy.svg",
            title: "Easy Returns",
            desc: "Be enim ad minim veniam liquipa ami tomader"
        },
        {
            src: "advantage/support.svg",
            title: "24/7 Support",
            desc: "Ut enim ad minim veniam liquip ami tomader"
        }
    ]
  return (
    <div className="advantage">
        <div className="advantage__content wrap">
             {
                data.map((item) =>(
                    <AdvantageCard
                        src={item.src}
                        title={item.title}
                        desc={item.desc}
                    />
                ))
             }
        </div>
    </div>
  )
}

export default Advantage
