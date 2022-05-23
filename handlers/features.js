const fs = require("fs");
const path = require("path");
const { getTime } = require("../utils/functions");
module.exports = async (client) => {
  let amount = 0;
  const readFeatures = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir));
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file));
      if (stat.isDirectory()) {
        readFeatures(path.join(dir, file));
      } else {
        const feature = require(path.join(__dirname, dir, file));
        feature(client);
        amount++;
      }
    }
  };

  readFeatures("../features/");
  console.log(`${getTime()} Loaded ${amount} features.`);
};
