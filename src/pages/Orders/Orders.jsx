import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import s from './styles.module.scss';
import { AppData } from '../../components/App/App';
import { mockProducts } from '../../utils/consts';
import Page from '../../components/Page/Page';
import PageTitle from '../../components/PageTitle/PageTitle';
import ProductCard from '../../components/ProductCard/ProductCard';
import CartFallback from '../../components/CartFallback/CartFallback';
import PreloadingProductCard from '../../components/PreloadingProductCard/PreloadingProductCard';

const Orders = () => {
   const { orders, loading } = useContext(AppData);

   const navigate = useNavigate();

   const goPrevPage = () => navigate(-1);

   return (
      <Page>
         <div className={s.pageHeader}>
            <button className={s.goBackBtn} onClick={goPrevPage}>
               <MdKeyboardArrowLeft size='18px' />
            </button>
            <PageTitle>Мои покупки</PageTitle>
         </div>
         {loading ?
            <div className={s.ordersList}>
               {mockProducts.map(el => (<PreloadingProductCard key={el} />))}
            </div>
            : orders.length ?
               <div className={s.ordersList}>
                  {orders.map(order => (
                     <ProductCard
                        key={order.id}
                        product={order} />
                  ))}
               </div>
               :
               <div className={s.fallbackBlock}>
                  <CartFallback
                     img='/assets/img/png/fallback-4.png'
                     title='У вас нет заказов'
                     text='Вы нищеброд? Оформите хотя бы один заказ.'
                     onClick={goPrevPage} />
               </div>
         }
      </Page>
   )
}

export default Orders;