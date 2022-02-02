require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('Verifica se fetchItem é uma função', async () => {
    await expect(typeof fetchItem).toMatch('function');
  });
  it('Verifica se a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada;', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it("Verifica se ao chamar a função fetchItem com o argumento do item 'MLB1615760527', a função fetch utiliza o endpoint 'https://api.mercadolibre.com/items/MLB1615760527'", async () => {
    const endPoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endPoint);
  });
  it('Verifica se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  });
  it('Verifica se ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const result = await fetchItem();
    expect(result).toEqual(new Error ('You must provide an url'));
  })


});
