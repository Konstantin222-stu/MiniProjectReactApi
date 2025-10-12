import React from 'react'

const AdvantageCard = ({src, title, desc}) => {
  return (
    <div className="advantage__card">
        <img src={src} alt="train"></img>
        <h3 className="title title_lt">{title}</h3>
        <p className="desc desc_md">{desc}</p>
    </div>
  )
}

export default AdvantageCard
