"use strict";

var _classnames = _interopRequireDefault(require("classnames"));

var _inspector = _interopRequireDefault(require("./components/inspector"));

var _infographic = _interopRequireDefault(require("./components/infographic"));

var _icon = _interopRequireDefault(require("../infobox/components/icon"));

var _infobox = _interopRequireDefault(require("../infobox/components/infobox"));

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
} = wp.editor; // Register components

const {} = wp.components;
const {
  dispatch,
  select
} = wp.data;

class InclindInfographic extends Component {
  render() {
    // Setup the attributes.
    const {
      attributes: {
        itemTitle,
        itemContentTop,
        itemContentBottom
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
    React.createElement(_infographic.default, this.props, React.createElement(RichText, {
      tagName: "span",
      placeholder: __("Item Title", 'inclind-blocks'),
      keepPlaceholderOnFocus: true,
      value: itemTitle,
      className: (0, _classnames.default)('infographic-title', 'h6', 'orange'),
      onChange: value => this.props.setAttributes({
        itemTitle: value
      })
    }), React.createElement(RichText, {
      tagName: "span",
      placeholder: __("Item Content Top...", 'inclind-blocks'),
      keepPlaceholderOnFocus: true,
      value: itemContentTop,
      className: (0, _classnames.default)('infographic-content-top', 'h1'),
      onChange: value => this.props.setAttributes({
        itemContentTop: value
      })
    }), React.createElement(RichText, {
      tagName: "span",
      placeholder: __("Item Content Bottom...", 'inclind-blocks'),
      keepPlaceholderOnFocus: true,
      value: itemContentBottom,
      className: (0, _classnames.default)('infographic-content-bottom', 'h4'),
      onChange: value => this.props.setAttributes({
        itemContentBottom: value
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

  if (blocks.hasOwnProperty(category.slug + '/inclind-infographic') && blocks[category.slug + '/inclind-infographic']) {
    // Register the block.
    registerBlockType(category.slug + '/inclind-infographic', {
      title: __('Infographic', 'inclind-infographic'),
      description: __('Description', 'inclind-blocks'),
      category: 'inclind-blocks',
      keywords: [__('info', 'inclind-infographic'), __('infogrpahic', 'inclind-infographic'), __('inclind', 'inclind-infographic')],
      attributes: {
        itemTitle: {
          selector: '.infographic-title',
          type: 'string'
        },
        itemContentTop: {
          selector: '.infographic-content-top',
          type: 'string'
        },
        itemContentBottom: {
          selector: '.infographic-content-bottoom',
          type: 'string'
        }
      },
      // Render the block components.
      edit: InclindInfographic,
      // Save the attributes and markup.
      save: function (props) {
        const {
          itemTitle,
          itemContentTop,
          itemContentBottom
        } = props.attributes; // Save the block markup for the front end.

        return React.createElement(_infographic.default, props, React.createElement("p", null, itemTitle && React.createElement(RichText.Content, {
          tagName: "span",
          className: "h6 orange infographic-title",
          value: itemTitle
        }), React.createElement("br", null), itemContentTop && React.createElement(RichText.Content, {
          tagName: "span",
          className: "h1 infogrpahic-content-top",
          value: itemContentTop
        })), React.createElement("p", null, itemContentBottom && React.createElement(RichText.Content, {
          tagName: "span",
          className: "h4 infogrpahic-content-bottom",
          value: itemContentBottom
        })));
      }
    });
  }
}