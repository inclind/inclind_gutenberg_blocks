(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0; // Setup the block.

const {
  Component
} = wp.element;
/**
 * Create a Card wrapper Component.
 */

class AccordionItem extends Component {
  constructor(props) {
    super(...arguments);
  }

  makeId(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  render() {
    if (this.props.attributes.itemId === undefined || this.props.attributes.itemId === '') {
      this.props.attributes.itemId = this.makeId(10);
    }

    let className = 'card';

    if (this.props.className !== 'wp-block-inclind-blocks-inclind-accordion-item') {
      className = className + ' ' + this.props.className;
    }

    return React.createElement("div", {
      className: className
    }, this.props.children);
  }

}

exports.default = AccordionItem;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const icon = {
  'iconAdd': 'M368.5 240H272v-96.5c0-8.8-7.2-16-16-16s-16 7.2-16 16V240h-96.5c-8.8 0-16 7.2-16 16 0 4.4 1.8 8.4 4.7 11.3 2.9 2.9 6.9 4.7 11.3 4.7H240v96.5c0 4.4 1.8 8.4 4.7 11.3 2.9 2.9 6.9 4.7 11.3 4.7 8.8 0 16-7.2 16-16V272h96.5c8.8 0 16-7.2 16-16s-7.2-16-16-16z',
  'iconRemove': 'M368.5 240h-225c-8.8 0-16 7.2-16 16 0 4.4 1.8 8.4 4.7 11.3 2.9 2.9 6.9 4.7 11.3 4.7h225c8.8 0 16-7.2 16-16s-7.2-16-16-16z'
};
var _default = icon;
exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0; // Setup the block.

const {
  Component
} = wp.element; // Import Inspector components.

const {
  InspectorControls
} = wp.editor; // Import block components.

const {
  PanelBody
} = wp.components;
/**
 * Create an Inspector Controls wrapper Component.
 */

class Inspector extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    return React.createElement(InspectorControls, {
      key: "inspector"
    }, React.createElement(PanelBody, null));
  }

}

exports.default = Inspector;

},{}],4:[function(require,module,exports){
"use strict";

var _classnames = _interopRequireDefault(require("classnames"));

var _inspector = _interopRequireDefault(require("./components/inspector"));

var _accordionItem = _interopRequireDefault(require("./components/accordion-item"));

var _icon = _interopRequireDefault(require("./components/icon"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
} // Import block dependencies and components
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

},{"./components/accordion-item":1,"./components/icon":2,"./components/inspector":3,"classnames":33}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0; // Setup the block.

const {
  Component
} = wp.element;
/**
 * Create a Accordion wrapper Component.
 */

class Accordion extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    let className = 'accordion';

    if (this.props.className !== 'wp-block-inclind-blocks-inclind-accordion') {
      className = className + ' ' + this.props.className;
    }

    return React.createElement("div", {
      className: className
    }, this.props.children);
  }

}

exports.default = Accordion;

},{}],6:[function(require,module,exports){
"use strict";

var _accordion = _interopRequireDefault(require("./components/accordion"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
} // Import block dependencies and components
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
} = wp.editor; // Register components

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
  title: __('Inclind Blocks')
}; // Grab the current categories and merge in the new category if not present.

const currentCategories = select('core/blocks').getCategories().filter(item => item.slug !== category.slug);
dispatch('core/blocks').setCategories([category, ...currentCategories]); // End Drupal Specific.
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

},{"./components/accordion":5}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0; // Setup the block.

const {
  Component
} = wp.element;
/**
 * Create a Infobox wrapper Component.
 */

class CallToAction extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    let className = 'call-to-action';

    if (this.props.className !== 'wp-block-inclind-blocks-inclind-call-to-action') {
      className = className + ' ' + this.props.className;
    }

    return React.createElement("div", {
      className: className
    }, this.props.children);
  }

}

exports.default = CallToAction;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0; // Setup the block.

const {
  Component
} = wp.element; // Import Inspector components.

const {
  InspectorControls
} = wp.editor; // Import block components.

const {
  PanelBody
} = wp.components;
/**
 * Create an Inspector Controls wrapper Component.
 */

class Inspector extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const {} = this.props.attributes;
    return React.createElement(InspectorControls, {
      key: "inspector"
    }, React.createElement(PanelBody, null));
  }

}

exports.default = Inspector;

},{}],9:[function(require,module,exports){
"use strict";

var _classnames = _interopRequireDefault(require("classnames"));

var _inspector = _interopRequireDefault(require("./components/inspector"));

var _calltoaction = _interopRequireDefault(require("./components/calltoaction"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
} // Import block dependencies and components
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
  title: __('Inclind Blocks')
}; // Grab the current categories and merge in the new category if not present.

const currentCategories = select('core/blocks').getCategories().filter(item => item.slug !== category.slug);
dispatch('core/blocks').setCategories([category, ...currentCategories]); // End Drupal Specific.
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

},{"./components/calltoaction":7,"./components/inspector":8,"classnames":33}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
} // Setup the block.


const {
  Component
} = wp.element; // Import block dependencies and components

/**
 * Create a Card wrapper Component.
 */

class Card extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    const {
      cardStyle
    } = this.props.attributes;
    let className = 'card ' + cardStyle;

    if (this.props.className !== 'wp-block-inclind-blocks-inclind-card') {
      className = className + ' ' + this.props.className;
    }

    return React.createElement("div", {
      className: className
    }, this.props.children);
  }

}

