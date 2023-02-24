import React, { useState } from 'react';
import { HiPlus } from 'react-icons/hi';
import { FiCheck, FiHeart } from 'react-icons/fi';
import s from './styles.module.scss';
import { useLocation } from 'react-router-dom';

const ProductCard = ({ product, favourited, inCart, onFavouriteClick, onAddClick }) => {
   const { title, img, price } = product;

   const favouriteBtnStyle = favourited ? `${s.cardBtn} ${s.cardBtnLike} ${s.cardBtnLikeActive}` : `${s.cardBtn} ${s.cardBtnLike}`;
   const addBtnStyle = inCart ? `${s.cardBtn} ${s.cardBtnAdd} ${s.cardBtnAddActive}` : `${s.cardBtn} ${s.cardBtnAdd}`;

   const [disableFavouriteBtn, setDisableFavouriteBtn] = useState(false);
   const [disableAddBtn, setDisableAddBtn] = useState(false);

   const { pathname } = useLocation();
   const isOrdersPage = pathname === '/orders';

   const handleFavouriteBtnClick = async () => {
      setDisableFavouriteBtn(true);
      await onFavouriteClick(product);
      setDisableFavouriteBtn(false);
   }

   const handleAddBtnClick = async () => {
      setDisableAddBtn(true);
      await onAddClick(product);
      setDisableAddBtn(false);
   }

   return (
      <div className={s.card}>
         <div className={s.cardImage}>
            {!isOrdersPage && <button
               className={favouriteBtnStyle}
               disabled={disableFavouriteBtn}
               onClick={handleFavouriteBtnClick}
            >
               <FiHeart />
            </button>}
            <img src={img} alt={title} />
         </div>
         <div className={s.cardBody}>
            <h4 className={s.cardTitle}>{title}</h4>
            <div className={s.cardFooter}>
               <div className={s.cardInfo}>
                  <span>Цена:</span>
                  <b>{price}</b>
               </div>
               {!isOrdersPage && <button
                  className={addBtnStyle}
                  disabled={disableAddBtn}
                  onClick={handleAddBtnClick}
               >
                  {
                     inCart ?
                        <FiCheck className={s.cardBtnAddCheck} size='14px' />
                        :
                        <HiPlus size='14px' />
                  }
               </button>}
            </div>
         </div>
      </div>
   )
}

export default ProductCard;