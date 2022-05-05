module.exports = {
  isRcfdc: (assure) => {
    const { branch_code } = assure;

    return branch_code == "55" ? "S" : "N";
  }
}