exports.default = Card;

},{"classnames":33}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const icon = {
  'iconArrow': 'M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z'
};
var _default = icon;
exports.default = _default;

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0; // Internationalization

const __ = Drupal.t; // Setup the block.

const {
  Component
} = wp.element; // Import Inspector components.

const {
  InspectorControls
} = wp.editor; // Import block components.

const {
  SelectControl,
  PanelBody
} = wp.components;
/**
 * Create an Inspector Controls wrapper Component.
 */

class Inspector extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const {
      cardStyle
    } = this.props.attributes;
    const cardOptions = [{
      value: '',
      label: __('Card')
    }, {
      value: 'card-bg',
      label: __('Card BG')
    }, {
      value: 'card-invert',
      label: __('Card Invert')
    }];
    return React.createElement(InspectorControls, {
      key: "inspector"
    }, React.createElement(PanelBody, null, React.createElement(SelectControl, {
      label: __('Card Style'),
      description: __('Choose the style of the card.'),
      options: cardOptions,
      value: cardStyle,
      onChange: value => this.props.setAttributes({
        cardStyle: value
      })
    })));
  }

}

exports.default = Inspector;

},{}],13:[function(require,module,exports){
"use strict";

var _classnames = _interopRequireDefault(require("classnames"));

var _inspector = _interopRequireDefault(require("./components/inspector"));

var _card = _interopRequireDefault(require("./components/card"));

var _icon = _interopRequireDefault(require("./components/icon"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
} // Internationalization


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
} = wp.editor; // Register components

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
  title: __('Inclind Blocks')
}; // Grab the current categories and merge in the new category if not present.

const currentCategories = select('core/blocks').getCategories().filter(item => item.slug !== category.slug);
dispatch('core/blocks').setCategories([category, ...currentCategories]); // End Drupal Specific.
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

},{"./components/card":10,"./components/icon":11,"./components/inspector":12,"classnames":33}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0; // Setup the block.

const {
  Component
} = wp.element;
/**
 * Create a Icon Grid wrapper Component.
 */

class IconGridContainer extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    let className = 'icon-grid-with-text';

    if (this.props.className !== 'wp-block-inclind-blocks-inclind-icon-grid-container') {
      className = className + ' ' + this.props.className;
    }

    return React.createElement("div", {
      className: className
    }, this.props.children);
  }

}

exports.default = IconGridContainer;

},{}],15:[function(require,module,exports){
"use strict";

var _iconGridContainer = _interopRequireDefault(require("./components/icon-grid-container"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
} // Internationalization


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
} = wp.editor; // Register components

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
  title: __('Inclind Blocks')
}; // Grab the current categories and merge in the new category if not present.

const currentCategories = select('core/blocks').getCategories().filter(item => item.slug !== category.slug);
dispatch('core/blocks').setCategories([category, ...currentCategories]); // End Drupal Specific.
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

},{"./components/icon-grid-container":14,"classnames":33}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0; // Setup the block.

const {
  Component
} = wp.element;
/**
 * Create a Icon Grid Item wrapper Component.
 */

class IconGridItem extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    let className = 'col-sm-12 col-md';

    if (this.props.className !== 'wp-block-inclind-blocks-inclind-icon-grid-item') {
      className = className + ' ' + this.props.className;
    }

    return React.createElement("div", {
      className: className
    }, this.props.children);
  }

}

