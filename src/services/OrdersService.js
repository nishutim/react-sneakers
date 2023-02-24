import { $axiosCart } from "../http"

class OrdersService {
   static fetchOrders = async () => {
      const { data } = await $axiosCart.get('/orders');
      return data;
   }

   static createOrder = async (order) => {
      const { data } = await $axiosCart.post('/orders', order);
      return data;
   }
}

export default OrdersService;