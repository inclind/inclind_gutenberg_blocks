// Import block dependencies and components
import AdvancedBtn from "./components/advanced-btn";
import times from 'lodash/times';
import map from 'lodash/map';
import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
import GenIcon from '../../genicon';
import Ico from '../../svgicons';
import IcoNames from '../../svgiconsnames';
import hexToRGBA from '../../hex-to-rgba';

// Internationalization
const __ = Drupal.t;

// Extend component
const {Component, Fragment} = wp.element;

// Register block
const {registerBlockType} = wp.blocks;

// Register editor components
const {
  RichText,
  URLInput,
  InspectorControls,
  BlockControls,
  AlignmentToolbar,
  InspectorAdvancedControls,
} = wp.blockEditor;

// Register components
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
  ToggleControl,
} = wp.components;

const {dispatch, select} = wp.data;
/**
 * This allows for checking to see if the block needs to generate a new ID.
 */
const ktadvancedbuttonUniqueIDs = [];


class InclindAdvancedBtn extends Component {
  constructor() {
    super(...arguments);
    this.showSettings = this.showSettings.bind(this);
    this.saveArrayUpdate = this.saveArrayUpdate.bind(this);
    this.state = {
      btnFocused: 'false',
      btnLink: false,
      user: 'admin',
      settings: {},
    };
  }

