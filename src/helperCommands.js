const { exec } = require("child_process");

const execute = (command) =>
  new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`error: ${error.message}`);
      } else if (stderr) {
        reject(`stderr: ${stderr}`);
      } else {
        resolve(stdout);
      }
    });
  });

module.exports = { execute };
