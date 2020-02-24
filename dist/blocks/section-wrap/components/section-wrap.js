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
 * Create a SectionWrap wrapper Component.
 */

class SectionWrap extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    let className = '';
    let gradient = '';

    if (this.props.className !== 'wp-block-inclind-blocks-inclind-section-wrap') {
      className = className + ' ' + this.props.className;
    }

    if (this.props.backgroundType === 'gradient') {
      className = className + ' gradient-bg';
    }

    return React.createElement("div", {
      className: className
    }, this.props.children);
  }

}

exports.default = SectionWrap;