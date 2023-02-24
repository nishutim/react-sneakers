import { $axios } from "../http";

class FavouritedService {
   static fetchFavourites = async () => {
      const { data } = await $axios.get('/favourited');
      return data;
   }

   static addToFavourites = async (product) => {
      const { data } = await $axios.post('/favourited', product);
      return data;
   }

   static removeFromFavourites = async (id) => {
      const { data } = await $axios.delete(`/favourited/${id}`);
      return data;
   }

   static updateFavourites = async (favourite) => {
      const { data } = await $axios.put(`/favourited/${favourite.id}`, favourite);
      return data;
   }
}

export default FavouritedService;