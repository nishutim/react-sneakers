import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import s from './styles.module.scss';
import { AppData } from '../../components/App/App';
import FavouritedService from '../../services/FavouritedService';
import CartService from '../../services/CartService';
import { mockProducts } from '../../utils/consts';
import Page from '../../components/Page/Page';
import PageTitle from '../../components/PageTitle/PageTitle';
import ProductCard from '../../components/ProductCard/ProductCard';
import CartFallback from '../../components/CartFallback/CartFallback';
import PreloadingProductCard from '../../components/PreloadingProductCard/PreloadingProductCard';

const Favourites = () => {
   const { favourites, cartItems, setFavourites, setCartItems, loading, } = useContext(AppData);

   const navigate = useNavigate();

   const goPrevPage = () => navigate(-1);

   const isInCart = (id) => {
      return cartItems.find(item => item.parentId === id);
   }

   const removeFromFavourites = async ({ id }) => {
      try {
         await FavouritedService.removeFromFavourites(id);
         setFavourites(favourites => favourites.filter(fav => fav.id !== id));
      } catch (e) {
         alert('Не удалось обновить избранное');
      }
   }

   const updateCart = async (product) => {
      try {
         const productInCart = cartItems.find(item => item.parentId === product.parentId);

         if (productInCart) {
            await CartService.removeFromCart(productInCart.id);
            setCartItems(cartItems => cartItems.filter(item => item.id !== productInCart.id));
         } else {
            const newCartItem = { ...product };
            const data = await CartService.addToCart(newCartItem);
            setCartItems(cartItems => [...cartItems, data]);
         }
      } catch (e) {
         alert('Не удалось обновить корзину');
      }
   }

   return (
      <Page>
         <div className={s.pageHeader}>
            <button className={s.goBackBtn} onClick={goPrevPage}>
               <MdKeyboardArrowLeft size='18px' />
            </button>
            <PageTitle>Мои закладки</PageTitle>
         </div>
         {loading ?
            <div className={s.favouritesList}>
               {mockProducts.map(el => (<PreloadingProductCard key={el} />))}
            </div>
            : favourites.length ?
               <div className={s.favouritesList}>
                  {favourites.map((product) => {
                     const inCart = isInCart(product.parentId);

                     return <ProductCard
                        key={product.id}
                        product={product}
                        favourited
                        inCart={inCart}
                        onFavouriteClick={removeFromFavourites}
                        onAddClick={updateCart} />
                  })}
               </div>
               :
               <div className={s.fallbackBlock}>
                  <CartFallback
                     img='/assets/img/png/fallback-3.png'
                     title='Закладок нет :('
                     text='Вы ничего не добавляли в закладки'
                     onClick={goPrevPage} />
               </div>
         }
      </Page>
   )
}

export default Favourites;