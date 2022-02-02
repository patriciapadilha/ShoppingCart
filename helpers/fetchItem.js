const fetchItem = async (productId) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/items/${productId}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
