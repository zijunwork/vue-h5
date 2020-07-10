let os = require("os"),
  ip = "",
  iFaces = os.networkInterfaces();
out: for (let i in iFaces) {
  for (let j in iFaces[i]) {
    let val = iFaces[i][j];
    if (val.family === "IPv4" && val.address !== "127.0.0.1") {
      ip = val.address;
      break out;
    }
  }
}
module.exports = ip;
