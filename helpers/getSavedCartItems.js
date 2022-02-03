const getSavedCartItems = () => {
  document.querySelector('.cart__items').innerHTML = localStorage.getItem('cartItems');
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
