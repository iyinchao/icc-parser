const { exec } = require("./concurrent");


(async function main() {
  await exec('pnpm test', {
    stdio: 'pipe'
  });
})();
