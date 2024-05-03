const path = require('path');

exports.getResolve = (...rootPaths) => {
  const r = path.join(...rootPaths);
  return (...args) => {
    // if resolve an absolute path
    if (args.length >= 1 && path.isAbsolute(args[0])) {
      return path.join(args[0], ...args.slice(1));
    }
    return path.join(r, ...args);
  };
};
