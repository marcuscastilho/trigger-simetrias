module.exports = {
  isUrban : (assure) => {
    const { perimetro } = assure;

    return perimetro == "urbano" ? "S" : "N";
  }
}