module.exports = {
  isDdr: () => {
    const { cnpj_ddr } = assure;
    return cnpj_ddr ? "S" : "N";
  },
};
