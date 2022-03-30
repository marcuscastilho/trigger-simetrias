module.exports = {
  isRcfdc: (assure) => {
    const { ramo } = assure;

    return ramo == "55" ? "S" : "N";
  }
}