exports.default = IconGridItem;

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const icon = {
  'clock': React.createElement("svg", {
    version: "1.1",
    id: "Layer_1",
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    viewBox: "0 0 512 512",
    "enable-background": "new 0 0 512 512",
    "xml:space": "preserve"
  }, React.createElement("g", null, React.createElement("path", {
    d: "M403.1,108.9c-81.2-81.2-212.9-81.2-294.2,0c-81.3,81.2-81.2,212.9,0,294.2c81.2,81.2,212.9,81.2,294.2,0 C484.3,321.9,484.3,190.1,403.1,108.9z M386.6,162.1c7.6-4.4,17.5-1.8,21.9,5.9c4.4,7.6,1.8,17.5-5.9,21.9 c-7.6,4.4-17.5,1.8-21.9-5.9C376.3,176.4,378.9,166.5,386.6,162.1z M80,256c0-8.8,7.2-16,16-16s16,7.2,16,16s-7.2,16-16,16 S80,264.8,80,256z M125.4,349.9c-7.6,4.4-17.5,1.8-21.9-5.9c-4.4-7.6-1.8-17.5,5.9-21.9c7.6-4.4,17.5-1.8,21.9,5.9 C135.7,335.6,133.1,345.5,125.4,349.9z M131.3,184c-4.4,7.6-14.2,10.3-21.9,5.9c-7.6-4.4-10.3-14.2-5.9-21.9 c4.4-7.6,14.2-10.3,21.9-5.9C133.1,166.5,135.7,176.4,131.3,184z M168,103.6c7.6-4.4,17.5-1.8,21.9,5.9c4.4,7.6,1.8,17.5-5.9,21.9 s-17.5,1.8-21.9-5.9C157.7,117.8,160.4,108,168,103.6z M160.2,214.3l15.6-26.6l95.2,56.9V384h-31V260.6L160.2,214.3z M189.9,402.6 c-4.4,7.6-14.2,10.3-21.9,5.9s-10.3-14.2-5.9-21.9c4.4-7.6,14.2-10.3,21.9-5.9C191.6,385.1,194.3,394.9,189.9,402.6z M256,432 c-8.8,0-16-7.2-16-16s7.2-16,16-16s16,7.2,16,16S264.8,432,256,432z M256,112c-8.8,0-16-7.2-16-16c0-8.8,7.2-16,16-16s16,7.2,16,16 C272,104.8,264.8,112,256,112z M344,408.4c-7.6,4.4-17.5,1.8-21.9-5.9c-4.4-7.6-1.8-17.5,5.9-21.9c7.6-4.4,17.5-1.8,21.9,5.9 C354.3,394.2,351.6,404,344,408.4z M349.9,125.4c-4.4,7.6-14.2,10.3-21.9,5.9s-10.3-14.2-5.9-21.9c4.4-7.6,14.2-10.3,21.9-5.9 S354.3,117.8,349.9,125.4z M408.4,344c-4.4,7.6-14.2,10.3-21.9,5.9c-7.6-4.4-10.3-14.2-5.9-21.9c4.4-7.6,14.2-10.3,21.9-5.9 C410.2,326.5,412.8,336.4,408.4,344z M416,272c-8.8,0-16-7.2-16-16s7.2-16,16-16c8.8,0,16,7.2,16,16S424.8,272,416,272z"
  }))),
  'flame': React.createElement("svg", {
    version: "1.1",
    id: "Layer_1",
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    viewBox: "0 0 512 512",
    style: "enable-background:new 0 0 512 512;",
    "xml:space": "preserve"
  }, React.createElement("g", null, React.createElement("path", {
    d: "M220.1,48c29,134.6-109.1,131.9-108.1,267.4c0.8,111,118.4,148.6,144.5,148.6c26.1,0,134.8-23.6,143.1-148.6 C406.7,209,317.9,107.4,220.1,48z M294.4,402.7c-10.2,38.9-66,39-76.4,0.1c-1.5-5.6-2.4-11.5-2.4-17.5c0-41,40.6-88.3,40.6-88.3 s40.4,47.3,40.4,88.3C296.7,391.3,295.9,397.1,294.4,402.7z"
  }))),
  'snowflake': React.createElement("svg", {
    version: "1.1",
    id: "Layer_1",
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    viewBox: "0 0 512 512",
    "enable-background": "new 0 0 512 512",
    "xml:space": "preserve"
  }, React.createElement("polygon", {
    points: "461.4,298.5 453.1,267.6 365.1,291.2 304.7,256.3 365.1,221.4 453.1,245 461.4,214.1 404.3,198.8 462,165.5 438,124 381.4,156.7 396.7,99.6 365.8,91.3 342.2,179.3 280,215.2 280,144.1 344.5,79.7 321.8,57.1 280,98.9 280,32 232,32 232,97.6 190.3,55.9 167.7,78.5 232,142.9 232,214.3 171.3,179.3 147.7,91.3 116.8,99.6 132.1,156.7 74.4,123.3 50.4,164.9 107.1,197.6 50,212.9 58.3,243.8 146.2,220.2 208.8,256.3 146.2,292.5 58.3,268.9 50,299.8 107.1,315.1 50.4,347.8 74.4,389.3 132.1,356 116.8,413 147.7,421.3 171.3,333.4 232,298.3 232,369.2 167.7,433.6 190.3,456.2 232,414.4 232,480 280,480 280,413.2 321.9,454.9 344.4,432.3 280,368 280,297.4 342.2,333.4 365.8,421.3 396.7,413 381.4,356 438,388.7 462,347.1 404.3,313.8 "
  })),
  'sun': React.createElement("svg", {
    version: "1.1",
    id: "Layer_1",
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    viewBox: "0 0 512 512",
    style: "enable-background:new 0 0 512 512;",
    "xml:space": "preserve"
  }, React.createElement("g", null, React.createElement("g", null, React.createElement("path", {
    d: "M256,387c-8.5,0-15.4,6.9-15.4,15.4v46.2c0,8.5,6.9,15.4,15.4,15.4s15.4-6.9,15.4-15.4v-46.2 C271.4,393.9,264.5,387,256,387z"
  }), React.createElement("path", {
    d: "M256,48c-8.5,0-15.4,6.9-15.4,15.4v46.2c0,8.5,6.9,15.4,15.4,15.4s15.4-6.9,15.4-15.4V63.4C271.4,54.9,264.5,48,256,48z"
  }), React.createElement("path", {
    d: "M125,256c0-8.5-6.9-15.4-15.4-15.4H63.4c-8.5,0-15.4,6.9-15.4,15.4c0,8.5,6.9,15.4,15.4,15.4h46.2 C118.1,271.4,125,264.5,125,256z"
  }), React.createElement("path", {
    d: "M448.6,240.6h-46.2c-8.5,0-15.4,6.9-15.4,15.4c0,8.5,6.9,15.4,15.4,15.4h46.2c8.5,0,15.4-6.9,15.4-15.4 C464,247.5,457.1,240.6,448.6,240.6z"
  }), React.createElement("path", {
    d: "M152.5,344.1c-4.1,0-8,1.6-10.9,4.5l-32.7,32.7c-2.9,2.9-4.5,6.8-4.5,10.9s1.6,8,4.5,10.9c2.9,2.9,6.8,4.5,10.9,4.5 c4.1,0,8-1.6,10.9-4.5l32.7-32.7c6-6,6-15.8,0-21.8C160.5,345.7,156.6,344.1,152.5,344.1z"
  }), React.createElement("path", {
    d: "M359.5,167.9c4.1,0,8-1.6,10.9-4.5l32.7-32.7c2.9-2.9,4.5-6.8,4.5-10.9s-1.6-8-4.5-10.9c-2.9-2.9-6.8-4.5-10.9-4.5 c-4.1,0-8,1.6-10.9,4.5l-32.7,32.7c-2.9,2.9-4.5,6.8-4.5,10.9s1.6,8,4.5,10.9C351.5,166.3,355.4,167.9,359.5,167.9z"
  }), React.createElement("path", {
    d: "M130.7,108.9c-2.9-2.9-6.8-4.5-10.9-4.5c-4.1,0-8,1.6-10.9,4.5c-2.9,2.9-4.5,6.8-4.5,10.9c0,4.1,1.6,8,4.5,10.9l32.7,32.7 c2.9,2.9,6.8,4.5,10.9,4.5c4.1,0,8-1.6,10.9-4.5c2.9-2.9,4.5-6.8,4.5-10.9s-1.6-8-4.5-10.9L130.7,108.9z"
  }), React.createElement("path", {
    d: "M370.4,348.6c-2.9-2.9-6.8-4.5-10.9-4.5c-4.1,0-8,1.6-10.9,4.5c-6,6-6,15.8,0,21.8l32.7,32.7c2.9,2.9,6.8,4.5,10.9,4.5 c4.1,0,8-1.6,10.9-4.5c2.9-2.9,4.5-6.8,4.5-10.9s-1.6-8-4.5-10.9L370.4,348.6z"
  })), React.createElement("path", {
    d: "M256,160c-52.9,0-96,43.1-96,96s43.1,96,96,96c52.9,0,96-43.1,96-96S308.9,160,256,160L256,160z"
  }))),
  'switch': React.createElement("svg", {
    version: "1.1",
    id: "Layer_1",
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    viewBox: "0 0 512 512",
    style: "enable-background:new 0 0 512 512;",
    "xml:space": "preserve"
  }, React.createElement("g", null, React.createElement("circle", {
    cx: "144",
    cy: "368",
    r: "42"
  }), React.createElement("path", {
    d: "M367.5,272h-223C91.2,272,48,315.2,48,368.5S91.2,464,144.5,464h223c53.3,0,96.5-42.2,96.5-95.5S420.8,272,367.5,272z M144,432c-35.3,0-64-28.7-64-64c0-35.3,28.7-64,64-64s64,28.7,64,64C208,403.3,179.3,432,144,432z"
  }), React.createElement("circle", {
    cx: "368",
    cy: "144",
    r: "42"
  }), React.createElement("path", {
    d: "M144.5,240h223c53.3,0,96.5-42.2,96.5-95.5S420.8,48,367.5,48h-223C91.2,48,48,91.2,48,144.5S91.2,240,144.5,240z M368,80 c35.3,0,64,28.7,64,64c0,35.3-28.7,64-64,64s-64-28.7-64-64C304,108.7,332.7,80,368,80z"
  })))
};
var _default = icon;
exports.default = _default;

},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0; // Internationalization

