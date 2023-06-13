const { exec } = require("child_process");

const G1CLIENT_COMMAND = `xcrun simctl openurl booted 'https://zenlist.com/app/autosignin/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJpZHR0b2tlbl9kSVlKek1BZE5rUXQ5MHBta3RjekIiLCJleHAiOjE3MDIyMjUyMzR9.8JJ527NDng0fJSd1DZo36jldq2huVuftj_TpVwxUecM'`;
const KINGPIN_COMMAND = `xcrun simctl openurl booted 'https://zenlist.com/app/autosignin/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJpZHR0b2tlbl9NVWI3VmRBdERPTkhPT3pCa1Zrc2siLCJleHAiOjE2OTkyODUyMjV9.Y5yKZCvjbaN8ItOnwkj5OMDVV9ojvJO0lBSIJsTyzOQ'`;
const IRONFIST_COMMAND = `xcrun simctl openurl booted 'https://zenlist.com/app/autosignin/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJpZHR0b2tlbl9TUGZ0SzM2aVQzZnd5ZDJ3VEU0VW0iLCJleHAiOjE2OTkyODUyMjR9.LV8f82twTzZOdV2333W3WagWxhfJUhwGO-hdaBZFwYY'`;

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

module.exports = {
  loginClient: () => {
    execute(G1CLIENT_COMMAND);
  },
  loginKingpin: () => {
    execute(KINGPIN_COMMAND);
  },
  loginIronfist: () => {
    execute(IRONFIST_COMMAND);
  },
};
