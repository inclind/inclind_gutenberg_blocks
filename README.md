# Inclind Gutenberg Blocks

## Install

### Pre-Requisites

### Drupal Pre-Requisites
- [Drupal 8](https://www.drupal.org/8)
- [Gutenberg](https://www.drupal.org/project/gutenberg)

#### Local Development Pre-Requisites
- [Node](https://nodejs.org/en/)
- [Browserify](http://browserify.org/#install)

### Local Development Setup

- From the root directory of the module run the following:
  - `npm install`
  - `npm run gutenberg-compile`

The `gutenberg-compile` command is defined inside of `package.json` and runs
 the following:
  - `babel js/src/ --out-dir dist`
    - This runs the preset react babel configuration and then transforms into
     commonjs.
  - `browserify dist/index.js -t babelify --outfile dist/index-browserify.js`
    - This compiles the js into something usable by the browser and outputs it
     into the location and name the `libraries.yml` is expecting.

#### Notes

- The Drupal Gutenberg system is expecting a single style and edit css file.
  - Additional files can be added as necessary in the `libraries.yml` for both
   block_view and block_edit displays.
  - If necessary additional libraries can be defined in the `gutenberg.yml`
   file for blocK_view and block_edit displays.
- Blocks should be defined under /js/src/blocks/<block-name>/.
- Blocks should have their individual `index.js` imported in /js/src/index.js
 for compilation.

### Relevant Documentation

- [NPM](https://docs.npmjs.com/)
- [Browserify](https://github.com/browserify/browserify#usage)
- [Babel](https://babeljs.io/docs/en/)
- [Gutenberg Blocks Samples](https://github.com/kadencewp/kadence-blocks)
- [Original Gutenberg Blocks Samples](https://github.com/WordPress/gutenberg)

## TODO

- There is no method for compiling scss presently defined.
- Import statements for scss files inside of js are not handled and cause the
 compiler to fail.
- The dist directory should be excluded and the Gutenberg blocks should be
 linted and compiled during the build process.