const __ = Drupal.t; // Setup the block.

const {
  Component
} = wp.element; // Import block components.

const {
  SelectControl,
  PanelBody
} = wp.components; // Import Inspector components.

const {
  InspectorControls
} = wp.editor;
/**
 * Create an Inspector Controls wrapper Component.
 */

class Inspector extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const {
      itemIcon
    } = this.props.attributes;
    const iconOptions = [{
      value: '',
      label: __('None')
    }, {
      value: 'clock',
      label: __('Clock')
    }, {
      value: 'flame',
      label: __('Flame')
    }, {
      value: 'snowflake',
      label: __('Snowflake')
    }, {
      value: 'sun',
      label: __('Sun')
    }, {
      value: 'switch',
      label: __('Switch')
    }];
    return React.createElement(InspectorControls, {
      key: "inspector"
    }, React.createElement(PanelBody, null, React.createElement(SelectControl, {
      label: __('Icon'),
      description: __('Choose the icon for this item.'),
      options: iconOptions,
      value: itemIcon,
      onChange: value => this.props.setAttributes({
        itemIcon: value
      })
    })));
  }

}

exports.default = Inspector;

},{}],19:[function(require,module,exports){
"use strict";

var _classnames = _interopRequireDefault(require("classnames"));

var _inspector = _interopRequireDefault(require("./components/inspector"));

var _iconGridItem = _interopRequireDefault(require("./components/icon-grid-item"));

var _icon = _interopRequireDefault(require("./components/icon"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
} // Import block dependencies and components
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
  title: __('Inclind Blocks')
}; // Grab the current categories and merge in the new category if not present.

const currentCategories = select('core/blocks').getCategories().filter(item => item.slug !== category.slug);
dispatch('core/blocks').setCategories([category, ...currentCategories]); // End Drupal Specific.
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

},{"./components/icon":17,"./components/icon-grid-item":16,"./components/inspector":18,"classnames":33}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0; // Setup the block.

const {
  Component
} = wp.element;
/**
 * Create a Icon Link wrapper Component.
 */

class IconLink extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    let className = '';

    if (this.props.className !== 'wp-block-inclind-blocks-inclind-icon-link') {
      className = className + '' + this.props.className;
    }

    return React.createElement("div", {
      className: className
    }, this.props.children);
  }

}

