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