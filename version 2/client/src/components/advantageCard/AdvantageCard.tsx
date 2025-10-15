import React from 'react'
import type { AdvantageCardsProps } from '../../types/advantage.type'

const AdvantageCard: React.FC<AdvantageCardsProps> = ({src, title, desc}) => {
  return (
    <div className="advantage__card">
        <img src={src} alt="train"></img>
        <h3 className="title title_lt">{title}</h3>
        <p className="desc desc_md">{desc}</p>
    </div>
  )
}

export default AdvantageCard
