// Import block dependencies and components
import Pane from "./components/pane";
import GenIcon from '../../genicon';
import IcoNames from '../../svgiconsnames';
import Ico from '../../svgicons';
import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
// import classnames from "classnames";

// Internationalization
const __ = Drupal.t;

// Extend component
const {Component, Fragment} = wp.element;

// Register block
const {registerBlockType} = wp.blocks;

// Register editor components
const {
  InnerBlocks,
  RichText,
} = wp.blockEditor;

// Register components
const {
  PanelBody,
} = wp.components;

const {dispatch, select} = wp.data;
/**
 * This allows for checking to see if the block needs to generate a new ID.
 */
const ktpaneUniqueIDs = [];
const ktpaneUniqueIDsCount = [];

class InclindPane extends Component {
  constructor() {
    super(...arguments);
  }

  componentDidMount() {
    if (!this.props.attributes.uniqueID) {
      this.props.setAttributes({
        uniqueID: '_' + this.props.clientId.substr(2, 9),
      });
      ktpaneUniqueIDs.push('_' + this.props.clientId.substr(2, 9));
    }
    else if (ktpaneUniqueIDs.includes(this.props.attributes.uniqueID)) {
      this.props.setAttributes({
        uniqueID: '_' + this.props.clientId.substr(2, 9),
      });
      ktpaneUniqueIDs.push('_' + this.props.clientId.substr(2, 9));
    }
    else {
      ktpaneUniqueIDs.push(this.props.attributes.uniqueID);
    }
    const rootID = wp.data.select('core/block-editor').getBlockRootClientId(this.props.clientId);
    if (!this.props.attributes.id) {
      const accordionBlock = wp.data.select('core/block-editor').getBlocksByClientId(rootID);
      const newPaneCount = accordionBlock[0].attributes.paneCount + 1;
      this.props.setAttributes({
        id: newPaneCount,
      });
      if (undefined === ktpaneUniqueIDsCount[rootID]) {
        ktpaneUniqueIDsCount.push(rootID);
        ktpaneUniqueIDsCount[rootID].push(newPaneCount);
      }
      else if (undefined !== ktpaneUniqueIDsCount[rootID]) {
        ktpaneUniqueIDsCount[rootID].push(newPaneCount);
      }
      wp.data.dispatch('core/block-editor').updateBlockAttributes(rootID, {
        paneCount: newPaneCount,
      });
    }
    else if (undefined === ktpaneUniqueIDsCount[rootID]) {
      ktpaneUniqueIDsCount[rootID] = [this.props.attributes.id];
    }
    else if (undefined !== ktpaneUniqueIDsCount[rootID]) {
      if (ktpaneUniqueIDsCount[rootID].includes(this.props.attributes.id)) {
        const accordionBlock = wp.data.select('core/block-editor').getBlocksByClientId(rootID);
        const newPaneCount = accordionBlock[0].attributes.paneCount + 1;
        this.props.setAttributes({
          id: newPaneCount,
        });
        wp.data.dispatch('core/block-editor').updateBlockAttributes(rootID, {
          paneCount: newPaneCount,
        });
        ktpaneUniqueIDsCount[rootID].push(newPaneCount);
      }
      else {
        ktpaneUniqueIDsCount[rootID].push(this.props.attributes.id);
      }
    }
  }

