module.exports = {
  getEvent: (assure) => {
      const { codigo_evento } = assure;
  
      if (codigo_evento == 100) return "E";
      if (codigo_evento == 101) return "C";
      return null;
  }
}