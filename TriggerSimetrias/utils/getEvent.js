module.exports = {
  getEvent: (assure) => {
      const { event_code } = assure;
  
      if (event_code == 100) return "E";
      if (event_code == 101) return "C";
      return null;
  }
}