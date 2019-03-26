(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
 * Create a drop cap wrapper Component.
 */

class DropCap extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const {
      dropCapAlignment,
      dropCapTextColor,
      dropCapFontSize,
      dropCapStyle
    } = this.props.attributes;
    return React.createElement("div", {
      style: {
        color: dropCapTextColor,
        textAlign: dropCapAlignment
      },
      className: (0, _classnames.default)(this.props.className, dropCapStyle, 'ab-font-size-' + dropCapFontSize, 'ab-block-drop-cap')
    }, this.props.children);
  }

}

exports.default = DropCap;

},{"classnames":6}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const icons = {};
icons.upload = React.createElement("svg", {
  width: "20px",
  height: "20px",
  viewBox: "0 0 100 100",
  xmlns: "http://www.w3.org/2000/svg"
}, React.createElement("path", {
  d: "m77.945 91.453h-72.371c-3.3711 0-5.5742-2.3633-5.5742-5.2422v-55.719c0-3.457 2.1172-6.0703 5.5742-6.0703h44.453v11.051l-38.98-0.003906v45.008h60.977v-17.133l11.988-0.007812v22.875c0 2.8789-2.7812 5.2422-6.0664 5.2422z"
}), React.createElement("path", {
  d: "m16.543 75.48l23.25-22.324 10.441 9.7773 11.234-14.766 5.5039 10.539 0.039063 16.773z"
}), React.createElement("path", {
  d: "m28.047 52.992c-3.168 0-5.7422-2.5742-5.7422-5.7461 0-3.1758 2.5742-5.75 5.7422-5.75 3.1797 0 5.7539 2.5742 5.7539 5.75 0 3.1719-2.5742 5.7461-5.7539 5.7461z"
}), React.createElement("path", {
  d: "m84.043 30.492v22.02h-12.059l-0.015625-22.02h-15.852l21.941-21.945 21.941 21.945z"
}));
var _default = icons;
exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0; // Setup the block.

const {
  __
} = wp.i18n;
const {
  Component
} = wp.element; // Import block components.

const {
  InspectorControls,
  BlockDescription,
  ColorPalette
} = wp.editor; // Import Inspector components.

const {
  Toolbar,
  Button,
  RangeControl,
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
    // Setup the attributes.
    const {
      dropCapFontSize,
      dropCapStyle
    } = this.props.attributes; // Drop cap style options.

    const dropCapOptions = [{
      value: 'ab-drop-cap-letter',
      label: __('Letter')
    }, {
      value: 'ab-drop-cap-square',
      label: __('Square')
    }, {
      value: 'ab-drop-cap-border',
      label: __('Border')
    }];
    return React.createElement(InspectorControls, {
      key: "inspector"
    }, React.createElement(PanelBody, null, React.createElement(RangeControl, {
      label: __('Drop Cap Size'),
      value: dropCapFontSize,
      onChange: value => this.props.setAttributes({
        dropCapFontSize: value
      }),
      min: 1,
      max: 6,
      step: 1
    }), React.createElement(SelectControl, {
      label: __('Drop Cap Style'),
      description: __('Choose the style of the drop cap in your paragraph.'),
      options: dropCapOptions,
      value: dropCapStyle,
      onChange: value => this.props.setAttributes({
        dropCapStyle: value
      })
    })));
  }

}

exports.default = Inspector;

},{}],4:[function(require,module,exports){
"use strict";

var _classnames = _interopRequireDefault(require("classnames"));

var _inspector = _interopRequireDefault(require("./components/inspector"));

var _dropcap = _interopRequireDefault(require("./components/dropcap"));

var _icons = _interopRequireDefault(require("./components/icons"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
} // Import block dependencies and components
// Import CSS
// import './styles/style.scss';
// import './styles/editor.scss';
// Internationalization


const {
  __
} = wp.i18n; // Extend component

const {
  Component
} = wp.element; // Register block

const {
  registerBlockType
} = wp.blocks; // Register editor components

const {
  RichText,
  AlignmentToolbar,
  BlockControls,
  BlockAlignmentToolbar,
  MediaUpload
} = wp.editor; // Register components

const {
  Button,
  SelectControl
} = wp.components; // ********* Drupal Specific

const {
  dispatch,
  select
} = data; // const __ = Drupal.t;
// ********* End Drupal Specific

class ABDropCapBlock extends Component {
  render() {
    // Setup the attributes.
    const {
      attributes: {
        dropCapContent,
        dropCapAlignment,
        dropCapBackgroundColor,
        dropCapTextColor,
        dropCapFontSize,
        dropCapStyle
      },
      isSelected,
      className,
      setAttributes
    } = this.props;
    return [// Show the alignment toolbar on focus.
    React.createElement(BlockControls, {
      key: "controls"
    }, React.createElement(AlignmentToolbar, {
      value: dropCapAlignment,
      onChange: value => this.props.setAttributes({
        dropCapAlignment: value
      })
    })), // Show the block controls on focus.
    React.createElement(_inspector.default, this.props), // Show the block markup in the editor.
    React.createElement(_dropcap.default, this.props, React.createElement(RichText, {
      tagName: "div",
      multiline: "p",
      placeholder: __('Add paragraph text...', 'atomic-blocks'),
      keepPlaceholderOnFocus: true,
      value: dropCapContent,
      formattingControls: ['bold', 'italic', 'strikethrough', 'link'],
      className: (0, _classnames.default)('ab-drop-cap-text', 'ab-font-size-' + dropCapFontSize),
      onChange: value => this.props.setAttributes({
        dropCapContent: value
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

registerBlockType(category.slug + '/inclind-drop-cap', {
  title: __('Inclind Drop Cap', 'inclind-drop-cap'),
  description: __('Add a styled drop cap to the beginning of your paragraph.', 'atomic-blocks'),
  icon: 'format-quote',
  category: 'inclind-blocks',
  keywords: [__('drop cap', 'inclind-drop-cap'), __('quote', 'inclind-drop-cap'), __('atomic', 'inclind-drop-cap')],
  attributes: {
    dropCapContent: {
      type: 'array',
      selector: '.ab-drop-cap-text',
      source: 'children'
    },
    dropCapAlignment: {
      type: 'string'
    },
    dropCapBackgroundColor: {
      type: 'string',
      default: '#f2f2f2'
    },
    dropCapTextColor: {
      type: 'string',
      default: '#32373c'
    },
    dropCapFontSize: {
      type: 'number',
      default: 3
    },
    dropCapStyle: {
      type: 'string',
      default: 'drop-cap-letter'
    }
  },
  // Render the block components.
  edit: ABDropCapBlock,
  // Save the attributes and markup.
  save: function (props) {
    const {
      dropCapContent,
      dropCapAlignment,
      dropCapBackgroundColor,
      dropCapTextColor,
      dropCapFontSize,
      dropCapStyle
    } = props.attributes; // Save the block markup for the front end.

    return React.createElement(_dropcap.default, props, // Check if there is text and output.
    dropCapContent && React.createElement(RichText.Content, {
      tagName: "div",
      className: "ab-drop-cap-text",
      value: dropCapContent
    }));
  }
});

},{"./components/dropcap":1,"./components/icons":2,"./components/inspector":3,"classnames":6}],5:[function(require,module,exports){
"use strict";

require("./blocks/dropcap/index.js");

},{"./blocks/dropcap/index.js":4}],6:[function(require,module,exports){
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

},{}]},{},[5]);
