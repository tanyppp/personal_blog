module.exports = {
  getNow() {
    return Math.floor(Date.now() / 1000)
  },
  getFormatNow() {
    return new Date().toLocaleDateString();
  },
  getFormatTime(t) {
    return new Date(t * 1000).toLocaleDateString();
  }
}
