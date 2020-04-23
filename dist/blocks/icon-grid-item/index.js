"use strict";

var _classnames = _interopRequireDefault(require("classnames"));

var _inspector = _interopRequireDefault(require("./components/inspector"));

var _iconGridItem = _interopRequireDefault(require("./components/icon-grid-item"));

var _icon = _interopRequireDefault(require("./components/icon"));

var _iconGridContainer = _interopRequireDefault(require("../icon-grid-container/components/icon-grid-container"));

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
  RichText,
  BlockControls
} = wp.blockEditor; // Register components

const {} = wp.components;
const {
  dispatch,
  select
} = wp.data;

class InclindIconGridItem extends Component {
  render() {
    // Setup the attributes.
    const {
      attributes: {
        itemContent,
        itemIcon
      },
      isSelected,
      className,
      setAttributes
    } = this.props;
    return [// Show the alignment toolbar on focus.
    React.createElement(BlockControls, {
      key: "controls"
    }), // Show the block controls on focus.
    React.createElement(_inspector.default, this.props), // Show the block markup in the editor.
    React.createElement(_iconGridItem.default, this.props, React.createElement(RichText, {
      tagName: "p",
      placeholder: __("Item Content...", 'inclind-blocks'),
      keepPlaceholderOnFocus: true,
      value: itemContent,
      className: (0, _classnames.default)('icon-grid-item-content'),
      onChange: value => this.props.setAttributes({
        itemContent: value
      })
    }))];
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

  if (blocks.hasOwnProperty(category.slug + '/inclind-icon-grid-container') && blocks[category.slug + '/inclind-icon-grid-container']) {
    // Register the block.
    registerBlockType(category.slug + '/inclind-icon-grid-item', {
      title: __('Icon Grid Item', 'inclind-icon-grid-item'),
      description: __('Description', 'inclind-blocks'),
      category: 'inclind-blocks',
      keywords: [__('icon', 'inclind-icon-grid-item'), __('grid', 'inclind-icon-grid-item'), __('inclind', 'inclind-icon-grid-item')],
      attributes: {
        itemIcon: {
          type: 'string',
          default: ''
        },
        itemContent: {
          selector: '.icon-grid-item-content',
          type: 'array',
          source: 'children'
        }
      },
      // Render the block components.
      edit: InclindIconGridItem,
      // Save the attributes and markup.
      save: function (props) {
        const {
          itemContent,
          itemIcon
        } = props.attributes;
        const icon = itemIcon !== undefined && itemIcon !== '' && _icon.default[itemIcon] !== undefined ? _icon.default[itemIcon] : ''; // Save the block markup for the front end.

        return React.createElement(_iconGridItem.default, props, icon && React.createElement("span", {
          className: (0, _classnames.default)('svgicon-default', itemIcon)
        }, icon), itemContent && React.createElement(RichText.Content, {
          tagName: "p",
          className: "icon-grid-item-content",
          value: itemContent
        }));
      }
    });
  }
}