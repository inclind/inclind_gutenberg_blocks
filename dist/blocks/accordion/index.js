"use strict";

var _accordion = _interopRequireDefault(require("./components/accordion"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import block dependencies and components
// Internationalization
const __ = Drupal.t; // Extend component

const {
  Component
} = wp.element; // Register block

const {
  registerBlockType
} = wp.blocks; // Register editor components

const {
  InnerBlocks
} = wp.blockEditor; // Register components

const {} = wp.components;
const {
  dispatch,
  select
} = wp.data;

class InclindAccordion extends Component {
  render() {
    // Setup the attributes.
    const {
      isSelected,
      className,
      setAttributes
    } = this.props;
    return [// Show the block markup in the editor.
    React.createElement(_accordion.default, this.props, React.createElement(InnerBlocks, null))];
  }

} //  Start Drupal Specific.


const category = {
  slug: 'inclind-blocks',
  title: __('Custom Blocks')
}; // Grab the current categories and merge in the new category if not present.

const currentCategories = select('core/blocks').getCategories().filter(item => item.slug !== category.slug);
dispatch('core/blocks').setCategories([category, ...currentCategories]); // End Drupal Specific.

if (drupalSettings && drupalSettings.editor.formats.gutenberg.editorSettings !== undefined) {
  const blocks = drupalSettings.editor.formats.gutenberg.editorSettings.allowedBlocks;

  if (blocks.hasOwnProperty(category.slug + '/inclind-accordion') && blocks[category.slug + '/inclind-accordion']) {
    // Register the block.
    registerBlockType(category.slug + '/inclind-accordion', {
      title: __('Accordion', 'inclind-accordion'),
      description: __('Description', 'inclind-blocks'),
      category: 'inclind-blocks',
      keywords: [__('accordion', 'inclind-accordion'), __('inclind', 'inclind-accordion')],
      attributes: {},
      // Render the block components.
      edit: InclindAccordion,
      // Save the attributes and markup.
      save: function (props) {
        const {} = props.attributes; // Save the block markup for the front end.

        return React.createElement(_accordion.default, props, React.createElement(InnerBlocks.Content, null));
      }
    });
  }
}