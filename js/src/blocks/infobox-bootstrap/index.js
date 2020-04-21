// Import block dependencies and components
import Infobox from "./components/infobox";

import icons from '../../icons';
import map from 'lodash/map';
// import TypographyControls from '../../typography-control';
// import MeasurementControls from '../../measurement-control';
// import AdvancedColorControl from '../../advanced-color-control';
// import ImageSizeControl from '../../image-size-control';
// import WebfontLoader from '../../fontloader';
import hexToRGBA from '../../hex-to-rgba';
import GenIcon from '../../genicon';
import Ico from '../../svgicons';
import IcoNames from '../../svgiconsnames';
import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
import classnames from "classnames";
// import FaIco from '../../faicons';


// Internationalization
const __ = Drupal.t;

// Extend component
const {Component, Fragment} = wp.element;

// Register block
const {registerBlockType} = wp.blocks;

// Register editor components
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
  MediaPlaceholder,
} = wp.blockEditor;

// Register components
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
  BaseControl,
} = wp.components;

const {dispatch, select} = wp.data;

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
      settings: {},
    };
  }

  componentDidMount() {
    if (!this.props.attributes.uniqueID) {
      this.props.setAttributes({
        uniqueID: '_' + this.props.clientId.substr(2, 9),
      });
      ktinfoboxUniqueIDs.push('_' + this.props.clientId.substr(2, 9));
    }
    else if (ktinfoboxUniqueIDs.includes(this.props.attributes.uniqueID)) {
      this.props.setAttributes({
        uniqueID: '_' + this.props.clientId.substr(2, 9),
      });
      ktinfoboxUniqueIDs.push('_' + this.props.clientId.substr(2, 9));
    }
    else {
      ktinfoboxUniqueIDs.push(this.props.attributes.uniqueID);
    }
    if (this.props.attributes.containerBorderWidth[0] === this.props.attributes.containerBorderWidth[1] && this.props.attributes.containerBorderWidth[0] === this.props.attributes.containerBorderWidth[2] && this.props.attributes.containerBorderWidth[0] === this.props.attributes.containerBorderWidth[3]) {
      this.setState({containerBorderControl: 'linked'});
    }
    else {
      this.setState({containerBorderControl: 'individual'});
    }
    if (this.props.attributes.containerPadding[0] === this.props.attributes.containerPadding[1] && this.props.attributes.containerPadding[0] === this.props.attributes.containerPadding[2] && this.props.attributes.containerPadding[0] === this.props.attributes.containerPadding[3]) {
      this.setState({containerPaddingControl: 'linked'});
    }
    else {
      this.setState({containerPaddingControl: 'individual'});
    }
  }

  showSettings(key) {
    let donot_allow = ['mediaSettings'];
    if (donot_allow.includes(key)) {
      return false;
    }
    return true;
  }

  // Render element while editing in Gutenberg:
  render() {

    const {
      attributes: {
        blockAlignment, backgroundType, backgroundColor, backgroundImage, backgroundImageData,
        backgroundImageUUID, overlayOpacity, overlayColor, margin, padding, contentWidth, uniqueID,
        link, linkProperty, target, hAlign, containerBackground, containerBorder, containerBorderWidth,
        containerBorderRadius, containerPadding, mediaType, mediaImage, mediaIcon, mediaStyle, mediaAlign, displayTitle, title, displayText, contentText,
        textColor, titleFont, textFont, displayLearnMore, learnMore, learnMoreStyles, containerBackgroundOpacity,
        containerBorderOpacity, mediaVAlign, mediaAlignMobile, mediaAlignTablet
      }, className, setAttributes, isSelected
    } = this.props;

    const {containerBorderControl, containerPaddingControl} = this.state;
    const startlayoutOptions = [
      {key: 'skip', name: __('Skip'), icon: __('Skip')},
      {key: 'simple', name: __('Simple'), icon: icons.infoSimple},
      {key: 'left', name: __('Align Left'), icon: icons.infoLeft},
      {key: 'bold', name: __('Bold Background'), icon: icons.infoBackground},
      {key: 'image', name: __('Circle Image'), icon: icons.infoImage},
    ];

    const hasImageBg = backgroundType === 'image';

    const containerStyle = {
      backgroundColor: !hasImageBg ? backgroundColor : '#2e358f',
      backgroundImage: hasImageBg && `url('${backgroundImage}')`,
      color: hasImageBg && 'white',
    };
    const overlayStyle = !hasImageBg ? {} : {
      display: 'block',
      backgroundColor: overlayColor || '#2e358f',
      opacity: parseInt(overlayOpacity, 10) / 100,
    };
    const wrapperStyle = {
      maxWidth: contentWidth && `${contentWidth}px`,
    };

    const classes = [
      // className,
      classnames(`align${(blockAlignment ? blockAlignment : 'none')}`),
      'infobox p-4 mb-4 bg-primary text-' + hAlign,
    ];

    classes.push('has-overlay');
    classes.push('text-white');

    if (margin) {
      classes.push(`my-${margin}`);
    }

    if (padding) {
      classes.push(`py-${padding}`);
    }

    const vOptions = [
      {label: __('None'), value: ''},
      {label: __('Small'), value: '3'},
      {label: __('Medium'), value: '4'},
      {label: __('Large'), value: '5'},
    ];

    const onSelectImage = (media, field) => {
      const dataAttrs = {};
      let uuid = '';

      if (media.data) {
        if (media.data.hasOwnProperty('entity_uuid')) {
          uuid = media.data.entity_uuid;
        }

        dataAttrs[`${field}Data`] = Object.keys(media.data)
            .reduce((result, key) => {
              result[`data-${key.replace('_', '-')}`] = media.data[key];
              return result;
            }, {});
      }

      setAttributes({
        [field]: media.url,
        [`${field}UUID`]: uuid,
        ...dataAttrs,
      });
    };


    const onChangeTitle = value => {
      setAttributes({title: value});
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
        maxWidth: (media.width ? media.width : 50),
        subtype: media.subtype,
      });
    };
    const changeImageSize = img => {
      saveMediaImage({
        url: img.value,
        width: img.width,
        height: img.height,
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
        subtype: '',
      });
    };
    const onSelectFlipImage = media => {
      saveMediaImage({
        flipId: media.id,
        flipUrl: media.url,
        flipAlt: media.alt,
        flipWidth: media.width,
        flipHeight: media.height,
        flipSubtype: media.subtype,
      });
    };
    const clearFlipImage = () => {
      saveMediaImage({
        flipId: '',
        flipUrl: '',
        flipAlt: '',
        flipWidth: '',
        flipHeight: '',
        flipSubtype: '',
      });
    };
    const changeFlipImageSize = img => {
      saveMediaImage({
        flipUrl: img.value,
        flipWidth: img.width,
        flipHeight: img.height,
      });
    };
    const isSelectedClass = (isSelected ? 'is-selected' : 'not-selected');
    const saveMediaImage = (value) => {
      const newUpdate = mediaImage.map((item, index) => {
        if (0 === index) {
          item = {...item, ...value};
        }
        return item;
      });
      setAttributes({
        mediaImage: newUpdate,
      });
    };
    const saveMediaIcon = (value) => {
      const newUpdate = mediaIcon.map((item, index) => {
        if (0 === index) {
          item = {...item, ...value};
        }
        return item;
      });
      setAttributes({
        mediaIcon: newUpdate,
      });
    };
    const saveMediaStyle = (value) => {
      const newUpdate = mediaStyle.map((item, index) => {
        if (0 === index) {
          item = {...item, ...value};
        }
        return item;
      });
      setAttributes({
        mediaStyle: newUpdate,
      });
    };
    const saveTitleFont = (value) => {
      const newUpdate = titleFont.map((item, index) => {
        if (0 === index) {
          item = {...item, ...value};
        }
        return item;
      });
      setAttributes({
        titleFont: newUpdate,
      });
    };
    const saveTextFont = (value) => {
      const newUpdate = textFont.map((item, index) => {
        if (0 === index) {
          item = {...item, ...value};
        }
        return item;
      });
      setAttributes({
        textFont: newUpdate,
      });
    };
    const saveLearnMoreStyles = (value) => {
      const newUpdate = learnMoreStyles.map((item, index) => {
        if (0 === index) {
          item = {...item, ...value};
        }
        return item;
      });
      setAttributes({
        learnMoreStyles: newUpdate,
      });
    };
    const renderCSS = (
        <style>
          {(mediaStyle[0].borderRadius ? `#kt-info-box${uniqueID} .kt-blocks-info-box-link-wrap .kt-blocks-info-box-media img, #kt-info-box${uniqueID} .kt-blocks-info-box-link-wrap .kt-blocks-info-box-media .editor-media-placeholder { border-radius: ${mediaStyle[0].borderRadius}px; }` : '')}
          {/*{(`#kt-info-box${uniqueID} .kt-blocks-info-box-link-wrap .info-learnmore { background-color: #ffc222 }`)}*/}
          {(mediaStyle[0].hoverBackground ? `#kt-info-box${uniqueID} .kt-blocks-info-box-link-wrap:hover .kt-blocks-info-box-media { background: ${mediaStyle[0].hoverBackground} !important; }` : '')}
        </style>
    );
    const renderSVG = svg => (
        <GenIcon name={svg}
                 icon={('fa' === svg.substring(0, 2) ? FaIco[svg] : Ico[svg])}/>
    );


    return (
        <div id={`kt-info-box${uniqueID}`} className={className}>
          {renderCSS}
          <BlockControls key="controls">
            <BlockAlignmentToolbar
                value={blockAlignment}
                controls={['center', 'wide', 'full', 'left', 'right']}
                onChange={value => setAttributes({blockAlignment: value})}
            />
            {'image' === mediaType && mediaImage[0].url && (
                <Toolbar>
                  <MediaUpload
                      onSelect={onSelectMainImage}
                      type="image"
                      value={mediaImage[0].id}
                      allowedTypes={ALLOWED_MEDIA_TYPES}
                      render={({open}) => (
                          <IconButton
                              className="components-toolbar__control"
                              label={__('Edit Media')}
                              icon="format-image"
                              onClick={open}
                          />
                      )}
                  />
                </Toolbar>
            )}
            <AlignmentToolbar
                value={hAlign}
                onChange={value => setAttributes({hAlign: value})}
            />
          </BlockControls>
          {this.showSettings('allSettings') && (
              <InspectorControls>
                <PanelBody>
                  <div className="kt-controls-link-wrap">
                    <h2>{__('Link')}</h2>
                    <URLInput
                        className="kt-btn-link-input"
                        value={link}
                        onChange={value => setAttributes({link: value})}
                    />
                  </div>
                  <SelectControl
                      label={__('Link Target')}
                      value={target}
                      options={[
                        {value: '_self', label: __('Same Window')},
                        {value: '_blank', label: __('New Window')},
                      ]}
                      onChange={value => setAttributes({target: value})}
                  />
                  <SelectControl
                      label={__('Link Content')}
                      value={linkProperty}
                      options={[
                        {value: 'box', label: __('Entire Box')},
                        {value: 'learnmore', label: __('Only Learn More Text')},
                      ]}
                      onChange={value => setAttributes({linkProperty: value})}
                  />
                </PanelBody>
                {this.showSettings('containerSettings') && (
                    <PanelBody
                        title={__('Container Settings')}
                        initialOpen={false}
                    >

                      {/*<MeasurementControls*/}
                      {/*label={__('Container Border Width (px)')}*/}
                      {/*measurement={containerBorderWidth}*/}
                      {/*control={containerBorderControl}*/}
                      {/*onChange={(value) => setAttributes({containerBorderWidth: value})}*/}
                      {/*onControl={(value) => this.setState({containerBorderControl: value})}*/}
                      {/*min={0}*/}
                      {/*max={40}*/}
                      {/*step={1}*/}
                      {/*/>*/}

                      {/*<RangeControl*/}
                      {/*label={__('Container Border Radius (px)')}*/}
                      {/*value={containerBorderRadius}*/}
                      {/*onChange={value => setAttributes({containerBorderRadius: value})}*/}
                      {/*step={1}*/}
                      {/*min={0}*/}
                      {/*max={200}*/}
                      {/*/>*/}

                      {/*/!* Margin and Padding *!/*/}
                      {/*<SelectControl*/}
                      {/*label={__('Vertical margin')}*/}
                      {/*value={margin}*/}
                      {/*options={vOptions}*/}
                      {/*onChange={value => setAttributes({margin: value})}*/}
                      {/*/>*/}
                      {/*<SelectControl*/}
                      {/*label={__('Vertical padding')}*/}
                      {/*value={padding}*/}
                      {/*options={vOptions}*/}
                      {/*onChange={value => setAttributes({padding: value})}*/}
                      {/*/>*/}

                      {/*/!* Content width *!/*/}
                      {/*<BaseControl label={__('Content Width in pixels')}*/}
                      {/*id="block-hero-section-content-width-input">*/}
                      {/*<input*/}
                      {/*type="number"*/}
                      {/*id="block-hero-section-content-width-input"*/}
                      {/*value={contentWidth}*/}
                      {/*onChange={ev => setAttributes({contentWidth: parseInt(ev.target.value, 10) || undefined})}*/}
                      {/*step="10"*/}
                      {/*/>*/}
                      {/*</BaseControl>*/}

                      {/* Background control */}
                      <SelectControl
                          label={__('Background Type')}
                          value={backgroundType}
                          options={[
                            {label: __('Solid Color'), value: 'color'},
                            {label: __('Image'), value: 'image'},
                          ]}
                          onChange={value => setAttributes({backgroundType: value})}
                      />

                      {hasImageBg &&
                      <BaseControl label={__('Choose background image')}>
                        <MediaUpload
                            allowedTypes={['image']}
                            onSelect={media => onSelectImage(media, 'backgroundImage')}
                            render={({open}) => (
                                <IconButton
                                    className="components-toolbar__control"
                                    label={__('Edit image')}
                                    icon="format-image" onClick={open}/>
                            )}/>
                      </BaseControl>}

                    </PanelBody>
                )}
                {/*<PanelColorSettings*/}
                {/*title={__('Color Settings')}*/}
                {/*initialOpen={!hasImageBg}*/}
                {/*colorSettings={[!hasImageBg ? {*/}
                {/*value: backgroundColor,*/}
                {/*onChange: value => setAttributes({backgroundColor: value}),*/}
                {/*label: __('Background Color'),*/}
                {/*} : {*/}
                {/*value: overlayColor,*/}
                {/*onChange: value => setAttributes({overlayColor: value}),*/}
                {/*label: __('Overlay Color'),*/}
                {/*}]}/>*/}
                {this.showSettings('mediaSettings') && (
                    <PanelBody
                        title={__('Media Settings')}
                        initialOpen={false}
                    >
                      <TabPanel className="kt-inspect-tabs kt-spacer-tabs"
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
                                    <SelectControl
                                        label={__('Mobile Media Align')}
                                        value={(mediaAlignMobile ? mediaAlignMobile : mediaAlign)}
                                        options={[
                                          {value: 'top', label: __('Top')},
                                          {value: 'left', label: __('Left')},
                                          {value: 'right', label: __('Right')},
                                        ]}
                                        onChange={value => setAttributes({mediaAlignMobile: value})}
                                    />
                                );
                              }
                              else if ('tablet' === tab.name) {
                                tabout = (
                                    <SelectControl
                                        label={__('Tablet Media Align')}
                                        value={(mediaAlignTablet ? mediaAlignTablet : mediaAlign)}
                                        options={[
                                          {value: 'top', label: __('Top')},
                                          {value: 'left', label: __('Left')},
                                          {value: 'right', label: __('Right')},
                                        ]}
                                        onChange={value => setAttributes({mediaAlignTablet: value})}
                                    />
                                );
                              }
                              else {
                                tabout = (
                                    <SelectControl
                                        label={__('Media Align')}
                                        value={mediaAlign}
                                        options={[
                                          {value: 'top', label: __('Top')},
                                          {value: 'left', label: __('Left')},
                                          {value: 'right', label: __('Right')},
                                        ]}
                                        onChange={value => setAttributes({mediaAlign: value})}
                                    />
                                );
                              }
                            }
                            return <div>{tabout}</div>;
                          }
                        }
                      </TabPanel>
                      {mediaAlign !== 'top' && (
                          <Fragment>
                            <SelectControl
                                label={__('Media Vertical Align')}
                                value={mediaVAlign}
                                options={[
                                  {value: 'top', label: __('Top')},
                                  {value: 'middle', label: __('Middle')},
                                  {value: 'bottom', label: __('Bottom')},
                                ]}
                                onChange={value => setAttributes({mediaVAlign: value})}
                            />
                          </Fragment>
                      )}
                      <SelectControl
                          label={__('Media Type')}
                          value={mediaType}
                          options={[
                            {value: 'icon', label: __('Icon')},
                            {value: 'image', label: __('Image')},
                            {value: 'none', label: __('None')},
                          ]}
                          onChange={value => setAttributes({mediaType: value})}
                      />
                      {'image' === mediaType && (
                          <Fragment>
                            {mediaImage[0].url && (
                                <div
                                    className="kb-image-edit-settings-container">
                                  <MediaUpload
                                      onSelect={onSelectMainImage}
                                      type="image"
                                      value={mediaImage[0].id}
                                      allowedTypes={ALLOWED_MEDIA_TYPES}
                                      render={({open}) => (
                                          <Button
                                              className={'components-button components-icon-button kt-cta-upload-btn kb-upload-inline-btn'}
                                              onClick={open}
                                          >
                                            <Dashicon icon="format-image"/>
                                            {__('Edit Media')}
                                          </Button>
                                      )}
                                  />
                                  <IconButton
                                      label={__('clear')}
                                      className="kb-clear-image-btn"
                                      icon="no-alt"
                                      onClick={clearImage}
                                  />
                                </div>
                            )}
                            {/*
                            {mediaImage[0].id && 'svg+xml' !== mediaImage[0].subtype && (
                                <ImageSizeControl
                                    label={__('Image File Size')}
                                    id={mediaImage[0].id}
                                    url={mediaImage[0].url}
                                    onChange={changeImageSize}
                                />
                            )}
*/}
                            <RangeControl
                                label={__('Max Image Width')}
                                value={mediaImage[0].maxWidth}
                                onChange={value => saveMediaImage({maxWidth: value})}
                                min={5}
                                max={800}
                                step={1}
                            />
                            <RangeControl
                                label={__('Image Border Radius (px)')}
                                value={mediaStyle[0].borderRadius}
                                onChange={value => saveMediaStyle({borderRadius: value})}
                                step={1}
                                min={0}
                                max={200}
                            />
                            {/*
                            <TabPanel className="kt-inspect-tabs kt-hover-tabs"
                                      activeClass="active-tab"
                                      tabs={[
                                        {
                                          name: 'normal',
                                          title: __('Normal'),
                                          className: 'kt-normal-tab',
                                        },
                                        {
                                          name: 'hover',
                                          title: __('Hover'),
                                          className: 'kt-hover-tab',
                                        },
                                      ]}>
                              {
                                (tab) => {
                                  let tabout;
                                  if (tab.name) {
                                    if ('hover' === tab.name) {
                                      tabout = (
                                          <Fragment>
                                            {mediaImage[0].subtype && 'svg+xml' === mediaImage[0].subtype && (
                                                <Fragment>
                                                  <AdvancedColorControl
                                                      label={__('SVG Hover Color')}
                                                      colorValue={(mediaIcon[0].hoverColor ? mediaIcon[0].hoverColor : '#444444')}
                                                      colorDefault={'#444444'}
                                                      onColorChange={value => saveMediaIcon({hoverColor: value})}
                                                  />
                                                  <small>{__('*you must force inline svg for this to have effect.')}</small>
                                                </Fragment>
                                            )}
                                            <AdvancedColorControl
                                                label={__('Image Hover Background')}
                                                colorValue={(mediaStyle[0].hoverBackground ? mediaStyle[0].hoverBackground : '')}
                                                colorDefault={'transparent'}
                                                onColorChange={value => saveMediaStyle({hoverBackground: value})}
                                            />
                                            <AdvancedColorControl
                                                label={__('Image Hover Border')}
                                                colorValue={(mediaStyle[0].hoverBorder ? mediaStyle[0].hoverBorder : '#444444')}
                                                colorDefault={'#444444'}
                                                onColorChange={value => saveMediaStyle({hoverBorder: value})}
                                            />
                                          </Fragment>
                                      );
                                    }
                                    else {
                                      tabout = (
                                          <Fragment>
                                            {mediaImage[0].subtype && 'svg+xml' === mediaImage[0].subtype && (
                                                <Fragment>
                                                  <AdvancedColorControl
                                                      label={__('SVG Color')}
                                                      colorValue={(mediaIcon[0].color ? mediaIcon[0].color : '#444444')}
                                                      colorDefault={'#444444'}
                                                      onColorChange={value => saveMediaIcon({color: value})}
                                                  />
                                                  <small>{__('*you must force inline svg for this to have effect.')}</small>
                                                </Fragment>
                                            )}
                                            <AdvancedColorControl
                                                label={__('Image Background')}
                                                colorValue={(mediaStyle[0].background ? mediaStyle[0].background : '')}
                                                colorDefault={'transparent'}
                                                onColorChange={value => saveMediaStyle({background: value})}
                                            />
                                            <AdvancedColorControl
                                                label={__('Image Border')}
                                                colorValue={(mediaStyle[0].border ? mediaStyle[0].border : '#444444')}
                                                colorDefault={'#444444'}
                                                onColorChange={value => saveMediaStyle({border: value})}
                                            />
                                          </Fragment>
                                      );
                                    }
                                  }
                                  return <div>{tabout}</div>;
                                }
                              }
                            </TabPanel>
*/}
                          </Fragment>
                      )}
                      {'icon' === mediaType && (
                          <Fragment>
                            <FontIconPicker
                                icons={IcoNames}
                                value={mediaIcon[0].icon}
                                onChange={value => saveMediaIcon({icon: value})}
                                appendTo="body"
                                renderFunc={renderSVG}
                                theme="default"
                                isMulti={false}
                            />
                            <RangeControl
                                label={__('Icon Size')}
                                value={mediaIcon[0].size}
                                onChange={value => saveMediaIcon({size: value})}
                                min={5}
                                max={250}
                                step={1}
                            />
                            {mediaIcon[0].icon && 'fe' === mediaIcon[0].icon.substring(0, 2) && (
                                <RangeControl
                                    label={__('Icon Line Width')}
                                    value={mediaIcon[0].width}
                                    onChange={value => saveMediaIcon({width: value})}
                                    step={0.5}
                                    min={0.5}
                                    max={4}
                                />
                            )}
                            <RangeControl
                                label={__('Icon Border Radius (px)')}
                                value={mediaStyle[0].borderRadius}
                                onChange={value => saveMediaStyle({borderRadius: value})}
                                step={1}
                                min={0}
                                max={200}
                            />
                            {/*
                            <TabPanel className="kt-inspect-tabs kt-hover-tabs"
                                      activeClass="active-tab"
                                      tabs={[
                                        {
                                          name: 'normal',
                                          title: __('Normal'),
                                          className: 'kt-normal-tab',
                                        },
                                        {
                                          name: 'hover',
                                          title: __('Hover'),
                                          className: 'kt-hover-tab',
                                        },
                                      ]}>
                              {
                                (tab) => {
                                  let tabout;
                                  if (tab.name) {
                                    if ('hover' === tab.name) {
                                      tabout = (
                                          <Fragment>
                                            <AdvancedColorControl
                                                label={__('Icon Hover Color')}
                                                colorValue={(mediaIcon[0].hoverColor ? mediaIcon[0].hoverColor : '#444444')}
                                                colorDefault={'#444444'}
                                                onColorChange={value => saveMediaIcon({hoverColor: value})}
                                            />
                                            <AdvancedColorControl
                                                label={__('Icon Hover Background')}
                                                colorValue={(mediaStyle[0].hoverBackground ? mediaStyle[0].hoverBackground : '')}
                                                colorDefault={'transparent'}
                                                onColorChange={value => saveMediaStyle({hoverBackground: value})}
                                            />
                                            <AdvancedColorControl
                                                label={__('Icon Hover Border')}
                                                colorValue={(mediaStyle[0].hoverBorder ? mediaStyle[0].hoverBorder : '#444444')}
                                                colorDefault={'#444444'}
                                                onColorChange={value => saveMediaStyle({hoverBorder: value})}
                                            />
                                          </Fragment>
                                      );
                                    }
                                    else {
                                      tabout = (
                                          <Fragment>
                                            <AdvancedColorControl
                                                label={__('Icon Color')}
                                                colorValue={(mediaIcon[0].color ? mediaIcon[0].color : '#444444')}
                                                colorDefault={'#444444'}
                                                onColorChange={value => saveMediaIcon({color: value})}
                                            />
                                            <AdvancedColorControl
                                                label={__('Icon Background')}
                                                colorValue={(mediaStyle[0].background ? mediaStyle[0].background : '')}
                                                colorDefault={'transparent'}
                                                onColorChange={value => saveMediaStyle({background: value})}
                                            />
                                            <AdvancedColorControl
                                                label={__('Icon Border Color')}
                                                colorValue={(mediaStyle[0].border ? mediaStyle[0].border : '#444444')}
                                                colorDefault={'#444444'}
                                                onColorChange={value => saveMediaStyle({border: value})}
                                            />
                                          </Fragment>
                                      );
                                    }
                                  }
                                  return <div>{tabout}</div>;
                                }
                              }
                            </TabPanel>
*/}
                            <TextControl
                                label={__('Icon Title for Accessibility')}
                                value={mediaIcon[0].title}
                                onChange={value => saveMediaIcon({title: value})}
                            />
                          </Fragment>
                      )}
                    </PanelBody>
                )}
                {this.showSettings('titleSettings') && (
                    <PanelBody
                        title={__('Title Settings')}
                        initialOpen={false}
                    >
                      <ToggleControl
                          label={__('Show Title')}
                          checked={displayTitle}
                          onChange={(value) => setAttributes({displayTitle: value})}
                      />
                    </PanelBody>
                )}
                {this.showSettings('textSettings') && (
                    <PanelBody
                        title={__('Text Settings')}
                        initialOpen={false}
                    >
                      <ToggleControl
                          label={__('Show Text')}
                          checked={displayText}
                          onChange={(value) => setAttributes({displayText: value})}
                      />
                    </PanelBody>
                )}
                {this.showSettings('learnMoreSettings') && (
                    <PanelBody
                        title={__('Learn More Settings')}
                        initialOpen={false}
                    >
                      <ToggleControl
                          label={__('Show Learn More')}
                          checked={displayLearnMore}
                          onChange={(value) => setAttributes({displayLearnMore: value})}
                      />
                      {/*{displayLearnMore && (
                          <Fragment>
                            <RangeControl
                                label={__('Learn More Border Radius (px)')}
                                value={learnMoreStyles[0].borderRadius}
                                onChange={value => saveLearnMoreStyles({borderRadius: value})}
                                step={1}
                                min={0}
                                max={200}
                            />
                          </Fragment>
                      )}*/}
                    </PanelBody>
                )}
              </InspectorControls>
          )}

          <div
              className={`kt-blocks-info-box-link-wrap kt-blocks-info-box-media-align-${mediaAlign} ${isSelectedClass} kt-info-halign-${hAlign} kb-info-box-vertical-media-align-${mediaVAlign}`}
              style={{
                borderColor: (containerBorder ? hexToRGBA(containerBorder, (undefined !== containerBorderOpacity ? containerBorderOpacity : 1)) : hexToRGBA('#eeeeee', (undefined !== containerBorderOpacity ? containerBorderOpacity : 1))),
                background: (containerBackground ? hexToRGBA(containerBackground, (undefined !== containerBackgroundOpacity ? containerBackgroundOpacity : 1)) : hexToRGBA('#f2f2f2', (undefined !== containerBackgroundOpacity ? containerBackgroundOpacity : 1))),
                borderRadius: containerBorderRadius + 'px',
                borderWidth: (containerBorderWidth ? containerBorderWidth[0] + 'px ' + containerBorderWidth[1] + 'px ' + containerBorderWidth[2] + 'px ' + containerBorderWidth[3] + 'px' : ''),
                padding: (containerPadding ? containerPadding[0] + 'px ' + containerPadding[1] + 'px ' + containerPadding[2] + 'px ' + containerPadding[3] + 'px' : ''),
                backgroundColor: !hasImageBg ? backgroundColor : '#2e358f',
                backgroundImage: hasImageBg && `url('${backgroundImage}')`,
                'background-size': hasImageBg && `cover`,
                color: hasImageBg && 'white',
              }} {...backgroundImageData}>
            <div className="g-section-overlay" style={overlayStyle}></div>
            <div className="g-section-wrapper" style={wrapperStyle}>

              {'none' !== mediaType && (
                  <div
                      className={`${classes.join(' ')} kt-blocks-info-box-media`}
                      style={{
                        borderColor: mediaStyle[0].border,
                        backgroundColor: mediaStyle[0].background,
                        borderRadius: mediaStyle[0].borderRadius + 'px',
                        borderWidth: (mediaStyle[0].borderWidth ? mediaStyle[0].borderWidth[0] + 'px ' + mediaStyle[0].borderWidth[1] + 'px ' + mediaStyle[0].borderWidth[2] + 'px ' + mediaStyle[0].borderWidth[3] + 'px' : ''),
                        padding: (mediaStyle[0].padding ? mediaStyle[0].padding[0] + 'px ' + mediaStyle[0].padding[1] + 'px ' + mediaStyle[0].padding[2] + 'px ' + mediaStyle[0].padding[3] + 'px' : ''),
                        margin: (mediaStyle[0].margin ? mediaStyle[0].margin[0] + 'px ' + mediaStyle[0].margin[1] + 'px ' + mediaStyle[0].margin[2] + 'px ' + mediaStyle[0].margin[3] + 'px' : ''),
                      }}>
                    {!mediaImage[0].url && 'image' === mediaType && (
                        <MediaPlaceholder
                            icon="format-image"
                            labels={{
                              title: __('Media area'),
                            }}
                            onSelect={onSelectMainImage}
                            accept="image/*"
                            allowedTypes={ALLOWED_MEDIA_TYPES}
                        />
                    )}
                    {mediaImage[0].url && 'image' === mediaType && (
                        <div
                            className="kadence-info-box-image-inner-intrisic-container"
                            style={{
                              maxWidth: mediaImage[0].maxWidth + 'px',
                            }}>
                          <div
                              className={`kadence-info-box-image-intrisic ${('svg+xml' === mediaImage[0].subtype ? ' kb-info-box-image-type-svg' : '')}`}
                              style={{
                                paddingBottom: isNaN(mediaImage[0].height) ? undefined : ((mediaImage[0].height / mediaImage[0].width) * 100) + '%',
                                height: isNaN(mediaImage[0].height) ? undefined : 0,
                              }}>
                            <div
                                className="kadence-info-box-image-inner-intrisic">
                              <img
                                  src={mediaImage[0].url}
                                  alt={mediaImage[0].alt}
                                  width={(mediaImage[0].subtype && 'svg+xml' === mediaImage[0].subtype ? mediaImage[0].maxWidth : mediaImage[0].width)}
                                  height={mediaImage[0].height}
                                  className={`${(mediaImage[0].id ? `kt-info-box-image wp-image-${mediaImage[0].id}` : 'kt-info-box-image wp-image-offsite')} ${(mediaImage[0].subtype && 'svg+xml' === mediaImage[0].subtype ? ' kt-info-svg-image' : '')}`}
                              />
                            </div>
                          </div>
                        </div>
                    )}
                    {'icon' === mediaType && (
                        <div
                            className={`kadence-info-box-icon-container`}>
                          <div
                              className={'kadence-info-box-icon-inner-container'}>
                            <GenIcon
                                className={`kt-info-svg-icon kt-info-svg-icon-${mediaIcon[0].icon}`}
                                name={mediaIcon[0].icon}
                                size={(!mediaIcon[0].size ? '14' : mediaIcon[0].size)}
                                icon={('fa' === mediaIcon[0].icon.substring(0, 2) ? FaIco[mediaIcon[0].icon] : Ico[mediaIcon[0].icon])}
                                htmltag="span"
                                strokeWidth={('fe' === mediaIcon[0].icon.substring(0, 2) ? mediaIcon[0].width : undefined)}
                                style={{
                                  display: 'block',
                                  color: (mediaIcon[0].color ? mediaIcon[0].color : undefined),
                                }}/>
                          </div>
                        </div>
                    )}
                  </div>
              )}
              <div
                  className={'kt-infobox-textcontent text-center infobox-content text-white'}>
                {displayTitle && (
                    <RichText
                        className="info-box-title"
                        tagName={titleTagName}
                        placeholder={__('Title')}
                        onChange={onChangeTitle}
                        value={title}
                        style={{
                          fontWeight: titleFont[0].weight,
                          color: 'white',
                          fontSize: titleFont[0].size[0] + titleFont[0].sizeType,
                          lineHeight: (titleFont[0].lineHeight && titleFont[0].lineHeight[0] ? titleFont[0].lineHeight[0] + titleFont[0].lineType : undefined),
                          fontFamily: (titleFont[0].family ? titleFont[0].family : ''),
                          padding: (titleFont[0].padding ? titleFont[0].padding[0] + 'px ' + titleFont[0].padding[1] + 'px ' + titleFont[0].padding[2] + 'px ' + titleFont[0].padding[3] + 'px' : ''),
                          margin: (titleFont[0].margin ? titleFont[0].margin[0] + 'px ' + titleFont[0].margin[1] + 'px ' + titleFont[0].margin[2] + 'px ' + titleFont[0].margin[3] + 'px' : ''),
                        }}
                        keepPlaceholderOnFocus
                    />
                )}
                {displayText && (
                    <RichText
                        className="info-box-text text-white"
                        tagName={'p'}
                        placeholder={__('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean diam dolor, accumsan sed rutrum vel, dapibus et leo.')}
                        onChange={(value) => setAttributes({contentText: value})}
                        value={contentText}
                        style={{
                          fontWeight: textFont[0].weight,
                          color: textColor,
                          fontSize: textFont[0].size[0] + textFont[0].sizeType,
                          lineHeight: (textFont[0].lineHeight && textFont[0].lineHeight[0] ? textFont[0].lineHeight[0] + textFont[0].lineType : undefined),
                          fontFamily: (textFont[0].family ? textFont[0].family : ''),
                        }}
                        keepPlaceholderOnFocus
                    />
                )}
                {displayLearnMore && (
                    <button
                        className="kt-blocks-info-box-learnmore-wrap btn btn-secondary">
                      <RichText
                          className="info-learnmore"
                          tagName={'div'}
                          placeholder={__('Learn More')}
                          onChange={value => setAttributes({learnMore: value})}
                          value={learnMore}
                          keepPlaceholderOnFocus
                      />
                    </button>
                )}
              </div>
            </div>
          </div>
        </div>
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
  if (blocks.hasOwnProperty(category.slug + '/inclind-infobox') && blocks[category.slug + '/inclind-infobox']) {
    // Register the block.
    registerBlockType(category.slug + '/inclind-infobox', {
          title: __('Infobox (Bootstrap)', 'inclind-infobox'),
          description: __('Add infobox with background image/overlay.', 'inclind-infobox'),
          category: 'inclind-blocks',
          keywords: [
            __('Info', 'inclind-infobox'),
            __('Infobox', 'inclind-infobox'),
            __('inclind', 'inclind-infobox'),
            __('custom', 'inclind-infobox'),
          ],

          attributes: {
            blockAlignment: {
              type: 'string',
              default: 'none',
            },
            backgroundType: {
              type: 'string',
              default: 'color',
            },
            backgroundColor: {
              type: 'string',
              default: '#2e358f',
            },
            backgroundImage: {
              type: 'string',
              default: 'https://placeimg.com/1200/600/nature/grayscale',
            },
            backgroundImageUUID: {
              type: 'string',
              default: '',
            },
            backgroundImageData: {
              type: 'object',
              default: {},
            },
            overlayOpacity: {
              type: 'number',
              default: 80,
            },
            overlayColor: {
              type: 'string',
              default: '#2e358f',
            },
            padding: {
              type: 'string',
              default: '',
            },
            margin: {
              type: 'string',
              default: '',
            },
            contentWidth: {
              type: 'number',
            },
            uniqueID: {
              type: 'string',
              default: '',
            },
            link: {
              type: 'string',
              source: 'attribute',
              attribute: 'href',
              selector: 'a',
            },
            linkProperty: {
              type: 'string',
              default: 'learnmore',
            },
            target: {
              type: 'string',
              source: 'attribute',
              attribute: 'target',
              selector: 'a',
              default: '_self',
            },
            hAlign: {
              type: 'string',
              default: 'center',
            },
            containerBackground: {
              type: 'string',
              default: '#f2f2f2',
            },
            containerBackgroundOpacity: {
              type: 'number',
              default: 1,
            },
            containerHoverBackground: {
              type: 'string',
              default: '#f2f2f2',
            },
            containerHoverBackgroundOpacity: {
              type: 'number',
              default: 1,
            },
            containerBorder: {
              type: 'string',
              default: '#eeeeee',
            },
            containerBorderOpacity: {
              type: 'number',
              default: 1,
            },
            containerHoverBorder: {
              type: 'string',
              default: '#eeeeee',
            },
            containerHoverBorderOpacity: {
              type: 'number',
              default: 1,
            },
            containerBorderWidth: {
              type: 'array',
              default: [0, 0, 0, 0],
            },
            containerBorderRadius: {
              type: 'number',
              default: 0,
            },
            containerPadding: {
              type: 'array',
              default: [20, 20, 20, 20],
            },
            mediaType: {
              type: 'string',
              default: 'none',
            },
            mediaAlign: {
              type: 'string',
              default: 'top',
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
                flipSubtype: '',
              }],
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
                flipIcon: '',
              }],
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
                margin: [0, 15, 0, 15],
              }],
            },
            displayTitle: {
              type: 'bool',
              default: true,
            },
            title: {
              type: 'array',
              source: 'children',
              selector: '.info-box-title',
              default: __('Title'),
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
                marginControl: 'individual',
              }],
            },
            displayText: {
              type: 'bool',
              default: true,
            },
            contentText: {
              type: 'array',
              source: 'children',
              selector: '.info-box-text',
              default: __('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean diam dolor, accumsan sed rutrum vel, dapibus et leo.'),
            },
            textColor: {
              type: 'string',
              default: '#555555',
            },
            textHoverColor: {
              type: 'string',
              default: '',
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
                loadGoogle: true,
              }],
            },
            displayLearnMore: {
              type: 'bool',
              default: true,
            },
            learnMore: {
              type: 'array',
              source: 'children',
              selector: '.info-learnmore',
              default: __('Learn More'),
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
                hoverEffect: 'revealBorder',
              }],
            },
            mediaVAlign: {
              type: 'string',
              default: 'middle',
            },
            mediaAlignMobile: {
              type: 'string',
              default: 'top',
            },
            mediaAlignTablet: {
              type: 'string',
              default: 'top',
            },
          },
          // Render the block components.
          getEditWrapperProps({blockAlignment}) {
            if ('left' === blockAlignment || 'right' === blockAlignment || 'center' === blockAlignment) {
              return {'data-align': blockAlignment};
            }
          },

          edit: InclindInfobox,

          save: props => {
            const {
              attributes: {
                blockAlignment, backgroundType, backgroundColor, backgroundImage,
                backgroundImageData, backgroundImageUUID,
                overlayOpacity, overlayColor, margin, padding,
                contentWidth, uniqueID, link, linkProperty, target, hAlign, mediaType, mediaImage, mediaIcon, mediaAlign, displayTitle, title, titleFont,
                displayText, contentText, displayLearnMore, learnMore, mediaAlignMobile, mediaAlignTablet
              }
            } = props;

            const hasImageBg = backgroundType === 'image';

            // const containerStyle = {
            //   backgroundColor: !hasImageBg ? backgroundColor : '#2e358f',
            //   backgroundImage: hasImageBg && `url('${backgroundImage}')`,
            //   'background-size': hasImageBg && `cover`,
            //   color: hasImageBg && 'white',
            // };
            const overlayStyle = !hasImageBg ? {} : {
              display: 'block',
              backgroundColor: overlayColor || '#2e358f',
              opacity: parseInt(overlayOpacity, 10) / 100,
            };
            const wrapperStyle = {
              maxWidth: contentWidth && `${contentWidth}px`,
            };

            const classes = [
              // className,
              classnames(`align${(blockAlignment ? blockAlignment : 'none')}`),
              'infobox p-4 mb-4 bg-primary text-' + hAlign,
            ];

            const titleTagName = 'h' + titleFont[0].level;
            const image = (
                <div className="kadence-info-box-image-inner-intrisic-container"
                     style={{
                       maxWidth: mediaImage[0].maxWidth + 'px',
                     }}>
                  <div
                      className={`kadence-info-box-image-intrisic ${('svg+xml' === mediaImage[0].subtype ? ' kb-info-box-image-type-svg' : '')}`}
                      style={{
                        paddingBottom: isNaN(mediaImage[0].height) ? undefined : ((mediaImage[0].height / mediaImage[0].width) * 100) + '%',
                        height: isNaN(mediaImage[0].height) ? undefined : 0,
                        width: isNaN(mediaImage[0].width) || 'svg+xml' === mediaImage[0].subtype ? mediaImage[0].maxWidth + 'px' : mediaImage[0].width + 'px',
                        maxWidth: '100%',
                      }}>
                    <div className="kadence-info-box-image-inner-intrisic">
                      <img
                          src={mediaImage[0].url}
                          alt={mediaImage[0].alt}
                          width={(mediaImage[0].subtype && 'svg+xml' === mediaImage[0].subtype ? mediaImage[0].maxWidth : mediaImage[0].width)}
                          height={mediaImage[0].height}
                          className={`${(mediaImage[0].id ? `kt-info-box-image wp-image-${mediaImage[0].id}` : 'kt-info-box-image wp-image-offsite')} ${(mediaImage[0].subtype && 'svg+xml' === mediaImage[0].subtype ? ' kt-info-svg-image' : '')}`}
                      />
                    </div>
                  </div>
                </div>
            );
            const icon = (
                <div
                    className={`kadence-info-box-icon-container`}>
                  <div className={'kadence-info-box-icon-inner-container'}>
                    <GenIcon
                        className={`kt-info-svg-icon kt-info-svg-icon-${mediaIcon[0].icon}`}
                        name={mediaIcon[0].icon}
                        size={(!mediaIcon[0].size ? '14' : mediaIcon[0].size)}
                        icon={('fa' === mediaIcon[0].icon.substring(0, 2) ? FaIco[mediaIcon[0].icon] : Ico[mediaIcon[0].icon])}
                        htmltag="span"
                        strokeWidth={('fe' === mediaIcon[0].icon.substring(0, 2) ? mediaIcon[0].width : undefined)}
                        style={{
                          display: 'block',
                        }}/>
                  </div>
                </div>
            );
            const learnMoreOutput = (
                <RichText.Content
                    className="info-learnmore btn btn-secondary btn-sm"
                    tagName={'button'}
                    value={learnMore}
                    type={'button'}
                />
            );
            const learnMoreLinkOutput = (
                <a href={link} target={('_blank' === target ? target : undefined)}
                   rel={('_blank' === target ? 'noopener noreferrer' : undefined)}>
                  <RichText.Content
                      className="info-learnmore btn btn-secondary btn-sm"
                      tagName={'button'}
                      value={learnMore}
                      type={'button'}
                  /></a>
            );
            const textOutput = (
                <div className="info-content">
                  {displayTitle && (
                      <RichText.Content
                          className="info-box-title info-title text-white"
                          tagName={titleTagName}
                          value={title}
                      />
                  )}
                  {displayText && (
                      <RichText.Content
                          className="info-box-text info-text"
                          tagName={'p'}
                          value={contentText}
                      />
                  )}
                  {displayLearnMore && link !== undefined && linkProperty === 'learnmore' && (
                      learnMoreLinkOutput
                  )}
                  {displayLearnMore && (linkProperty !== 'learnmore' || link === undefined) && (
                      learnMoreOutput
                  )}
                </div>
            );

            classes.push('has-overlay');

            if (margin) {
              classes.push(`my-${margin}`);
            }
            if (padding) {
              classes.push(`py-${padding}`);
            }

            // Render the section on Front-end:
            return (
                <div id={`kt-info-box${uniqueID}`} className={classes.join(' ')}>
                  <div className="infobox-image">
                    <div className="overlay-wrapper">
                      <div className="overlay bg-primary"></div>
                      <img data-image-style="480x480"  data-entity-type="file" data-entity-uuid={`${backgroundImageUUID}`} src={`${backgroundImage}`} alt=""
                           className="image image--jumbotron image--overlay img-fluid js-image-exists"/>
                    </div>
                  </div>
                  <div className="g-section-wrapper" style={wrapperStyle}>
                    {linkProperty !== 'learnmore' && link !== undefined && (
                        <a className={``}
                           target={('_blank' === target ? target : undefined)}
                           rel={('_blank' === target ? 'noopener noreferrer' : undefined)}
                           href={link}>
                          <div
                              className="infobox-content text-white row align-items-center">
                            {'none' !== mediaType && (
                                <div
                                    className={`media-container py-4`}>
                                  <div
                                      className={`kt-blocks-info-box-media`}>
                                    {mediaImage[0].url && 'image' === mediaType && (
                                        image
                                    )}
                                    {'icon' === mediaType && (
                                        icon
                                    )}
                                  </div>
                                </div>
                            )}
                            {textOutput}
                          </div>
                        </a>
                    )}

                    {(linkProperty === 'learnmore' || link === undefined) && (
                        <div
                            className="infobox-content text-white row align-items-center">
                          {'none' !== mediaType && (
                              <div
                                  className={`media-container py-4`}>
                                <div
                                    className={`kt-blocks-info-box-media`}>
                                  {mediaImage[0].url && 'image' === mediaType && (
                                      image
                                  )}
                                  {'icon' === mediaType && (
                                      icon
                                  )}
                                </div>
                              </div>
                          )}
                          {textOutput}
                        </div>
                    )}
                  </div>
                </div>
            );
          },
        }
    );
  }
}
