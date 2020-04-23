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
 * Create an Icon Link wrapper Component.
 */

class IconLink extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    let className = 'wp-block-inclind-blocks-inclind-icon-link';

    if (this.props.className !== 'wp-block-inclind-blocks-inclind-icon-link') {
      className = className + ' ' + this.props.className;
    }

    return React.createElement("div", {
      className: className
    }, this.props.children);
  }

}

exports.default = IconLink;