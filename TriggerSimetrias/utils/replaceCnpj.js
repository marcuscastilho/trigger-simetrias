module.exports = {
  replaceCnpj: (cnpj) => {
    return cnpj.replace(/\D/g, "").padStart(14, "0");
  },
};
