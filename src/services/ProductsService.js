import { $axios } from "../http";

class ProductsService {
   static fetchProducts = async () => {
      const { data } = await $axios.get('/products');
      return data;
   }

   static updateProducts = async (product) => {
      const { data } = await $axios.put(`/products/${product.id}`, product);
      return data;
   }
}

export default ProductsService;