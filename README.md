# Inclind Gutenberg Blocks

## Install

### Pre-Requisites
- `Gutenberg` module patch from: https://www.drupal.org/project/gutenberg/issues/3104108#comment-13564671

### Drupal Pre-Requisites
- [Drupal 8](https://www.drupal.org/8)
- [Gutenberg](https://www.drupal.org/project/gutenberg)

#### Local Development Pre-Requisites
- [Node](https://nodejs.org/en/)
- [Browserify](http://browserify.org/#install)
- Gulp ^4.0

### Drupal UI Configuration:
- Add base CSS override within default site theme: `/admin/config/inclind-gutenberg/settings`.
Set the path to point to CSS file which will contain BASE colors/fonts overrides 
of the values within Inclind Gutenberg module. You can copy `inclind_gutenberg_blocks/scss/edit.scss`
file into your current theme (and compile it) to override default colors/fonts 
and some other presets within Inclind Gutenberg widgets.This setting applies if 
destination file is of CSS type file only.
- All `Inclind Gutenberg` widgets are available to be enabled/disabled on each 
Gutenberg enabled content type edit form (similar to Core blocks)

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
  - Alter hook `hook_inclind_gutenberg_blocks_alter($js_files_edit, $css_files_edit, $css_files_view)`
   can be utilized from other modules/themes to override (add to) default 
   module's libraries files.
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

- Import statements for scss files inside of js are not handled and cause the
 compiler to fail.
- The dist directory should be excluded in the future and the Gutenberg blocks should be
 linted and compiled during the build process.
