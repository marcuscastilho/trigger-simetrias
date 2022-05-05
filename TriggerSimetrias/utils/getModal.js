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

    const { transport_type } = assure;

    return objectModal[transport_type] || null;
  },
};
