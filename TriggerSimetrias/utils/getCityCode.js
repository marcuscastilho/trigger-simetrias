const axios = require("axios");

module.exports = {
  getCityCode: async (cep) => {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    const cod_city = response.data.ibge.substring(2);

    return cod_city || 0
  }
}