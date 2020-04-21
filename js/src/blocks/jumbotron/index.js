// Import block dependencies and components
import Jumbotron from "./components/jumbotron";

import icons from '../../icons';
import map from 'lodash/map';
import hexToRGBA from '../../hex-to-rgba';
import GenIcon from '../../genicon';
import Ico from '../../svgicons';
import IcoNames from '../../svgiconsnames';
import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
import classnames from "classnames";

// Internationalization
const __ = Drupal.t;

// Extend component
const {Component, Fragment} = wp.element;

// Register block
const {registerBlockType} = wp.blocks;

// Register editor components
const {
  BlockAlignmentToolbar,
  InspectorControls,
  BlockControls,
  AlignmentToolbar,
  MediaUpload,
  URLInput,
  RichText,
} = wp.blockEditor;

// Register components
const {
  IconButton,
  PanelBody,
  ToggleControl,
  SelectControl,
  BaseControl,
} = wp.components;

const {dispatch, select} = wp.data;

/**
 * This allows for checking to see if the block needs to generate a new ID.
 */
const ktjumbotronUniqueIDs = [];

class InclindJumbotron extends Component {
  constructor() {
    super(...arguments);
    this.showSettings = this.showSettings.bind(this);
    this.state = {
      settings: {},
    };
  }

  componentDidMount() {
    if (!this.props.attributes.uniqueID) {
      this.props.setAttributes({
        uniqueID: '_' + this.props.clientId.substr(2, 9),
      });
      ktjumbotronUniqueIDs.push('_' + this.props.clientId.substr(2, 9));
    }
    else if (ktjumbotronUniqueIDs.includes(this.props.attributes.uniqueID)) {
      this.props.setAttributes({
        uniqueID: '_' + this.props.clientId.substr(2, 9),
      });
      ktjumbotronUniqueIDs.push('_' + this.props.clientId.substr(2, 9));
    }
    else {
      ktjumbotronUniqueIDs.push(this.props.attributes.uniqueID);
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
        blockAlignment, backgroundColor, backgroundImage, backgroundImageUUID, uniqueID,
        link, target, hAlign, displayTitle, displayScriptTitle, title,
        titleScript, displayText, contentText, displayLearnMore, learnMore
      }, className, setAttributes, isSelected
    } = this.props;

    const startlayoutOptions = [
      {key: 'skip', name: __('Skip'), icon: __('Skip')},
      {key: 'simple', name: __('Simple'), icon: icons.infoSimple},
      {key: 'left', name: __('Align Left'), icon: icons.infoLeft},
      {key: 'bold', name: __('Bold Background'), icon: icons.infoBackground},
      {key: 'image', name: __('Circle Image'), icon: icons.infoImage},
    ];

    const hasImageBg = true;

    const align_class = ['jtr-content', 'col-xs-12'];

    if (hAlign == 'right') {
      align_class.push('float-right', 'col-lg-7', 'text-right');
    }
    else if (hAlign == 'center') {
      align_class.push('col-lg-8', 'offset-lg-2', 'text-center');
    }
    else {
      align_class.push('col-lg-7');
    }

    const classes = [
      className,
      classnames(`align${(blockAlignment ? blockAlignment : 'none')}`),
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

    const isSelectedClass = (isSelected ? 'is-selected' : 'not-selected');

    return (
        <div id={`kt-jtr-box${uniqueID}`} className={classes.join(' ')}>
          <BlockControls key="controls">
            <BlockAlignmentToolbar
                value={blockAlignment}
                controls={['wide', 'full']}
                onChange={value => setAttributes({blockAlignment: value})}
            />
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
                </PanelBody>
                {this.showSettings('containerSettings') && (
                    <PanelBody
                        title={__('Container Settings')}
                        initialOpen={false}
                    >

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
                      </BaseControl>

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
                      <ToggleControl
                          label={__('Show Script Header (cursive)')}
                          checked={displayScriptTitle}
                          onChange={(value) => setAttributes({displayScriptTitle: value})}
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
                    </PanelBody>
                )}
              </InspectorControls>
          )}

