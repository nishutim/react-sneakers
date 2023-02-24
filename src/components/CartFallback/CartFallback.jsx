import React from 'react';
import { HiArrowLeft } from 'react-icons/hi';
import s from './styles.module.scss';

const CartFallback = ({ img, title, text, titleColor, onClick }) => {
   const titleStyle = titleColor ? `${s.titleGreen}` : '';

   return (
      <div className={s.fallbackCard}>
         <div className={s.fallbackCardImage}>
            <img src={img} alt="Fallback" />
         </div>
         <h4 className={titleStyle}>{title}</h4>
         <p>{text}</p>
         <button
            className={s.fallbackCardBtn}
            onClick={onClick}
         >
            <HiArrowLeft className={s.fallbackCardBtnArrow} size='20px' />
            Вернуться назад
         </button>
      </div>
   )
}

export default CartFallback;