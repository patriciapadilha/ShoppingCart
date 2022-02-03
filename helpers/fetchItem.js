const fetchItem = async (itemId) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/items/${itemId}`;

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
