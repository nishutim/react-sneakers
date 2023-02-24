import { $axiosCart } from "../http";

class CartService {
   static fetchCartItems = async () => {
      const { data } = await $axiosCart.get('/cart');
      return data;
   }

   static addToCart = async (product) => {
      const { data } = await $axiosCart.post('/cart', product);
      return data;
   }

   static removeFromCart = async (id) => {
      const { data } = await $axiosCart.delete(`/cart/${id}`);
      return data;
   }

   static clearCart = async () => {
      const { data } = await $axiosCart.put('/cart', []);
      return data;
   }
}

export default CartService;