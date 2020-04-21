"use strict";

var _classnames = _interopRequireDefault(require("classnames"));

var _inspector = _interopRequireDefault(require("./components/inspector"));

var _calltoaction = _interopRequireDefault(require("./components/calltoaction"));

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
  BlockControls,
  URLInput
} = wp.editor; // Register components

const {} = wp.components;
const {
  dispatch,
  select
} = wp.data;

class InclindCallToAction extends Component {
  render() {
    // Setup the attributes.
    const {
      attributes: {
        itemTitle,
        itemContent,
        itemButtonText,
        itemButtonLink
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
    React.createElement(_calltoaction.default, this.props, React.createElement(RichText, {
      tagName: "h2",
      placeholder: __("Item Title", 'inclind-blocks'),
      keepPlaceholderOnFocus: true,
      value: itemTitle,
      className: (0, _classnames.default)('item-title', 'text-center', 'col-sm-12', 'emb-center'),
      onChange: value => this.props.setAttributes({
        itemTitle: value
      })
    }), React.createElement(RichText, {
      tagName: "p",
      placeholder: __("Item Content...", 'inclind-blocks'),
      keepPlaceholderOnFocus: true,
      value: itemContent,
      className: (0, _classnames.default)('lead'),
      onChange: value => this.props.setAttributes({
        itemContent: value
      })
    }), React.createElement(RichText, {
      tagName: "p",
      placeholder: __('Button Text...', 'inclind-blocks'),
      keepPlaceholderOnFocus: true,
      value: itemButtonText,
      formattingControls: [],
      className: (0, _classnames.default)('btn', 'btn-lg', 'btn-secondary'),
      onChange: value => setAttributes({
        itemButtonText: value
      })
    })), isSelected && React.createElement("form", {
      key: "form-link",
      onSubmit: event => event.preventDefault()
    }, React.createElement(URLInput, {
      className: "item-button-link",
      value: itemButtonLink,
      onChange: value => setAttributes({
        itemButtonLink: value
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

  if (blocks.hasOwnProperty(category.slug + '/inclind-call-to-action') && blocks[category.slug + '/inclind-call-to-action']) {
    // Register the block.
    registerBlockType(category.slug + '/inclind-call-to-action', {
      title: __('Call To Action', 'inclind-call-to-action'),
      description: __('Description', 'inclind-blocks'),
      category: 'inclind-blocks',
      keywords: [__('action', 'inclind-call-to-action'), __('call to action', 'inclind-call-to-action'), __('inclind', 'inclind-call-to-action')],
      attributes: {
        itemTitle: {
          selector: '.item-title',
          type: 'string'
        },
        itemContent: {
          selector: '.lead',
          type: 'array',
          source: 'children'
        },
        itemButtonText: {
          type: 'string'
        },
        itemButtonLink: {
          type: 'string',
          source: 'attribute',
          selector: '.item-button-link',
          attribute: 'href'
        }
      },
      // Render the block components.
      edit: InclindCallToAction,
      // Save the attributes and markup.
      save: function (props) {
        const {
          itemTitle,
          itemContent,
          itemButtonText,
          itemButtonLink
        } = props.attributes; // Save the block markup for the front end.

        return React.createElement(_calltoaction.default, props, React.createElement("div", {
          className: "row text-center"
        }, itemTitle && React.createElement(RichText.Content, {
          tagName: "h2",
          className: "item-title text-center col-sm-12 emb-center",
          value: itemTitle
        }), React.createElement("div", {
          className: "col-sm-12"
        }, itemContent && React.createElement(RichText.Content, {
          tagName: "p",
          className: "lead",
          value: itemContent
        })), itemButtonText && React.createElement(RichText.Content, {
          tagName: "a",
          className: "btn btn-lg btn-secondary item-button-link",
          value: itemButtonText,
          href: itemButtonLink
        })));
      }
    });
  }
}