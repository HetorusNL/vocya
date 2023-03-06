const fs = require("fs");
const packageJson = require("./package.json");

const jsonData = {
  version: packageJson.version,
  buildDateTime: new Date().toString(),
};

fs.writeFile("./public/meta.json", JSON.stringify(jsonData), "utf8", (err) => {
  if (err) {
    console.log("An error occured while writing JSON Object to meta.json");
    return console.log(err);
  }

  console.log(`meta.json file has been saved`);
  console.log(`version number: ${jsonData.version}`);
  console.log(`build date/time (local): ${jsonData.buildDateTime}`);
});
