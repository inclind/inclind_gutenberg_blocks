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