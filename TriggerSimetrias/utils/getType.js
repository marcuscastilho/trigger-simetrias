module.exports = {
  getType: (assure) => {
    const { tipo_documento } = assure;
    if (tipo_documento == "cte") return "C";
    if (tipo_documento == "nfe") return "N";
    if (tipo_documento == "mdfe") return "M";
    return null;
  },
};
