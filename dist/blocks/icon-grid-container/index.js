"use strict";

var _iconGridContainer = _interopRequireDefault(require("./components/icon-grid-container"));

var _classnames = _interopRequireDefault(require("classnames"));

var _icon = _interopRequireDefault(require("../infobox/components/icon"));

var _infobox = _interopRequireDefault(require("../infobox/components/infobox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
  InnerBlocks,
  MediaUpload
} = wp.blockEditor; // Register components

const {
  IconButton
} = wp.components;
const {
  dispatch,
  select
} = wp.data;

class InclindIconGridContainer extends Component {
  render() {
    // Setup the attributes.
    const {
      attributes: {
        itemTitle,
        itemImage,
        itemImageData
      },
      isSelected,
      className,
      setAttributes
    } = this.props;
    const ALLOWED_BLOCKS = ['inclind-blocks/inclind-icon-grid-item'];

    const onSelectImage = (media, field) => {
      setAttributes({
        [field]: media.url,
        [`${field}Data`]: getMediaAttrs(media)
      });
    };

    function getMediaAttrs(media) {
      if (media && media.data) {
        return Object.keys(media.data).reduce((d, key) => {
          d[`data-${key.toLowerCase().replace(/[^a-z0-9]/g, '-')}`] = media.data[key];
          return d;
        }, {});
      }

      return {};
    }

    return [// Show the block markup in the editor.
    React.createElement(_iconGridContainer.default, this.props, React.createElement(RichText, {
      tagName: "h2",
      placeholder: __("Item Title", 'inclind-blocks'),
      keepPlaceholderOnFocus: true,
      value: itemTitle,
      className: (0, _classnames.default)('item-title', 'emb-center'),
      onChange: value => this.props.setAttributes({
        itemTitle: value
      })
    }), React.createElement(MediaUpload, {
      allowedTypes: ['image'],
      onSelect: media => onSelectImage(media, 'itemImage'),
      render: ({
        open
      }) => React.createElement(IconButton, {
        className: "components-toolbar__control",
        label: __('Edit image'),
        icon: "edit",
        onClick: open
      })
    }), React.createElement("img", _extends({
      src: itemImage
    }, itemImageData)), React.createElement(InnerBlocks, {
      allowedBlocks: ALLOWED_BLOCKS
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
    registerBlockType(category.slug + '/inclind-icon-grid-container', {
      title: __('Icon Grid Container', 'inclind-icon-grid-container'),
      description: __('Description', 'inclind-blocks'),
      category: 'inclind-blocks',
      keywords: [__('icon', 'inclind-icon-grid-container'), __('inclind', 'inclind-icon-grid-container'), __('grid container', 'inclind-icon-grid-container')],
      attributes: {
        itemTitle: {
          selector: '.item-title',
          type: 'string'
        },
        itemImage: {
          type: 'string'
        },
        itemImageData: {
          type: 'object',
          default: {}
        }
      },
      // Render the block components.
      edit: InclindIconGridContainer,
      // Save the attributes and markup.
      save: function (props) {
        const {
          itemTitle,
          itemImage,
          itemImageData
        } = props.attributes; // Save the block markup for the front end.

        return React.createElement(_iconGridContainer.default, props, React.createElement("div", {
          className: "container"
        }, React.createElement("div", {
          className: "row text-center"
        }, itemTitle && React.createElement(RichText.Content, {
          tagName: "h2",
          className: "item-title emb-center",
          value: itemTitle
        }), React.createElement(InnerBlocks.Content, null)), React.createElement("div", {
          className: "img img-bg"
        }, React.createElement("img", _extends({
          src: itemImage,
          className: "card-img-top"
        }, itemImageData)))));
      }
    });
  }
}