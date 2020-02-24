"use strict";

var _jumbotron = _interopRequireDefault(require("./components/jumbotron"));

var _icons = _interopRequireDefault(require("../../icons"));

var _map = _interopRequireDefault(require("lodash/map"));

var _hexToRgba = _interopRequireDefault(require("../../hex-to-rgba"));

var _genicon = _interopRequireDefault(require("../../genicon"));

var _svgicons = _interopRequireDefault(require("../../svgicons"));

var _svgiconsnames = _interopRequireDefault(require("../../svgiconsnames"));

var _reactFonticonpicker = _interopRequireDefault(require("@fonticonpicker/react-fonticonpicker"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import block dependencies and components
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
  InspectorControls,
  BlockControls,
  AlignmentToolbar,
  MediaUpload,
  URLInput,
  RichText
} = wp.blockEditor; // Register components

const {
  IconButton,
  PanelBody,
  ToggleControl,
  SelectControl,
  BaseControl
} = wp.components;
const {
  dispatch,
  select
} = wp.data;
/**
 * This allows for checking to see if the block needs to generate a new ID.
 */

const ktjumbotronUniqueIDs = [];

class InclindJumbotron extends Component {
  constructor() {
    super(...arguments);
    this.showSettings = this.showSettings.bind(this);
    this.state = {
      settings: {}
    };
  }

  componentDidMount() {
    if (!this.props.attributes.uniqueID) {
      this.props.setAttributes({
        uniqueID: '_' + this.props.clientId.substr(2, 9)
      });
      ktjumbotronUniqueIDs.push('_' + this.props.clientId.substr(2, 9));
    } else if (ktjumbotronUniqueIDs.includes(this.props.attributes.uniqueID)) {
      this.props.setAttributes({
        uniqueID: '_' + this.props.clientId.substr(2, 9)
      });
      ktjumbotronUniqueIDs.push('_' + this.props.clientId.substr(2, 9));
    } else {
      ktjumbotronUniqueIDs.push(this.props.attributes.uniqueID);
    }
  }

  showSettings(key) {
    let donot_allow = ['mediaSettings'];

    if (donot_allow.includes(key)) {
      return false;
    }

    return true;
  } // Render element while editing in Gutenberg:


  render() {
    const {
      attributes: {
        blockAlignment,
        backgroundColor,
        backgroundImage,
        backgroundImageUUID,
        uniqueID,
        link,
        target,
        hAlign,
        displayTitle,
        displayScriptTitle,
        title,
        titleScript,
        displayText,
        contentText,
        displayLearnMore,
        learnMore
      },
      className,
      setAttributes,
      isSelected
    } = this.props;
    const startlayoutOptions = [{
      key: 'skip',
      name: __('Skip'),
      icon: __('Skip')
    }, {
      key: 'simple',
      name: __('Simple'),
      icon: _icons.default.infoSimple
    }, {
      key: 'left',
      name: __('Align Left'),
      icon: _icons.default.infoLeft
    }, {
      key: 'bold',
      name: __('Bold Background'),
      icon: _icons.default.infoBackground
    }, {
      key: 'image',
      name: __('Circle Image'),
      icon: _icons.default.infoImage
    }];
    const hasImageBg = true;
    const align_class = ['jtr-content', 'col-xs-12'];

    if (hAlign == 'right') {
      align_class.push('float-right', 'col-lg-7', 'text-right');
    } else if (hAlign == 'center') {
      align_class.push('col-lg-8', 'offset-lg-2', 'text-center');
    } else {
      align_class.push('col-lg-7');
    }

    const classes = [className, (0, _classnames.default)(`align${blockAlignment ? blockAlignment : 'none'}`)];

    const onSelectImage = (media, field) => {
      const dataAttrs = {};
      let uuid = '';

      if (media.data) {
        if (media.data.hasOwnProperty('entity_uuid')) {
          uuid = media.data.entity_uuid;
        }

        dataAttrs[`${field}Data`] = Object.keys(media.data).reduce((result, key) => {
          result[`data-${key.replace('_', '-')}`] = media.data[key];
          return result;
        }, {});
      }

      setAttributes({
        [field]: media.url,
        [`${field}UUID`]: uuid,
        ...dataAttrs
      });
    };

    const isSelectedClass = isSelected ? 'is-selected' : 'not-selected';
    return React.createElement("div", {
      id: `kt-jtr-box${uniqueID}`,
      className: classes.join(' ')
    }, React.createElement(BlockControls, {
      key: "controls"
    }, React.createElement(BlockAlignmentToolbar, {
      value: blockAlignment,
      controls: ['wide', 'full'],
      onChange: value => setAttributes({
        blockAlignment: value
      })
    }), React.createElement(AlignmentToolbar, {
      value: hAlign,
      onChange: value => setAttributes({
        hAlign: value
      })
    })), this.showSettings('allSettings') && React.createElement(InspectorControls, null, React.createElement(PanelBody, null, React.createElement("div", {
      className: "kt-controls-link-wrap"
    }, React.createElement("h2", null, __('Link')), React.createElement(URLInput, {
      className: "kt-btn-link-input",
      value: link,
      onChange: value => setAttributes({
        link: value
      })
    })), React.createElement(SelectControl, {
      label: __('Link Target'),
      value: target,
      options: [{
        value: '_self',
        label: __('Same Window')
      }, {
        value: '_blank',
        label: __('New Window')
      }],
      onChange: value => setAttributes({
        target: value
      })
    })), this.showSettings('containerSettings') && React.createElement(PanelBody, {
      title: __('Container Settings'),
      initialOpen: false
    }, React.createElement(BaseControl, {
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
    }))), this.showSettings('titleSettings') && React.createElement(PanelBody, {
      title: __('Title Settings'),
      initialOpen: false
    }, React.createElement(ToggleControl, {
      label: __('Show Title'),
      checked: displayTitle,
      onChange: value => setAttributes({
        displayTitle: value
      })
    }), React.createElement(ToggleControl, {
      label: __('Show Script Header (cursive)'),
      checked: displayScriptTitle,
      onChange: value => setAttributes({
        displayScriptTitle: value
      })
    })), this.showSettings('textSettings') && React.createElement(PanelBody, {
      title: __('Text Settings'),
      initialOpen: false
    }, React.createElement(ToggleControl, {
      label: __('Show Text'),
      checked: displayText,
      onChange: value => setAttributes({
        displayText: value
      })
    })), this.showSettings('learnMoreSettings') && React.createElement(PanelBody, {
      title: __('Learn More Settings'),
      initialOpen: false
    }, React.createElement(ToggleControl, {
      label: __('Show Learn More'),
      checked: displayLearnMore,
      onChange: value => setAttributes({
        displayLearnMore: value
      })
    }))), React.createElement("div", {
      className: `jumbotron jumbotron-fluid ${isSelectedClass}`,
      style: {
        backgroundColor: !hasImageBg ? backgroundColor : '#2e358f',
        backgroundImage: hasImageBg && `url('${backgroundImage}')`,
        'background-size': hasImageBg && `cover`,
        color: hasImageBg && 'white'
      }
    }, React.createElement("div", {
      className: "container jumbotron-text-container"
    }, React.createElement("div", {
      className: 'kt-jumbotron-textcontent jtr-content col-xs-12  col-lg-7'
    }, displayScriptTitle && React.createElement(RichText, {
      className: "jtr-script script h1 text-primary",
      tagName: 'span',
      placeholder: __('Title Script'),
      onChange: value => setAttributes({
        titleScript: value
      }),
      value: titleScript,
      style: {
        fontWeight: '400',
        color: 'rgb(46, 53, 143)',
        fontSize: '42px',
        lineHeight: '1',
        fontFamily: 'Outbound, cursive'
      },
      keepPlaceholderOnFocus: true
    }), React.createElement("br", null), displayTitle && React.createElement(RichText, {
      className: "jtr-title lead h2 caps text-primary",
      tagName: 'span',
      placeholder: __('Title'),
      onChange: val => setAttributes({
        title: val
      }),
      value: title,
      style: {
        fontWeight: '800',
        textTransform: 'uppercase',
        color: 'rgb(46, 53, 143)',
        fontSize: '50px',
        lineHeight: '1.2',
        fontFamily: 'Montserrat, sans-serif'
      },
      keepPlaceholderOnFocus: true
    }), displayText && React.createElement(RichText, {
      className: "jtr-text jumbotron-text text-black",
      tagName: 'p',
      placeholder: __('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean diam dolor, accumsan sed rutrum vel, dapibus et leo.'),
      onChange: value => setAttributes({
        contentText: value
      }),
      value: contentText,
      style: {
        fontWeight: '600',
        color: 'black',
        fontSize: '22px',
        lineHeight: '28px',
        fontFamily: 'Montserrat, sans'
      },
      keepPlaceholderOnFocus: true
    }), displayLearnMore && link !== undefined && React.createElement("p", {
      class: "lead mt-5 d-none d-sm-block"
    }, React.createElement("button", {
      className: "btn btn-arrow btn-lg btn-secondary"
    }, React.createElement(RichText, {
      className: "jtr-learnmore",
      tagName: 'span',
      placeholder: __('Link this button in settings..'),
      onChange: value => setAttributes({
        learnMore: value
      }),
      value: learnMore,
      keepPlaceholderOnFocus: true
    }), React.createElement("div", {
      className: "color-fill--secondary svg svg--icon js-svg-exists"
    }, React.createElement("svg", null, React.createElement("use", {
      "xlink:href": "/themes/custom/particle/dist/app-drupal/assets/spritemap.svg#sprite-chevron-right"
    })))))))));
  }

} //  Start Drupal Specific.


