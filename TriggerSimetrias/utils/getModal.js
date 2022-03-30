module.exports = {
  getModel: (assure) => {
    const objectModal = {
      rodoviario: "R",
      aereo: "A",
      aquaviario: "M",
      ferroviario: null,
      dutoviario: null,
      multimodal: null,
    };

    const { tipo_transporte } = assure;

    return objectModal[tipo_transporte] || null;
  },
};
