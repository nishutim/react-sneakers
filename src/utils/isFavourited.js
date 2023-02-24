const isFavourited = (favourites, id) => {
   return favourites.find(fav => fav.parentId === id);
}

export default isFavourited;