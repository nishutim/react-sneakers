import React, { useEffect, useState } from 'react';
import s from './styles.module.scss';
import ProductsService from '../../services/ProductsService';
import CartService from '../../services/CartService';
import FavouritedService from '../../services/FavouritedService';
import OrdersService from '../../services/OrdersService';
import Header from '../Header/Header';
import Cart from '../Cart/Cart';
import Pages from '../../router/Pages';

export const AppData = React.createContext(null);

const App = () => {
   const [cartOpened, setCartOpened] = useState(false);
   const [products, setProducts] = useState([]);
   const [favourites, setFavourites] = useState([]);
   const [cartItems, setCartItems] = useState([]);
   const [orders, setOrders] = useState([]);
   const [loading, setLoading] = useState(false);

   const totalPrice = cartItems.reduce((total, item) => {
      const validPrice = parseInt(item.price.split(' ').slice(0, 2).join(''));
      return total += validPrice;
   }, 0);

   const toggleCartOpened = (e) => {
      setCartOpened(cartOpened => !cartOpened);
   };

   const removeFromCart = async (id) => {
      try {
         await CartService.removeFromCart(id);
         setCartItems(cartItems => cartItems.filter(item => item.id !== id));
      } catch (e) {
         alert('Не удалось удалить товар');
      }
   }

   const appData = { // Data for AppData context
      products,
      cartItems,
      favourites,
      orders,
      totalPrice,
      setProducts,
      setFavourites,
      setCartItems,
      setOrders,
      loading,
      removeFromCart
   }

   useEffect(() => {
      (async () => {
         try {
            setLoading(true);

            const [products, cartItems, favourites, orders] = await Promise.all([
               ProductsService.fetchProducts(),
               CartService.fetchCartItems(),
               FavouritedService.fetchFavourites(),
               OrdersService.fetchOrders()
            ]);

            setProducts(products);
            setCartItems(cartItems);
            setFavourites(favourites);
            setOrders(orders);

            setLoading(false);
         } catch (e) {
            alert('Не удалось загрузить данные приложения');
         }
      })();
   }, []);

   return (
      <AppData.Provider value={appData}>
         <div className={s.wrapper}>
            <Header
               totalPrice={totalPrice}
               cartOpened={cartOpened}
               onCartOpen={toggleCartOpened} />
            <Cart
               cartOpened={cartOpened}
               onCartClose={toggleCartOpened} />
            <Pages />
         </div>
      </AppData.Provider>
   );
}

export default App;