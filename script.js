function getPricesInCart() {
  const cartList = document.getElementsByClassName('cart__items')[0];
  const total = document.getElementsByClassName('total-price')[0];
  const prices = cartList.childNodes;
  let result = 0;
  prices.forEach((element) => {
    const price = element.innerHTML.split('PRICE: $');
    console.log(price);
    result += parseFloat(price[1]);
  });
  total.innerHTML = result.toFixed(2);
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function cartItemClickListener(event) {
  const ol = document.querySelector('ol');
  event.target.parentElement.removeChild(event.target);  
  saveCartItems(ol.innerHTML);
  getPricesInCart();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addToCart(event) {
  const element = event.target.parentElement.firstChild.innerText;
  const itemId = await fetchItem(element);
  const { id, title, price } = itemId;
  const ol = document.querySelector('ol');
  const itemInCar = document.querySelector('.cart__items');
  itemInCar.appendChild(createCartItemElement({ sku: id, name: title, salePrice: price }));
  saveCartItems(ol.innerHTML);
  getPricesInCart();
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', addToCart);
  section.appendChild(button);
  return section;
}

async function addProducts() {
  const itemsObj = document.querySelector('.items');
  const data = await fetchProducts('computador');
  const { results } = data;
  return results.forEach(({ id, title, thumbnail }) => {
  itemsObj.appendChild(createProductItemElement({ sku: id, name: title, image: thumbnail }));
  });
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function removeCartItems() {
  const allCartItems = [...document.querySelector('ol').children];
  allCartItems.forEach((element) => element.addEventListener('click', cartItemClickListener));
  getPricesInCart();
}

function clearCartButton() {
  const cartItems = document.querySelector('.cart__items');
  const button = document.querySelector('.empty-cart');
  button.addEventListener('click', () => {
    cartItems.innerHTML = '';
    localStorage.clear();
    getPricesInCart();
  });
}

function loadingApi() {
  const div = document.querySelector('.loadAPI');
  const h1 = document.createElement('h1');
  h1.classList.add('loading');
  h1.innerHTML = 'Carregando...';
  div.appendChild(h1);
}

function removeLoading() {
  setTimeout(() => {
    const h1 = document.querySelector('.loading');
    h1.remove();
    addProducts();
  }, 3000);
}

window.onload = () => {
  loadingApi();
  removeLoading();
  getSavedCartItems();
  removeCartItems();
  clearCartButton();
  getPricesInCart();
};
