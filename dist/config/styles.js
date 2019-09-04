"use strict";

// Add a style for the icon grid.
wp.blocks.registerBlockStyle("core/columns", {
  name: "icon-grid-style",
  label: "Icon Grid"
});
wp.blocks.registerBlockStyle("core/columns", {
  name: "70-30-grid-style",
  label: "70 / 30"
});
wp.blocks.registerBlockStyle("core/columns", {
  name: "30-70-grid-style",
  label: "30 / 70"
});
wp.blocks.registerBlockStyle("core/columns", {
  name: "default",
  label: "Default"
});
/*
 * Fix for error on changing style.
 * @see: https://github.com/WordPress/gutenberg/issues/9897#issuecomment-478362380
 */

var el = wp.element.createElement;
var allowColumnStyle = wp.compose.createHigherOrderComponent(function (BlockEdit) {
  return function (props) {
    var content = el(BlockEdit, props);

    if (props.name === 'core/columns' && typeof props.insertBlocksAfter === 'undefined') {
      content = el('div', {});
    }

    return el(wp.element.Fragment, {}, content);
  };
}, 'allowColumnStyle');
wp.hooks.addFilter('editor.BlockEdit', 'my/gutenberg', allowColumnStyle);