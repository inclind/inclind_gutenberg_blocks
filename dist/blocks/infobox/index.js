"use strict";

var _classnames = _interopRequireDefault(require("classnames"));

var _inspector = _interopRequireDefault(require("./components/inspector"));

var _infobox = _interopRequireDefault(require("./components/infobox"));

var _icon = _interopRequireDefault(require("./components/icon"));

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

class InclindInfobox extends Component {
  render() {
    // Setup the attributes.
    const {
      attributes: {
        itemTitle,
        itemContent
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
    React.createElement(_infobox.default, this.props, React.createElement(RichText, {
      tagName: "h4",
      placeholder: __("Item Title", 'inclind-blocks'),
      keepPlaceholderOnFocus: true,
      value: itemTitle,
      className: (0, _classnames.default)('infobox-heading'),
      onChange: value => this.props.setAttributes({
        itemTitle: value
      })
    }), React.createElement(RichText, {
      tagName: "p",
      placeholder: __("Item Content...", 'inclind-blocks'),
      keepPlaceholderOnFocus: true,
      value: itemContent,
      className: (0, _classnames.default)('infobox-content'),
      onChange: value => this.props.setAttributes({
        itemContent: value
      })
    }))];
  }

} //  Start Drupal Specific.


const category = {
  slug: 'inclind-blocks',
  title: __('Inclind Blocks')
}; // Grab the current categories and merge in the new category if not present.

const currentCategories = select('core/blocks').getCategories().filter(item => item.slug !== category.slug);
dispatch('core/blocks').setCategories([category, ...currentCategories]); // End Drupal Specific.

if (drupalSettings && drupalSettings.editor.formats.gutenberg.editorSettings !== undefined) {
  const blocks = drupalSettings.editor.formats.gutenberg.editorSettings.allowedBlocks;

  if (blocks.hasOwnProperty(category.slug + '/inclind-infobox-simple') && blocks[category.slug + '/inclind-infobox-simple']) {
    // Register the block.
    registerBlockType(category.slug + '/inclind-infobox-simple', {
      title: __('Infobox', 'inclind-infobox-simple'),
      description: __('Description', 'inclind-blocks'),
      category: 'inclind-blocks',
      keywords: [__('info', 'inclind-infobox-simple'), __('infobox', 'inclind-infobox-simple'), __('inclind', 'inclind-infobox-simple')],
      attributes: {
        itemTitle: {
          selector: '.infobox-heading',
          type: 'string'
        },
        itemContent: {
          selector: '.infobox-content',
          type: 'array',
          source: 'children'
        }
      },
      // Render the block components.
      edit: InclindInfobox,
      // Save the attributes and markup.
      save: function (props) {
        const {
          itemTitle,
          itemContent
        } = props.attributes;
        const iconHelp = '<svg viewBox="0 0 500 500"><path d="' + _icon.default['iconHelp'] + '"></path></svg>'; // Save the block markup for the front end.

        return React.createElement(_infobox.default, props, React.createElement("div", {
          className: "col-lg-10"
        }, itemTitle && React.createElement(RichText.Content, {
          tagName: "h4",
          className: "infobox-heading",
          value: itemTitle
        }), itemContent && React.createElement(RichText.Content, {
          tagName: "p",
          className: "infobox-content",
          value: itemContent
        })), React.createElement("div", {
          className: "col-lg-2 text-center"
        }, React.createElement("span", {
          className: "svgicon-default _ionicons_svg_ios-help-circle",
          dangerouslySetInnerHTML: {
            __html: iconHelp
          }
        })));
      }
    });
  }
}