exports.default = IconLink;

},{}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const icon = {
  'clock': React.createElement("svg", {
    version: "1.1",
    id: "Layer_1",
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    viewBox: "0 0 512 512",
    "enable-background": "new 0 0 512 512",
    "xml:space": "preserve"
  }, React.createElement("g", null, React.createElement("path", {
    d: "M403.1,108.9c-81.2-81.2-212.9-81.2-294.2,0c-81.3,81.2-81.2,212.9,0,294.2c81.2,81.2,212.9,81.2,294.2,0 C484.3,321.9,484.3,190.1,403.1,108.9z M386.6,162.1c7.6-4.4,17.5-1.8,21.9,5.9c4.4,7.6,1.8,17.5-5.9,21.9 c-7.6,4.4-17.5,1.8-21.9-5.9C376.3,176.4,378.9,166.5,386.6,162.1z M80,256c0-8.8,7.2-16,16-16s16,7.2,16,16s-7.2,16-16,16 S80,264.8,80,256z M125.4,349.9c-7.6,4.4-17.5,1.8-21.9-5.9c-4.4-7.6-1.8-17.5,5.9-21.9c7.6-4.4,17.5-1.8,21.9,5.9 C135.7,335.6,133.1,345.5,125.4,349.9z M131.3,184c-4.4,7.6-14.2,10.3-21.9,5.9c-7.6-4.4-10.3-14.2-5.9-21.9 c4.4-7.6,14.2-10.3,21.9-5.9C133.1,166.5,135.7,176.4,131.3,184z M168,103.6c7.6-4.4,17.5-1.8,21.9,5.9c4.4,7.6,1.8,17.5-5.9,21.9 s-17.5,1.8-21.9-5.9C157.7,117.8,160.4,108,168,103.6z M160.2,214.3l15.6-26.6l95.2,56.9V384h-31V260.6L160.2,214.3z M189.9,402.6 c-4.4,7.6-14.2,10.3-21.9,5.9s-10.3-14.2-5.9-21.9c4.4-7.6,14.2-10.3,21.9-5.9C191.6,385.1,194.3,394.9,189.9,402.6z M256,432 c-8.8,0-16-7.2-16-16s7.2-16,16-16s16,7.2,16,16S264.8,432,256,432z M256,112c-8.8,0-16-7.2-16-16c0-8.8,7.2-16,16-16s16,7.2,16,16 C272,104.8,264.8,112,256,112z M344,408.4c-7.6,4.4-17.5,1.8-21.9-5.9c-4.4-7.6-1.8-17.5,5.9-21.9c7.6-4.4,17.5-1.8,21.9,5.9 C354.3,394.2,351.6,404,344,408.4z M349.9,125.4c-4.4,7.6-14.2,10.3-21.9,5.9s-10.3-14.2-5.9-21.9c4.4-7.6,14.2-10.3,21.9-5.9 S354.3,117.8,349.9,125.4z M408.4,344c-4.4,7.6-14.2,10.3-21.9,5.9c-7.6-4.4-10.3-14.2-5.9-21.9c4.4-7.6,14.2-10.3,21.9-5.9 C410.2,326.5,412.8,336.4,408.4,344z M416,272c-8.8,0-16-7.2-16-16s7.2-16,16-16c8.8,0,16,7.2,16,16S424.8,272,416,272z"
  }))),
  'flame': React.createElement("svg", {
    version: "1.1",
    id: "Layer_1",
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    viewBox: "0 0 512 512",
    style: "enable-background:new 0 0 512 512;",
    "xml:space": "preserve"
  }, React.createElement("g", null, React.createElement("path", {
    d: "M220.1,48c29,134.6-109.1,131.9-108.1,267.4c0.8,111,118.4,148.6,144.5,148.6c26.1,0,134.8-23.6,143.1-148.6 C406.7,209,317.9,107.4,220.1,48z M294.4,402.7c-10.2,38.9-66,39-76.4,0.1c-1.5-5.6-2.4-11.5-2.4-17.5c0-41,40.6-88.3,40.6-88.3 s40.4,47.3,40.4,88.3C296.7,391.3,295.9,397.1,294.4,402.7z"
  }))),
  'ios-document': React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, React.createElement("path", {
    d: "M312 155h91c2.8 0 5-2.2 5-5 0-8.9-3.9-17.3-10.7-22.9L321 63.5c-5.8-4.8-13-7.4-20.6-7.4-4.1 0-7.4 3.3-7.4 7.4V136c0 10.5 8.5 19 19 19z"
  }), React.createElement("path", {
    d: "M267 136V56H136c-17.6 0-32 14.4-32 32v336c0 17.6 14.4 32 32 32h240c17.6 0 32-14.4 32-32V181h-96c-24.8 0-45-20.2-45-45z"
  })),
  'ios-information': React.createElement("svg", {
    version: "1.1",
    id: "Layer_1",
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    viewBox: "0 0 512 512",
    style: "enable-background:new 0 0 512 512;",
    "xml:space": "preserve"
  }, React.createElement("g", null, React.createElement("path", {
    d: "M256,48C141.1,48,48,141.1,48,256s93.1,208,208,208c114.9,0,208-93.1,208-208S370.9,48,256,48z M275,352h-38.2V207.9H275 V352z M255.9,192.2c-11.3,0-20.5-8.6-20.5-20s9.3-19.9,20.5-19.9c11.4,0,20.7,8.5,20.7,19.9S267.3,192.2,255.9,192.2z"
  }))),
  'ios-mail': React.createElement("svg", {
    version: "1.1",
    id: "Layer_1",
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    viewBox: "0 0 512 512",
    style: "enable-background:new 0 0 512 512;",
    "xml:space": "preserve"
  }, React.createElement("g", null, React.createElement("path", {
    d: "M460.6,147.3L353,256.9c-0.8,0.8-0.8,2,0,2.8l75.3,80.2c5.1,5.1,5.1,13.3,0,18.4c-2.5,2.5-5.9,3.8-9.2,3.8 s-6.7-1.3-9.2-3.8l-75-79.9c-0.8-0.8-2.1-0.8-2.9,0l-18.3,18.6c-15.3,15.5-35.6,24.1-57.4,24.2c-22.1,0.1-43.1-9.2-58.6-24.9 l-17.6-17.9c-0.8-0.8-2.1-0.8-2.9,0l-75,79.9c-2.5,2.5-5.9,3.8-9.2,3.8s-6.7-1.3-9.2-3.8c-5.1-5.1-5.1-13.3,0-18.4l75.3-80.2 c0.7-0.8,0.7-2,0-2.8L51.4,147.3c-1.3-1.3-3.4-0.4-3.4,1.4L48,368c0,17.6,14.4,32,32,32h352c17.6,0,32-14.4,32-32l0-219.3 C464,146.9,461.8,146.1,460.6,147.3z"
  }), React.createElement("path", {
    d: "M256,295.1c14.8,0,28.7-5.8,39.1-16.4L452,119c-5.5-4.4-12.3-7-19.8-7H79.9c-7.5,0-14.4,2.6-19.8,7l156.9,159.7 C227.3,289.2,241.2,295.1,256,295.1z"
  }))),
  'ios-phone-portrait': React.createElement("svg", {
    version: "1.1",
    id: "Layer_1",
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    viewBox: "0 0 512 512",
    style: "enable-background:new 0 0 512 512;",
    "xml:space": "preserve"
  }, React.createElement("g", null, React.createElement("path", {
    d: "M335.7,32H177.1C158.8,32,144,46.6,144,64.9v381c0,18.4,14.8,34.1,33.1,34.1h158.5c18.3,0,32.3-15.7,32.3-34.1v-381 C368,46.6,354,32,335.7,32z M241,55h30c2.2,0,4,1.8,4,4c0,2.2-1.8,4-4,4h-30c-2.2,0-4-1.8-4-4C237,56.8,238.8,55,241,55z M256.5,465c-9.6,0-17.4-7.8-17.4-17.4c0-9.6,7.8-17.4,17.4-17.4c9.6,0,17.4,7.8,17.4,17.4C273.9,457.2,266.1,465,256.5,465z M350,416H162c-1.1,0-2-0.9-2-2V85c0-1.1,0.9-2,2-2h188c1.1,0,2,0.9,2,2v329C352,415.1,351.1,416,350,416z"
  }))),
  'snowflake': React.createElement("svg", {
    version: "1.1",
    id: "Layer_1",
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    viewBox: "0 0 512 512",
    "enable-background": "new 0 0 512 512",
    "xml:space": "preserve"
  }, React.createElement("polygon", {
    points: "461.4,298.5 453.1,267.6 365.1,291.2 304.7,256.3 365.1,221.4 453.1,245 461.4,214.1 404.3,198.8 462,165.5 438,124 381.4,156.7 396.7,99.6 365.8,91.3 342.2,179.3 280,215.2 280,144.1 344.5,79.7 321.8,57.1 280,98.9 280,32 232,32 232,97.6 190.3,55.9 167.7,78.5 232,142.9 232,214.3 171.3,179.3 147.7,91.3 116.8,99.6 132.1,156.7 74.4,123.3 50.4,164.9 107.1,197.6 50,212.9 58.3,243.8 146.2,220.2 208.8,256.3 146.2,292.5 58.3,268.9 50,299.8 107.1,315.1 50.4,347.8 74.4,389.3 132.1,356 116.8,413 147.7,421.3 171.3,333.4 232,298.3 232,369.2 167.7,433.6 190.3,456.2 232,414.4 232,480 280,480 280,413.2 321.9,454.9 344.4,432.3 280,368 280,297.4 342.2,333.4 365.8,421.3 396.7,413 381.4,356 438,388.7 462,347.1 404.3,313.8 "
  })),
  'sun': React.createElement("svg", {
    version: "1.1",
    id: "Layer_1",
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    viewBox: "0 0 512 512",
    style: "enable-background:new 0 0 512 512;",
    "xml:space": "preserve"
  }, React.createElement("g", null, React.createElement("g", null, React.createElement("path", {
    d: "M256,387c-8.5,0-15.4,6.9-15.4,15.4v46.2c0,8.5,6.9,15.4,15.4,15.4s15.4-6.9,15.4-15.4v-46.2 C271.4,393.9,264.5,387,256,387z"
  }), React.createElement("path", {
    d: "M256,48c-8.5,0-15.4,6.9-15.4,15.4v46.2c0,8.5,6.9,15.4,15.4,15.4s15.4-6.9,15.4-15.4V63.4C271.4,54.9,264.5,48,256,48z"
  }), React.createElement("path", {
    d: "M125,256c0-8.5-6.9-15.4-15.4-15.4H63.4c-8.5,0-15.4,6.9-15.4,15.4c0,8.5,6.9,15.4,15.4,15.4h46.2 C118.1,271.4,125,264.5,125,256z"
  }), React.createElement("path", {
    d: "M448.6,240.6h-46.2c-8.5,0-15.4,6.9-15.4,15.4c0,8.5,6.9,15.4,15.4,15.4h46.2c8.5,0,15.4-6.9,15.4-15.4 C464,247.5,457.1,240.6,448.6,240.6z"
  }), React.createElement("path", {
    d: "M152.5,344.1c-4.1,0-8,1.6-10.9,4.5l-32.7,32.7c-2.9,2.9-4.5,6.8-4.5,10.9s1.6,8,4.5,10.9c2.9,2.9,6.8,4.5,10.9,4.5 c4.1,0,8-1.6,10.9-4.5l32.7-32.7c6-6,6-15.8,0-21.8C160.5,345.7,156.6,344.1,152.5,344.1z"
  }), React.createElement("path", {
    d: "M359.5,167.9c4.1,0,8-1.6,10.9-4.5l32.7-32.7c2.9-2.9,4.5-6.8,4.5-10.9s-1.6-8-4.5-10.9c-2.9-2.9-6.8-4.5-10.9-4.5 c-4.1,0-8,1.6-10.9,4.5l-32.7,32.7c-2.9,2.9-4.5,6.8-4.5,10.9s1.6,8,4.5,10.9C351.5,166.3,355.4,167.9,359.5,167.9z"
  }), React.createElement("path", {
    d: "M130.7,108.9c-2.9-2.9-6.8-4.5-10.9-4.5c-4.1,0-8,1.6-10.9,4.5c-2.9,2.9-4.5,6.8-4.5,10.9c0,4.1,1.6,8,4.5,10.9l32.7,32.7 c2.9,2.9,6.8,4.5,10.9,4.5c4.1,0,8-1.6,10.9-4.5c2.9-2.9,4.5-6.8,4.5-10.9s-1.6-8-4.5-10.9L130.7,108.9z"
  }), React.createElement("path", {
    d: "M370.4,348.6c-2.9-2.9-6.8-4.5-10.9-4.5c-4.1,0-8,1.6-10.9,4.5c-6,6-6,15.8,0,21.8l32.7,32.7c2.9,2.9,6.8,4.5,10.9,4.5 c4.1,0,8-1.6,10.9-4.5c2.9-2.9,4.5-6.8,4.5-10.9s-1.6-8-4.5-10.9L370.4,348.6z"
  })), React.createElement("path", {
    d: "M256,160c-52.9,0-96,43.1-96,96s43.1,96,96,96c52.9,0,96-43.1,96-96S308.9,160,256,160L256,160z"
  }))),
  'switch': React.createElement("svg", {
    version: "1.1",
    id: "Layer_1",
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    viewBox: "0 0 512 512",
    style: "enable-background:new 0 0 512 512;",
    "xml:space": "preserve"
  }, React.createElement("g", null, React.createElement("circle", {
    cx: "144",
    cy: "368",
    r: "42"
  }), React.createElement("path", {
    d: "M367.5,272h-223C91.2,272,48,315.2,48,368.5S91.2,464,144.5,464h223c53.3,0,96.5-42.2,96.5-95.5S420.8,272,367.5,272z M144,432c-35.3,0-64-28.7-64-64c0-35.3,28.7-64,64-64s64,28.7,64,64C208,403.3,179.3,432,144,432z"
  }), React.createElement("circle", {
    cx: "368",
    cy: "144",
    r: "42"
  }), React.createElement("path", {
    d: "M144.5,240h223c53.3,0,96.5-42.2,96.5-95.5S420.8,48,367.5,48h-223C91.2,48,48,91.2,48,144.5S91.2,240,144.5,240z M368,80 c35.3,0,64,28.7,64,64c0,35.3-28.7,64-64,64s-64-28.7-64-64C304,108.7,332.7,80,368,80z"
  })))
};
var _default = icon;
exports.default = _default;

},{}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0; // Internationalization

