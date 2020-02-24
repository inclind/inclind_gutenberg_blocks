"use strict";

var _sectionWrap = _interopRequireDefault(require("./components/section-wrap"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// Internationalization
const __ = Drupal.t; // Extend component

const {
  Component,
  Fragment
} = wp.element; // Register block

const {
  registerBlockType
} = wp.blocks; // Register editor components

const {
  BlockAlignmentToolbar,
  InnerBlocks,
  InspectorControls,
  BlockControls,
  AlignmentToolbar,
  MediaUpload
} = wp.blockEditor; // Register components

const {
  IconButton,
  PanelBody,
  SelectControl,
  BaseControl
} = wp.components;
const {
  dispatch,
  select
} = wp.data;

class InclindSectionWrap extends Component {
  constructor() {
    super(...arguments);
  } // Render element while editing in Gutenberg:


  render() {
    const {
      attributes: {
        backgroundType,
        backgroundColor,
        backgroundImage,
        backgroundImageData,
        overlayOpacity,
        overlayColor,
        align,
        margin,
        padding,
        contentWidth,
        uniqueID,
        hAlign
      },
      className,
      setAttributes,
      isSelected
    } = this.props;
    const hasImageBg = backgroundType === 'image';
    const containerStyle = {
      backgroundColor: !hasImageBg && backgroundType !== 'none' ? backgroundColor : '',
      'box-shadow': '1px 1px 14px -7px grey',
      backgroundImage: hasImageBg && `url('${backgroundImage}')`,
      'background-size': hasImageBg && 'cover'
    };
    const overlayStyle = !hasImageBg ? {} : {
      display: 'block',
      backgroundColor: overlayColor || '#2e358f',
      opacity: parseInt(overlayOpacity, 10) / 100
    };
    const wrapperStyle = {
      maxWidth: contentWidth && `${contentWidth}px`
    };
    const classes = [className, `text-${hAlign}`, `py-4`, (0, _classnames.default)(`align${align ? align : 'none'}`)];

    if (backgroundType === 'gradient') {
      classes.push('gradient-bg');
      classes.push('has-overlay');
    } else if (backgroundType === 'gray') {
      classes.push('bg-lighter-gray');
    } else if (backgroundType !== 'none') {
      classes.push('has-overlay');
      classes.push('text-white');
    }

    if (margin) {
      classes.push(`my-${margin}`);
    }

    if (padding) {
      classes.push(`py-${padding}`);
    }

    const vOptions = [{
      label: __('None'),
      value: ''
    }, {
      label: __('Small'),
      value: '3'
    }, {
      label: __('Medium'),
      value: '4'
    }, {
      label: __('Large'),
      value: '5'
    }];
    const buttonCls = {
      [align]: 'is-active'
    };

    const onSelectImage = (media, field) => {
      const dataAttrs = {};

      if (media.data) {
        dataAttrs[`${field}Data`] = Object.keys(media.data).reduce((result, key) => {
          result[`data-${key.replace('_', '-')}`] = media.data[key];
          return result;
        }, {});
      }

      setAttributes({
        [field]: media.url,
        ...dataAttrs
      });
    };

    return React.createElement(Fragment, null, React.createElement(BlockControls, null, React.createElement(AlignmentToolbar, {
      value: hAlign,
      onChange: value => setAttributes({
        hAlign: value
      })
    }), React.createElement(BlockAlignmentToolbar, {
      value: align,
      controls: ['center', 'wide', 'full', 'left', 'right'],
      onChange: value => setAttributes({
        align: value
      })
    })), React.createElement(Fragment, null, React.createElement(InspectorControls, null, React.createElement(PanelBody, {
      title: __('Block Settings')
    }, React.createElement(SelectControl, {
      label: __('Background Type'),
      value: backgroundType,
      options: [{
        label: __('Transparent'),
        value: 'none'
      }, {
        label: __('Gray Gradient'),
        value: 'gradient'
      }, {
        label: __('Blue'),
        value: 'color'
      }, {
        label: __('Gray'),
        value: 'gray'
      }, {
        label: __('Image w/Overlay'),
        value: 'image'
      }],
      onChange: value => setAttributes({
        backgroundType: value
      })
    }), hasImageBg && React.createElement(BaseControl, {
      label: __('Choose background image')
    }, React.createElement(MediaUpload, {
      allowedTypes: ['image'],
      onSelect: media => onSelectImage(media, 'backgroundImage'),
      render: ({
        open
      }) => React.createElement(IconButton, {
        className: "components-toolbar__control",
        label: __('Edit image'),
        icon: "format-image",
        onClick: open
      })
    }))))), React.createElement("div", {
      className: "kt-section-selecter"
    }, __('Section Wrap placeholder', 'inclind-blocks')), React.createElement("div", _extends({
      id: `kt-btns_${uniqueID}`,
      className: classes.join(' '),
      style: containerStyle
    }, backgroundImageData), React.createElement("div", {
      className: "g-section-overlay",
      style: overlayStyle
    }), React.createElement("div", {
      className: `g-section-wrapper ${align == 'full' ? ' container' : ' container-fluid'}`,
      style: wrapperStyle
    }, React.createElement(InnerBlocks, {
      template: [],
      templateLock: false
    }))));
  }

} //  Start Drupal Specific.


const category = {
  slug: 'inclind-blocks',
  title: __('Custom Blocks')
}; // Grab the current categories and merge in the new category if not present.

const currentCategories = select('core/blocks').getCategories().filter(item => item.slug !== category.slug);
dispatch('core/blocks').setCategories([category, ...currentCategories]); // End Drupal Specific.
// Register the block.

registerBlockType(category.slug + '/inclind-section-wrap', {
  title: __('Section Wrapper', 'inclind-section-wrap'),
  description: __('Wrap the content into a container and select full width display or contained to a grid. Adds ability to turn on/off gradient on the wrapper.', 'inclind-section-wrap'),
  category: 'inclind-blocks',
  keywords: [__('Section', 'inclind-section-wrap'), __('Wrapper', 'inclind-section-wrap'), __('inclind', 'inclind-section-wrap'), __('custom', 'inclind-section-wrap')],
  attributes: {
    backgroundType: {
      type: 'string',
      default: 'none'
    },
    backgroundColor: {
      type: 'string',
      default: '#2e358f'
    },
    backgroundImage: {
      type: 'string',
      default: 'https://placeimg.com/1200/600/nature/grayscale'
    },
    backgroundImageData: {
      type: 'object',
      default: {}
    },
    overlayOpacity: {
      type: 'number',
      default: 80
    },
    overlayColor: {
      type: 'string',
      default: '#2e358f'
    },
    padding: {
      type: 'string',
      default: ''
    },
    margin: {
      type: 'string',
      default: ''
    },
    align: {
      type: 'string',
      default: 'none'
    },
    contentWidth: {
      type: 'number'
    },
    uniqueID: {
      type: 'string',
      default: ''
    },
    hAlign: {
      type: 'string',
      default: 'left'
    }
  },

  // Render the block components.
  getEditWrapperProps({
    blockAlignment
  }) {
    if ('left' === blockAlignment || 'right' === blockAlignment || 'center' === blockAlignment) {
      return {
        'data-align': blockAlignment
      };
    }
  },

  edit: InclindSectionWrap,
  save: props => {
    const {
      attributes: {
        backgroundType,
        backgroundColor,
        backgroundImage,
        backgroundImageData,
        overlayOpacity,
        overlayColor,
        align,
        margin,
        padding,
        contentWidth,
        uniqueID,
        hAlign
      }
    } = props;
    const hasImageBg = backgroundType === 'image';
    const containerStyle = {
      backgroundColor: !hasImageBg && backgroundType !== 'none' ? backgroundColor : '',
      backgroundImage: hasImageBg && `url('${backgroundImage}')`,
      'background-size': 'cover'
    };
    const overlayStyle = !hasImageBg ? {} : {
      display: 'block',
      backgroundColor: overlayColor || '#2e358f',
      opacity: parseInt(overlayOpacity, 10) / 100
    };
    const wrapperStyle = {
      maxWidth: contentWidth && `${contentWidth}px`
    };
    const classes = [`text-${hAlign}`, `py-4`, (0, _classnames.default)(`align${align ? align : 'none'}`)];

    if (backgroundType === 'gradient') {
      classes.push('gradient-bg');
      classes.push('has-overlay');
    } else if (backgroundType === 'gray') {
      classes.push('bg-lighter-gray');
    } else if (backgroundType !== 'none') {
      classes.push('has-overlay');
      classes.push('text-white');
    }

    if (margin) {
      classes.push(`my-${margin}`);
    }

    if (padding) {
      classes.push(`py-${padding}`);
    } // Render the section on Front-end:


    return React.createElement("div", _extends({
      className: classes.join(' '),
      style: containerStyle
    }, backgroundImageData), React.createElement("div", {
      className: "g-section-overlay",
      style: backgroundType !== 'gradient' && backgroundType !== 'none' ? overlayStyle : ''
    }), React.createElement("div", {
      className: `g-section-wrapper ${align == 'full' ? ' container' : ' container-fluid'}`,
      style: wrapperStyle
    }, React.createElement(InnerBlocks.Content, null)));
  }
});