import React, { useCallback, useEffect, useState } from 'react'

const Promotion = ({subdesc, title, desc, price, sale, link, time, src}) => {
    const [timeLeft, setTimeLeft] = useState(time);
    const formatTime = useCallback((time) => {
        const days = Math.floor(time / 86400);
        const hours = Math.floor((time % 86400) / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return {
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0')
        };
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => {
        clearInterval(timer)
    };
  }, [timeLeft]);
  
  const { days, hours, minutes, seconds } = formatTime(timeLeft);
  return (
    timeLeft <=0 ? null :
    <div className="promotion">
        <div className="promotion__content wrap">
            <div className="promotion__img">
                <img src={src} alt="promotion"></img>
            </div>
            <div className="promotion__info">
                <p className="subdesc">{subdesc}</p>
                <h2 className="title title_lg">{title}</h2>
                <p className="desc desc_lg">{desc}</p>
                <span>
                    <div className="promotion__price">
                        <p className="price price_lg">${sale}</p>
                        <p className="price_sale">${price}</p>
                    </div>
                    <a href={link} className="button button_lg">BUY NOW</a>
                </span>
                <div className="title title_md">Ends in</div>
                <div className="promotion__time">
                    <div className="time_line">
                        <span><p className="time">{days}</p>:</span>
                        <p className="desc">DAYS</p>
                    </div>
                    <div className="time_line">
                        <span><p className="time">{hours}</p>:</span>
                        <p className="desc">HRS</p>
                    </div>
                    <div className="time_line">
                        <span><p className="time">{minutes}</p>:</span>
                        <p className="desc">MINS</p>
                    </div>
                    <div className="time_line">
                        <p className="time">{seconds}</p>
                        <p className="desc">SECS</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Promotion