  // Render element while editing in Gutenberg:
  render() {

    const {
      attributes: {
        id, uniqueID, parentID, startCollapsed, title, icon, iconSide, hideLabel, titleTag
      }, setAttributes
    } = this.props;

    const renderSVG = svg => (
        <GenIcon name={svg}
                 icon={('fa' === svg.substring(0, 2) ? FaIco[svg] : Ico[svg])}/>
    );
    const HtmlTagOut = (!titleTag ? 'div' : titleTag);

    return (
        <div
            className={`kt-accordion-pane kt-accordion-pane-${id} kt-pane${uniqueID}`}>
          {/*
          <InspectorControls>
            <PanelBody
                title={__('Title Icon Settings')}
                initialOpen={false}
            >
              <FontIconPicker
                  icons={IcoNames}
                  value={icon}
                  onChange={value => setAttributes({icon: value})}
                  appendTo="body"
                  renderFunc={renderSVG}
                  theme="default"
                  isMulti={false}
              />
              <SelectControl
                  label={__('Icon Side')}
                  value={iconSide}
                  options={[
                    {value: 'right', label: __('Right')},
                    {value: 'left', label: __('Left')},
                  ]}
                  onChange={value => setAttributes({iconSide: value})}
              />
              <ToggleControl
                  label={__('Show only Icon')}
                  checked={hideLabel}
                  onChange={value => setAttributes({hideLabel: value})}
              />
            </PanelBody>
          </InspectorControls>
*/}
          <HtmlTagOut className={'kt-accordion-header-wrap'}>
            <div
                className={`kt-blocks-accordion-header kt-acccordion-button-label-${(hideLabel ? 'hide' : 'show')}`}>
              <div className="kt-blocks-accordion-title-wrap">
                {icon && 'left' === iconSide && (
                    <GenIcon
                        className={`kt-btn-svg-icon kt-btn-svg-icon-${icon} kt-btn-side-${iconSide}`}
                        name={icon}
                        icon={('fa' === icon.substring(0, 2) ? FaIco[icon] : Ico[icon])}/>
                )}
                <RichText
                    className="kt-blocks-accordion-title"
                    tagName={'div'}
                    placeholder={__('Add Title')}
                    onChange={value => setAttributes({title: value})}
                    value={title}
                    keepPlaceholderOnFocus
                />
                {icon && 'right' === iconSide && (
                    <GenIcon
                        className={`kt-btn-svg-icon kt-btn-svg-icon-${icon} kt-btn-side-${iconSide}`}
                        name={icon}
                        icon={('fa' === icon.substring(0, 2) ? FaIco[icon] : Ico[icon])}/>
                )}
              </div>
              <div className="kt-blocks-accordion-icon-trigger"></div>
            </div>
          </HtmlTagOut>
          <div className={'kt-accordion-panel'}>
            <div className={'kt-accordion-panel-inner'}>
              <InnerBlocks templateLock={false}/>
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
  if (blocks.hasOwnProperty(category.slug + '/accordion-bootstrap') && blocks[category.slug + '/accordion-bootstrap']) {
    // Register the block.
    registerBlockType(category.slug + '/inclind-pane', {
          title: __('Pane', 'inclind-pane'),
          description: __('Accordion pane.', 'inclind-pane'),
          parent: [category.slug + '/accordion-bootstrap'],
          category: 'inclind-blocks',

          attributes: {
            id: {
              type: 'number',
              default: 1,
            },
            title: {
              type: 'array',
              source: 'children',
              selector: '.kt-blocks-accordion-title',
              default: '',
            },
            titleTag: {
              type: 'string',
              default: 'h5',
            },
            hideLabel: {
              type: 'bool',
              default: false,
            },
            startCollapsed: {
              type: 'bool',
              default: false,
            },
            icon: {
              type: 'string',
              default: '',
            },
            iconSide: {
              type: 'string',
              default: 'right',
            },
            uniqueID: {
              type: 'string',
              default: '',
            },
            parentID: {
              type: 'string',
              default: '',
            },
          },
          supports: {
            inserter: false,
            reusable: false,
            html: false,
            anchor: true,
          },
          getEditWrapperProps(attributes) {
            return {'data-pane': attributes.id};
          },

          edit: InclindPane,

          save: props => {
            const {
              attributes: {
                id, uniqueID, parentID, startCollapsed, title, icon, iconSide, hideLabel, titleTag
              }
            } = props;

            const HtmlTagOut = (!titleTag ? 'h5' : titleTag);

            // Render the section on Front-end:
            return (
                <div className={`card mb-0 pane-${id} pane${uniqueID}`}>
                  <div className="card-header p-0" id={`acc-header${uniqueID}`}>
                    <HtmlTagOut className={`mb-0 ${(icon ? 'has-icon' : '')}`}>
                      {icon && 'left' === iconSide && (
                          <GenIcon
                              className={`btn-svg-icon btn-svg-icon-${icon} btn-side-${iconSide}`}
                              name={icon}
                              icon={Ico[icon]}/>
                      )}
                      <button className="p-4 pr-6 col-12 btn btn-link text-left"
                              type="button"
                              data-toggle="collapse"
                              data-target={`#acc-body${uniqueID}`}
                              aria-expanded="false"
                          // aria-expanded={`${((!startCollapsed && id == 1) ? 'true' : 'false')}`}
                              aria-controls={`acc-body${uniqueID}`}>
                        <RichText.Content
                            className={'kt-blocks-accordion-title acc-title-inner'}
                            tagName={'span'}
                            value={title}
                        />
                      </button>
                      {icon && 'right' === iconSide && (
                          <GenIcon
                              className={`btn-svg-icon btn-svg-icon-${icon} btn-side-${iconSide}`}
                              name={icon}
                              icon={Ico[icon]}/>
                      )}
                    </HtmlTagOut>
                  </div>

                  <div id={`acc-body${uniqueID}`}
                      // className={`collapse ${((!startCollapsed && id == 1) ? 'show' : '')}`}
                       className="collapse"
                       aria-labelledby={`acc-header${uniqueID}`}
                       data-parent={`#${parentID}`}>
                    <div className="card-body">
                      <InnerBlocks.Content/>
                    </div>
                  </div>
                </div>
            );
          },
        }
    );
  }
}
