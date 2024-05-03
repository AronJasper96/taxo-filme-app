const assert = require('assert');
const axios = require('axios');

describe('Teste da rota /produtores', function() {
  it('Deve retornar os produtores de acordo com a regra solicitada', async function() {
    try {
      const response = await axios.get('http://localhost:3000/produtores');
      assert.strictEqual(response.status, 200); // Verifica se o status da resposta é 200 OK
      assert.ok(Array.isArray(response.data.min)); // Verifica se existe o array min
      assert.ok(Array.isArray(response.data.max)); // Verifica se existe o array max
    } catch (error) {
      assert.fail(error.message);
    }
  });
});