const category = {
  slug: 'inclind-blocks',
  title: __('Custom Blocks')
}; // Grab the current categories and merge in the new category if not present.

const currentCategories = select('core/blocks').getCategories().filter(item => item.slug !== category.slug);
dispatch('core/blocks').setCategories([category, ...currentCategories]); // End Drupal Specific.
// Register the block.

registerBlockType(category.slug + '/inclind-jumbotron', {
  title: __('Hero (Jumbotron)', 'inclind-jumbotron'),
  description: __('Add jumbotron with background image/overlay.', 'inclind-jumbotron'),
  category: 'inclind-blocks',
  keywords: [__('Hero', 'inclind-jumbotron'), __('Info', 'inclind-jumbotron'), __('inclind', 'inclind-jumbotron'), __('custom', 'inclind-jumbotron')],
  attributes: {
    blockAlignment: {
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
    backgroundImageUUID: {
      type: 'string',
      default: ''
    },
    uniqueID: {
      type: 'string',
      default: ''
    },
    link: {
      type: 'string',
      source: 'attribute',
      attribute: 'href',
      selector: 'a'
    },
    target: {
      type: 'string',
      source: 'attribute',
      attribute: 'target',
      selector: 'a',
      default: '_self'
    },
    hAlign: {
      type: 'string',
      default: 'left'
    },
    displayTitle: {
      type: 'bool',
      default: true
    },
    displayScriptTitle: {
      type: 'bool',
      default: true
    },
    titleScript: {
      type: 'array',
      source: 'children',
      selector: 'span.jtr-script',
      default: __('Title Script will be in cursive font.')
    },
    title: {
      type: 'array',
      source: 'children',
      selector: 'span.jtr-title',
      default: __('Title')
    },
    displayText: {
      type: 'bool',
      default: true
    },
    contentText: {
      type: 'array',
      source: 'children',
      selector: 'p.jtr-text',
      default: __('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean diam dolor, accumsan sed rutrum vel, dapibus et leo.')
    },
    displayLearnMore: {
      type: 'bool',
      default: true
    },
    learnMore: {
      type: 'array',
      source: 'children',
      selector: '.jtr-learnmore',
      default: __('Link this button in settings..')
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

  edit: InclindJumbotron,
  save: props => {
    const {
      attributes: {
        blockAlignment,
        backgroundImage,
        backgroundImageUUID,
        uniqueID,
        link,
        target,
        hAlign,
        displayTitle,
        displayScriptTitle,
        title,
        titleScript,
        displayText,
        contentText,
        displayLearnMore,
        learnMore
      }
    } = props;
    const align_class = ['jtr-content', 'col-xs-12'];

    if (hAlign == 'right') {
      align_class.push('float-right', 'col-lg-7', 'text-right');
    } else if (hAlign == 'center') {
      align_class.push('col-lg-8', 'offset-lg-2', 'text-center');
    } else {
      align_class.push('col-lg-7');
    }

    const classes = [// className,
    (0, _classnames.default)(`align${blockAlignment ? blockAlignment : 'none'}`), 'jumbotron jumbotron-fluid']; // const learnMoreOutput = (
    //     <RichText.Content
    //         className="jtr-learnmore btn btn-secondary btn-sm"
    //         tagName={'button'}
    //         value={learnMore}
    //         type={'button'}
    //     />
    // );

    const learnMoreLinkOutput = React.createElement("p", {
      className: "lead mt-5 d-none d-sm-block"
    }, React.createElement("a", {
      href: link,
      target: '_blank' === target ? target : undefined,
      rel: '_blank' === target ? 'noopener noreferrer' : undefined
    }, React.createElement("button", {
      className: "btn btn-arrow btn-lg btn-secondary"
    }, React.createElement(RichText.Content, {
      className: "jtr-learnmore",
      tagName: 'span',
      placeholder: __('Link this button in settings..'),
      value: learnMore
    }), React.createElement("div", {
      className: "color-fill--secondary svg svg--icon js-svg-exists"
    }, React.createElement("svg", null, React.createElement("use", {
      "xlink:href": "/themes/custom/particle/dist/app-drupal/assets/spritemap.svg#sprite-chevron-right"
    }))))));
    const textOutput = React.createElement("div", {
      className: align_class.join(' ')
    }, displayScriptTitle && React.createElement(RichText.Content, {
      className: "jtr-script script h1 text-primary",
      tagName: 'span',
      value: titleScript
    }), React.createElement("br", null), displayTitle && React.createElement(RichText.Content, {
      className: "jtr-title lead h2 caps text-primary",
      tagName: 'span',
      value: title
    }), displayText && React.createElement(RichText.Content, {
      className: "jtr-text jumbotron-text text-black",
      tagName: 'p',
      value: contentText
    }), displayLearnMore && link !== undefined && learnMoreLinkOutput); // Render the Jumbotron on Front-end:

    return React.createElement("div", {
      id: `kt-jtr-box${uniqueID}`,
      className: classes.join(' ')
    }, React.createElement("div", {
      className: "jumbotron-image"
    }, React.createElement("div", {
      className: "overlay-wrapper"
    }, React.createElement("div", {
      className: "overlay gradient"
    }), React.createElement("img", {
      "data-image-style": "1200x400",
      "data-entity-type": "file",
      "data-entity-uuid": `${backgroundImageUUID}`,
      src: `${backgroundImage}`,
      alt: "",
      className: "image image--jumbotron image--overlay img-fluid js-image-exists"
    }))), React.createElement("div", {
      className: "container jumbotron-text-container"
    }, textOutput));
  }
});