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