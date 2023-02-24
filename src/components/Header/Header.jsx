import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiUser } from 'react-icons/fi';
import s from './styles.module.scss';
import Container from '../Container/Container';
import * as RouteNames from '../../router/routeNames';

const Header = ({ totalPrice, cartOpened, onCartOpen }) => {
   const cartBtnStyle = cartOpened ? `${s.actionsItem} ${s.actionsItemActive} ${s.cartBtn}` : `${s.actionsItem} ${s.cartBtn}`;

   return (
      <header className={s.header}>
         <Container>
            <div className={s.headerBody}>
               <Link className={s.logo} to={RouteNames.HOME}>
                  <img src='/assets/img/png/logo.png' alt="Logo" />
                  <div className={s.logoText}>
                     <h2>REACT SNEAKERS</h2>
                     <p>Магазин лучших кроссовок</p>
                  </div>
               </Link>
               <div className={s.actions}>
                  <button className={cartBtnStyle} onClick={onCartOpen}>
                     <FiShoppingCart size='18px' />
                     <span>{`${totalPrice} руб.`}</span>
                  </button>
                  <NavLink
                     className={({ isActive }) => isActive ? `${s.actionsItem} ${s.actionsItemActive}` : s.actionsItem}
                     to={RouteNames.FAVOURITES}
                  >
                     <FiHeart size='18px' />
                  </NavLink>
                  <NavLink
                     className={({ isActive }) => isActive ? `${s.actionsItem} ${s.actionsItemActive}` : s.actionsItem}
                     to={RouteNames.ORDERS}
                  >
                     <FiUser size='18px' />
                  </NavLink>
               </div>
            </div>
         </Container>
      </header>
   )
}

export default Header;