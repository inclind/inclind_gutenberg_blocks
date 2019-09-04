"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// Internationalization
const {
  __
} = wp.i18n; // Setup the block.

const {
  Component
} = wp.element; // Import block components.

const {
  SelectControl,
  PanelBody
} = wp.components; // Import Inspector components.

const {
  InspectorControls
} = wp.editor;
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
      itemIcon
    } = this.props.attributes;
    const iconOptions = [{
      value: '',
      label: __('None')
    }, {
      value: 'ios-document',
      label: __('Document')
    }, {
      value: 'ios-information',
      label: __('Information')
    }, {
      value: 'ios-mail',
      label: __('Mail')
    }, {
      value: 'ios-phone-portrait',
      label: __('Phone')
    }, {
      value: 'clock',
      label: __('Clock')
    }, {
      value: 'flame',
      label: __('Flame')
    }, {
      value: 'snowflake',
      label: __('Snowflake')
    }, {
      value: 'sun',
      label: __('Sun')
    }, {
      value: 'switch',
      label: __('Switch')
    }];
    return React.createElement(InspectorControls, {
      key: "inspector"
    }, React.createElement(PanelBody, null, React.createElement(SelectControl, {
      label: __('Icon'),
      description: __('Choose the icon for this link.'),
      options: iconOptions,
      value: itemIcon,
      onChange: value => this.props.setAttributes({
        itemIcon: value
      })
    })));
  }

}

exports.default = Inspector;