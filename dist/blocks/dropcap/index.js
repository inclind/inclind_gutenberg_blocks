"use strict";

var _classnames = _interopRequireDefault(require("classnames"));

var _inspector = _interopRequireDefault(require("./components/inspector"));

var _dropcap = _interopRequireDefault(require("./components/dropcap"));

var _icons = _interopRequireDefault(require("./components/icons"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import block dependencies and components
// Import CSS
// import './styles/style.scss';
// import './styles/editor.scss';
// Internationalization
const {
  __
} = wp.i18n; // Extend component

const {
  Component
} = wp.element; // Register block

const {
  registerBlockType
} = wp.blocks; // Register editor components

const {
  RichText,
  AlignmentToolbar,
  BlockControls,
  BlockAlignmentToolbar,
  MediaUpload
} = wp.editor; // Register components

const {
  Button,
  SelectControl
} = wp.components; // ********* Drupal Specific

const {
  dispatch,
  select
} = data; // const __ = Drupal.t;
// ********* End Drupal Specific

class ABDropCapBlock extends Component {
  render() {
    // Setup the attributes.
    const {
      attributes: {
        dropCapContent,
        dropCapAlignment,
        dropCapBackgroundColor,
        dropCapTextColor,
        dropCapFontSize,
        dropCapStyle
      },
      isSelected,
      className,
      setAttributes
    } = this.props;
    return [// Show the alignment toolbar on focus.
    React.createElement(BlockControls, {
      key: "controls"
    }, React.createElement(AlignmentToolbar, {
      value: dropCapAlignment,
      onChange: value => this.props.setAttributes({
        dropCapAlignment: value
      })
    })), // Show the block controls on focus.
    React.createElement(_inspector.default, this.props), // Show the block markup in the editor.
    React.createElement(_dropcap.default, this.props, React.createElement(RichText, {
      tagName: "div",
      multiline: "p",
      placeholder: __('Add paragraph text...', 'atomic-blocks'),
      keepPlaceholderOnFocus: true,
      value: dropCapContent,
      formattingControls: ['bold', 'italic', 'strikethrough', 'link'],
      className: (0, _classnames.default)('ab-drop-cap-text', 'ab-font-size-' + dropCapFontSize),
      onChange: value => this.props.setAttributes({
        dropCapContent: value
      })
    }))];
  }

} //  Start Drupal Specific.


const category = {
  slug: 'inclind-blocks',
  title: __('Inclind Blocks')
}; // Grab the current categories and merge in the new category if not present.

const currentCategories = select('core/blocks').getCategories().filter(item => item.slug !== category.slug);
dispatch('core/blocks').setCategories([category, ...currentCategories]); // End Drupal Specific.
// Register the block.

registerBlockType(category.slug + '/inclind-drop-cap', {
  title: __('Inclind Drop Cap', 'inclind-drop-cap'),
  description: __('Add a styled drop cap to the beginning of your paragraph.', 'atomic-blocks'),
  icon: 'format-quote',
  category: 'inclind-blocks',
  keywords: [__('drop cap', 'inclind-drop-cap'), __('quote', 'inclind-drop-cap'), __('atomic', 'inclind-drop-cap')],
  attributes: {
    dropCapContent: {
      type: 'array',
      selector: '.ab-drop-cap-text',
      source: 'children'
    },
    dropCapAlignment: {
      type: 'string'
    },
    dropCapBackgroundColor: {
      type: 'string',
      default: '#f2f2f2'
    },
    dropCapTextColor: {
      type: 'string',
      default: '#32373c'
    },
    dropCapFontSize: {
      type: 'number',
      default: 3
    },
    dropCapStyle: {
      type: 'string',
      default: 'drop-cap-letter'
    }
  },
  // Render the block components.
  edit: ABDropCapBlock,
  // Save the attributes and markup.
  save: function (props) {
    const {
      dropCapContent,
      dropCapAlignment,
      dropCapBackgroundColor,
      dropCapTextColor,
      dropCapFontSize,
      dropCapStyle
    } = props.attributes; // Save the block markup for the front end.

    return React.createElement(_dropcap.default, props, // Check if there is text and output.
    dropCapContent && React.createElement(RichText.Content, {
      tagName: "div",
      className: "ab-drop-cap-text",
      value: dropCapContent
    }));
  }
});