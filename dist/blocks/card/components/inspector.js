"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// Internationalization
const __ = Drupal.t; // Setup the block.

const {
  Component
} = wp.element; // Import Inspector components.

const {
  InspectorControls
} = wp.editor; // Import block components.

const {
  SelectControl,
  PanelBody
} = wp.components;
/**
 * Create an Inspector Controls wrapper Component.
 */

class Inspector extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const {
      cardStyle
    } = this.props.attributes;
    const cardOptions = [{
      value: '',
      label: __('Card')
    }, {
      value: 'card-bg',
      label: __('Card BG')
    }, {
      value: 'card-invert',
      label: __('Card Invert')
    }];
    return React.createElement(InspectorControls, {
      key: "inspector"
    }, React.createElement(PanelBody, null, React.createElement(SelectControl, {
      label: __('Card Style'),
      description: __('Choose the style of the card.'),
      options: cardOptions,
      value: cardStyle,
      onChange: value => this.props.setAttributes({
        cardStyle: value
      })
    })));
  }

}

exports.default = Inspector;