const {
  __
} = wp.i18n; // Setup the block.

const {
  Component
} = wp.element; // Import block components.

const {
  SelectControl,
  PanelBody
} = wp.components; // Import Inspector components.

const {
  InspectorControls
} = wp.editor;
/**
 * Create an Inspector Controls wrapper Component.
 */

class Inspector extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const {
      itemIcon
    } = this.props.attributes;
    const iconOptions = [{
      value: '',
      label: __('None')
    }, {
      value: 'ios-document',
      label: __('Document')
    }, {
      value: 'ios-information',
      label: __('Information')
    }, {
      value: 'ios-mail',
      label: __('Mail')
    }, {
      value: 'ios-phone-portrait',
      label: __('Phone')
    }, {
      value: 'clock',
      label: __('Clock')
    }, {
      value: 'flame',
      label: __('Flame')
    }, {
      value: 'snowflake',
      label: __('Snowflake')
    }, {
      value: 'sun',
      label: __('Sun')
    }, {
      value: 'switch',
      label: __('Switch')
    }];
    return React.createElement(InspectorControls, {
      key: "inspector"
    }, React.createElement(PanelBody, null, React.createElement(SelectControl, {
      label: __('Icon'),
      description: __('Choose the icon for this link.'),
      options: iconOptions,
      value: itemIcon,
      onChange: value => this.props.setAttributes({
        itemIcon: value
      })
    })));
  }

}

