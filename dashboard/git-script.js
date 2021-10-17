const { exec } = require("child_process");
const packageJson = require("./package.json");

const gitVersion = "v" + packageJson.version;

doExec = (command) => {
  console.log(command);
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
    }
    stdout && console.log(`${stdout}`);
  });
};

doExec(`git add ../.`);
doExec(`git commit -m "${gitVersion}"`);
doExec(`git tag -a ${gitVersion} -m "${gitVersion}"`);
doExec(`git push --tags`);
doExec(`git push`);
