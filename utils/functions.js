module.exports = {
  getTime: function getTime() {
    const date = new Date();
    const month = date.toLocaleString("default", { month: "long" });
    const day = ("0" + date.getDate()).slice(-2);
    const year = date.getFullYear();
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);
    return `${month} ${day}, ${year} ${hours}:${minutes}:${seconds} ::`;
  },
};
