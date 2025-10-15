import React, { useState } from 'react'
import Modal from '../../components/modal/Modal';
import Login from '../login/Login';

const Header: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const close = (): void => setIsModalOpen(false);

    const handlerLoginClick = (e: React.MouseEvent<HTMLAnchorElement>):void =>{
        e.preventDefault()
        setIsModalOpen(true)
    }
  return (
    <header className="header">
        <div className="header__content wrap">
            <a href="#">
                <img src="/logo.svg" alt="logo" className="logo"></img>
            </a>
            <nav>
                <ul className="nav__list">
                    <li className="nav_item"><a href="#main">Home</a></li>
                    <li className="nav_item"><a href="#">About</a></li>
                    <li className="nav_item"><a href="#">Shop</a></li>
                    <li className="nav_item"><a href="#">Page</a></li>
                    <li className="nav_item"><a href="#">Blog</a></li>
                    <li className="nav_item"><a href="#">Contact</a></li>
                </ul>
            </nav>
            <div className="hrader__icon">
                <a href="#"><img src="/header/search.svg" alt="search"></img></a>
               <a href="#" onClick={handlerLoginClick}>
                    <img src="/header/person.svg" alt="profil" />
                </a>
                <a href="#"><img src="/header/cart.svg" alt="cart"></img></a>
            </div>
            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <Login close={close}/>
                </Modal>
            )}
        </div>
    </header>
  )
}

export default Header
