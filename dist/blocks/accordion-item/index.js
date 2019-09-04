"use strict";

var _classnames = _interopRequireDefault(require("classnames"));

var _inspector = _interopRequireDefault(require("./components/inspector"));

var _accordionItem = _interopRequireDefault(require("./components/accordion-item"));

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
  BlockControls,
  InnerBlocks
} = wp.editor; // Register components

const {} = wp.components;
const {
  dispatch,
  select
} = wp.data;

class InclindAccordionItem extends Component {
  render() {
    // Setup the attributes.
    const {
      attributes: {
        itemTitle,
        itemContent,
        itemId
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
    React.createElement(_accordionItem.default, this.props, React.createElement(RichText, {
      tagName: "h5",
      placeholder: __("Item Title", 'inclind-blocks'),
      keepPlaceholderOnFocus: true,
      value: itemTitle,
      className: (0, _classnames.default)('mb-0', 'accordion-item-title'),
      onChange: value => this.props.setAttributes({
        itemTitle: value
      })
    }), React.createElement(RichText, {
      tagName: "p",
      placeholder: __("Item Content...", 'inclind-blocks'),
      keepPlaceholderOnFocus: true,
      value: itemContent,
      className: (0, _classnames.default)('accordion-item-content'),
      onChange: value => this.props.setAttributes({
        itemContent: value
      })
    }), React.createElement(InnerBlocks, null))];
  }

} //  Start Drupal Specific.


const category = {
  slug: 'inclind-blocks',
  title: __('Inclind Blocks')
}; // Grab the current categories and merge in the new category if not present.

const currentCategories = select('core/blocks').getCategories().filter(item => item.slug !== category.slug);
dispatch('core/blocks').setCategories([category, ...currentCategories]); // End Drupal Specific.
// Register the block.

registerBlockType(category.slug + '/inclind-accordion-item', {
  title: __('Accordion Item', 'inclind-accordion-item'),
  description: __('Description', 'inclind-blocks'),
  category: 'inclind-blocks',
  keywords: [__('accordion', 'inclind-accordion-item'), __('accordion item', 'inclind-accordion-item'), __('inclind', 'inclind-accordion-item')],
  attributes: {
    itemTitle: {
      selector: '.accordion-item-title',
      type: 'string'
    },
    itemContent: {
      selector: '.accordion-item-content',
      type: 'array',
      source: 'children'
    },
    itemId: {
      type: 'string',
      default: ''
    }
  },
  // Render the block components.
  edit: InclindAccordionItem,
  // Save the attributes and markup.
  save: function (props) {
    const {
      itemTitle,
      itemContent,
      itemId
    } = props.attributes;
    const addIcon = '<svg viewBox="0 0 500 500"><path d="' + _icon.default['iconAdd'] + '"></path></svg>';
    const removeIcon = '<svg viewBox="0 0 512 512"><path d="' + _icon.default['iconRemove'] + '"></path></svg>'; // Save the block markup for the front end.
    // TODO: Unique ID on elements for JS functionality.

    return React.createElement(_accordionItem.default, props, React.createElement("div", {
      className: "card-header",
      id: "header-" + itemId
    }, React.createElement("h5", {
      className: "mb-0 accordion-item-title"
    }, React.createElement("button", {
      className: "btn btn-link",
      "data-toggle": "collapse",
      "data-target": "#collapse-" + itemId
    }, itemTitle, React.createElement("span", {
      className: "svgicon-default _ionicons_svg_ios-add",
      dangerouslySetInnerHTML: {
        __html: addIcon
      }
    }), React.createElement("span", {
      className: "svgicon-default _ionicons_svg_ios-remove",
      dangerouslySetInnerHTML: {
        __html: removeIcon
      }
    })))), React.createElement("div", {
      id: "collapse-" + itemId,
      className: "collapse"
    }, React.createElement("div", {
      class: "card-body"
    }, itemContent && React.createElement(RichText.Content, {
      tagName: "p",
      className: "accordion-item-content",
      value: itemContent
    }), React.createElement(InnerBlocks.Content, null))));
  }
});