  componentDidMount() {
    if (!this.props.attributes.uniqueID) {

      this.props.setAttributes({
        uniqueID: '_' + this.props.clientId.substr(2, 9),
      });
      ktadvancedbuttonUniqueIDs.push('_' + this.props.clientId.substr(2, 9));
    }
    else if (ktadvancedbuttonUniqueIDs.includes(this.props.attributes.uniqueID)) {
      this.props.setAttributes({
        uniqueID: '_' + this.props.clientId.substr(2, 9),
      });
      ktadvancedbuttonUniqueIDs.push('_' + this.props.clientId.substr(2, 9));
    }
    else {
      ktadvancedbuttonUniqueIDs.push(this.props.attributes.uniqueID);
    }

    if (this.props.attributes.btns && this.props.attributes.btns[0] && undefined === this.props.attributes.btns[0].btnSize) {
      this.saveArrayUpdate({btnSize: 'custom'}, 0);
    }
    if (this.props.attributes.btns && this.props.attributes.btns[1] && undefined === this.props.attributes.btns[1].btnSize) {
      this.saveArrayUpdate({btnSize: 'custom'}, 1);
    }
    if (this.props.attributes.btns && this.props.attributes.btns[2] && undefined === this.props.attributes.btns[2].btnSize) {
      this.saveArrayUpdate({btnSize: 'custom'}, 2);
    }
    if (this.props.attributes.btns && this.props.attributes.btns[3] && undefined === this.props.attributes.btns[3].btnSize) {
      this.saveArrayUpdate({btnSize: 'custom'}, 3);
    }
    if (this.props.attributes.btns && this.props.attributes.btns[4] && undefined === this.props.attributes.btns[4].btnSize) {
      this.saveArrayUpdate({btnSize: 'custom'}, 4);
    }
    if (undefined === this.props.attributes.widthType) {
      if (this.props.attributes.forceFullwidth) {
        this.props.setAttributes({widthType: 'full'});
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.props.isSelected && prevProps.isSelected && this.state.btnFocused) {
      this.setState({
        btnFocused: 'false',
      });
    }
  }

  showSettings(key) {
    let donot_allow = ['countSettings', 'btnSizeSettings'];
    if (donot_allow.includes(key)) {
      return false;
    }
    return true;
  }

  saveArrayUpdate(value, index) {
    const {attributes, setAttributes} = this.props;
    const {btns} = attributes;

    const newItems = btns.map((item, thisIndex) => {
      if (index === thisIndex) {
        item = {...item, ...value};
      }

      return item;
    });
    setAttributes({
      btns: newItems,
    });
  }

  render() {

    const {attributes: {uniqueID, btnCount, btns, hAlign, forceFullwidth, thAlign, mhAlign, widthType, kadenceAOSOptions, kadenceAnimation}, className, setAttributes, isSelected} = this.props;
    const btnSizes = [
      {key: 'sm', name: __('S')},
      {key: 'standard', name: __('M')},
      {key: 'lg', name: __('L')},
      {key: 'custom', name: <Dashicon icon="admin-generic"/>},
    ];
    const btnWidths = [
      {key: 'auto', name: __('Auto')},
      {key: 'fixed', name: __('Fixed')},
      {key: 'full', name: __('Full')},
    ];
    const unitTypes = [
      {key: 'px', name: __('px')},
      {key: '%', name: __('%')},
    ];
    const gradTypes = [
      {key: 'linear', name: __('Linear')},
      {key: 'radial', name: __('Radial')},
    ];
    const bgType = [
      {key: 'solid', name: __('Primary')},
      {key: 'yellow', name: __('Secondary')},
      {key: 'gradient', name: __('Transparent')},
    ];
    const renderBtns = (index) => {
      let btnSize;
      if (undefined !== btns[index].paddingLR || undefined !== btns[index].paddingBT) {
        btnSize = 'custom';
      }
      else {
        btnSize = 'standard';
      }

      return (


          <button type={'button'}
                  className={`btn btn-area-wrap btn-${(btns[index].btnSize ? btns[index].btnSize : btnSize)} kt-btn-${index}-area ${(!btns[index].icon ? '' : 'btn-icon')}
                  ${(btns[index].backgroundHoverType === 'gradient' ? ' btn-arrow btn-cta btn-square' : (btns[index].backgroundHoverType === 'yellow' ? ' btn-secondary' : 'btn-primary'))}
                  `}
                  style={{
                    marginRight: btns[index].gap + 'px',
                  }}>
            {btns[index].icon && 'left' === btns[index].iconSide && (
                <GenIcon
                    className={`color-fill--white svg svg--icon js-svg-exists kt-btn-svg-icon kt-btn-svg-icon-${btns[index].icon} kt-btn-side-${btns[index].iconSide}`}
                    name={btns[index].icon}
                    size={(!btns[index].size ? '14' : btns[index].size)}
                    icon={(Ico[btns[index].icon])}/>
            )}
            <RichText
                tagName="div"
                placeholder={__('Button...', 'inclind-advanced-btn')}
                value={btns[index].text}
                unstableOnFocus={() => {
                  if (1 === index) {
                    onFocusBtn1();
                  }
                  else if (2 === index) {
                    onFocusBtn2();
                  }
                  else if (3 === index) {
                    onFocusBtn3();
                  }
                  else if (4 === index) {
                    onFocusBtn4();
                  }
                  else {
                    onFocusBtn();
                  }
                }}
                onChange={value => {
                  this.saveArrayUpdate({text: value}, index);
                }}
                allowedFormats={['core/bold', 'core/italic', 'core/strikethrough']}
                className={'kt-button-text'}
                keepPlaceholderOnFocus
            />
            {btns[index].icon && 'left' !== btns[index].iconSide && (
                <GenIcon
                    className={`color-fill--white svg svg--icon js-svg-exists kt-btn-svg-icon-${btns[index].icon} kt-btn-side-${btns[index].iconSide}`}
                    name={btns[index].icon}
                    size={(!btns[index].size ? '14' : btns[index].size)}
                    icon={(Ico[btns[index].icon])}/>
            )}
            {btns[index].backgroundHoverType && 'gradient' === btns[index].backgroundHoverType && !btns[index].icon && (
                <GenIcon className={`svg svg--colorable js-svg-exists`}
                         name={`bb`} htmltag={`span`}/>
            )}

            {/*</span>*/}
            {/*</span>*/}
            {isSelected && ((this.state.btnFocused && 'btn' + [index] === this.state.btnFocused) || (this.state.btnFocused && 'false' === this.state.btnFocused && '0' === index)) && (
                <form
                    key={'form-link'}
                    onSubmit={(event) => event.preventDefault()}
                    className="blocks-button__inline-link">
                  <URLInput
                      value={btns[index].link}
                      onChange={value => {
                        this.saveArrayUpdate({link: value}, index);
                      }}
                  />
                  <IconButton
                      icon={'editor-break'}
                      label={__('Apply', 'inclind-advanced-btn')}
                      type={'submit'}
                  />
                </form>
            )}
          </button>
      );
    };
    const onFocusBtn = () => {
      if ('btn0' !== this.state.btnFocused) {
        this.setState({
          btnFocused: 'btn0',
        });
      }
    };
    const onFocusBtn1 = () => {
      if ('btn1' !== this.state.btnFocused) {
        this.setState({
          btnFocused: 'btn1',
        });
      }
    };
    const onFocusBtn2 = () => {
      if ('btn2' !== this.state.btnFocused) {
        this.setState({
          btnFocused: 'btn2',
        });
      }
    };
    const onFocusBtn3 = () => {
      if ('btn3' !== this.state.btnFocused) {
        this.setState({
          btnFocused: 'btn3',
        });
      }
    };
    const onFocusBtn4 = () => {
      if ('btn4' !== this.state.btnFocused) {
        this.setState({
          btnFocused: 'btn4',
        });
      }
    };
    const defineWidthType = (type) => {
      if ('full' === type) {
        setAttributes({forceFullwidth: true});
        setAttributes({widthType: type});
      }
      else {
        setAttributes({forceFullwidth: false});
        setAttributes({widthType: type});
      }
    };
    const defineWidthTypeToggle = (value) => {
      if (value) {
        setAttributes({forceFullwidth: true});
        setAttributes({widthType: 'full'});
      }
      else {
        setAttributes({forceFullwidth: false});
        setAttributes({widthType: 'full'});
      }
    };
    const tabControls = (index) => {
      return (
          <PanelBody
              title={__('Button', 'inclind-advanced-btn') + ' ' + (index + 1) + ' ' + __('Settings', 'inclind-advanced-btn')}
              initialOpen={false}
          >
            <h2 className="side-h2-label">{__('Button Link', 'inclind-advanced-btn')}</h2>
            <div className="kt-btn-link-group">
              <URLInput
                  value={btns[index].link}
                  className="kt-btn-link-input"
                  onChange={value => {
                    this.saveArrayUpdate({link: value}, index);
                  }}
              />
              <IconButton
                  className="kt-link-settings"
                  icon={'arrow-down-alt2'}
                  label={__('Link Settings', 'inclind-advanced-btn')}
                  onClick={() => this.setState({btnLink: (this.state.btnLink ? false : true)})}
              />
            </div>
            {this.state.btnLink && (
                <Fragment>
                  <div className="kt-spacer-sidebar-15"></div>
                  <SelectControl
                      label={__('Link Target', 'inclind-advanced-btn')}
                      value={btns[index].target}
                      options={[
                        {
                          value: '_self',
                          label: __('Same Window', 'inclind-advanced-btn')
                        },
                        {
                          value: '_blank',
                          label: __('New Window', 'inclind-advanced-btn')
                        },
                        {
                          value: 'video',
                          label: __('Video Popup', 'inclind-advanced-btn')
                        },
                      ]}
                      onChange={value => {
                        this.saveArrayUpdate({target: value}, index);
                      }}
                  />
                  {btns[index].target === 'video' && (
                      <p>{__('NOTE: Video popup only works with youtube and vimeo links.', 'inclind-advanced-btn')}</p>
                  )}
                  <ToggleControl
                      label={__('Set link to nofollow?', 'inclind-advanced-btn')}
                      checked={(undefined !== btns[index].noFollow ? btns[index].noFollow : false)}
                      onChange={(value) => this.saveArrayUpdate({noFollow: value}, index)}
                  />
                </Fragment>
            )}
            {this.showSettings('btnSizeSettings') && (
                <Fragment>
                  <div className="kt-btn-size-settings-container">
                    <h2 className="kt-beside-btn-group">{__('Button Size')}</h2>
                    <ButtonGroup className="kt-button-size-type-options"
                                 aria-label={__('Button Size', 'inclind-advanced-btn')}>
                      {map(btnSizes, ({name, key}) => (
                          <Button
                              key={key}
                              className="kt-btn-size-btn"
                              isSmall
                              isPrimary={btns[index].btnSize === key}
                              aria-pressed={btns[index].btnSize === key}
                              onClick={() => this.saveArrayUpdate({btnSize: key}, index)}
                          >
                            {name}
                          </Button>
                      ))}
                    </ButtonGroup>
                  </div>
                  {'custom' === btns[index].btnSize && (
                      <div className="kt-inner-sub-section">
                        <h2 className="kt-heading-size-title kt-secondary-color-size">{__('Padding', 'inclind-advanced-btn')}</h2>
                        <TabPanel className="kt-size-tabs"
                                  activeClass="active-tab"
                                  tabs={[
                                    {
                                      name: 'desk',
                                      title: <Dashicon icon="desktop"/>,
                                      className: 'kt-desk-tab',
                                    },
                                    {
                                      name: 'tablet',
                                      title: <Dashicon icon="tablet"/>,
                                      className: 'kt-tablet-tab',
                                    },
                                    {
                                      name: 'mobile',
                                      title: <Dashicon icon="smartphone"/>,
                                      className: 'kt-mobile-tab',
                                    },
                                  ]}>
                          {
                            (tab) => {
                              let tabout;
                              if (tab.name) {
                                if ('mobile' === tab.name) {
                                  tabout = (
                                      <Fragment>
                                        <RangeControl
                                            label={__('Top and Bottom Padding', 'inclind-advanced-btn')}
                                            value={(undefined !== btns[index].responsivePaddingBT && undefined !== btns[index].responsivePaddingBT[1] ? btns[index].responsivePaddingBT[1] : '')}
                                            onChange={value => {
                                              this.saveArrayUpdate({responsivePaddingBT: [(undefined !== btns[index].responsivePaddingBT && undefined !== btns[index].responsivePaddingBT[0] ? btns[index].responsivePaddingBT[0] : ''), value]}, index);
                                            }}
                                            min={0}
                                            max={100}
                                        />
                                        <RangeControl
                                            label={__('Left and Right Padding', 'inclind-advanced-btn')}
                                            value={(undefined !== btns[index].responsivePaddingLR && undefined !== btns[index].responsivePaddingLR[1] ? btns[index].responsivePaddingLR[1] : '')}
                                            onChange={value => {
                                              this.saveArrayUpdate({responsivePaddingLR: [(undefined !== btns[index].responsivePaddingLR && undefined !== btns[index].responsivePaddingLR[0] ? btns[index].responsivePaddingLR[0] : ''), value]}, index);
                                            }}
                                            min={0}
                                            max={100}
                                        />
                                      </Fragment>
                                  );
                                }
                                else if ('tablet' === tab.name) {
                                  tabout = (
                                      <Fragment>
                                        <RangeControl
                                            label={__('Top and Bottom Padding', 'inclind-advanced-btn')}
                                            value={(undefined !== btns[index].responsivePaddingBT && undefined !== btns[index].responsivePaddingBT[0] ? btns[index].responsivePaddingBT[0] : '')}
                                            onChange={value => {
                                              this.saveArrayUpdate({responsivePaddingBT: [value, (undefined !== btns[index].responsivePaddingBT && undefined !== btns[index].responsivePaddingBT[1] ? btns[index].responsivePaddingBT[1] : '')]}, index);
                                            }}
                                            min={0}
                                            max={100}
                                        />
                                        <RangeControl
                                            label={__('Left and Right Padding', 'inclind-advanced-btn')}
                                            value={(undefined !== btns[index].responsivePaddingLR && undefined !== btns[index].responsivePaddingLR[0] ? btns[index].responsivePaddingLR[0] : '')}
                                            onChange={value => {
                                              this.saveArrayUpdate({responsivePaddingLR: [value, (undefined !== btns[index].responsivePaddingLR && undefined !== btns[index].responsivePaddingLR[1] ? btns[index].responsivePaddingLR[1] : '')]}, index);
                                            }}
                                            min={0}
                                            max={100}
                                        />
                                      </Fragment>
                                  );
                                }
                                else {
                                  tabout = (
                                      <Fragment>
                                        <RangeControl
                                            label={__('Top and Bottom Padding', 'inclind-advanced-btn')}
                                            value={btns[index].paddingBT}
                                            onChange={value => {
                                              this.saveArrayUpdate({paddingBT: value}, index);
                                            }}
                                            min={0}
                                            max={100}
                                        />
                                        <RangeControl
                                            label={__('Left and Right Padding', 'inclind-advanced-btn')}
                                            value={btns[index].paddingLR}
                                            onChange={value => {
                                              this.saveArrayUpdate({paddingLR: value}, index);
                                            }}
                                            min={0}
                                            max={100}
                                        />
                                      </Fragment>
                                  );
                                }
                              }
                              return <div>{tabout}</div>;
                            }
                          }
                        </TabPanel>
                      </div>
                  )}

                  <div className="kt-btn-size-settings-container">
                    <h2 className="kt-beside-btn-group">{__('Button Width', 'inclind-advanced-btn')}</h2>
                    <ButtonGroup className="kt-button-size-type-options"
                                 aria-label={__('Button Width', 'inclind-advanced-btn')}>
                      {map(btnWidths, ({name, key}) => (
                          <Button
                              key={key}
                              className="kt-btn-size-btn"
                              isSmall
                              isPrimary={widthType === key}
                              aria-pressed={widthType === key}
                              onClick={() => defineWidthType(key)}
                          >
                            {name}
                          </Button>
                      ))}
                    </ButtonGroup>
                  </div>

                  {'fixed' === widthType && (
                      <div className="kt-inner-sub-section">
                        <h2 className="kt-heading-size-title kt-secondary-color-size">{__('Fixed Width', 'inclind-advanced-btn')}</h2>
                        <TabPanel className="kt-size-tabs"
                                  activeClass="active-tab"
                                  tabs={[
                                    {
                                      name: 'desk',
                                      title: <Dashicon icon="desktop"/>,
                                      className: 'kt-desk-tab',
                                    },
                                    {
                                      name: 'tablet',
                                      title: <Dashicon icon="tablet"/>,
                                      className: 'kt-tablet-tab',
                                    },
                                    {
                                      name: 'mobile',
                                      title: <Dashicon icon="smartphone"/>,
                                      className: 'kt-mobile-tab',
                                    },
                                  ]}>
                          {
                            (tab) => {
                              let tabout;
                              if (tab.name) {
                                if ('mobile' === tab.name) {
                                  tabout = (
                                      <Fragment>
                                        <RangeControl
                                            value={(btns[index].width && undefined !== btns[index].width[2] ? btns[index].width[2] : undefined)}
                                            onChange={value => {
                                              this.saveArrayUpdate({width: [(undefined !== btns[index].width && undefined !== btns[index].width[0] ? btns[index].width[0] : ''), (undefined !== btns[index].width && undefined !== btns[index].width[1] ? btns[index].width[1] : ''), value]}, index);
                                            }}
                                            min={10}
                                            max={500}
                                        />
                                      </Fragment>
                                  );
                                }
                                else if ('tablet' === tab.name) {
                                  tabout = (
                                      <Fragment>
                                        <RangeControl
                                            value={(btns[index].width && undefined !== btns[index].width[1] ? btns[index].width[1] : undefined)}
                                            onChange={value => {
                                              this.saveArrayUpdate({width: [(undefined !== btns[index].width && undefined !== btns[index].width[0] ? btns[index].width[0] : ''), value, (undefined !== btns[index].width && undefined !== btns[index].width[2] ? btns[index].width[2] : '')]}, index);
                                            }}
                                            min={10}
                                            max={500}
                                        />
                                      </Fragment>
                                  );
                                }
                                else {
                                  tabout = (
                                      <Fragment>
                                        <RangeControl
                                            value={(btns[index].width && undefined !== btns[index].width[0] ? btns[index].width[0] : undefined)}
                                            onChange={value => {
                                              this.saveArrayUpdate({width: [value, (undefined !== btns[index].width && undefined !== btns[index].width[1] ? btns[index].width[1] : ''), (undefined !== btns[index].width && undefined !== btns[index].width[2] ? btns[index].width[2] : '')]}, index);
                                            }}
                                            min={10}
                                            max={500}
                                        />
                                      </Fragment>
                                  );
                                }
                              }
                              return <div>{tabout}</div>;
                            }
                          }
                        </TabPanel>
                      </div>
                  )}
                </Fragment>
            )}

            {(
                <Fragment>
                  <div className="components-base-control__field">
                    <label
                        className="kt-beside-btn-group">{__('Background Type', 'inclind-advanced-btn')}</label>
                    <ButtonGroup className="kt-button-size-type-options"
                                 aria-label={__('Background Type', 'inclind-advanced-btn')}>
                      {map(bgType, ({name, key}) => (
                          <Button
                              key={key}
                              className="kt-btn-size-btn"
                              isSmall
                              isPrimary={(undefined !== btns[index].backgroundHoverType ? btns[index].backgroundHoverType : 'solid') === key}
                              aria-pressed={(undefined !== btns[index].backgroundHoverType ? btns[index].backgroundHoverType : 'solid') === key}
                              onClick={() => this.saveArrayUpdate({backgroundHoverType: key}, index)}
                          >
                            {name}
                          </Button>
                      ))}
                    </ButtonGroup>
                  </div>
                </Fragment>
            )}
            {(
                <Fragment>
                  <h2 className="kt-tool">{__('Icon Settings', 'inclind-advanced-btn')}</h2>
                  <div className="kt-select-icon-container">
                    <FontIconPicker
                        icons={IcoNames}
                        value={btns[index].icon}
                        onChange={value => {
                          this.saveArrayUpdate({icon: value}, index);
                        }}
                        appendTo="body"
                        renderFunc={renderSVG}
                        theme="default"
                        isMulti={false}
                    />
                  </div>
                  <SelectControl
                      label={__('Icon Location', 'inclind-advanced-btn')}
                      value={btns[index].iconSide}
                      options={[
                        {value: 'right', label: __('Right')},
                        {value: 'left', label: __('Left')},
                      ]}
                      onChange={value => {
                        this.saveArrayUpdate({iconSide: value}, index);
                      }}
                  />
                </Fragment>
            )}
            <TextControl
                label={__('Add Custom CSS Class', 'inclind-advanced-btn')}
                value={(btns[index].cssClass ? btns[index].cssClass : '')}
                onChange={(value) => this.saveArrayUpdate({cssClass: value}, index)}
            />
            {/*<RangeControl*/}
            {/*label={__('Space Between Next Button', 'inclind-advanced-btn')}*/}
            {/*value={btns[index].gap}*/}
            {/*onChange={value => {*/}
            {/*this.saveArrayUpdate({gap: value}, index);*/}
            {/*}}*/}
            {/*min={0}*/}
            {/*max={50}*/}
            {/*/>*/}
          </PanelBody>
      );
    };
    const renderSVG = svg => (
        <GenIcon name={svg}
                 icon={(Ico[svg])}/>
    );
    const renderArray = (
        <Fragment>
          {times(btnCount, n => tabControls(n))}
        </Fragment>
    );
    const renderPreviewArray = (
        <div>
          {times(btnCount, n => renderBtns(n))}
        </div>
    );
    return (
        <Fragment>
          <div id={`kt-btns_${uniqueID}`}
               className={`${className} kt-btn-align-${hAlign}${(forceFullwidth ? ' kt-force-btn-fullwidth' : '')}`}>
            <BlockControls>
              <AlignmentToolbar
                  value={hAlign}
                  onChange={(value) => setAttributes({hAlign: value})}
              />
            </BlockControls>
            {(
                <Fragment>
                  <InspectorControls>
                    {this.showSettings('countSettings') && (
                        <PanelBody
                            title={__('Button Count', 'inclind-advanced-btn')}
                            initialOpen={true}
                        >
                          <RangeControl
                              label={__('Number of Buttons', 'inclind-advanced-btn')}
                              value={btnCount}
                              onChange={newcount => {
                                const newbtns = btns;
                                if (newbtns.length < newcount) {
                                  const amount = Math.abs(newcount - newbtns.length);
                                  {
                                    times(amount, n => {
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
                                        borderRadius: newbtns[0].borderRadius,
                                        borderWidth: newbtns[0].borderWidth,
                                        // colorHover: newbtns[0].colorHover,
                                        // backgroundHover:
                                        // newbtns[0].backgroundHover,
                                        // borderHover: newbtns[0].borderHover,
                                        // backgroundHoverOpacity:
                                        // newbtns[0].backgroundHoverOpacity,
                                        // borderHoverOpacity:
                                        // newbtns[0].borderHoverOpacity,
                                        icon: newbtns[0].icon,
                                        iconSide: newbtns[0].iconSide,
                                        iconHover: newbtns[0].iconHover,
                                        cssClass: (newbtns[0].cssClass ? newbtns[0].cssClass : ''),
                                        noFollow: (newbtns[0].noFollow ? newbtns[0].noFollow : false),
                                        gap: (newbtns[0].gap ? newbtns[0].gap : 5),
                                        responsiveSize: (newbtns[0].responsiveSize ? newbtns[0].responsiveSize : ['', '']),
                                        gradient: (newbtns[0].gradient ? newbtns[0].gradient : ['#999999', 1, 0, 100, 'linear', 180, 'center center']),
                                        gradientHover: (newbtns[0].gradientHover ? newbtns[0].gradientHover : ['#777777', 1, 0, 100, 'linear', 180, 'center center']),
                                        btnStyle: (newbtns[0].btnStyle ? newbtns[0].btnStyle : 'basic'),
                                        btnSize: (newbtns[0].btnSize ? newbtns[0].btnSize : 'standard'),
                                        backgroundType: (newbtns[0].backgroundType ? newbtns[0].backgroundType : 'solid'),
                                        backgroundHoverType: (newbtns[0].backgroundHoverType ? newbtns[0].backgroundHoverType : 'solid'),
                                        width: (newbtns[0].width ? newbtns[0].width : ['', '', '']),
                                        responsivePaddingBT: (newbtns[0].responsivePaddingBT ? newbtns[0].responsivePaddingBT : ['', '']),
                                        responsivePaddingLR: (newbtns[0].responsivePaddingLR ? newbtns[0].responsivePaddingLR : ['', '']),
                                        boxShadow: (newbtns[0].boxShadow ? newbtns[0].boxShadow : [false, '#000000', 0.2, 1, 1, 2, 0, false]),
                                        boxShadowHover: (newbtns[0].boxShadowHover ? newbtns[0].boxShadowHover : [false, '#000000', 0.4, 2, 2, 3, 0, false]),
                                      });
                                    });
                                  }
                                  setAttributes({btns: newbtns});
                                  this.saveArrayUpdate({iconSide: btns[0].iconSide}, 0);
                                }
                                setAttributes({btnCount: newcount});
                              }}
                              min={1}
                              max={5}
                          />
                          <h2 className="kt-heading-size-title">{__('Button Alignment', 'inclind-advanced-btn')}</h2>
                          <TabPanel className="kt-size-tabs"
                                    activeClass="active-tab"
                                    tabs={[
                                      {
                                        name: 'desk',
                                        title: <Dashicon icon="desktop"/>,
                                        className: 'kt-desk-tab',
                                      },
                                      {
                                        name: 'tablet',
                                        title: <Dashicon icon="tablet"/>,
                                        className: 'kt-tablet-tab',
                                      },
                                      {
                                        name: 'mobile',
                                        title: <Dashicon icon="smartphone"/>,
                                        className: 'kt-mobile-tab',
                                      },
                                    ]}>
                            {
                              (tab) => {
                                let tabout;
                                if (tab.name) {
                                  if ('mobile' === tab.name) {
                                    tabout = (
                                        <AlignmentToolbar
                                            value={mhAlign}
                                            onChange={(value) => setAttributes({mhAlign: value})}
                                        />
                                    );
                                  }
                                  else if ('tablet' === tab.name) {
                                    tabout = (
                                        <AlignmentToolbar
                                            value={thAlign}
                                            onChange={(value) => setAttributes({thAlign: value})}
                                        />
                                    );
                                  }
                                  else {
                                    tabout = (
                                        <AlignmentToolbar
                                            value={hAlign}
                                            onChange={(value) => setAttributes({hAlign: value})}
                                        />
                                    );
                                  }
                                }
                                return <div>{tabout}</div>;
                              }
                            }
                          </TabPanel>
                        </PanelBody>
                    )}
                    {renderArray}
                  </InspectorControls>
                  <InspectorAdvancedControls>
                    <ToggleControl
                        label={__('Force Button Fullwidth', 'inclind-advanced-btn')}
                        checked={(undefined !== forceFullwidth ? forceFullwidth : false)}
                        onChange={(value) => defineWidthTypeToggle(value)}
                    />
                  </InspectorAdvancedControls>
                </Fragment>
            )}
            <div id={`animate-id${uniqueID}`}
                 className={'btn-inner-wrap'}>
              {renderPreviewArray}
            </div>
          </div>
        </Fragment>
    );
  }
}

