module.exports = {
  isUrban : (assure) => {
    const { perimeter } = assure;

    return perimeter == "urbano" ? "S" : "N";
  }
}