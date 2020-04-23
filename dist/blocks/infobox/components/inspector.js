"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// Setup the block.
const {
  Component
} = wp.element; // Import block components.

const {
  PanelBody
} = wp.components; // Import Inspector components.

const {
  InspectorControls
} = wp.blockEditor;
/**
 * Create an Inspector Controls wrapper Component.
 */

class Inspector extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    return React.createElement(InspectorControls, {
      key: "inspector"
    }, React.createElement(PanelBody, null));
  }

}

exports.default = Inspector;