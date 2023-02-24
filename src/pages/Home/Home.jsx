import React, { useContext, useState } from 'react';
import s from './styles.module.scss'
import { AppData } from '../../components/App/App';
import FavouritedService from '../../services/FavouritedService';
import CartService from '../../services/CartService';
import filterByTerm from '../../utils/filterByTerm';
import { mockProducts } from '../../utils/consts';
import Page from '../../components/Page/Page';
import PageTitle from '../../components/PageTitle/PageTitle';
import SearchForm from '../../components/SearchForm/SearchForm';
import ProductCard from '../../components/ProductCard/ProductCard';
import PreloadingProductCard from '../../components/PreloadingProductCard/PreloadingProductCard';

const Home = () => {
   const { products, favourites, cartItems, loading, setFavourites, setCartItems } = useContext(AppData);
   const [searchTerm, setSearchTerm] = useState('');

   const filteredProducts = filterByTerm(products, searchTerm);

   const handleSearchTermChange = (e) => setSearchTerm(e.target.value);

   const isFavourited = (id) => {
      return favourites.find(fav => fav.parentId === id);
   }

   const isInCart = (id) => {
      return cartItems.find(item => item.parentId === id);
   }

   const updateFavourites = async (product) => {
      try {
         const productInFavourites = favourites.find(fav => fav.parentId === product.id);

         if (productInFavourites) {
            await FavouritedService.removeFromFavourites(productInFavourites.id);
            setFavourites(favourites => favourites.filter(fav => fav.id !== productInFavourites.id));
         } else {
            const newFavourite = { ...product, parentId: product.id };
            const data = await FavouritedService.addToFavourites(newFavourite);
            setFavourites(favourites => [...favourites, data]);
         }
      } catch (e) {
         alert('Не удалось обновить избранное');
      }
   }

   const updateCart = async (product) => {
      try {
         const productInCart = cartItems.find(item => item.parentId === product.id);

         if (productInCart) {
            await CartService.removeFromCart(productInCart.id);
            setCartItems(cartItems => cartItems.filter(item => item.id !== productInCart.id));
         } else {
            const newCartItem = { ...product, parentId: product.id };
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
            <PageTitle>{searchTerm ? `Результаты по запросу: "${searchTerm}"` : 'Все кроссовки'}</PageTitle>
            <SearchForm
               value={searchTerm}
               onChange={handleSearchTermChange} />
         </div>
         <div className={s.productsList}>
            {loading ?
               mockProducts.map(el => (<PreloadingProductCard key={el} />))
               :
               filteredProducts.map((product) => {
                  const favourited = isFavourited(product.id);
                  const inCart = isInCart(product.id);

                  return <ProductCard
                     key={product.id}
                     product={product}
                     favourited={favourited}
                     inCart={inCart}
                     onFavouriteClick={updateFavourites}
                     onAddClick={updateCart} />
               })}
         </div>
      </Page>
   )
}

export default Home;