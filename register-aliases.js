/**
 * Node.js require hook to resolve @/ path aliases in production.
 * Maps @/dao/Reply -> dist/server/src/dao/Reply.js
 * 
 * Usage: node -r ./register-aliases.js dist/server/src/index.js
 */
const path = require('path');
const Module = require('module');

const distServerSrc = path.resolve(__dirname, 'dist/server/src');

const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (request, parent, ...args) {
  if (request.startsWith('@/')) {
    const resolved = path.join(distServerSrc, request.slice(2));
    try {
      return originalResolve.call(this, resolved, parent, ...args);
    } catch {
      // fallback to original
    }
  }
  return originalResolve.call(this, request, parent, ...args);
};
