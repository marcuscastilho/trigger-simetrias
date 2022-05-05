module.exports = {
  getType: (assure) => {
    const { document_type } = assure;
    if (document_type == "cte") return "C";
    if (document_type == "nfe") return "N";
    if (document_type == "mdfe") return "M";
    return null;
  },
};