//  Start Drupal Specific.
const category = {
  slug: 'inclind-blocks',
  title: __('Custom Blocks'),
};
// Grab the current categories and merge in the new category if not present.
const currentCategories = select('core/blocks').getCategories().filter(item => item.slug !== category.slug);
dispatch('core/blocks').setCategories([category, ...currentCategories]);
// End Drupal Specific.

if (drupalSettings && drupalSettings.editor.formats.gutenberg.editorSettings !== undefined) {
  const blocks =  drupalSettings.editor.formats.gutenberg.editorSettings.allowedBlocks;
  if (blocks.hasOwnProperty(category.slug + '/inclind-advanced-btn') && blocks[category.slug + '/inclind-advanced-btn']) {
    // Register the block.
    registerBlockType(category.slug + '/inclind-advanced-btn', {
          title: __('Button (Bootstrap)', 'inclind-advanced-btn'),
          description: __('Create an advanced button or a row of buttons. Style each one, including hover controls!', 'inclind-advanced-btn'),
          category: 'inclind-blocks',
          keywords: [
            __('Button', 'inclind-advanced-btn'),
            __('Icon', 'inclind-advanced-btn'),
            __('inclind', 'inclind-advanced-btn'),
            __('custom', 'inclind-accoadvanced-btnrdion'),
          ],
          attributes: {
            hAlign: {
              type: 'string',
              default: 'center',
            },
            thAlign: {
              type: 'string',
              default: '',
            },
            mhAlign: {
              type: 'string',
              default: '',
            },
            btnCount: {
              type: 'number',
              default: 1,
            },
            uniqueID: {
              type: 'string',
              default: '',
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
                borderRadius: '',
                borderWidth: '',
                // colorHover: '#ffffff',
                // backgroundHover: '#444444',
                // borderHover: '#444444',
                // backgroundHoverOpacity: 1,
                // borderHoverOpacity: 1,
                icon: '',
                iconSide: 'left',
                iconHover: false,
                cssClass: '',
                noFollow: false,
                gap: 5,
                responsiveSize: ['', ''],
                gradient: ['#999999', 1, 0, 100, 'linear', 180, 'center center'],
                gradientHover: ['#777777', 1, 0, 100, 'linear', 180, 'center center'],
                btnStyle: 'basic',
                btnSize: 'standard',
                backgroundType: 'solid',
                backgroundHoverType: 'solid',
                width: ['', '', ''],
                responsivePaddingBT: ['', ''],
                responsivePaddingLR: ['', ''],
                boxShadow: [false, '#000000', 0.2, 1, 1, 2, 0, false],
                boxShadowHover: [false, '#000000', 0.4, 2, 2, 3, 0, false],
              }],
            },
            letterSpacing: {
              type: 'number',
            },
            widthType: {
              type: 'string',
              default: 'auto',
            },
            forceFullwidth: {
              type: 'bool',
              default: false,
            },
          },
          // Render the block components.
          getEditWrapperProps({blockAlignment}) {
            if ('left' === blockAlignment || 'right' === blockAlignment || 'center' === blockAlignment) {
              return {'data-align': blockAlignment};
            }
          },

          edit: InclindAdvancedBtn,

          save: props => {
            const {attributes: {btnCount, btns, hAlign, uniqueID, letterSpacing, forceFullwidth, thAlign, mhAlign}} = props;
            const renderSaveBtns = (index) => {
              let relAttr;
              if ('_blank' === btns[index].target && true === btns[index].noFollow) {
                relAttr = 'noreferrer noopener nofollow';
              }
              else if ('_blank' === btns[index].target) {
                relAttr = 'noreferrer noopener';
              }
              else if (true === btns[index].noFollow) {
                relAttr = 'nofollow';
              }
              else {
                relAttr = undefined;
              }
              let btnSize;
              if (undefined !== btns[index].paddingLR || undefined !== btns[index].paddingBT) {
                btnSize = 'custom';
              }
              else {
                btnSize = 'standard';
              }
              return (
                  <div className={`kt-btn-wrap kt-btn-wrap-${index}`}>
                    <a className={`btn kt-btn-${index}-action kt-btn-size-${(btns[index].btnSize ? btns[index].btnSize : btnSize)} kt-btn-style-${(btns[index].btnStyle ? btns[index].btnStyle : 'basic')}
                kt-btn-svg-show-${(!btns[index].iconHover ? 'always' : 'hover')} kt-btn-has-text-${(!btns[index].text ? 'false' : 'true')} ${(forceFullwidth ? ' btn-block' : '')}
                ${(!btns[index].icon ? '' : 'btn-icon')}${('video' === btns[index].target ? ' ktblocksvideopop' : '')}${(btns[index].cssClass ? ' ' + btns[index].cssClass : '')}
                ${(btns[index].backgroundHoverType === 'gradient' ? ' btn-arrow btn-cta btn-square' : (btns[index].backgroundHoverType === 'yellow' ? ' btn-secondary' : 'btn-primary'))} `}
                       href={(!btns[index].link ? 'javascript:void(0);' : btns[index].link)}
                       target={('_blank' === btns[index].target ? btns[index].target : undefined)}
                       rel={relAttr} style={{
                      borderRadius: (undefined !== btns[index].borderRadius && '' !== btns[index].borderRadius ? btns[index].borderRadius + 'px' : undefined),
                      borderWidth: (undefined !== btns[index].borderWidth && '' !== btns[index].borderWidth ? btns[index].borderWidth + 'px' : undefined),
                      letterSpacing: (undefined !== letterSpacing && '' !== letterSpacing ? letterSpacing + 'px' : undefined),
                    }}>
                      {btns[index].icon && 'left' === btns[index].iconSide && (
                          <GenIcon
                              className={`color-fill--white svg svg--icon js-svg-exists kt-btn-svg-icon-${btns[index].icon} kt-btn-side-${btns[index].iconSide}`}
                              name={btns[index].icon}
                              size={(!btns[index].size ? '14' : btns[index].size)}
                              icon={(Ico[btns[index].icon])}/>
                      )}
                      <RichText.Content
                          tagName={'span'}
                          className="kt-btn-inner-text"
                          value={btns[index].text}
                      />
                      {btns[index].icon && 'left' !== btns[index].iconSide && (
                          <GenIcon
                              className={`color-fill--white svg svg--icon js-svg-exists kt-btn-svg-icon-${btns[index].icon} kt-btn-side-${btns[index].iconSide}`}
                              name={btns[index].icon}
                              size={(!btns[index].size ? '14' : btns[index].size)}
                              icon={(Ico[btns[index].icon])}/>
                      )}
                      {btns[index].backgroundHoverType && 'gradient' === btns[index].backgroundHoverType && !btns[index].icon && (
                          <GenIcon className={`svg svg--colorable js-svg-exists`}
                                   name={`bb`} htmltag={`span`}/>
                      )}
                    </a>
                  </div>
              );
            };
            return (
                <div
                    className={`kt-btn-align-${hAlign} kt-btn-tablet-align-${(thAlign ? thAlign : 'inherit')} kt-btn-mobile-align-${(mhAlign ? mhAlign : 'inherit')} kt-btns-wrap kt-btns${uniqueID}`}>
                  {times(btnCount, n => renderSaveBtns(n))}
                </div>
            );
          },
        }
    );
  }
}

