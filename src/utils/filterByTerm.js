const filterByTerm = (products, term) => {
   const validTerm = term.trim().toLowerCase();
   return products.filter(item => item.title.toLowerCase().includes(validTerm));
}

export default filterByTerm;