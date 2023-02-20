import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiUser } from 'react-icons/fi';
import s from './styles.module.scss';
import Container from '../Container/Container';

const Header = () => {
   return (
      <header className={s.header}>
         <Container>
            <div className={s.headerBody}>
               <Link className={s.logo} to={'/'}>
                  <img src='/assets/img/png/logo.png' alt="Logo" />
                  <div className={s.logoText}>
                     <h2>REACT SNEAKERS</h2>
                     <p>Магазин лучших кроссовок</p>
                  </div>
               </Link>
               <div className={s.actions}>
                  <button className={`${s.actionsItem} ${s.cartBtn}`}>
                     <FiShoppingCart
                        size='18px'
                        style={{

                        }}
                     />
                     <span>1205 руб.</span>
                  </button>
                  <NavLink className={`${s.actionsItem}`} to='/favourites'>
                     <FiHeart
                        size='18px'
                     />
                  </NavLink>
                  <NavLink className={`${s.actionsItem} ${s.ordersLink}`} to='/favourites'>
                     <FiUser
                        size='18px'
                     />
                  </NavLink>
               </div>
            </div>
         </Container>
      </header>
   )
}

export default Header;