import React from 'react'

const Hero = () => {
  return (
    <div className="hero">
        <div className="hero__content wrap">
            <div className="hero__info">
                <p className="subdesc">SUMMER SALE IS ON</p>
                <h1 className="title title_lg">Make Your Fashion More Perfect</h1>
                <p className="desc desc_lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <a href="#" className="button">Explore More</a>
            </div>
            <div className="hero__img">
                <img src="hero/hero.png" alt="hero"></img>
            </div>
        </div>
    </div>
  )
}

export default Hero
