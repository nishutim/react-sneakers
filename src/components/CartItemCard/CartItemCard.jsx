import React, { useContext, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import s from './styles.module.scss';
import { AppData } from '../App/App';

const CartItemCard = ({ cartItem }) => {
   const { removeFromCart } = useContext(AppData);

   const { id, title, img, price } = cartItem;

   const [disableRemoveBtn, setDisableRemoveBtn] = useState(false);

   const handleRemoveBtnClick = async () => {
      setDisableRemoveBtn(true);
      await removeFromCart(id);
      setDisableRemoveBtn(false);
   }

   return (
      <div className={s.card}>
         <div className={s.cardImage}>
            <img src={img} alt={title} />
         </div>
         <div className={s.cardInfo}>
            <h4>{title}</h4>
            <b>{price}</b>
         </div>
         <div className={s.cardActions}>
            <button
               className={s.removeBtn}
               disabled={disableRemoveBtn}
               onClick={handleRemoveBtnClick}
            >
               <IoClose className={s.removeBtnCross} size='16px' />
            </button>
         </div>
      </div>
   )
}

export default CartItemCard;