          <div
              className={`jumbotron jumbotron-fluid ${isSelectedClass}`}
              style={{
                backgroundColor: !hasImageBg ? backgroundColor : '#2e358f',
                backgroundImage: hasImageBg && `url('${backgroundImage}')`,
                'background-size': hasImageBg && `cover`,
                color: hasImageBg && 'white'
              }}>
            <div className="container jumbotron-text-container">

              <div
                  className={'kt-jumbotron-textcontent jtr-content col-xs-12  col-lg-7'}>
                {displayScriptTitle && (
                    <RichText
                        className="jtr-script script h1 text-primary"
                        tagName={'span'}
                        placeholder={__('Title Script')}
                        onChange={(value) => setAttributes({titleScript: value})}
                        value={titleScript}
                        style={{
                          fontWeight: '400',
                          color: 'rgb(46, 53, 143)',
                          fontSize: '42px',
                          lineHeight: '1',
                          fontFamily: 'Outbound, cursive',
                        }}
                        keepPlaceholderOnFocus
                    />
                )}
                <br/>
                {displayTitle && (
                    <RichText
                        className="jtr-title lead h2 caps text-primary"
                        tagName={'span'}
                        placeholder={__('Title')}
                        onChange={(val) => setAttributes({title: val})}
                        value={title}
                        style={{
                          fontWeight: '800',
                          textTransform: 'uppercase',
                          color: 'rgb(46, 53, 143)',
                          fontSize: '50px',
                          lineHeight: '1.2',
                          fontFamily: 'Montserrat, sans-serif',
                        }}
                        keepPlaceholderOnFocus
                    />
                )}
                {displayText && (
                    <RichText
                        className="jtr-text jumbotron-text text-black"
                        tagName={'p'}
                        placeholder={__('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean diam dolor, accumsan sed rutrum vel, dapibus et leo.')}
                        onChange={(value) => setAttributes({contentText: value})}
                        value={contentText}
                        style={{
                          fontWeight: '600',
                          color: 'black',
                          fontSize: '22px',
                          lineHeight: '28px',
                          fontFamily: 'Montserrat, sans',
                        }}
                        keepPlaceholderOnFocus
                    />
                )}

