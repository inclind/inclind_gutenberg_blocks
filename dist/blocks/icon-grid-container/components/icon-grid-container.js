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