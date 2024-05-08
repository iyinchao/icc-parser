const { getResolve } = require('../utils');
const { spawn } = require('child_process')

const _res = getResolve(__dirname, '../../');

exports.exec = async function exec(command, options) {
  return new Promise((resolve, reject) => {
    let hasError = false;

    const opt = {
      dry: false,
      cwd: _res('.'),
      stdio: 'inherit',
      spawnOption: {},
      processRef: null,
      ...options,
    };

    const spawnOpt = {
      shell: true,
      cwd: opt.cwd,
      stdio: opt.stdio,
      ...opt.spawnOption,
    };

    if (opt.dry) {
      console.log('[DRY RUN]:', command);
      if (opt.stdio === 'pipe') {
        resolve({ code: 0, stdout: '', stderr: '' });
      } else {
        resolve(0);
      }

      return;
    }

    const ps = spawn(command, [], spawnOpt);

    if (opt.processRef) {
      opt.processRef.value = ps;
    }

    let stdoutStr = '';
    let stderrStr = '';
    if (opt.stdio === 'pipe') {
      ps.stdout.on('data', (data) => {
        // console.log(data);
        // process.stdout.write(data);
        stdoutStr += data.toString();
      });
      ps.stderr.on('data', (data) => {
        console.log(data);
        // process.stderr.write(data);
        stderrStr += data.toString();
      });
    }

    ps.on('error', (data) => {
      console.log(data);
      hasError = true;
      console.error(data);
    });

    ps.on('exit', (code) => {
      let res = code;
      if (opt.stdio === 'pipe') {
        res = {
          code,
          stdout: stdoutStr,
          stderr: stderrStr,
        };
      }
      if (code === 0 && !hasError) {
        resolve(res);
      } else {
        reject(res);
      }
    });
  });
};