exports.default = Inspector;

},{}],23:[function(require,module,exports){
"use strict";

var _classnames = _interopRequireDefault(require("classnames"));

var _inspector = _interopRequireDefault(require("./components/inspector"));

var _iconLink = _interopRequireDefault(require("./components/icon-link"));

var _icon = _interopRequireDefault(require("./components/icon"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
} // Import block dependencies and components
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

},{"./components/icon":21,"./components/icon-link":20,"./components/inspector":22,"classnames":33}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const icon = {
  'iconHelp': 'M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm-4.3 304c-11.8 0-21.4-9-21.4-20.6 0-11.5 9.6-20.6 21.4-20.6 11.9 0 21.5 9 21.5 20.6 0 11.6-9.5 20.6-21.5 20.6zm40.2-96.9c-17.4 10.1-23.3 17.5-23.3 30.3v7.9h-34.7l-.3-8.6c-1.7-20.6 5.5-33.4 23.6-44 16.9-10.1 24-16.5 24-28.9s-12-21.5-26.9-21.5c-15.1 0-26 9.8-26.8 24.6H192c.7-32.2 24.5-55 64.7-55 37.5 0 63.3 20.8 63.3 50.7 0 19.9-9.6 33.6-28.1 44.5z'
};
var _default = icon;
exports.default = _default;

},{}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0; // Setup the block.

const {
  Component
} = wp.element;
/**
 * Create a Infobox wrapper Component.
 */

class Infobox extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    let className = 'infobox mb-0 row';

    if (this.props.className !== 'wp-block-inclind-blocks-inclind-infobox') {
      className = className + ' ' + this.props.className;
    }

    return React.createElement("div", {
      className: className
    }, this.props.children);
  }

}