                {displayLearnMore && link !== undefined && (
                    <p class="lead mt-5 d-none d-sm-block">
                      <button className="btn btn-arrow btn-lg btn-secondary">
                        <RichText
                            className="jtr-learnmore"
                            tagName={'span'}
                            placeholder={__('Link this button in settings..')}
                            onChange={value => setAttributes({learnMore: value})}
                            value={learnMore}
                            keepPlaceholderOnFocus
                        />
                        <div
                            className="color-fill--secondary svg svg--icon js-svg-exists">
                          <svg>
                            <use
                                xlink:href="/themes/custom/particle/dist/app-drupal/assets/spritemap.svg#sprite-chevron-right"></use>
                          </svg>
                        </div>
                      </button>
                    </p>
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
  if (blocks.hasOwnProperty(category.slug + '/inclind-jumbotron') && blocks[category.slug + '/inclind-jumbotron']) {
    // Register the block.
    registerBlockType(category.slug + '/inclind-jumbotron', {
          title: __('Hero (Jumbotron)', 'inclind-jumbotron'),
          description: __('Add jumbotron with background image/overlay.', 'inclind-jumbotron'),
          category: 'inclind-blocks',
          keywords: [
            __('Hero', 'inclind-jumbotron'),
            __('Info', 'inclind-jumbotron'),
            __('inclind', 'inclind-jumbotron'),
            __('custom', 'inclind-jumbotron'),
          ],

          attributes: {
            blockAlignment: {
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
            backgroundImageUUID: {
              type: 'string',
              default: '',
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
            target: {
              type: 'string',
              source: 'attribute',
              attribute: 'target',
              selector: 'a',
              default: '_self',
            },
            hAlign: {
              type: 'string',
              default: 'left',
            },
            displayTitle: {
              type: 'bool',
              default: true,
            },
            displayScriptTitle: {
              type: 'bool',
              default: true,
            },
            titleScript: {
              type: 'array',
              source: 'children',
              selector: 'span.jtr-script',
              default: __('Title Script will be in cursive font.'),
            },
            title: {
              type: 'array',
              source: 'children',
              selector: 'span.jtr-title',
              default: __('Title'),
            },
            displayText: {
              type: 'bool',
              default: true,
            },
            contentText: {
              type: 'array',
              source: 'children',
              selector: 'p.jtr-text',
              default: __('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean diam dolor, accumsan sed rutrum vel, dapibus et leo.'),
            },
            displayLearnMore: {
              type: 'bool',
              default: true,
            },
            learnMore: {
              type: 'array',
              source: 'children',
              selector: '.jtr-learnmore',
              default: __('Link this button in settings..'),
            },
          },
          // Render the block components.
          getEditWrapperProps({blockAlignment}) {
            if ('left' === blockAlignment || 'right' === blockAlignment || 'center' === blockAlignment) {
              return {'data-align': blockAlignment};
            }
          },

          edit: InclindJumbotron,

          save: props => {
            const {
              attributes: {
                blockAlignment, backgroundImage, backgroundImageUUID, uniqueID, link, target, hAlign,
                displayTitle, displayScriptTitle, title, titleScript,
                displayText, contentText, displayLearnMore, learnMore,
              }
            } = props;

            const align_class = ['jtr-content', 'col-xs-12'];

            if (hAlign == 'right') {
              align_class.push('float-right', 'col-lg-7', 'text-right');
            }
            else if (hAlign == 'center') {
              align_class.push('col-lg-8', 'offset-lg-2', 'text-center');
            }
            else {
              align_class.push('col-lg-7');
            }

            const classes = [
              // className,
              classnames(`align${(blockAlignment ? blockAlignment : 'none')}`),
              'jumbotron jumbotron-fluid',
            ];

            // const learnMoreOutput = (
            //     <RichText.Content
            //         className="jtr-learnmore btn btn-secondary btn-sm"
            //         tagName={'button'}
            //         value={learnMore}
            //         type={'button'}
            //     />
            // );

            const learnMoreLinkOutput = (
                <p className="lead mt-5 d-none d-sm-block">
                  <a href={link} target={('_blank' === target ? target : undefined)}
                     rel={('_blank' === target ? 'noopener noreferrer' : undefined)}>
                    <button className="btn btn-arrow btn-lg btn-secondary">
                      <RichText.Content
                          className="jtr-learnmore"
                          tagName={'span'}
                          placeholder={__('Link this button in settings..')}
                          value={learnMore}/>
                      <div
                          className="color-fill--secondary svg svg--icon js-svg-exists">
                        <svg>
                          <use
                              xlink:href="/themes/custom/particle/dist/app-drupal/assets/spritemap.svg#sprite-chevron-right"></use>
                        </svg>
                      </div>
                    </button>
                  </a>
                </p>
            );

            const textOutput = (
                <div className={align_class.join(' ')}>
                  {displayScriptTitle && (
                      <RichText.Content
                          className="jtr-script script h1 text-primary"
                          tagName={'span'}
                          value={titleScript}
                      />
                  )}
                  <br/>
                  {displayTitle && (
                      <RichText.Content className="jtr-title lead h2 caps text-primary"
                                        tagName={'span'} value={title}/>
                  )}
                  {displayText && (
                      <RichText.Content
                          className="jtr-text jumbotron-text text-black"
                          tagName={'p'}
                          value={contentText}
                      />
                  )}
                  {displayLearnMore && link !== undefined && (
                      learnMoreLinkOutput
                  )}
                </div>
            );

            // Render the Jumbotron on Front-end:
            return (
                <div id={`kt-jtr-box${uniqueID}`} className={classes.join(' ')}>
                  <div className="jumbotron-image">
                    <div className="overlay-wrapper">
                      <div className="overlay gradient"></div>
                      <img data-image-style="1200x400"  data-entity-type="file" data-entity-uuid={`${backgroundImageUUID}`} src={`${backgroundImage}`} alt=""
                           className="image image--jumbotron image--overlay img-fluid js-image-exists"/>
                    </div>
                  </div>
                  <div className="container jumbotron-text-container">
                    {textOutput}
                  </div>
                </div>
            );
          },
        }
    );
  }
}

