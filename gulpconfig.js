/* eslint-env node */

/* Paths are relative to location of this file: */
var root = ".";

module.exports = {
  version: 1,
  scss: {
    theme: {
      src: root + "/scss/**/*.scss",
      maps: root + "/maps",
      prefix: {overrideBrowserslist: "last 2 versions", cascade: false},
      dest: root + "/css",
      // Pass options to node-sass.
      sassOptions: {
        // Include paths to resolve automatically.
        outputStyle: "compressed"
      }
    }
  },
};
