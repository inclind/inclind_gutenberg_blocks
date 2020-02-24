"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// Setup the block.
const {
  Component
} = wp.element;
/**
 * Create a AdvancedBtn wrapper Component.
 */

class AdvancedBtn extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    let className = '';

    if (this.props.className !== 'wp-block-inclind-blocks-inclind-advanced-btn') {
      className = className + ' ' + this.props.className;
    }

    return React.createElement("div", {
      className: className
    }, this.props.children);
  }

}

exports.default = AdvancedBtn;