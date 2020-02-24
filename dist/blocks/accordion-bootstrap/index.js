"use strict";

var _accordionBootstrap = _interopRequireDefault(require("./components/accordion-bootstrap"));

var _times = _interopRequireDefault(require("lodash/times"));

var _classnames = _interopRequireDefault(require("classnames"));

var _memize = _interopRequireDefault(require("memize"));

var _map = _interopRequireDefault(require("lodash/map"));

var _reactFonticonpicker = _interopRequireDefault(require("@fonticonpicker/react-fonticonpicker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import block dependencies and components
// import WebfontLoader from '../../fontloader';
// import TypographyControls from '../../typography-control';
// import MeasurementControls from '../../measurement-control';
// import BorderColorControls from '../../border-color-control';
// Internationalization
const __ = Drupal.t; // Extend component

const {
  Component,
  Fragment
} = wp.element; // Register block

const {
  registerBlockType,
  createBlock
} = wp.blocks; // Register editor components

const {
  InnerBlocks,
  InspectorControls,
  BlockControls,
  AlignmentToolbar,
  ColorPalette,
  BlockAlignmentToolbar
} = wp.blockEditor; // Register components

const {
  TabPanel,
  Button,
  ButtonGroup,
  PanelBody,
  Dashicon,
  RangeControl,
  ToggleControl,
  SelectControl,
  IconButton
} = wp.components;
const {
  dispatch,
  select
} = wp.data;
/**
 * This allows for checking to see if the block needs to generate a new ID.
 */

const ktaccordUniqueIDs = [];
const ALLOWED_BLOCKS = ['inclind-blocks/inclind-pane'];
/**
 * Returns the layouts configuration for a given number of panes.
 *
 * @param {number} panes Number of panes.
 *
 * @return {Object[]} Panes layout configuration.
 */

const getPanesTemplate = (0, _memize.default)((panes, collapse, parent) => {
  return (0, _times.default)(panes, n => ['inclind-blocks/inclind-pane', {
    id: n + 1,
    parentID: parent,
    startCollapsed: collapse
  }]);
});

class InclindAccordionBootstrap extends Component {
  constructor() {
    super(...arguments);
    this.showSettings = this.showSettings.bind(this);
    this.state = {
      contentPaddingControl: 'linked',
      contentBorderRadiusControl: 'linked',
      contentBorderControl: 'linked',
      titleBorderControl: 'linked',
      titlePaddingControl: 'individual',
      titleBorderRadiusControl: 'linked',
      titleBorderColorControl: 'linked',
      titleBorderHoverColorControl: 'linked',
      titleBorderActiveColorControl: 'linked',
      titleTag: 'div',
      showPreset: false,
      user: 'admin',
      settings: {}
    };
  }

  componentDidMount() {
    if (!this.props.attributes.uniqueID) {
      if (this.props.attributes.showPresets) {
        this.setState({
          showPreset: true
        });
      }

      this.props.setAttributes({
        uniqueID: '_' + this.props.clientId.substr(2, 9)
      });
      ktaccordUniqueIDs.push('_' + this.props.clientId.substr(2, 9));
    } else if (ktaccordUniqueIDs.includes(this.props.attributes.uniqueID)) {
      this.props.setAttributes({
        uniqueID: '_' + this.props.clientId.substr(2, 9)
      });
      ktaccordUniqueIDs.push('_' + this.props.clientId.substr(2, 9));
    } else {
      ktaccordUniqueIDs.push(this.props.attributes.uniqueID);
    }

    if (this.props.attributes.titleStyles[0].padding[0] === this.props.attributes.titleStyles[0].padding[1] && this.props.attributes.titleStyles[0].padding[0] === this.props.attributes.titleStyles[0].padding[2] && this.props.attributes.titleStyles[0].padding[0] === this.props.attributes.titleStyles[0].padding[3]) {
      this.setState({
        titlePaddingControl: 'linked'
      });
    } else {
      this.setState({
        titlePaddingControl: 'individual'
      });
    }

    if (this.props.attributes.titleStyles[0].borderWidth[0] === this.props.attributes.titleStyles[0].borderWidth[1] && this.props.attributes.titleStyles[0].borderWidth[0] === this.props.attributes.titleStyles[0].borderWidth[2] && this.props.attributes.titleStyles[0].borderWidth[0] === this.props.attributes.titleStyles[0].borderWidth[3]) {
      this.setState({
        titleBorderControl: 'linked'
      });
    } else {
      this.setState({
        titleBorderControl: 'individual'
      });
    }

    if (this.props.attributes.titleStyles[0].borderRadius[0] === this.props.attributes.titleStyles[0].borderRadius[1] && this.props.attributes.titleStyles[0].borderRadius[0] === this.props.attributes.titleStyles[0].borderRadius[2] && this.props.attributes.titleStyles[0].borderRadius[0] === this.props.attributes.titleStyles[0].borderRadius[3]) {
      this.setState({
        titleBorderRadiusControl: 'linked'
      });
    } else {
      this.setState({
        titleBorderRadiusControl: 'individual'
      });
    }

    if (this.props.attributes.contentBorder[0] === this.props.attributes.contentBorder[1] && this.props.attributes.contentBorder[0] === this.props.attributes.contentBorder[2] && this.props.attributes.contentBorder[0] === this.props.attributes.contentBorder[3]) {
      this.setState({
        contentBorderControl: 'linked'
      });
    } else {
      this.setState({
        contentBorderControl: 'individual'
      });
    }

    if (this.props.attributes.contentBorderRadius[0] === this.props.attributes.contentBorderRadius[1] && this.props.attributes.contentBorderRadius[0] === this.props.attributes.contentBorderRadius[2] && this.props.attributes.contentBorderRadius[0] === this.props.attributes.contentBorderRadius[3]) {
      this.setState({
        contentBorderRadiusControl: 'linked'
      });
    } else {
      this.setState({
        contentBorderRadiusControl: 'individual'
      });
    }

    if (this.props.attributes.contentPadding[0] === this.props.attributes.contentPadding[1] && this.props.attributes.contentPadding[0] === this.props.attributes.contentPadding[2] && this.props.attributes.contentPadding[0] === this.props.attributes.contentPadding[3]) {
      this.setState({
        contentPaddingControl: 'linked'
      });
    } else {
      this.setState({
        contentPaddingControl: 'individual'
      });
    }

    if (this.props.attributes.titleStyles[0].border[0] === this.props.attributes.titleStyles[0].border[1] && this.props.attributes.titleStyles[0].border[0] === this.props.attributes.titleStyles[0].border[2] && this.props.attributes.titleStyles[0].border[0] === this.props.attributes.titleStyles[0].border[3]) {
      this.setState({
        titleBorderColorControl: 'linked'
      });
    } else {
      this.setState({
        titleBorderColorControl: 'individual'
      });
    }

    if (this.props.attributes.titleStyles[0].borderHover[0] === this.props.attributes.titleStyles[0].borderHover[1] && this.props.attributes.titleStyles[0].borderHover[0] === this.props.attributes.titleStyles[0].borderHover[2] && this.props.attributes.titleStyles[0].borderHover[0] === this.props.attributes.titleStyles[0].borderHover[3]) {
      this.setState({
        titleBorderHoverColorControl: 'linked'
      });
    } else {
      this.setState({
        titleBorderHoverColorControl: 'individual'
      });
    }

    if (this.props.attributes.titleStyles[0].borderActive[0] === this.props.attributes.titleStyles[0].borderActive[1] && this.props.attributes.titleStyles[0].borderActive[0] === this.props.attributes.titleStyles[0].borderActive[2] && this.props.attributes.titleStyles[0].borderActive[0] === this.props.attributes.titleStyles[0].borderActive[3]) {
      this.setState({
        titleBorderActiveColorControl: 'linked'
      });
    } else {
      this.setState({
        titleBorderActiveColorControl: 'individual'
      });
    }

    const accordionBlock = wp.data.select('core/block-editor').getBlocksByClientId(this.props.clientId);

    if (accordionBlock && accordionBlock[0] && accordionBlock[0].innerBlocks[0] && accordionBlock[0].innerBlocks[0].attributes && accordionBlock[0].innerBlocks[0].attributes.titleTag) {
      this.setState({
        titleTag: accordionBlock[0].innerBlocks[0].attributes.titleTag
      });
    }

    const blockSettings = {};

    if (blockSettings['inclind-blocks/accordion-bootstrap'] !== undefined && typeof blockSettings['inclind-blocks/accordion-bootstrap'] === 'object') {
      this.setState({
        settings: blockSettings['inclind-blocks/accordion-bootstrap']
      });
    }
  }

  showSettings(key) {
    let donot_allow = ['backgroundSettings'];

    if (donot_allow.includes(key)) {
      return false;
    }

    return true;
  }

  render() {
    const {
      attributes: {
        uniqueID,
        paneCount,
        blockAlignment,
        openPane,
        titleStyles,
        contentPadding,
        minHeight,
        maxWidth,
        contentBorder,
        contentBorderColor,
        contentBorderRadius,
        contentBgColor,
        titleAlignment,
        startCollapsed,
        linkPaneCollapse,
        showIcon,
        iconStyle,
        iconSide
      },
      className,
      setAttributes,
      clientId
    } = this.props;
    const {
      titleBorderRadiusControl,
      titleBorderControl,
      titlePaddingControl,
      contentBorderControl,
      contentBorderRadiusControl,
      contentPaddingControl,
      titleBorderColorControl,
      titleBorderHoverColorControl,
      titleBorderActiveColorControl,
      titleTag
    } = this.state;
    const accordionBlock = wp.data.select('core/block-editor').getBlocksByClientId(clientId);
    const realPaneCount = accordionBlock && accordionBlock[0] ? accordionBlock[0].innerBlocks.length : 0;

    const saveTitleStyles = value => {
      const newUpdate = titleStyles.map((item, index) => {
        if (0 === index) {
          item = { ...item,
            ...value
          };
        }

        return item;
      });
      setAttributes({
        titleStyles: newUpdate
      });
    };

    const lgconfig = {
      google: {
        families: [titleStyles[0].family + (titleStyles[0].variant ? ':' + titleStyles[0].variant : '')]
      }
    };
    const config = titleStyles[0].google ? lgconfig : '';
    const classes = (0, _classnames.default)(className, `kt-accordion-wrap kt-accordion-id${uniqueID} kt-accordion-has-${paneCount}-panes kt-accordion-block kt-pane-header-alignment-${titleAlignment}`);
    const normalSettings = React.createElement(Fragment, null, React.createElement("p", {
      className: "kt-setting-label"
    }, __('Title Color')), React.createElement(ColorPalette, {
      value: titleStyles[0].color,
      onChange: value => saveTitleStyles({
        color: value
      })
    }), React.createElement("p", {
      className: "kt-setting-label"
    }, __('Title Background')), React.createElement(ColorPalette, {
      value: titleStyles[0].background,
      onChange: value => saveTitleStyles({
        background: value
      })
    }));
    const hoverSettings = React.createElement(Fragment, null, React.createElement("p", {
      className: "kt-setting-label"
    }, __('Hover Color')), React.createElement(ColorPalette, {
      value: titleStyles[0].colorHover,
      onChange: value => saveTitleStyles({
        colorHover: value
      })
    }), React.createElement("p", {
      className: "kt-setting-label"
    }, __('Hover Background')), React.createElement(ColorPalette, {
      value: titleStyles[0].backgroundHover,
      onChange: value => saveTitleStyles({
        backgroundHover: value
      })
    }));
    const activeSettings = React.createElement(Fragment, null, React.createElement("p", {
      className: "kt-setting-label"
    }, __('Active Color')), React.createElement(ColorPalette, {
      value: titleStyles[0].colorActive,
      onChange: value => saveTitleStyles({
        colorActive: value
      })
    }), React.createElement("p", {
      className: "kt-setting-label"
    }, __('Active Background')), React.createElement(ColorPalette, {
      value: titleStyles[0].backgroundActive,
      onChange: value => saveTitleStyles({
        backgroundActive: value
      })
    }));
    const accordionIconSet = [];
    accordionIconSet.basic = React.createElement(Fragment, null, React.createElement("rect", {
      x: "77.002",
      y: "12.507",
      width: "13.982",
      height: "74.986",
      fill: "#444"
    }), React.createElement("path", {
      d: "M359.538,56.991l0,-13.982l-74.986,0l0,13.982l74.986,0Z",
      fill: "#444"
    }), React.createElement("path", {
      d: "M121.486,56.991l0,-13.982l-74.986,0l0,13.982l74.986,0Z",
      fill: "#444"
    }), React.createElement("path", {
      d: "M359.538,56.991l0,-13.982l-74.986,0l0,13.982l74.986,0Z",
      fill: "#444"
    }));
    accordionIconSet.basiccircle = React.createElement(Fragment, null, React.createElement("circle", {
      cx: "83.723",
      cy: "50",
      r: "50",
      fill: "#444"
    }), React.createElement("circle", {
      cx: "322.768",
      cy: "50",
      r: "50",
      fill: "#444"
    }), React.createElement("rect", {
      x: "77.002",
      y: "12.507",
      width: "13.982",
      height: "74.986",
      fill: "#fff"
    }), React.createElement("path", {
      d: "M359.538,56.991l0,-13.982l-74.986,0l0,13.982l74.986,0Z",
      fill: "#fff"
    }), React.createElement("path", {
      d: "M121.486,56.991l0,-13.982l-74.986,0l0,13.982l74.986,0Z",
      fill: "#fff"
    }), React.createElement("path", {
      d: "M359.538,56.991l0,-13.982l-74.986,0l0,13.982l74.986,0Z",
      fill: "#fff"
    }));
    accordionIconSet.xclose = React.createElement(Fragment, null, React.createElement("rect", {
      x: "77.002",
      y: "12.507",
      width: "13.982",
      height: "74.986",
      fill: "#444"
    }), React.createElement("path", {
      d: "M353.5,28.432l-9.887,-9.887l-53.023,53.023l9.887,9.887l53.023,-53.023Z",
      fill: "#444"
    }), React.createElement("path", {
      d: "M121.486,56.991l0,-13.982l-74.986,0l0,13.982l74.986,0Z",
      fill: "#444"
    }), React.createElement("path", {
      d: "M343.613,81.455l9.887,-9.887l-53.023,-53.023l-9.887,9.887l53.023,53.023Z",
      fill: "#444"
    }));
    accordionIconSet.xclosecircle = React.createElement(Fragment, null, React.createElement("circle", {
      cx: "83.723",
      cy: "50",
      r: "50",
      fill: "#444"
    }), React.createElement("circle", {
      cx: "322.768",
      cy: "50",
      r: "50",
      fill: "#444"
    }), React.createElement("rect", {
      x: "77.002",
      y: "12.507",
      width: "13.982",
      height: "74.986",
      fill: "#fff"
    }), React.createElement("path", {
      d: "M343.613,81.455l9.887,-9.887l-53.023,-53.023l-9.887,9.887l53.023,53.023Z",
      fill: "#fff"
    }), React.createElement("path", {
      d: "M121.486,56.991l0,-13.982l-74.986,0l0,13.982l74.986,0Z",
      fill: "#fff"
    }), React.createElement("path", {
      d: "M290.59,71.568l9.887,9.887l53.023,-53.023l-9.887,-9.887l-53.023,53.023Z",
      fill: "#fff"
    }));
    accordionIconSet.arrow = React.createElement(Fragment, null, React.createElement("g", {
      fill: "#444"
    }, React.createElement("path", {
      d: "M122.2,37.371l-9.887,-9.886l-38.887,38.887l9.887,9.887l38.887,-38.888Z"
    }), React.createElement("path", {
      d: "M83.18,76.515l9.887,-9.886l-38.92,-38.921l-9.887,9.887l38.92,38.92Z"
    })), React.createElement("g", {
      fill: "#444"
    }, React.createElement("path", {
      d: "M283.65,63.629l9.887,9.886l38.887,-38.887l-9.887,-9.887l-38.887,38.888Z"
    }), React.createElement("path", {
      d: "M322.67,24.485l-9.887,9.886l38.92,38.921l9.887,-9.887l-38.92,-38.92Z"
    })));
    accordionIconSet.arrowcircle = React.createElement(Fragment, null, React.createElement("circle", {
      cx: "83.723",
      cy: "50",
      r: "50",
      fill: "#444"
    }), React.createElement("circle", {
      cx: "322.768",
      cy: "50",
      r: "50",
      fill: "#444"
    }), React.createElement("g", {
      fill: "#fff"
    }, React.createElement("path", {
      d: "M122.2,37.371l-9.887,-9.886l-38.887,38.887l9.887,9.887l38.887,-38.888Z"
    }), React.createElement("path", {
      d: "M83.18,76.515l9.887,-9.886l-38.92,-38.921l-9.887,9.887l38.92,38.92Z"
    })), React.createElement("g", {
      fill: "#fff"
    }, React.createElement("path", {
      d: "M283.65,63.629l9.887,9.886l38.887,-38.887l-9.887,-9.887l-38.887,38.888Z"
    }), React.createElement("path", {
      d: "M322.67,24.485l-9.887,9.886l38.92,38.921l9.887,-9.887l-38.92,-38.92Z"
    })));

    const renderIconSet = svg => React.createElement("svg", {
      className: "accord-icon",
      viewBox: "0 0 400 100",
      xmlns: "http://www.w3.org/2000/svg",
      preserveAspectRatio: "none",
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: "1.414",
      style: {
        fill: '#000000'
      }
    }, accordionIconSet[svg]);

    const renderCSS = React.createElement("style", null, `
				.kt-accordion-${uniqueID} .kt-blocks-accordion-header {
					color: ${titleStyles[0].color};
					border-color: ${titleStyles[0].border[0]} ${titleStyles[0].border[1]} ${titleStyles[0].border[2]} ${titleStyles[0].border[3]};
					background-color: ${titleStyles[0].background};
					padding:${titleStyles[0].padding[0]}px ${titleStyles[0].padding[1]}px ${titleStyles[0].padding[2]}px ${titleStyles[0].padding[3]}px;
					margin-top:${titleStyles[0].marginTop > 32 ? titleStyles[0].marginTop : 0}px;
					border-width:${titleStyles[0].borderWidth[0]}px ${titleStyles[0].borderWidth[1]}px ${titleStyles[0].borderWidth[2]}px ${titleStyles[0].borderWidth[3]}px;
					border-radius:${titleStyles[0].borderRadius[0]}px ${titleStyles[0].borderRadius[1]}px ${titleStyles[0].borderRadius[2]}px ${titleStyles[0].borderRadius[3]}px;
					font-size:${titleStyles[0].size[0]}${titleStyles[0].sizeType};
					line-height:${titleStyles[0].lineHeight[0]}${titleStyles[0].lineType};
					letter-spacing:${titleStyles[0].letterSpacing}px;
					text-transform:${titleStyles[0].textTransform};
					font-family:${titleStyles[0].family};
					font-style:${titleStyles[0].style};
					font-weight:${titleStyles[0].weight};
				}
				.kt-accordion-${uniqueID} .kt-blocks-accordion-header .kt-blocks-accordion-title {
					line-height:${titleStyles[0].lineHeight[0]}${titleStyles[0].lineType};
				}
				.kt-accordion-${uniqueID} .kt-blocks-accordion-header .kt-btn-svg-icon svg {
					width:${titleStyles[0].size[0]}${titleStyles[0].sizeType};
					height:${titleStyles[0].size[0]}${titleStyles[0].sizeType};
				}
				.kt-accordion-${uniqueID} .kt-accordion-panel-inner {
					padding:${contentPadding[0]}px ${contentPadding[1]}px ${contentPadding[2]}px ${contentPadding[3]}px;
					background-color: ${contentBgColor};
					border-color: ${contentBorderColor};
					border-width:${contentBorder[0]}px ${contentBorder[1]}px ${contentBorder[2]}px ${contentBorder[3]}px;
					border-radius:${contentBorderRadius[0]}px ${contentBorderRadius[1]}px ${contentBorderRadius[2]}px ${contentBorderRadius[3]}px;
					min-height:${minHeight ? minHeight + 'px' : '0'};
				}
				.kt-accordion-${uniqueID}:not( .kt-accodion-icon-style-basiccircle ):not( .kt-accodion-icon-style-xclosecircle ):not( .kt-accodion-icon-style-arrowcircle ) .kt-blocks-accordion-header .kt-blocks-accordion-icon-trigger:before, .kt-accordion-${uniqueID}:not( .kt-accodion-icon-style-basiccircle ):not( .kt-accodion-icon-style-xclosecircle ):not( .kt-accodion-icon-style-arrowcircle ) .kt-blocks-accordion-header .kt-blocks-accordion-icon-trigger:after {
					background-color: ${titleStyles[0].color};
				}
				.kt-accordion-${uniqueID}:not( .kt-accodion-icon-style-basic ):not( .kt-accodion-icon-style-xclose ):not( .kt-accodion-icon-style-arrow ) .kt-blocks-accordion-header .kt-blocks-accordion-icon-trigger:before, .kt-accordion-${uniqueID}:not( .kt-accodion-icon-style-basic ):not( .kt-accodion-icon-style-xclose ):not( .kt-accodion-icon-style-arrow ) .kt-blocks-accordion-header .kt-blocks-accordion-icon-trigger:after {
					background-color: ${titleStyles[0].background};
				}
				.kt-accordion-${uniqueID}:not( .kt-accodion-icon-style-basic ):not( .kt-accodion-icon-style-xclose ):not( .kt-accodion-icon-style-arrow ) .kt-blocks-accordion-header .kt-blocks-accordion-icon-trigger {
					background-color: ${titleStyles[0].color};
				}
				.kt-accordion-${uniqueID} .kt-blocks-accordion-header:hover {
					color: ${titleStyles[0].colorHover};
					border-color: ${titleStyles[0].borderHover[0]} ${titleStyles[0].borderHover[1]} ${titleStyles[0].borderHover[2]} ${titleStyles[0].borderHover[3]};
					background-color: ${titleStyles[0].backgroundHover};
				}
				.kt-accordion-${uniqueID}:not( .kt-accodion-icon-style-basiccircle ):not( .kt-accodion-icon-style-xclosecircle ):not( .kt-accodion-icon-style-arrowcircle ) .kt-blocks-accordion-header:hover .kt-blocks-accordion-icon-trigger:before, .kt-accordion-${uniqueID}:not( .kt-accodion-icon-style-basiccircle ):not( .kt-accodion-icon-style-xclosecircle ):not( .kt-accodion-icon-style-arrowcircle ) .kt-blocks-accordion-header:hover .kt-blocks-accordion-icon-trigger:after {
					background-color: ${titleStyles[0].colorHover};
				}
				.kt-accordion-${uniqueID}:not( .kt-accodion-icon-style-basic ):not( .kt-accodion-icon-style-xclose ):not( .kt-accodion-icon-style-arrow ) .kt-blocks-accordion-header:hover .kt-blocks-accordion-icon-trigger:before, .kt-accordion-${uniqueID}:not( .kt-accodion-icon-style-basic ):not( .kt-accodion-icon-style-xclose ):not( .kt-accodion-icon-style-arrow ) .kt-blocks-accordion-header:hover .kt-blocks-accordion-icon-trigger:after {
					background-color: ${titleStyles[0].backgroundHover};
				}
				.kt-accordion-${uniqueID}:not( .kt-accodion-icon-style-basic ):not( .kt-accodion-icon-style-xclose ):not( .kt-accodion-icon-style-arrow ) .kt-blocks-accordion-header:hover .kt-blocks-accordion-icon-trigger {
					background-color: ${titleStyles[0].colorHover};
                                }
				.kt-accordion-${uniqueID}.kt-start-active-pane-${openPane + 1} .kt-accordion-pane-${openPane + 1} .kt-blocks-accordion-header {
					color: ${titleStyles[0].colorActive};
					border-color: ${titleStyles[0].borderActive[0]} ${titleStyles[0].borderActive[1]} ${titleStyles[0].borderActive[2]} ${titleStyles[0].borderActive[3]};
					background-color: ${titleStyles[0].backgroundActive};
				}
				.kt-accordion-${uniqueID}.kt-start-active-pane-${openPane + 1}:not( .kt-accodion-icon-style-basiccircle ):not( .kt-accodion-icon-style-xclosecircle ):not( .kt-accodion-icon-style-arrowcircle ) .kt-accordion-pane-${openPane + 1} .kt-blocks-accordion-icon-trigger:before, .kt-accordion-${uniqueID}.kt-start-active-pane-${openPane + 1}:not( .kt-accodion-icon-style-basiccircle ):not( .kt-accodion-icon-style-xclosecircle ):not( .kt-accodion-icon-style-arrowcircle ) .kt-accordion-pane-${openPane + 1} .kt-blocks-accordion-icon-trigger:after {
					background-color: ${titleStyles[0].colorActive};
				}
				.kt-accordion-${uniqueID}.kt-start-active-pane-${openPane + 1}:not( .kt-accodion-icon-style-basic ):not( .kt-accodion-icon-style-xclose ):not( .kt-accodion-icon-style-arrow ) .kt-accordion-pane-${openPane + 1} .kt-blocks-accordion-icon-trigger:before, .kt-accordion-${uniqueID}.kt-start-active-pane-${openPane + 1}:not( .kt-accodion-icon-style-basic ):not( .kt-accodion-icon-style-xclose ):not( .kt-accodion-icon-style-arrow ) .kt-accordion-pane-${openPane + 1} .kt-blocks-accordion-icon-trigger:after {
					background-color: ${titleStyles[0].backgroundActive};
				}
				.kt-accordion-${uniqueID}.kt-start-active-pane-${openPane + 1}:not( .kt-accodion-icon-style-basic ):not( .kt-accodion-icon-style-xclose ):not( .kt-accodion-icon-style-arrow ) .kt-accordion-pane-${openPane + 1} .kt-blocks-accordion-icon-trigger {
					background-color: ${titleStyles[0].colorActive};
				}
				`); // Unique HTML ID for accordion:

    var startCollapseVar = this.props.startCollapsed;
    const acc_unique_id = `accord_${this.props.clientId.substr(2, 9)}`;

    const onStartCollapsedChange = collapse => {
      startCollapseVar = collapse;
      setAttributes({
        startCollapsed: collapse
      });
    };

    return React.createElement(Fragment, null, renderCSS, React.createElement(BlockControls, null, React.createElement(BlockAlignmentToolbar, {
      value: blockAlignment,
      controls: ['center', 'wide', 'full'],
      onChange: value => setAttributes({
        blockAlignment: value
      })
    }), React.createElement(AlignmentToolbar, {
      value: titleAlignment,
      onChange: nextAlign => {
        setAttributes({
          titleAlignment: nextAlign
        });
      }
    })), this.showSettings('allSettings') && React.createElement(InspectorControls, null, this.showSettings('titleTag') && React.createElement(PanelBody, {
      title: __('Title Tag Settings', 'inclind-blocks'),
      initialOpen: false
    }, React.createElement(SelectControl, {
      label: __('Title Tag', 'inclind-blocks'),
      value: titleTag,
      options: [{
        value: 'div',
        label: __('div')
      }, {
        value: 'h2',
        label: __('h2')
      }, {
        value: 'h3',
        label: __('h3')
      }, {
        value: 'h4',
        label: __('h4')
      }, {
        value: 'h5',
        label: __('h5')
      }, {
        value: 'h6',
        label: __('h6')
      }],
      onChange: value => {
        (0, _times.default)(realPaneCount, n => {
          wp.data.dispatch('core/block-editor').updateBlockAttributes(accordionBlock[0].innerBlocks[n].clientId, {
            titleTag: value
          });
        });
        this.setState({
          titleTag: value
        });
      }
    }))), React.createElement("div", {
      className: classes
    }, !this.state.showPreset && React.createElement(Fragment, null, React.createElement("div", {
      className: "kt-accordion-selecter"
    }, __('Accordion', 'inclind-blocks')), React.createElement("div", {
      className: "kt-accordion-wrap",
      style: {
        maxWidth: maxWidth + 'px'
      }
    }, React.createElement("div", {
      id: `kt-accordion-${uniqueID}`,
      className: `kt-accordion-inner-wrap kt-accordion-${uniqueID} kt-start-active-pane-${openPane + 1} kt-accodion-icon-style-${iconStyle && showIcon ? iconStyle : 'none'} kt-accodion-icon-side-${iconSide ? iconSide : 'right'}`
    }, React.createElement(InnerBlocks, {
      template: getPanesTemplate(0 === realPaneCount ? paneCount : realPaneCount, startCollapseVar, acc_unique_id),
      templateLock: false,
      allowedBlocks: ALLOWED_BLOCKS
    }))), React.createElement("div", {
      className: "kt-accordion-add-selecter"
    }, React.createElement(Button, {
      className: "kt-accordion-add",
      isPrimary: true,
      onClick: () => {
        let newBlock = createBlock('inclind-blocks/inclind-pane', {
          id: paneCount + 1,
          titleTag: titleTag,
          parentID: acc_unique_id,
          startCollapsed: startCollapseVar
        });
        wp.data.dispatch('core/block-editor').insertBlock(newBlock, realPaneCount, clientId);
        setAttributes({
          paneCount: paneCount + 1
        });
      }
    }, React.createElement(Dashicon, {
      icon: "plus"
    }), __('Add Accordion Item', 'inclind-blocks')), realPaneCount > 1 && React.createElement(IconButton, {
      className: "kt-accordion-remove",
      label: __('Remove Accordion Item', 'inclind-blocks'),
      icon: "minus",
      onClick: () => {
        const removeClientId = accordionBlock[0].innerBlocks[realPaneCount - 1].clientId;
        wp.data.dispatch('core/block-editor').removeBlocks(removeClientId);
      }
    })))));
  }

} //  Start Drupal Specific.


const category = {
  slug: 'inclind-blocks',
  title: __('Custom Blocks')
}; // Grab the current categories and merge in the new category if not present.

const currentCategories = select('core/blocks').getCategories().filter(item => item.slug !== category.slug);
dispatch('core/blocks').setCategories([category, ...currentCategories]); // End Drupal Specific.
// Register the block.

registerBlockType(category.slug + '/accordion-bootstrap', {
  title: __('Accordion', 'accordion-bootstrap'),
  description: __('Create an accordion layout.', 'accordion-bootstrap'),
  category: 'inclind-blocks',
  keywords: [__('Accordion', 'accordion-bootstrap'), __('Icon', 'accordion-bootstrap'), __('inclind', 'accordion-bootstrap'), __('custom', 'accordion-bootstrap')],
  attributes: {
    uniqueID: {
      type: 'string',
      default: ''
    },
    paneCount: {
      type: 'number',
      default: 2
    },
    showPresets: {
      type: 'bool',
      default: false
    },
    openPane: {
      type: 'number',
      default: 0
    },
    startCollapsed: {
      type: 'bool',
      default: false
    },
    linkPaneCollapse: {
      type: 'bool',
      default: true
    },
    minHeight: {
      type: 'number',
      default: ''
    },
    maxWidth: {
      type: 'number',
      default: ''
    },
    contentBgColor: {
      type: 'string',
      default: ''
    },
    contentBorderColor: {
      type: 'string',
      default: '#eeeeee'
    },
    contentBorder: {
      type: 'array',
      default: [0, 1, 1, 1]
    },
    contentBorderRadius: {
      type: 'array',
      default: [0, 0, 0, 0]
    },
    contentPadding: {
      type: 'array',
      default: [20, 20, 20, 20]
    },
    titleAlignment: {
      type: 'string',
      default: 'left'
    },
    blockAlignment: {
      type: 'string',
      default: 'none'
    },
    titleStyles: {
      type: 'array',
      default: [{
        size: [18, '', ''],
        sizeType: 'px',
        lineHeight: [24, '', ''],
        lineType: 'px',
        letterSpacing: '',
        family: '',
        google: '',
        style: '',
        weight: '',
        variant: '',
        subset: '',
        loadGoogle: true,
        padding: [10, 14, 10, 14],
        marginTop: 8,
        color: '#555555',
        background: '#f2f2f2',
        border: ['#555555', '#555555', '#555555', '#555555'],
        borderRadius: [0, 0, 0, 0],
        borderWidth: [0, 0, 0, 0],
        colorHover: '#444444',
        backgroundHover: '#eeeeee',
        borderHover: ['#eeeeee', '#eeeeee', '#eeeeee', '#eeeeee'],
        colorActive: '#ffffff',
        backgroundActive: '#444444',
        borderActive: ['#444444', '#444444', '#444444', '#444444'],
        textTransform: ''
      }]
    },
    showIcon: {
      type: 'bool',
      default: true
    },
    iconStyle: {
      type: 'string',
      default: 'basic'
    },
    iconSide: {
      type: 'string',
      default: 'right'
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

  edit: InclindAccordionBootstrap,
  save: props => {
    const {
      attributes: {
        uniqueID,
        paneCount,
        blockAlignment,
        maxWidth,
        titleAlignment,
        startCollapsed,
        linkPaneCollapse,
        showIcon,
        iconStyle,
        iconSide,
        openPane
      }
    } = props;
    const classes = (0, _classnames.default)(`align${blockAlignment ? blockAlignment : 'none'}`);
    const innerClasses = (0, _classnames.default)(`accordion-id${uniqueID} active-pane-${openPane}`);

    const stripStringRender = string => {
      return string.toLowerCase().replace(/[^0-9a-z-]/g, '');
    }; // render() {


    return React.createElement("div", {
      className: classes
    }, React.createElement("div", {
      className: innerClasses,
      style: {
        maxWidth: maxWidth ? maxWidth + 'px' : 'none'
      }
    }, React.createElement("div", {
      className: "accordion kt-accordion-inner-wrap",
      id: `accord${uniqueID}`,
      "data-allow-multiple-open": !linkPaneCollapse ? 'true' : 'false',
      "data-start-open": !startCollapsed ? openPane : 'none'
    }, React.createElement(InnerBlocks.Content, null)))); // }
  }
});