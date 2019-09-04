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

class Infobox extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    let className = 'infobox mb-0 row';

    if (this.props.className !== 'wp-block-inclind-blocks-inclind-infobox') {
      className = className + ' ' + this.props.className;
    }

    return React.createElement("div", {
      className: className
    }, this.props.children);
  }

}

exports.default = Infobox;