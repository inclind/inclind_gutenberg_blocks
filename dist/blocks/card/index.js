"use strict";

var _classnames = _interopRequireDefault(require("classnames"));

var _inspector = _interopRequireDefault(require("./components/inspector"));

var _card = _interopRequireDefault(require("./components/card"));

var _icon = _interopRequireDefault(require("./components/icon"));

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
  BlockControls,
  MediaUpload,
  URLInput
} = wp.blockEditor; // Register components

const {
  IconButton
} = wp.components;
const {
  dispatch,
  select
} = wp.data;

class InclindCard extends Component {
  render() {
    // Setup the attributes.
    const {
      attributes: {
        buttonText,
        cardUrl,
        cardContent,
        cardSubtitle,
        cardTitle,
        cardImage,
        cardImageAlt,
        cardImageTitle,
        cardImageData,
        cardStyle
      },
      isSelected,
      className,
      setAttributes
    } = this.props;

    const onSelectImage = (media, field) => {
      let mediaTitle = '';

      if (typeof media.title === 'string' || media.title instanceof String) {
        mediaTitle = media.title;
      } else {
        if (media.title.raw !== undefined && media.title.raw !== null) {
          mediaTitle = media.title.raw;
        }
      }

      setAttributes({
        [field]: media.url,
        cardImageData: getMediaAttrs(media),
        cardImageTitle: mediaTitle,
        cardImageAlt: media.alt_text
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

    return [// Show the alignment toolbar on focus.
    React.createElement(BlockControls, {
      key: "controls"
    }), // Show the block controls on focus.
    React.createElement(_inspector.default, this.props), // Show the block markup in the editor.
    React.createElement(_card.default, this.props, React.createElement(MediaUpload, {
      allowedTypes: ['image'],
      onSelect: media => onSelectImage(media, 'cardImage'),
      render: ({
        open
      }) => React.createElement(IconButton, {
        className: "components-toolbar__control",
        label: __('Edit image'),
        icon: "edit",
        onClick: open
      })
    }), React.createElement("img", _extends({
      src: cardImage
    }, cardImageData, {
      alt: cardImageAlt,
      title: cardImageTitle
    })), React.createElement(RichText, {
      tagName: "h6",
      placeholder: __("Card Subtitle", 'inclind-blocks'),
      keepPlaceholderOnFocus: true,
      value: cardSubtitle,
      className: (0, _classnames.default)('card-subtitle'),
      onChange: value => this.props.setAttributes({
        cardSubtitle: value
      })
    }), React.createElement(RichText, {
      tagName: "h3",
      placeholder: __("Card Title...", 'inclind-blocks'),
      keepPlaceholderOnFocus: true,
      value: cardTitle,
      className: (0, _classnames.default)('card-title'),
      onChange: value => this.props.setAttributes({
        cardTitle: value
      })
    }), React.createElement(RichText, {
      tagName: "p",
      placeholder: __("Card Content...", 'inclind-blocks'),
      keepPlaceholderOnFocus: true,
      value: cardContent,
      className: (0, _classnames.default)('card-text'),
      onChange: value => this.props.setAttributes({
        cardContent: value
      })
    }), React.createElement(RichText, {
      tagName: "p",
      placeholder: __('Button Text...', 'inclind-blocks'),
      keepPlaceholderOnFocus: true,
      value: buttonText,
      formattingControls: [],
      className: (0, _classnames.default)('btn', 'btn-secondary', 'btn-sm', 'icon'),
      onChange: value => setAttributes({
        buttonText: value
      })
    })), isSelected && React.createElement("form", {
      key: "form-link",
      onSubmit: event => event.preventDefault()
    }, React.createElement(URLInput, {
      className: "button-url",
      value: cardUrl,
      onChange: value => setAttributes({
        cardUrl: value
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

  if (blocks.hasOwnProperty(category.slug + '/inclind-card') && blocks[category.slug + '/inclind-card']) {
    // Register the block.
    registerBlockType(category.slug + '/inclind-card', {
      title: __('Card', 'inclind-card'),
      description: __('Description', 'inclind-blocks'),
      category: 'inclind-blocks',
      keywords: [__('card', 'inclind-card'), __('inclind', 'inclind-card')],
      attributes: {
        cardTitle: {
          selector: '.card-title',
          type: 'string'
        },
        cardSubtitle: {
          selector: '.card-subtitle',
          type: 'string'
        },
        cardContent: {
          type: 'array',
          selector: '.card-text',
          source: 'children'
        },
        buttonText: {
          type: 'string'
        },
        cardUrl: {
          type: 'string',
          source: 'attribute',
          selector: '.card-link',
          attribute: 'href'
        },
        cardImage: {
          type: 'string'
        },
        cardImageData: {
          type: 'object',
          default: {}
        },
        cardStyle: {
          type: 'string',
          default: ''
        },
        cardImageTitle: {
          type: 'string'
        },
        cardImageAlt: {
          type: 'string'
        }
      },
      // Render the block components.
      edit: InclindCard,
      // Save the attributes and markup.
      save: function (props) {
        const {
          buttonText,
          cardUrl,
          cardContent,
          cardSubtitle,
          cardTitle,
          cardImage,
          cardImageAlt,
          cardImageTitle,
          cardImageData
        } = props.attributes;
        const arrow = '<svg viewBox="0 0 500 500"><path d="' + _icon.default['iconArrow'] + '"></path></svg>'; // Save the block markup for the front end.

        return React.createElement(_card.default, props, React.createElement("a", {
          href: cardUrl,
          className: "img img-card"
        }, React.createElement("img", _extends({
          src: cardImage,
          className: "card-img-top"
        }, cardImageData, {
          alt: cardImageAlt,
          title: cardImageTitle
        }))), React.createElement("div", {
          class: "card-body"
        }, cardSubtitle && React.createElement(RichText.Content, {
          tagName: "h6",
          className: "card-subtitle",
          value: '<a href="' + cardUrl + '" class="card-link">' + cardSubtitle + '</a>'
        }), cardTitle && React.createElement(RichText.Content, {
          tagName: "h3",
          className: "card-title",
          value: '<a href="' + cardUrl + '" class="card-link">' + cardTitle + '</a>'
        }), cardContent && React.createElement(RichText.Content, {
          tagName: "p",
          className: "card-text",
          value: cardContent
        }), buttonText && React.createElement(RichText.Content, {
          tagName: "a",
          className: "btn btn-primary btn-tn icon",
          value: buttonText + '<span class="svgicon-default">' + arrow + '</span>',
          href: cardUrl
        })));
      }
    });
  }
}