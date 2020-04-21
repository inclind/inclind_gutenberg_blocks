"use strict";

var _linkCards = _interopRequireDefault(require("./components/link-cards"));

var _times = _interopRequireDefault(require("lodash/times"));

var _map = _interopRequireDefault(require("lodash/map"));

var _reactFonticonpicker = _interopRequireDefault(require("@fonticonpicker/react-fonticonpicker"));

var _genicon = _interopRequireDefault(require("../../genicon"));

var _svgicons = _interopRequireDefault(require("../../svgicons"));

var _svgiconsnames = _interopRequireDefault(require("../../svgiconsnames"));

var _hexToRgba = _interopRequireDefault(require("../../hex-to-rgba"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import block dependencies and components
// import Icon from "../infobox/components/icon";
// import Infobox from "../infobox/components/infobox";
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
  RichText,
  URLInput,
  InspectorControls,
  BlockControls,
  AlignmentToolbar
} = wp.blockEditor; // Register components

const {
  IconButton,
  Dashicon,
  TabPanel,
  Button,
  PanelBody,
  RangeControl,
  TextControl,
  ButtonGroup,
  SelectControl,
  ToggleControl
} = wp.components;
const {
  dispatch,
  select
} = wp.data;
/**
 * This allows for checking to see if the block needs to generate a new ID.
 */

const ktadvancedbuttonUniqueIDs = [];

class InclindLinkCards extends Component {
  constructor() {
    super(...arguments);
    this.saveArrayUpdate = this.saveArrayUpdate.bind(this);
    this.state = {
      btnFocused: 'false',
      btnLink: false,
      user: 'admin',
      settings: {}
    };
  }

  componentDidMount() {
    if (!this.props.attributes.uniqueID) {
      this.props.setAttributes({
        uniqueID: '_' + this.props.clientId.substr(2, 9)
      });
      ktadvancedbuttonUniqueIDs.push('_' + this.props.clientId.substr(2, 9));
    } else if (ktadvancedbuttonUniqueIDs.includes(this.props.attributes.uniqueID)) {
      this.props.setAttributes({
        uniqueID: '_' + this.props.clientId.substr(2, 9)
      });
      ktadvancedbuttonUniqueIDs.push('_' + this.props.clientId.substr(2, 9));
    } else {
      ktadvancedbuttonUniqueIDs.push(this.props.attributes.uniqueID);
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.props.isSelected && prevProps.isSelected && this.state.btnFocused) {
      this.setState({
        btnFocused: 'false'
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

  saveArrayUpdate(value, index) {
    const {
      attributes,
      setAttributes
    } = this.props;
    const {
      btns
    } = attributes;
    const newItems = btns.map((item, thisIndex) => {
      if (index === thisIndex) {
        item = { ...item,
          ...value
        };
      }

      return item;
    });
    setAttributes({
      btns: newItems
    });
  }

  render() {
    const {
      attributes: {
        uniqueID,
        btnCount,
        btns,
        hAlign,
        forceFullwidth,
        btnLayoutStyle,
        thAlign,
        mhAlign
      },
      className,
      setAttributes,
      isSelected
    } = this.props;
    const bgType = [{
      key: 'solid',
      name: __('Solid Blue')
    }, {
      key: 'yellow',
      name: __('Solid Yellow')
    }, {
      key: 'gradient',
      name: __('No BG (plain)')
    }];
    const gridLayout = [{
      key: 'grid',
      name: __('2 columns')
    }, {
      key: 'inline',
      name: __('Automatic')
    }, {
      key: 'banners',
      name: __('Single Row')
    }];

    const renderBtns = index => {
      let btnbg;
      let btnGrad;
      let btnGrad2;

      if (undefined !== btns[index].backgroundType && 'gradient' === btns[index].backgroundType) {
        btnGrad = 'transparent' === btns[index].background || undefined === btns[index].background ? 'rgba(255,255,255,0)' : (0, _hexToRgba.default)(btns[index].background, btns[index].backgroundOpacity !== undefined ? btns[index].backgroundOpacity : 1);
        btnGrad2 = undefined !== btns[index].gradient && undefined !== btns[index].gradient[0] && '' !== btns[index].gradient[0] ? (0, _hexToRgba.default)(btns[index].gradient[0], undefined !== btns[index].gradient && btns[index].gradient[1] !== undefined ? btns[index].gradient[1] : 1) : (0, _hexToRgba.default)('#999999', undefined !== btns[index].gradient && btns[index].gradient[1] !== undefined ? btns[index].gradient[1] : 1);

        if (undefined !== btns[index].gradient && 'radial' === btns[index].gradient[4]) {
          btnbg = `radial-gradient(at ${undefined === btns[index].gradient[6] ? 'center center' : btns[index].gradient[6]}, ${btnGrad} ${undefined === btns[index].gradient[2] ? '0' : btns[index].gradient[2]}%, ${btnGrad2} ${undefined === btns[index].gradient[3] ? '100' : btns[index].gradient[3]}%)`;
        } else if (undefined === btns[index].gradient || 'radial' !== btns[index].gradient[4]) {
          btnbg = `linear-gradient(${undefined !== btns[index].gradient && undefined !== btns[index].gradient[5] ? btns[index].gradient[5] : '180'}deg, ${btnGrad} ${undefined !== btns[index].gradient && undefined !== btns[index].gradient[2] ? btns[index].gradient[2] : '0'}%, ${btnGrad2} ${undefined !== btns[index].gradient && undefined !== btns[index].gradient[3] ? btns[index].gradient[3] : '100'}%)`;
        }
      } else {
        btnbg = 'transparent' === btns[index].background || undefined === btns[index].background ? undefined : (0, _hexToRgba.default)(btns[index].background, btns[index].backgroundOpacity !== undefined ? btns[index].backgroundOpacity : 1);
      }

      return React.createElement("button", {
        type: 'button',
        className: `btn btn-area-wrap kt-btn-${index}-area ${!btns[index].icon ? '' : 'btn-icon'}
                  ${btns[index].backgroundHoverType === 'gradient' ? ' btn-arrow btn-cta btn-square' : btns[index].backgroundHoverType === 'yellow' ? ' btn-secondary' : 'btn-primary'}
                  `
      }, btns[index].icon && 'left' === btns[index].iconSide && React.createElement(_genicon.default, {
        className: `color-fill--white svg svg--icon js-svg-exists kt-btn-svg-icon kt-btn-svg-icon-${btns[index].icon} kt-btn-side-${btns[index].iconSide}`,
        name: btns[index].icon,
        size: !btns[index].size ? '14' : btns[index].size,
        icon: _svgicons.default[btns[index].icon]
      }), React.createElement(RichText, {
        tagName: "div",
        placeholder: __('Button...', 'inclind-link-cards'),
        value: btns[index].text,
        unstableOnFocus: () => {
          if (index >= 1) {
            const bt = 'btn' + index;
            onFocusAnyBtn(bt);
          } // if (1 === index) {
          //   onFocusBtn1();
          // }
          // else if (2 === index) {
          //   onFocusBtn2();
          // }
          // else if (3 === index) {
          //   onFocusBtn3();
          // }
          // else if (4 === index) {
          //   onFocusBtn4();
          // }
          else {
              onFocusBtn();
            }
        },
        onChange: value => {
          this.saveArrayUpdate({
            text: value
          }, index);
        },
        allowedFormats: ['core/bold', 'core/italic', 'core/strikethrough'],
        className: 'kt-button-text',
        keepPlaceholderOnFocus: true
      }), btns[index].icon && 'left' !== btns[index].iconSide && React.createElement(_genicon.default, {
        className: `color-fill--white svg svg--icon js-svg-exists kt-btn-svg-icon-${btns[index].icon} kt-btn-side-${btns[index].iconSide}`,
        name: btns[index].icon,
        size: !btns[index].size ? '14' : btns[index].size,
        icon: _svgicons.default[btns[index].icon]
      }), btns[index].backgroundHoverType && 'gradient' === btns[index].backgroundHoverType && !btns[index].icon && React.createElement(_genicon.default, {
        className: `svg svg--colorable js-svg-exists`,
        name: `bb`,
        htmltag: `span`
      }), isSelected && (this.state.btnFocused && 'btn' + [index] === this.state.btnFocused || this.state.btnFocused && 'false' === this.state.btnFocused && '0' === index) && React.createElement("form", {
        key: 'form-link',
        onSubmit: event => event.preventDefault(),
        className: "blocks-button__inline-link"
      }, React.createElement(URLInput, {
        value: btns[index].link,
        onChange: value => {
          this.saveArrayUpdate({
            link: value
          }, index);
        }
      }), React.createElement(IconButton, {
        icon: 'editor-break',
        label: __('Apply', 'inclind-link-cards'),
        type: 'submit'
      })));
    };

    const onFocusBtn = () => {
      if ('btn0' !== this.state.btnFocused) {
        this.setState({
          btnFocused: 'btn0'
        });
      }
    };

    const onFocusAnyBtn = bt => {
      if (bt !== this.state.btnFocused) {
        this.setState({
          btnFocused: bt
        });
      }
    };

    const onFocusBtn1 = () => {
      if ('btn1' !== this.state.btnFocused) {
        this.setState({
          btnFocused: 'btn1'
        });
      }
    };

    const onFocusBtn2 = () => {
      if ('btn2' !== this.state.btnFocused) {
        this.setState({
          btnFocused: 'btn2'
        });
      }
    };

    const onFocusBtn3 = () => {
      if ('btn3' !== this.state.btnFocused) {
        this.setState({
          btnFocused: 'btn3'
        });
      }
    };

    const onFocusBtn4 = () => {
      if ('btn4' !== this.state.btnFocused) {
        this.setState({
          btnFocused: 'btn4'
        });
      }
    };

    const tabControls = index => {
      return React.createElement(PanelBody, {
        title: __('Button', 'inclind-link-cards') + ' ' + (index + 1) + ' ' + __('Settings', 'inclind-link-cards'),
        initialOpen: false
      }, React.createElement("h2", {
        className: "side-h2-label"
      }, __('Button Link', 'inclind-link-cards')), React.createElement("div", {
        className: "kt-btn-link-group"
      }, React.createElement(URLInput, {
        value: btns[index].link,
        className: "kt-btn-link-input",
        onChange: value => {
          this.saveArrayUpdate({
            link: value
          }, index);
        }
      }), React.createElement(IconButton, {
        className: "kt-link-settings",
        icon: 'arrow-down-alt2',
        label: __('Link Settings', 'inclind-link-cards'),
        onClick: () => this.setState({
          btnLink: this.state.btnLink ? false : true
        })
      })), this.state.btnLink && React.createElement(Fragment, null, React.createElement("div", {
        className: "kt-spacer-sidebar-15"
      }), React.createElement(SelectControl, {
        label: __('Link Target', 'inclind-link-cards'),
        value: btns[index].target,
        options: [{
          value: '_self',
          label: __('Same Window', 'inclind-link-cards')
        }, {
          value: '_blank',
          label: __('New Window', 'inclind-link-cards')
        }],
        onChange: value => {
          this.saveArrayUpdate({
            target: value
          }, index);
        }
      }), React.createElement(ToggleControl, {
        label: __('Set link to nofollow?', 'inclind-link-cards'),
        checked: undefined !== btns[index].noFollow ? btns[index].noFollow : false,
        onChange: value => this.saveArrayUpdate({
          noFollow: value
        }, index)
      })), this.showSettings('backgroundSettings') && React.createElement(Fragment, null, React.createElement("div", {
        className: "components-base-control__field"
      }, React.createElement("label", {
        className: "kt-beside-btn-group"
      }, __('Background Type', 'inclind-link-cards')), React.createElement(ButtonGroup, {
        className: "kt-button-size-type-options",
        "aria-label": __('Background Type', 'inclind-link-cards')
      }, (0, _map.default)(bgType, ({
        name,
        key
      }) => React.createElement(Button, {
        key: key,
        className: "kt-btn-size-btn",
        isSmall: true,
        isPrimary: (undefined !== btns[index].backgroundHoverType ? btns[index].backgroundHoverType : 'solid') === key,
        "aria-pressed": (undefined !== btns[index].backgroundHoverType ? btns[index].backgroundHoverType : 'solid') === key,
        onClick: () => this.saveArrayUpdate({
          backgroundHoverType: key
        }, index)
      }, name))))), React.createElement(Fragment, null, React.createElement("h2", {
        className: "kt-tool"
      }, __('Icon Settings', 'inclind-link-cards')), React.createElement("div", {
        className: "kt-select-icon-container"
      }, React.createElement(_reactFonticonpicker.default, {
        icons: _svgiconsnames.default,
        value: btns[index].icon,
        onChange: value => {
          this.saveArrayUpdate({
            icon: value
          }, index);
        },
        appendTo: "body",
        renderFunc: renderSVG,
        theme: "default",
        isMulti: false
      }))), React.createElement(TextControl, {
        label: __('Add Custom CSS Class', 'inclind-link-cards'),
        value: btns[index].cssClass ? btns[index].cssClass : '',
        onChange: value => this.saveArrayUpdate({
          cssClass: value
        }, index)
      }));
    };

    const renderSVG = svg => React.createElement(_genicon.default, {
      name: svg,
      icon: _svgicons.default[svg]
    });

    const renderArray = React.createElement(Fragment, null, (0, _times.default)(btnCount, n => tabControls(n)));
    const renderPreviewArray = React.createElement("div", null, (0, _times.default)(btnCount, n => renderBtns(n)));

    const renderBtnCSS = index => {
      let btnbg;
      let btnGrad;
      let btnGrad2;
      let btnRad = '0';
      let btnBox = '';
      let btnBox2 = '';
      return `#kt-btns_${uniqueID} .kt-button-${index}:hover {
					color: ${btns[index].colorHover} !important;
					border-color: ${(0, _hexToRgba.default)(undefined === btns[index].borderHover ? '#444444' : btns[index].borderHover, btns[index].borderHoverOpacity !== undefined ? btns[index].borderHoverOpacity : 1)} !important;
					box-shadow: ${btnBox} !important;
				}
				#kt-btns_${uniqueID} .kt-button-${index}::before {
					background: ${btnbg};
					box-shadow: ${btnBox2};
					border-radius: ${btnRad}px;
				}`;
    };

    const renderCSS = React.createElement("style", null, (0, _times.default)(btnCount, n => renderBtnCSS(n)));
    return React.createElement(Fragment, null, renderCSS, React.createElement("div", {
      id: `kt-btns_${uniqueID}`,
      className: `${className} kt-btn-align-${hAlign}${forceFullwidth ? ' kt-force-btn-fullwidth' : ''}`
    }, React.createElement(BlockControls, null, React.createElement(AlignmentToolbar, {
      value: hAlign,
      onChange: value => setAttributes({
        hAlign: value
      })
    })), React.createElement(Fragment, null, React.createElement(InspectorControls, null, React.createElement(PanelBody, {
      title: __('Button Count', 'inclind-link-cards'),
      initialOpen: true
    }, React.createElement(RangeControl, {
      label: __('Number of Buttons', 'inclind-link-cards'),
      value: btnCount,
      onChange: newcount => {
        const newbtns = btns;

        if (newbtns.length < newcount) {
          const amount = Math.abs(newcount - newbtns.length);
          {
            (0, _times.default)(amount, n => {
              newbtns.push({
                text: newbtns[0].text,
                link: newbtns[0].link,
                target: newbtns[0].target,
                size: newbtns[0].size,
                paddingBT: newbtns[0].paddingBT,
                paddingLR: newbtns[0].paddingLR,
                color: newbtns[0].color,
                background: newbtns[0].background,
                border: newbtns[0].border,
                backgroundOpacity: newbtns[0].backgroundOpacity,
                borderOpacity: newbtns[0].borderOpacity,
                colorHover: newbtns[0].colorHover,
                backgroundHover: newbtns[0].backgroundHover,
                borderHover: newbtns[0].borderHover,
                backgroundHoverOpacity: newbtns[0].backgroundHoverOpacity,
                borderHoverOpacity: newbtns[0].borderHoverOpacity,
                icon: newbtns[0].icon,
                iconSide: newbtns[0].iconSide,
                iconHover: newbtns[0].iconHover,
                cssClass: newbtns[0].cssClass ? newbtns[0].cssClass : '',
                noFollow: newbtns[0].noFollow ? newbtns[0].noFollow : false,
                // responsiveSize:
                // (newbtns[0].responsiveSize ?
                // newbtns[0].responsiveSize : ['',
                // '']),
                gradient: newbtns[0].gradient ? newbtns[0].gradient : ['#999999', 1, 0, 100, 'linear', 180, 'center center'],
                gradientHover: newbtns[0].gradientHover ? newbtns[0].gradientHover : ['#777777', 1, 0, 100, 'linear', 180, 'center center'],
                btnStyle: newbtns[0].btnStyle ? newbtns[0].btnStyle : 'basic',
                backgroundType: newbtns[0].backgroundType ? newbtns[0].backgroundType : 'solid',
                backgroundHoverType: newbtns[0].backgroundHoverType ? newbtns[0].backgroundHoverType : 'solid',
                width: newbtns[0].width ? newbtns[0].width : ['', '', ''] // responsivePaddingBT:
                // (newbtns[0].responsivePaddingBT ?
                // newbtns[0].responsivePaddingBT :
                // ['', '']), responsivePaddingLR:
                // (newbtns[0].responsivePaddingLR ?
                // newbtns[0].responsivePaddingLR :
                // ['', '']), boxShadow:
                // (newbtns[0].boxShadow ?
                // newbtns[0].boxShadow : [false,
                // '#000000', 0.2, 1, 1, 2, 0, false]),
                // boxShadowHover:
                // (newbtns[0].boxShadowHover ?
                // newbtns[0].boxShadowHover : [false,
                // '#000000', 0.4, 2, 2, 3, 0, false]),

              });
            });
          }
          setAttributes({
            btns: newbtns
          });
          this.saveArrayUpdate({
            iconSide: btns[0].iconSide
          }, 0);
        }

        setAttributes({
          btnCount: newcount
        });
      },
      min: 1,
      max: 24
    }), React.createElement(Fragment, null, React.createElement("div", {
      className: "components-base-control__field"
    }, React.createElement("label", {
      className: "kt-beside-btn-group"
    }, __('Grid / Layout Options', 'inclind-link-cards')), React.createElement(ButtonGroup, {
      className: "kt-button-size-type-options",
      "aria-label": __('Button Layout', 'inclind-link-cards')
    }, (0, _map.default)(gridLayout, ({
      name,
      key
    }) => React.createElement(Button, {
      key: key,
      className: "kt-btn-grid-btn",
      isSmall: true,
      isPrimary: btnLayoutStyle === key,
      "aria-pressed": btnLayoutStyle === key,
      onClick: () => setAttributes({
        btnLayoutStyle: key
      })
    }, name)))))), renderArray)), React.createElement("div", {
      id: `animate-id${uniqueID}`,
      className: 'btn-inner-wrap'
    }, renderPreviewArray)));
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

  if (blocks.hasOwnProperty(category.slug + '/inclind-link-cards') && blocks[category.slug + '/inclind-link-cards']) {
    // Register the block.
    registerBlockType(category.slug + '/inclind-link-cards', {
      title: __('Button Group', 'inclind-link-cards'),
      description: __('Create a row or grid of buttons (links). Style each one.', 'inclind-link-cards'),
      category: 'inclind-blocks',
      keywords: [__('Button', 'inclind-link-cards'), __('Button grid', 'inclind-link-cards'), __('inclind', 'inclind-link-cards'), __('custom', 'inclind-link-cards')],
      attributes: {
        hAlign: {
          type: 'string',
          default: 'center'
        },
        thAlign: {
          type: 'string',
          default: ''
        },
        mhAlign: {
          type: 'string',
          default: ''
        },
        btnCount: {
          type: 'number',
          default: 1
        },
        uniqueID: {
          type: 'string',
          default: ''
        },
        btns: {
          type: 'array',
          default: [{
            text: 'Start Button...',
            link: '',
            target: '_self',
            size: '',
            paddingBT: '',
            paddingLR: '',
            color: '#555555',
            background: '',
            border: '#555555',
            backgroundOpacity: 1,
            borderOpacity: 1,
            colorHover: '#ffffff',
            backgroundHover: '#444444',
            borderHover: '#444444',
            backgroundHoverOpacity: 1,
            borderHoverOpacity: 1,
            icon: '',
            iconSide: 'left',
            iconHover: false,
            cssClass: '',
            noFollow: false,
            gradient: ['#999999', 1, 0, 100, 'linear', 180, 'center center'],
            gradientHover: ['#777777', 1, 0, 100, 'linear', 180, 'center center'],
            btnStyle: 'basic',
            backgroundType: 'yellow',
            backgroundHoverType: 'yellow',
            width: ['', '', '']
          }]
        },
        forceFullwidth: {
          type: 'bool',
          default: false
        },
        btnLayoutStyle: {
          type: 'string',
          default: 'inline'
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

      edit: InclindLinkCards,
      save: props => {
        const {
          attributes: {
            btnCount,
            btns,
            hAlign,
            uniqueID,
            forceFullwidth,
            thAlign,
            mhAlign,
            btnLayoutStyle
          }
        } = props;

        const renderSaveBtns = (index, layout) => {
          let relAttr;

          if ('_blank' === btns[index].target && true === btns[index].noFollow) {
            relAttr = 'noreferrer noopener nofollow';
          } else if ('_blank' === btns[index].target) {
            relAttr = 'noreferrer noopener';
          } else if (true === btns[index].noFollow) {
            relAttr = 'nofollow';
          } else {
            relAttr = undefined;
          }

          return React.createElement("div", {
            className: `${layout} kt-btn-wrap kt-btn-wrap-${index}`
          }, React.createElement("a", {
            className: `btn kt-btn-${index}-action
                kt-btn-svg-show-${!btns[index].iconHover ? 'always' : 'hover'} kt-btn-has-text-${!btns[index].text ? 'false' : 'true'}
                ${!btns[index].icon ? '' : 'btn-icon'}${btns[index].cssClass ? ' ' + btns[index].cssClass : ''}
                ${btns[index].backgroundHoverType === 'gradient' ? ' btn-arrow btn-cta btn-square' : btns[index].backgroundHoverType === 'yellow' ? ' btn-secondary' : 'btn-primary'} `,
            href: !btns[index].link ? 'javascript:void(0);' : btns[index].link,
            target: '_blank' === btns[index].target ? btns[index].target : undefined,
            rel: relAttr
          }, btns[index].icon && 'left' === btns[index].iconSide && React.createElement(_genicon.default, {
            className: `color-fill--white svg svg--icon js-svg-exists kt-btn-svg-icon-${btns[index].icon} kt-btn-side-${btns[index].iconSide}`,
            name: btns[index].icon,
            size: !btns[index].size ? '14' : btns[index].size,
            icon: _svgicons.default[btns[index].icon]
          }), React.createElement(RichText.Content, {
            tagName: 'span',
            className: "kt-btn-inner-text",
            value: btns[index].text
          }), btns[index].icon && 'left' !== btns[index].iconSide && React.createElement(_genicon.default, {
            className: `color-fill--white svg svg--icon js-svg-exists kt-btn-svg-icon-${btns[index].icon} kt-btn-side-${btns[index].iconSide}`,
            name: btns[index].icon,
            size: !btns[index].size ? '14' : btns[index].size,
            icon: _svgicons.default[btns[index].icon]
          }), btns[index].backgroundHoverType && 'gradient' === btns[index].backgroundHoverType && !btns[index].icon && React.createElement(_genicon.default, {
            className: `svg svg--colorable js-svg-exists`,
            name: `bb`,
            htmltag: `span`
          })));
        };

        let gridClasses = 'justify-content-center link-card-grid row button-layout-inline'; // for "inline"

        let btnClasses = 'col-xs-12 col-md-6 col-lg-4 mb-4';

        if (btnLayoutStyle == 'grid') {
          gridClasses = 'justify-content-center link-card-grid row button-layout-grid';
          btnClasses = 'col-xs-12 col-sm-6 pb-2 pr-1 pl-1';
        } else if (btnLayoutStyle == 'banners') {
          gridClasses = 'justify-content-center link-card-grid row button-layout-banner';
          btnClasses = 'col m-0 p-0';
        }

        return React.createElement("div", {
          className: `${gridClasses} kt-btn-align-${hAlign} kt-btn-tablet-align-${thAlign ? thAlign : 'inherit'} kt-btn-mobile-align-${mhAlign ? mhAlign : 'inherit'} kt-btns${uniqueID}`
        }, (0, _times.default)(btnCount, n => renderSaveBtns(n, btnClasses)));
      }
    });
  }
}