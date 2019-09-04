"use strict";

var _classnames = _interopRequireDefault(require("classnames"));

var _inspector = _interopRequireDefault(require("./components/inspector"));

var _iconLink = _interopRequireDefault(require("./components/icon-link"));

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
  URLInput
} = wp.editor; // Register components

const {} = wp.components;
const {
  dispatch,
  select
} = wp.data;

class InclindIconLink extends Component {
  render() {
    // Setup the attributes.
    const {
      attributes: {
        itemContent,
        itemIcon,
        itemLink
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
    React.createElement(_iconLink.default, this.props, React.createElement(RichText, {
      tagName: "p",
      placeholder: __("Link Text...", 'inclind-blocks'),
      keepPlaceholderOnFocus: true,
      value: itemContent,
      className: (0, _classnames.default)('icon-link'),
      onChange: value => this.props.setAttributes({
        itemContent: value
      })
    })), React.createElement("form", {
      key: "form-link",
      onSubmit: event => event.preventDefault()
    }, React.createElement(URLInput, {
      value: itemLink,
      onChange: value => setAttributes({
        itemLink: value
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
// Register the block.

registerBlockType(category.slug + '/inclind-icon-link', {
  title: __('Icon Link', 'inclind-icon-link'),
  description: __('Description', 'inclind-blocks'),
  category: 'inclind-blocks',
  keywords: [__('icon', 'inclind-icon-link'), __('link', 'inclind-icon-link'), __('inclind', 'inclind-icon-link')],
  attributes: {
    itemIcon: {
      type: 'string',
      default: ''
    },
    itemContent: {
      type: 'string',
      default: ''
    },
    itemLink: {
      type: 'string',
      source: 'attribute',
      selector: '.icon-link',
      attribute: 'href'
    }
  },
  // Render the block components.
  edit: InclindIconLink,
  // Save the attributes and markup.
  save: function (props) {
    const {
      itemContent,
      itemIcon,
      itemLink
    } = props.attributes;
    const icon = itemIcon !== undefined && itemIcon !== '' && _icon.default[itemIcon] !== undefined ? _icon.default[itemIcon] : ''; // Save the block markup for the front end.

    return React.createElement(_iconLink.default, props, icon && React.createElement("span", {
      className: (0, _classnames.default)('svgicon-default', 'align-middle', itemIcon)
    }, icon), itemContent && itemLink && React.createElement(RichText.Content, {
      tagName: "a",
      href: itemLink,
      className: "icon-link",
      value: itemContent
    }));
  }
});