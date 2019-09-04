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