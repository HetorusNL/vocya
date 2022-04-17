const { execSync } = require("child_process");
const packageJson = require("./package.json");

const gitVersion = "v" + packageJson.version;

doExec = (command) => {
  result = execSync(command);
  console.log(result);
};

doGitStuff = () => {
  doExec(`git add ../.`);
  doExec(`git commit -m "${gitVersion}"`);
  doExec(`git tag -a ${gitVersion} -m "${gitVersion}"`);
  doExec(`git push --tags`);
  doExec(`git push`);
};

doGitStuff();