exports.default = Infobox;

},{}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0; // Setup the block.

const {
  Component
} = wp.element; // Import block components.

const {
  PanelBody
} = wp.components; // Import Inspector components.

const {
  InspectorControls
} = wp.editor;
/**
 * Create an Inspector Controls wrapper Component.
 */

class Inspector extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    return React.createElement(InspectorControls, {
      key: "inspector"
    }, React.createElement(PanelBody, null));
  }

}

exports.default = Inspector;

},{}],27:[function(require,module,exports){
"use strict";

var _classnames = _interopRequireDefault(require("classnames"));

var _inspector = _interopRequireDefault(require("./components/inspector"));

var _infobox = _interopRequireDefault(require("./components/infobox"));

var _icon = _interopRequireDefault(require("./components/icon"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
} // Import block dependencies and components
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
// Register the block.

registerBlockType(category.slug + '/inclind-infobox', {
  title: __('Infobox', 'inclind-infobox'),
  description: __('Description', 'inclind-blocks'),
  category: 'inclind-blocks',
  keywords: [__('info', 'inclind-infobox'), __('infobox', 'inclind-infobox'), __('inclind', 'inclind-infobox')],
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

},{"./components/icon":24,"./components/infobox":25,"./components/inspector":26,"classnames":33}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0; // Setup the block.

const {
  Component
} = wp.element;
/**
 * Create a Infographic wrapper Component.
 */

class Infographic extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    let className = 'text-center bg-light pt-4 pb-2';

    if (this.props.className !== 'wp-block-inclind-blocks-inclind-infographic') {
      className = className + ' ' + this.props.className;
    }

    return React.createElement("div", {
      className: className
    }, this.props.children);
  }

}

exports.default = Infographic;

},{}],29:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"dup":3}],30:[function(require,module,exports){
"use strict";

var _classnames = _interopRequireDefault(require("classnames"));

var _inspector = _interopRequireDefault(require("./components/inspector"));

var _infographic = _interopRequireDefault(require("./components/infographic"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
} // Import block dependencies and components
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
  title: __('Inclind Blocks')
}; // Grab the current categories and merge in the new category if not present.

const currentCategories = select('core/blocks').getCategories().filter(item => item.slug !== category.slug);
dispatch('core/blocks').setCategories([category, ...currentCategories]); // End Drupal Specific.
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

},{"./components/infographic":28,"./components/inspector":29,"classnames":33}],31:[function(require,module,exports){
"use strict"; // Add a style for the icon grid.

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

},{}],32:[function(require,module,exports){
"use strict";

require("./blocks/accordion/index.js");

require("./blocks/accordion-item/index.js");

require("./blocks/card/index.js");

require("./blocks/infobox/index.js");

require("./blocks/call-to-action/index.js");

require("./blocks/icon-grid-container/index.js");

require("./blocks/icon-grid-item/index.js");

require("./blocks/icon-link/index.js");

require("./blocks/infographic/index.js");

require("./config/styles");

},{"./blocks/accordion-item/index.js":4,"./blocks/accordion/index.js":6,"./blocks/call-to-action/index.js":9,"./blocks/card/index.js":13,"./blocks/icon-grid-container/index.js":15,"./blocks/icon-grid-item/index.js":19,"./blocks/icon-link/index.js":23,"./blocks/infobox/index.js":27,"./blocks/infographic/index.js":30,"./config/styles":31}],33:[function(require,module,exports){
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());

},{}]},{},[32]);
