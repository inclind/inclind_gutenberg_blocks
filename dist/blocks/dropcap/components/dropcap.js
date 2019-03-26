"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Setup the block.
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