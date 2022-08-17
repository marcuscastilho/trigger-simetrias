module.exports = {
  getModel: (assure) => {
    if (assure.complementary_transport_type == "fluvial") {
      return "RF";
    }

    const objectModal = {
      rodoviario: "R",
      aereo: "A",
      aquaviario: "M",
      ferroviario: "",
      dutoviario: "",
      multimodal: "",
    };

    const { transport_type } = assure;

    return objectModal[transport_type] || "";
  },
};
