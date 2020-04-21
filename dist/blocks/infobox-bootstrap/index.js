"use strict";

var _infobox = _interopRequireDefault(require("./components/infobox"));

var _icons = _interopRequireDefault(require("../../icons"));

var _map = _interopRequireDefault(require("lodash/map"));

var _hexToRgba = _interopRequireDefault(require("../../hex-to-rgba"));

var _genicon = _interopRequireDefault(require("../../genicon"));

var _svgicons = _interopRequireDefault(require("../../svgicons"));

var _svgiconsnames = _interopRequireDefault(require("../../svgiconsnames"));

var _reactFonticonpicker = _interopRequireDefault(require("@fonticonpicker/react-fonticonpicker"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// import FaIco from '../../faicons';
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
  InnerBlocks,
  BlockAlignmentToolbar,
  InspectorControls,
  BlockControls,
  AlignmentToolbar,
  PanelColorSettings,
  MediaUpload,
  URLInput,
  RichText,
  MediaPlaceholder
} = wp.blockEditor; // Register components

const {
  Button,
  IconButton,
  ButtonGroup,
  TabPanel,
  Dashicon,
  PanelBody,
  RangeControl,
  Toolbar,
  TextControl,
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

const ktinfoboxUniqueIDs = [];

class InclindInfobox extends Component {
  constructor() {
    super(...arguments);
    this.showSettings = this.showSettings.bind(this);
    this.state = {
      containerPaddingControl: 'linked',
      containerBorderControl: 'linked',
      showPreset: false,
      user: 'admin',
      settings: {}
    };
  }

  componentDidMount() {
    if (!this.props.attributes.uniqueID) {
      this.props.setAttributes({
        uniqueID: '_' + this.props.clientId.substr(2, 9)
      });
      ktinfoboxUniqueIDs.push('_' + this.props.clientId.substr(2, 9));
    } else if (ktinfoboxUniqueIDs.includes(this.props.attributes.uniqueID)) {
      this.props.setAttributes({
        uniqueID: '_' + this.props.clientId.substr(2, 9)
      });
      ktinfoboxUniqueIDs.push('_' + this.props.clientId.substr(2, 9));
    } else {
      ktinfoboxUniqueIDs.push(this.props.attributes.uniqueID);
    }

    if (this.props.attributes.containerBorderWidth[0] === this.props.attributes.containerBorderWidth[1] && this.props.attributes.containerBorderWidth[0] === this.props.attributes.containerBorderWidth[2] && this.props.attributes.containerBorderWidth[0] === this.props.attributes.containerBorderWidth[3]) {
      this.setState({
        containerBorderControl: 'linked'
      });
    } else {
      this.setState({
        containerBorderControl: 'individual'
      });
    }

    if (this.props.attributes.containerPadding[0] === this.props.attributes.containerPadding[1] && this.props.attributes.containerPadding[0] === this.props.attributes.containerPadding[2] && this.props.attributes.containerPadding[0] === this.props.attributes.containerPadding[3]) {
      this.setState({
        containerPaddingControl: 'linked'
      });
    } else {
      this.setState({
        containerPaddingControl: 'individual'
      });
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
        backgroundType,
        backgroundColor,
        backgroundImage,
        backgroundImageData,
        backgroundImageUUID,
        overlayOpacity,
        overlayColor,
        margin,
        padding,
        contentWidth,
        uniqueID,
        link,
        linkProperty,
        target,
        hAlign,
        containerBackground,
        containerBorder,
        containerBorderWidth,
        containerBorderRadius,
        containerPadding,
        mediaType,
        mediaImage,
        mediaIcon,
        mediaStyle,
        mediaAlign,
        displayTitle,
        title,
        displayText,
        contentText,
        textColor,
        titleFont,
        textFont,
        displayLearnMore,
        learnMore,
        learnMoreStyles,
        containerBackgroundOpacity,
        containerBorderOpacity,
        mediaVAlign,
        mediaAlignMobile,
        mediaAlignTablet
      },
      className,
      setAttributes,
      isSelected
    } = this.props;
    const {
      containerBorderControl,
      containerPaddingControl
    } = this.state;
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
    const hasImageBg = backgroundType === 'image';
    const containerStyle = {
      backgroundColor: !hasImageBg ? backgroundColor : '#2e358f',
      backgroundImage: hasImageBg && `url('${backgroundImage}')`,
      color: hasImageBg && 'white'
    };
    const overlayStyle = !hasImageBg ? {} : {
      display: 'block',
      backgroundColor: overlayColor || '#2e358f',
      opacity: parseInt(overlayOpacity, 10) / 100
    };
    const wrapperStyle = {
      maxWidth: contentWidth && `${contentWidth}px`
    };
    const classes = [// className,
    (0, _classnames.default)(`align${blockAlignment ? blockAlignment : 'none'}`), 'infobox p-4 mb-4 bg-primary text-' + hAlign];
    classes.push('has-overlay');
    classes.push('text-white');

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

    const onChangeTitle = value => {
      setAttributes({
        title: value
      });
    };

    const titleTagName = 'h' + titleFont[0].level;
    const ALLOWED_MEDIA_TYPES = ['image'];

    const onSelectMainImage = media => {
      saveMediaImage({
        id: media.id,
        url: media.url,
        alt: media.alt,
        width: media.width,
        height: media.height,
        maxWidth: media.width ? media.width : 50,
        subtype: media.subtype
      });
    };

    const changeImageSize = img => {
      saveMediaImage({
        url: img.value,
        width: img.width,
        height: img.height
      });
    };

    const clearImage = () => {
      saveMediaImage({
        id: '',
        url: '',
        alt: '',
        width: '',
        height: '',
        maxWidth: '',
        subtype: ''
      });
    };

    const onSelectFlipImage = media => {
      saveMediaImage({
        flipId: media.id,
        flipUrl: media.url,
        flipAlt: media.alt,
        flipWidth: media.width,
        flipHeight: media.height,
        flipSubtype: media.subtype
      });
    };

    const clearFlipImage = () => {
      saveMediaImage({
        flipId: '',
        flipUrl: '',
        flipAlt: '',
        flipWidth: '',
        flipHeight: '',
        flipSubtype: ''
      });
    };

    const changeFlipImageSize = img => {
      saveMediaImage({
        flipUrl: img.value,
        flipWidth: img.width,
        flipHeight: img.height
      });
    };

    const isSelectedClass = isSelected ? 'is-selected' : 'not-selected';

    const saveMediaImage = value => {
      const newUpdate = mediaImage.map((item, index) => {
        if (0 === index) {
          item = { ...item,
            ...value
          };
        }

        return item;
      });
      setAttributes({
        mediaImage: newUpdate
      });
    };

    const saveMediaIcon = value => {
      const newUpdate = mediaIcon.map((item, index) => {
        if (0 === index) {
          item = { ...item,
            ...value
          };
        }

        return item;
      });
      setAttributes({
        mediaIcon: newUpdate
      });
    };

    const saveMediaStyle = value => {
      const newUpdate = mediaStyle.map((item, index) => {
        if (0 === index) {
          item = { ...item,
            ...value
          };
        }

        return item;
      });
      setAttributes({
        mediaStyle: newUpdate
      });
    };

    const saveTitleFont = value => {
      const newUpdate = titleFont.map((item, index) => {
        if (0 === index) {
          item = { ...item,
            ...value
          };
        }

        return item;
      });
      setAttributes({
        titleFont: newUpdate
      });
    };

    const saveTextFont = value => {
      const newUpdate = textFont.map((item, index) => {
        if (0 === index) {
          item = { ...item,
            ...value
          };
        }

        return item;
      });
      setAttributes({
        textFont: newUpdate
      });
    };

    const saveLearnMoreStyles = value => {
      const newUpdate = learnMoreStyles.map((item, index) => {
        if (0 === index) {
          item = { ...item,
            ...value
          };
        }

        return item;
      });
      setAttributes({
        learnMoreStyles: newUpdate
      });
    };

    const renderCSS = React.createElement("style", null, mediaStyle[0].borderRadius ? `#kt-info-box${uniqueID} .kt-blocks-info-box-link-wrap .kt-blocks-info-box-media img, #kt-info-box${uniqueID} .kt-blocks-info-box-link-wrap .kt-blocks-info-box-media .editor-media-placeholder { border-radius: ${mediaStyle[0].borderRadius}px; }` : '', mediaStyle[0].hoverBackground ? `#kt-info-box${uniqueID} .kt-blocks-info-box-link-wrap:hover .kt-blocks-info-box-media { background: ${mediaStyle[0].hoverBackground} !important; }` : '');

    const renderSVG = svg => React.createElement(_genicon.default, {
      name: svg,
      icon: 'fa' === svg.substring(0, 2) ? FaIco[svg] : _svgicons.default[svg]
    });

    return React.createElement("div", {
      id: `kt-info-box${uniqueID}`,
      className: className
    }, renderCSS, React.createElement(BlockControls, {
      key: "controls"
    }, React.createElement(BlockAlignmentToolbar, {
      value: blockAlignment,
      controls: ['center', 'wide', 'full', 'left', 'right'],
      onChange: value => setAttributes({
        blockAlignment: value
      })
    }), 'image' === mediaType && mediaImage[0].url && React.createElement(Toolbar, null, React.createElement(MediaUpload, {
      onSelect: onSelectMainImage,
      type: "image",
      value: mediaImage[0].id,
      allowedTypes: ALLOWED_MEDIA_TYPES,
      render: ({
        open
      }) => React.createElement(IconButton, {
        className: "components-toolbar__control",
        label: __('Edit Media'),
        icon: "format-image",
        onClick: open
      })
    })), React.createElement(AlignmentToolbar, {
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
    }), React.createElement(SelectControl, {
      label: __('Link Content'),
      value: linkProperty,
      options: [{
        value: 'box',
        label: __('Entire Box')
      }, {
        value: 'learnmore',
        label: __('Only Learn More Text')
      }],
      onChange: value => setAttributes({
        linkProperty: value
      })
    })), this.showSettings('containerSettings') && React.createElement(PanelBody, {
      title: __('Container Settings'),
      initialOpen: false
    }, React.createElement(SelectControl, {
      label: __('Background Type'),
      value: backgroundType,
      options: [{
        label: __('Solid Color'),
        value: 'color'
      }, {
        label: __('Image'),
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
    }))), this.showSettings('mediaSettings') && React.createElement(PanelBody, {
      title: __('Media Settings'),
      initialOpen: false
    }, React.createElement(TabPanel, {
      className: "kt-inspect-tabs kt-spacer-tabs",
      activeClass: "active-tab",
      tabs: [{
        name: 'desk',
        title: React.createElement(Dashicon, {
          icon: "desktop"
        }),
        className: 'kt-desk-tab'
      }, {
        name: 'tablet',
        title: React.createElement(Dashicon, {
          icon: "tablet"
        }),
        className: 'kt-tablet-tab'
      }, {
        name: 'mobile',
        title: React.createElement(Dashicon, {
          icon: "smartphone"
        }),
        className: 'kt-mobile-tab'
      }]
    }, tab => {
      let tabout;

      if (tab.name) {
        if ('mobile' === tab.name) {
          tabout = React.createElement(SelectControl, {
            label: __('Mobile Media Align'),
            value: mediaAlignMobile ? mediaAlignMobile : mediaAlign,
            options: [{
              value: 'top',
              label: __('Top')
            }, {
              value: 'left',
              label: __('Left')
            }, {
              value: 'right',
              label: __('Right')
            }],
            onChange: value => setAttributes({
              mediaAlignMobile: value
            })
          });
        } else if ('tablet' === tab.name) {
          tabout = React.createElement(SelectControl, {
            label: __('Tablet Media Align'),
            value: mediaAlignTablet ? mediaAlignTablet : mediaAlign,
            options: [{
              value: 'top',
              label: __('Top')
            }, {
              value: 'left',
              label: __('Left')
            }, {
              value: 'right',
              label: __('Right')
            }],
            onChange: value => setAttributes({
              mediaAlignTablet: value
            })
          });
        } else {
          tabout = React.createElement(SelectControl, {
            label: __('Media Align'),
            value: mediaAlign,
            options: [{
              value: 'top',
              label: __('Top')
            }, {
              value: 'left',
              label: __('Left')
            }, {
              value: 'right',
              label: __('Right')
            }],
            onChange: value => setAttributes({
              mediaAlign: value
            })
          });
        }
      }

      return React.createElement("div", null, tabout);
    }), mediaAlign !== 'top' && React.createElement(Fragment, null, React.createElement(SelectControl, {
      label: __('Media Vertical Align'),
      value: mediaVAlign,
      options: [{
        value: 'top',
        label: __('Top')
      }, {
        value: 'middle',
        label: __('Middle')
      }, {
        value: 'bottom',
        label: __('Bottom')
      }],
      onChange: value => setAttributes({
        mediaVAlign: value
      })
    })), React.createElement(SelectControl, {
      label: __('Media Type'),
      value: mediaType,
      options: [{
        value: 'icon',
        label: __('Icon')
      }, {
        value: 'image',
        label: __('Image')
      }, {
        value: 'none',
        label: __('None')
      }],
      onChange: value => setAttributes({
        mediaType: value
      })
    }), 'image' === mediaType && React.createElement(Fragment, null, mediaImage[0].url && React.createElement("div", {
      className: "kb-image-edit-settings-container"
    }, React.createElement(MediaUpload, {
      onSelect: onSelectMainImage,
      type: "image",
      value: mediaImage[0].id,
      allowedTypes: ALLOWED_MEDIA_TYPES,
      render: ({
        open
      }) => React.createElement(Button, {
        className: 'components-button components-icon-button kt-cta-upload-btn kb-upload-inline-btn',
        onClick: open
      }, React.createElement(Dashicon, {
        icon: "format-image"
      }), __('Edit Media'))
    }), React.createElement(IconButton, {
      label: __('clear'),
      className: "kb-clear-image-btn",
      icon: "no-alt",
      onClick: clearImage
    })), React.createElement(RangeControl, {
      label: __('Max Image Width'),
      value: mediaImage[0].maxWidth,
      onChange: value => saveMediaImage({
        maxWidth: value
      }),
      min: 5,
      max: 800,
      step: 1
    }), React.createElement(RangeControl, {
      label: __('Image Border Radius (px)'),
      value: mediaStyle[0].borderRadius,
      onChange: value => saveMediaStyle({
        borderRadius: value
      }),
      step: 1,
      min: 0,
      max: 200
    })), 'icon' === mediaType && React.createElement(Fragment, null, React.createElement(_reactFonticonpicker.default, {
      icons: _svgiconsnames.default,
      value: mediaIcon[0].icon,
      onChange: value => saveMediaIcon({
        icon: value
      }),
      appendTo: "body",
      renderFunc: renderSVG,
      theme: "default",
      isMulti: false
    }), React.createElement(RangeControl, {
      label: __('Icon Size'),
      value: mediaIcon[0].size,
      onChange: value => saveMediaIcon({
        size: value
      }),
      min: 5,
      max: 250,
      step: 1
    }), mediaIcon[0].icon && 'fe' === mediaIcon[0].icon.substring(0, 2) && React.createElement(RangeControl, {
      label: __('Icon Line Width'),
      value: mediaIcon[0].width,
      onChange: value => saveMediaIcon({
        width: value
      }),
      step: 0.5,
      min: 0.5,
      max: 4
    }), React.createElement(RangeControl, {
      label: __('Icon Border Radius (px)'),
      value: mediaStyle[0].borderRadius,
      onChange: value => saveMediaStyle({
        borderRadius: value
      }),
      step: 1,
      min: 0,
      max: 200
    }), React.createElement(TextControl, {
      label: __('Icon Title for Accessibility'),
      value: mediaIcon[0].title,
      onChange: value => saveMediaIcon({
        title: value
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
    }))), React.createElement("div", _extends({
      className: `kt-blocks-info-box-link-wrap kt-blocks-info-box-media-align-${mediaAlign} ${isSelectedClass} kt-info-halign-${hAlign} kb-info-box-vertical-media-align-${mediaVAlign}`,
      style: {
        borderColor: containerBorder ? (0, _hexToRgba.default)(containerBorder, undefined !== containerBorderOpacity ? containerBorderOpacity : 1) : (0, _hexToRgba.default)('#eeeeee', undefined !== containerBorderOpacity ? containerBorderOpacity : 1),
        background: containerBackground ? (0, _hexToRgba.default)(containerBackground, undefined !== containerBackgroundOpacity ? containerBackgroundOpacity : 1) : (0, _hexToRgba.default)('#f2f2f2', undefined !== containerBackgroundOpacity ? containerBackgroundOpacity : 1),
        borderRadius: containerBorderRadius + 'px',
        borderWidth: containerBorderWidth ? containerBorderWidth[0] + 'px ' + containerBorderWidth[1] + 'px ' + containerBorderWidth[2] + 'px ' + containerBorderWidth[3] + 'px' : '',
        padding: containerPadding ? containerPadding[0] + 'px ' + containerPadding[1] + 'px ' + containerPadding[2] + 'px ' + containerPadding[3] + 'px' : '',
        backgroundColor: !hasImageBg ? backgroundColor : '#2e358f',
        backgroundImage: hasImageBg && `url('${backgroundImage}')`,
        'background-size': hasImageBg && `cover`,
        color: hasImageBg && 'white'
      }
    }, backgroundImageData), React.createElement("div", {
      className: "g-section-overlay",
      style: overlayStyle
    }), React.createElement("div", {
      className: "g-section-wrapper",
      style: wrapperStyle
    }, 'none' !== mediaType && React.createElement("div", {
      className: `${classes.join(' ')} kt-blocks-info-box-media`,
      style: {
        borderColor: mediaStyle[0].border,
        backgroundColor: mediaStyle[0].background,
        borderRadius: mediaStyle[0].borderRadius + 'px',
        borderWidth: mediaStyle[0].borderWidth ? mediaStyle[0].borderWidth[0] + 'px ' + mediaStyle[0].borderWidth[1] + 'px ' + mediaStyle[0].borderWidth[2] + 'px ' + mediaStyle[0].borderWidth[3] + 'px' : '',
        padding: mediaStyle[0].padding ? mediaStyle[0].padding[0] + 'px ' + mediaStyle[0].padding[1] + 'px ' + mediaStyle[0].padding[2] + 'px ' + mediaStyle[0].padding[3] + 'px' : '',
        margin: mediaStyle[0].margin ? mediaStyle[0].margin[0] + 'px ' + mediaStyle[0].margin[1] + 'px ' + mediaStyle[0].margin[2] + 'px ' + mediaStyle[0].margin[3] + 'px' : ''
      }
    }, !mediaImage[0].url && 'image' === mediaType && React.createElement(MediaPlaceholder, {
      icon: "format-image",
      labels: {
        title: __('Media area')
      },
      onSelect: onSelectMainImage,
      accept: "image/*",
      allowedTypes: ALLOWED_MEDIA_TYPES
    }), mediaImage[0].url && 'image' === mediaType && React.createElement("div", {
      className: "kadence-info-box-image-inner-intrisic-container",
      style: {
        maxWidth: mediaImage[0].maxWidth + 'px'
      }
    }, React.createElement("div", {
      className: `kadence-info-box-image-intrisic ${'svg+xml' === mediaImage[0].subtype ? ' kb-info-box-image-type-svg' : ''}`,
      style: {
        paddingBottom: isNaN(mediaImage[0].height) ? undefined : mediaImage[0].height / mediaImage[0].width * 100 + '%',
        height: isNaN(mediaImage[0].height) ? undefined : 0
      }
    }, React.createElement("div", {
      className: "kadence-info-box-image-inner-intrisic"
    }, React.createElement("img", {
      src: mediaImage[0].url,
      alt: mediaImage[0].alt,
      width: mediaImage[0].subtype && 'svg+xml' === mediaImage[0].subtype ? mediaImage[0].maxWidth : mediaImage[0].width,
      height: mediaImage[0].height,
      className: `${mediaImage[0].id ? `kt-info-box-image wp-image-${mediaImage[0].id}` : 'kt-info-box-image wp-image-offsite'} ${mediaImage[0].subtype && 'svg+xml' === mediaImage[0].subtype ? ' kt-info-svg-image' : ''}`
    })))), 'icon' === mediaType && React.createElement("div", {
      className: `kadence-info-box-icon-container`
    }, React.createElement("div", {
      className: 'kadence-info-box-icon-inner-container'
    }, React.createElement(_genicon.default, {
      className: `kt-info-svg-icon kt-info-svg-icon-${mediaIcon[0].icon}`,
      name: mediaIcon[0].icon,
      size: !mediaIcon[0].size ? '14' : mediaIcon[0].size,
      icon: 'fa' === mediaIcon[0].icon.substring(0, 2) ? FaIco[mediaIcon[0].icon] : _svgicons.default[mediaIcon[0].icon],
      htmltag: "span",
      strokeWidth: 'fe' === mediaIcon[0].icon.substring(0, 2) ? mediaIcon[0].width : undefined,
      style: {
        display: 'block',
        color: mediaIcon[0].color ? mediaIcon[0].color : undefined
      }
    })))), React.createElement("div", {
      className: 'kt-infobox-textcontent text-center infobox-content text-white'
    }, displayTitle && React.createElement(RichText, {
      className: "info-box-title",
      tagName: titleTagName,
      placeholder: __('Title'),
      onChange: onChangeTitle,
      value: title,
      style: {
        fontWeight: titleFont[0].weight,
        color: 'white',
        fontSize: titleFont[0].size[0] + titleFont[0].sizeType,
        lineHeight: titleFont[0].lineHeight && titleFont[0].lineHeight[0] ? titleFont[0].lineHeight[0] + titleFont[0].lineType : undefined,
        fontFamily: titleFont[0].family ? titleFont[0].family : '',
        padding: titleFont[0].padding ? titleFont[0].padding[0] + 'px ' + titleFont[0].padding[1] + 'px ' + titleFont[0].padding[2] + 'px ' + titleFont[0].padding[3] + 'px' : '',
        margin: titleFont[0].margin ? titleFont[0].margin[0] + 'px ' + titleFont[0].margin[1] + 'px ' + titleFont[0].margin[2] + 'px ' + titleFont[0].margin[3] + 'px' : ''
      },
      keepPlaceholderOnFocus: true
    }), displayText && React.createElement(RichText, {
      className: "info-box-text text-white",
      tagName: 'p',
      placeholder: __('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean diam dolor, accumsan sed rutrum vel, dapibus et leo.'),
      onChange: value => setAttributes({
        contentText: value
      }),
      value: contentText,
      style: {
        fontWeight: textFont[0].weight,
        color: textColor,
        fontSize: textFont[0].size[0] + textFont[0].sizeType,
        lineHeight: textFont[0].lineHeight && textFont[0].lineHeight[0] ? textFont[0].lineHeight[0] + textFont[0].lineType : undefined,
        fontFamily: textFont[0].family ? textFont[0].family : ''
      },
      keepPlaceholderOnFocus: true
    }), displayLearnMore && React.createElement("button", {
      className: "kt-blocks-info-box-learnmore-wrap btn btn-secondary"
    }, React.createElement(RichText, {
      className: "info-learnmore",
      tagName: 'div',
      placeholder: __('Learn More'),
      onChange: value => setAttributes({
        learnMore: value
      }),
      value: learnMore,
      keepPlaceholderOnFocus: true
    }))))));
  }

} //  Start Drupal Specific.


const category = {
  slug: 'inclind-blocks',
  title: __('Custom Blocks')
}; // Grab the current categories and merge in the new category if not present.

const currentCategories = select('core/blocks').getCategories().filter(item => item.slug !== category.slug);
dispatch('core/blocks').setCategories([category, ...currentCategories]); // End Drupal Specific.

if (drupalSettings && drupalSettings.editor.formats.gutenberg.editorSettings !== undefined) {
  const blocks = drupalSettings.editor.formats.gutenberg.editorSettings.allowedBlocks;

  if (blocks.hasOwnProperty(category.slug + '/inclind-infobox') && blocks[category.slug + '/inclind-infobox']) {
    // Register the block.
    registerBlockType(category.slug + '/inclind-infobox', {
      title: __('Infobox (Bootstrap)', 'inclind-infobox'),
      description: __('Add infobox with background image/overlay.', 'inclind-infobox'),
      category: 'inclind-blocks',
      keywords: [__('Info', 'inclind-infobox'), __('Infobox', 'inclind-infobox'), __('inclind', 'inclind-infobox'), __('custom', 'inclind-infobox')],
      attributes: {
        blockAlignment: {
          type: 'string',
          default: 'none'
        },
        backgroundType: {
          type: 'string',
          default: 'color'
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
        contentWidth: {
          type: 'number'
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
        linkProperty: {
          type: 'string',
          default: 'learnmore'
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
          default: 'center'
        },
        containerBackground: {
          type: 'string',
          default: '#f2f2f2'
        },
        containerBackgroundOpacity: {
          type: 'number',
          default: 1
        },
        containerHoverBackground: {
          type: 'string',
          default: '#f2f2f2'
        },
        containerHoverBackgroundOpacity: {
          type: 'number',
          default: 1
        },
        containerBorder: {
          type: 'string',
          default: '#eeeeee'
        },
        containerBorderOpacity: {
          type: 'number',
          default: 1
        },
        containerHoverBorder: {
          type: 'string',
          default: '#eeeeee'
        },
        containerHoverBorderOpacity: {
          type: 'number',
          default: 1
        },
        containerBorderWidth: {
          type: 'array',
          default: [0, 0, 0, 0]
        },
        containerBorderRadius: {
          type: 'number',
          default: 0
        },
        containerPadding: {
          type: 'array',
          default: [20, 20, 20, 20]
        },
        mediaType: {
          type: 'string',
          default: 'none'
        },
        mediaAlign: {
          type: 'string',
          default: 'top'
        },
        mediaImage: {
          type: 'array',
          default: [{
            url: '',
            id: '',
            alt: '',
            width: '',
            height: '',
            maxWidth: '',
            flipUrl: '',
            flipId: '',
            flipAlt: '',
            flipWidth: '',
            flipHeight: '',
            subtype: '',
            flipSubtype: ''
          }]
        },
        mediaIcon: {
          type: 'array',
          default: [{
            icon: 'fe_aperture',
            size: 50,
            width: 2,
            title: '',
            color: '#444444',
            hoverColor: '#444444',
            flipIcon: ''
          }]
        },
        mediaStyle: {
          type: 'array',
          default: [{
            background: 'transparent',
            hoverBackground: 'transparent',
            border: '#444444',
            hoverBorder: '#444444',
            borderRadius: 0,
            borderWidth: [0, 0, 0, 0],
            padding: [10, 10, 10, 10],
            margin: [0, 15, 0, 15]
          }]
        },
        displayTitle: {
          type: 'bool',
          default: true
        },
        title: {
          type: 'array',
          source: 'children',
          selector: '.info-box-title',
          default: __('Title')
        },
        titleFont: {
          type: 'array',
          default: [{
            level: 3,
            size: ['', '', ''],
            sizeType: 'px',
            lineHeight: ['', '', ''],
            lineType: 'px',
            letterSpacing: '',
            textTransform: '',
            family: '',
            google: false,
            style: '',
            weight: '',
            variant: '',
            subset: '',
            loadGoogle: true,
            padding: [0, 0, 0, 0],
            paddingControl: 'linked',
            margin: [5, 0, 10, 0],
            marginControl: 'individual'
          }]
        },
        displayText: {
          type: 'bool',
          default: true
        },
        contentText: {
          type: 'array',
          source: 'children',
          selector: '.info-box-text',
          default: __('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean diam dolor, accumsan sed rutrum vel, dapibus et leo.')
        },
        textColor: {
          type: 'string',
          default: '#555555'
        },
        textHoverColor: {
          type: 'string',
          default: ''
        },
        textFont: {
          type: 'array',
          default: [{
            size: ['', '', ''],
            sizeType: 'px',
            lineHeight: ['', '', ''],
            lineType: 'px',
            letterSpacing: '',
            family: '',
            google: '',
            style: '',
            weight: '',
            variant: '',
            subset: '',
            loadGoogle: true
          }]
        },
        displayLearnMore: {
          type: 'bool',
          default: true
        },
        learnMore: {
          type: 'array',
          source: 'children',
          selector: '.info-learnmore',
          default: __('Learn More')
        },
        learnMoreStyles: {
          type: 'array',
          default: [{
            size: ['', '', ''],
            sizeType: 'px',
            lineHeight: ['', '', ''],
            lineType: 'px',
            letterSpacing: '',
            family: '',
            google: '',
            style: '',
            weight: '',
            variant: '',
            subset: '',
            loadGoogle: true,
            padding: [4, 8, 4, 8],
            paddingControl: 'individual',
            margin: [10, 0, 10, 0],
            marginControl: 'individual',
            color: '',
            background: 'transparent',
            border: '#555555',
            borderRadius: 0,
            borderWidth: [0, 0, 0, 0],
            borderControl: 'linked',
            colorHover: '#ffffff',
            backgroundHover: '#444444',
            borderHover: '#444444',
            hoverEffect: 'revealBorder'
          }]
        },
        mediaVAlign: {
          type: 'string',
          default: 'middle'
        },
        mediaAlignMobile: {
          type: 'string',
          default: 'top'
        },
        mediaAlignTablet: {
          type: 'string',
          default: 'top'
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

      edit: InclindInfobox,
      save: props => {
        const {
          attributes: {
            blockAlignment,
            backgroundType,
            backgroundColor,
            backgroundImage,
            backgroundImageData,
            backgroundImageUUID,
            overlayOpacity,
            overlayColor,
            margin,
            padding,
            contentWidth,
            uniqueID,
            link,
            linkProperty,
            target,
            hAlign,
            mediaType,
            mediaImage,
            mediaIcon,
            mediaAlign,
            displayTitle,
            title,
            titleFont,
            displayText,
            contentText,
            displayLearnMore,
            learnMore,
            mediaAlignMobile,
            mediaAlignTablet
          }
        } = props;
        const hasImageBg = backgroundType === 'image'; // const containerStyle = {
        //   backgroundColor: !hasImageBg ? backgroundColor : '#2e358f',
        //   backgroundImage: hasImageBg && `url('${backgroundImage}')`,
        //   'background-size': hasImageBg && `cover`,
        //   color: hasImageBg && 'white',
        // };

        const overlayStyle = !hasImageBg ? {} : {
          display: 'block',
          backgroundColor: overlayColor || '#2e358f',
          opacity: parseInt(overlayOpacity, 10) / 100
        };
        const wrapperStyle = {
          maxWidth: contentWidth && `${contentWidth}px`
        };
        const classes = [// className,
        (0, _classnames.default)(`align${blockAlignment ? blockAlignment : 'none'}`), 'infobox p-4 mb-4 bg-primary text-' + hAlign];
        const titleTagName = 'h' + titleFont[0].level;
        const image = React.createElement("div", {
          className: "kadence-info-box-image-inner-intrisic-container",
          style: {
            maxWidth: mediaImage[0].maxWidth + 'px'
          }
        }, React.createElement("div", {
          className: `kadence-info-box-image-intrisic ${'svg+xml' === mediaImage[0].subtype ? ' kb-info-box-image-type-svg' : ''}`,
          style: {
            paddingBottom: isNaN(mediaImage[0].height) ? undefined : mediaImage[0].height / mediaImage[0].width * 100 + '%',
            height: isNaN(mediaImage[0].height) ? undefined : 0,
            width: isNaN(mediaImage[0].width) || 'svg+xml' === mediaImage[0].subtype ? mediaImage[0].maxWidth + 'px' : mediaImage[0].width + 'px',
            maxWidth: '100%'
          }
        }, React.createElement("div", {
          className: "kadence-info-box-image-inner-intrisic"
        }, React.createElement("img", {
          src: mediaImage[0].url,
          alt: mediaImage[0].alt,
          width: mediaImage[0].subtype && 'svg+xml' === mediaImage[0].subtype ? mediaImage[0].maxWidth : mediaImage[0].width,
          height: mediaImage[0].height,
          className: `${mediaImage[0].id ? `kt-info-box-image wp-image-${mediaImage[0].id}` : 'kt-info-box-image wp-image-offsite'} ${mediaImage[0].subtype && 'svg+xml' === mediaImage[0].subtype ? ' kt-info-svg-image' : ''}`
        }))));
        const icon = React.createElement("div", {
          className: `kadence-info-box-icon-container`
        }, React.createElement("div", {
          className: 'kadence-info-box-icon-inner-container'
        }, React.createElement(_genicon.default, {
          className: `kt-info-svg-icon kt-info-svg-icon-${mediaIcon[0].icon}`,
          name: mediaIcon[0].icon,
          size: !mediaIcon[0].size ? '14' : mediaIcon[0].size,
          icon: 'fa' === mediaIcon[0].icon.substring(0, 2) ? FaIco[mediaIcon[0].icon] : _svgicons.default[mediaIcon[0].icon],
          htmltag: "span",
          strokeWidth: 'fe' === mediaIcon[0].icon.substring(0, 2) ? mediaIcon[0].width : undefined,
          style: {
            display: 'block'
          }
        })));
        const learnMoreOutput = React.createElement(RichText.Content, {
          className: "info-learnmore btn btn-secondary btn-sm",
          tagName: 'button',
          value: learnMore,
          type: 'button'
        });
        const learnMoreLinkOutput = React.createElement("a", {
          href: link,
          target: '_blank' === target ? target : undefined,
          rel: '_blank' === target ? 'noopener noreferrer' : undefined
        }, React.createElement(RichText.Content, {
          className: "info-learnmore btn btn-secondary btn-sm",
          tagName: 'button',
          value: learnMore,
          type: 'button'
        }));
        const textOutput = React.createElement("div", {
          className: "info-content"
        }, displayTitle && React.createElement(RichText.Content, {
          className: "info-box-title info-title text-white",
          tagName: titleTagName,
          value: title
        }), displayText && React.createElement(RichText.Content, {
          className: "info-box-text info-text",
          tagName: 'p',
          value: contentText
        }), displayLearnMore && link !== undefined && linkProperty === 'learnmore' && learnMoreLinkOutput, displayLearnMore && (linkProperty !== 'learnmore' || link === undefined) && learnMoreOutput);
        classes.push('has-overlay');

        if (margin) {
          classes.push(`my-${margin}`);
        }

        if (padding) {
          classes.push(`py-${padding}`);
        } // Render the section on Front-end:


        return React.createElement("div", {
          id: `kt-info-box${uniqueID}`,
          className: classes.join(' ')
        }, React.createElement("div", {
          className: "infobox-image"
        }, React.createElement("div", {
          className: "overlay-wrapper"
        }, React.createElement("div", {
          className: "overlay bg-primary"
        }), React.createElement("img", {
          "data-image-style": "480x480",
          "data-entity-type": "file",
          "data-entity-uuid": `${backgroundImageUUID}`,
          src: `${backgroundImage}`,
          alt: "",
          className: "image image--jumbotron image--overlay img-fluid js-image-exists"
        }))), React.createElement("div", {
          className: "g-section-wrapper",
          style: wrapperStyle
        }, linkProperty !== 'learnmore' && link !== undefined && React.createElement("a", {
          className: ``,
          target: '_blank' === target ? target : undefined,
          rel: '_blank' === target ? 'noopener noreferrer' : undefined,
          href: link
        }, React.createElement("div", {
          className: "infobox-content text-white row align-items-center"
        }, 'none' !== mediaType && React.createElement("div", {
          className: `media-container py-4`
        }, React.createElement("div", {
          className: `kt-blocks-info-box-media`
        }, mediaImage[0].url && 'image' === mediaType && image, 'icon' === mediaType && icon)), textOutput)), (linkProperty === 'learnmore' || link === undefined) && React.createElement("div", {
          className: "infobox-content text-white row align-items-center"
        }, 'none' !== mediaType && React.createElement("div", {
          className: `media-container py-4`
        }, React.createElement("div", {
          className: `kt-blocks-info-box-media`
        }, mediaImage[0].url && 'image' === mediaType && image, 'icon' === mediaType && icon)), textOutput)));
      }
    });
  }
}