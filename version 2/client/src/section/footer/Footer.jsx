 import React from 'react';
 
 const Footer = () => {
   return (
     <footer className="footer">
        <div className="footer__content wrap">
            <div className="footer__info">
                <img src="/logo.svg" alt="logo" className="footer__logo"></img>
                <p className="desc desc_lg">Quis nostrud exercitatin ullamc boris nisi ut aliquip ex ea commodo conse.</p>
            </div>
            <div className="footer__contact">
                <h3 className="title title_md">Address</h3>
                <ul className="footer-contacts__list">
                    <li className="footer-contacts__item"><img src="/footer/map.svg" alt="map"></img><a href="#">20, Awesome Road, New York, Usa 4D BS3</a></li>
                    <li className="footer-contacts__item"><img src="/footer/phone.svg" alt="phone"></img><a href="#">+123 456 7890</a></li>
                    <li className="footer-contacts__item"><img src="/footer/mail.svg" alt="email"></img><a href="#">hello@ulina.com</a></li>
                </ul>
            </div>
            <div className="footer__pages">
                <h3 className="title title_md">Usful Links</h3>
                <ul className="footer-pages__list">
                    <li className="footer-pages__item"><a href="">Shop Cupon</a></li>
                    <li className="footer-pages__item"><a href="">About Us</a></li>
                    <li className="footer-pages__item"><a href="">Carrer</a></li>
                    <li className="footer-pages__item"><a href="">Supports</a></li>
                </ul>
            </div>
        </div>
    </footer>
   )
 }
 
 export default Footer
 
 
 