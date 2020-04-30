// Import block dependencies and components
import SectionWrap from "./components/section-wrap";
import classnames from "classnames";
// import GenIcon from "../../genicon";
// import Ico from "../../svgicons";

// Internationalization
const __ = Drupal.t;

// Extend component
const {Component, Fragment} = wp.element;

// Register block
const {registerBlockType} = wp.blocks;

// Register editor components
const {
  BlockAlignmentToolbar,
  InnerBlocks,
  InspectorControls,
  BlockControls,
  AlignmentToolbar,
  MediaUpload
} = wp.blockEditor;

// Register components
const {
  IconButton,
  PanelBody,
  SelectControl,
  BaseControl,
} = wp.components;

const {dispatch, select} = wp.data;

class InclindSectionWrap extends Component {
  constructor() {
    super(...arguments);
  }

  // Render element while editing in Gutenberg:
  render() {

    const {
      attributes: {
        backgroundType, backgroundColor, backgroundImage, backgroundImageData, overlayOpacity, overlayColor, align, margin, padding, contentWidth,

        uniqueID, hAlign
      }, className, setAttributes, isSelected
    } = this.props;

    const hasImageBg = backgroundType === 'image';

    const containerStyle = {
      backgroundColor: (!hasImageBg && backgroundType !== 'none') ? backgroundColor : '',
      'box-shadow': '1px 1px 14px -7px grey',
      backgroundImage: hasImageBg && `url('${backgroundImage}')`,
      'background-size': hasImageBg && 'cover',
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
      className,
      `text-${hAlign}`,
      `py-4`,
      classnames(`align${(align ? align : 'none')}`),
    ];

    if (backgroundType === 'gradient') {
      classes.push('gradient-bg');
      classes.push('has-overlay');
    }
    else if (backgroundType === 'gray') {
      classes.push('bg-lighter-gray');
    }
    else if (backgroundType !== 'none') {
      classes.push('has-overlay');
      classes.push('text-white');
    }

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
    const buttonCls = {[align]: 'is-active'};

    const onSelectImage = (media, field) => {
      const dataAttrs = {};

      if (media.data) {
        dataAttrs[`${field}Data`] = Object.keys(media.data)
            .reduce((result, key) => {
              result[`data-${key.replace('_', '-')}`] = media.data[key];
              return result;
            }, {});
      }

      setAttributes({
        [field]: media.url,
        ...dataAttrs,
      });
    };

    return (
        <Fragment>
          <BlockControls>
            <AlignmentToolbar
                value={hAlign}
                onChange={(value) => setAttributes({hAlign: value})}
            />
            <BlockAlignmentToolbar
                value={align}
                controls={['center', 'wide', 'full', 'left', 'right']}
                onChange={value => setAttributes({align: value})}
            />
          </BlockControls>
          {(
              <Fragment>
                <InspectorControls>
                  <PanelBody title={__('Block Settings')}>

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

                    {/* Background control */}
                    <SelectControl
                        label={__('Background Type')}
                        value={backgroundType}
                        options={[
                          {label: __('Transparent'), value: 'none'},
                          {label: __('Gray Gradient'), value: 'gradient'},
                          {label: __('Blue'), value: 'color'},
                          {label: __('Gray'), value: 'gray'},
                          {label: __('Image w/Overlay'), value: 'image'},
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

                    {/*{hasImageBg &&*/}
                    {/*<RangeControl*/}
                    {/*label={__('Overlay Opacity')} value={overlayOpacity}*/}
                    {/*onChange={value => setAttributes({overlayOpacity: value})}*/}
                    {/*min={0} max={100} step={5}*/}
                    {/*/>}*/}
                  </PanelBody>

                </InspectorControls>
              </Fragment>
          )}
          <div
              className="kt-section-selecter">{__('Section Wrap placeholder', 'inclind-blocks')}</div>
          <div id={`kt-btns_${uniqueID}`} className={classes.join(' ')}
               style={containerStyle} {...backgroundImageData}>
            <div className="g-section-overlay" style={overlayStyle}></div>
            <div
                className={`g-section-wrapper ${(align == 'full' ? ' container' : ' container-fluid')}`}
                style={wrapperStyle}>
              <InnerBlocks template={[]} templateLock={false}/>
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
  if (blocks.hasOwnProperty(category.slug + '/inclind-section-wrap') && blocks[category.slug + '/inclind-section-wrap']) {
    // Register the block.
    registerBlockType(category.slug + '/inclind-section-wrap', {
          title: __('Section Wrapper', 'inclind-section-wrap'),
          description: __('Wrap the content into a container and select full width display or contained to a grid. Adds ability to turn on/off gradient on the wrapper.', 'inclind-section-wrap'),
          category: 'inclind-blocks',
          keywords: [
            __('Section', 'inclind-section-wrap'),
            __('Wrapper', 'inclind-section-wrap'),
            __('inclind', 'inclind-section-wrap'),
            __('custom', 'inclind-section-wrap'),
          ],

          attributes: {
            backgroundType: {
              type: 'string',
              default: 'none',
            },
            backgroundColor: {
              type: 'string',
              default: '#2e358f',
            },
            backgroundImage: {
              type: 'string',
              default: 'https://placeimg.com/1200/600/nature/grayscale',
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
            align: {
              type: 'string',
              default: 'none',
            },
            contentWidth: {
              type: 'number',
            },
            uniqueID: {
              type: 'string',
              default: '',
            },
            hAlign: {
              type: 'string',
              default: 'left',
            },
          },
          // Render the block components.
          getEditWrapperProps({blockAlignment}) {
            if ('left' === blockAlignment || 'right' === blockAlignment || 'center' === blockAlignment) {
              return {'data-align': blockAlignment};
            }
          },
          edit: InclindSectionWrap,
          save: props => {
            const {
              attributes: {
                backgroundType, backgroundColor, backgroundImage, backgroundImageData,
                overlayOpacity, overlayColor, align, margin, padding,
                contentWidth, uniqueID, hAlign
              }
            } = props;
            const hasImageBg = backgroundType === 'image';
            const containerStyle = {
              backgroundColor: (!hasImageBg && backgroundType !== 'none') ? backgroundColor : '',
              backgroundImage: hasImageBg && `url('${backgroundImage}')`,
              'background-size': 'cover',
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
              `text-${hAlign}`,
              `py-4`,
              classnames(`align${(align ? align : 'none')}`),
              // className,
            ];

            if (backgroundType === 'gradient') {
              classes.push('gradient-bg');
              classes.push('has-overlay');
            }
            else if (backgroundType === 'gray') {
              classes.push('bg-lighter-gray');
            }
            else if (backgroundType !== 'none') {
              classes.push('has-overlay');
              classes.push('text-white');
            }

            if (margin) {
              classes.push(`my-${margin}`);
            }
            if (padding) {
              classes.push(`py-${padding}`);
            }

            // Render the section on Front-end:
            return (
                <div className={classes.join(' ')}
                     style={containerStyle} {...backgroundImageData}>
                  <div className="g-section-overlay"
                       style={((backgroundType !== 'gradient' && backgroundType !== 'none') ? overlayStyle : {} )}></div>
                  <div
                      className={`g-section-wrapper ${(align == 'full' ? ' container' : ' container-fluid')}`}
                      style={wrapperStyle}>
                    <InnerBlocks.Content/>
                  </div>
                </div>
            );
          },
        }
    );
  }
}
