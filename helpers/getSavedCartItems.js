const getSavedCartItems = () => {
  // seu código aqui
  document.querySelector('.cart__items').innerHTML = localStorage.getItem('cartItems');
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
