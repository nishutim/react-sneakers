import React, { useContext, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { HiArrowRight } from 'react-icons/hi';
import s from './styles.module.scss';
import { AppData } from '../App/App';
import CartItemCard from '../CartItemCard/CartItemCard';
import CartService from '../../services/CartService';
import OrdersService from '../../services/OrdersService';
import { useNavigate } from 'react-router-dom';
import CartFallback from '../CartFallback/CartFallback';

const Cart = ({ cartOpened, onCartClose }) => {
   const { cartItems, totalPrice, setCartItems, setOrders } = useContext(AppData);

   const [orderBtnDisabled, setOrderBtnDisabled] = useState(false);
   const [isOrderCompleted, setIsOrderCompleted] = useState(false);

   const navigate = useNavigate();

   const cartStyle = cartOpened ? `${s.cart} ${s.cartOpened}` : `${s.cart}`;

   const makeOrder = async () => {
      setOrderBtnDisabled(true);
      try {
         const newOrders = [];

         for (let i = 0; i < cartItems.length; i++) {
            const item = cartItems[i];
            const newOrder = { ...item };
            const [orderData] = await Promise.all([OrdersService.createOrder(newOrder), CartService.removeFromCart(item.id)]);
            newOrders.push(orderData);
         }

         setOrders(prevOrders => [...prevOrders, ...newOrders]);
         setCartItems([]);
         setIsOrderCompleted(true);
      } catch (e) {
         console.error(e.message);
         alert('Не удалось оформить заказ');
      }
      setOrderBtnDisabled(false);
      navigate('/orders');
   }

   const handleGoBackBtnClick = () => {
      onCartClose();
      setIsOrderCompleted(false);
   }

   return (
      <div className={cartStyle}>
         <div className={s.cartBody}>
            <div className={s.cartHeader}>
               <h3 className={s.cartTitle}>Корзина</h3>
               <button className={s.cartCloseBtn} onClick={onCartClose}>
                  <IoClose className={s.cartCloseBtnCross} size='24px' />
               </button>
            </div>
            {cartItems.length ?
               <>
                  <div className={s.cartList}>
                     {
                        cartItems.map(el => (
                           <CartItemCard
                              key={el.id}
                              cartItem={el} />
                        ))
                     }
                  </div>
                  <div className={s.cartTotal}>
                     <span>Итого:</span>
                     <span className={s.cartTotalDecor}></span>
                     <b>{`${totalPrice} руб.`}</b>
                  </div>
                  <button
                     className={s.btn}
                     disabled={orderBtnDisabled}
                     onClick={makeOrder}
                  >
                     Оформить заказ
                     <HiArrowRight className={s.btnArrow} size='20px' />
                  </button>
               </>
               :
               <div className={s.fallbackBlock}>
                  {isOrderCompleted ?
                     <CartFallback
                        img='/assets/img/png/fallback-1.png'
                        title='Заказ оформлен!'
                        text='Ваш заказ скоро будет передан курьерской доставке'
                        titleColor='green'
                        onClick={handleGoBackBtnClick} />
                     :
                     <CartFallback
                        img='/assets/img/png/fallback-2.png'
                        title='Корзина пустая'
                        text='Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
                        onClick={onCartClose} />}
               </div>
            }
         </div>
      </div>
   )
}

export default Cart;