module.exports = {
  isDdr: (assure) => {
    const { ddr_cnpj } = assure;
    return ddr_cnpj ? "S" : "N";
  },
};
