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