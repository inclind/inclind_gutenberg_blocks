// Import block dependencies and components
import Tab from "./components/tab";
// import attributes from "../tabs/attributes";
// import edit from "../tabs/edit";
// import save from "../tabs/save";

// Internationalization
const __ = Drupal.t;

// Extend component
const {Component, Fragment} = wp.element;

// Register block
const {registerBlockType} = wp.blocks;

// Register editor components
const {
  InnerBlocks,
} = wp.blockEditor;

// Register components
// const {
//   Fragment,
//   Component,
// } = wp.components;

const {dispatch, select} = wp.data;

/**
 * This allows for checking to see if the block needs to generate a new ID.
 */
const kttabUniqueIDs = [];

class InclindTab extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      settings: {},
    };
  }

  componentDidMount() {
    if (!this.props.attributes.uniqueID) {
      this.props.setAttributes({
        uniqueID: '_' + this.props.clientId.substr(2, 9),
      });
      kttabUniqueIDs.push('_' + this.props.clientId.substr(2, 9));
    }
    else if (kttabUniqueIDs.includes(this.props.attributes.uniqueID)) {
      this.props.setAttributes({
        uniqueID: '_' + this.props.clientId.substr(2, 9),
      });
      kttabUniqueIDs.push('_' + this.props.clientId.substr(2, 9));
    }
    else {
      kttabUniqueIDs.push(this.props.attributes.uniqueID);
    }
  }

  // Render element while editing in Gutenberg:
  render() {
    const {attributes: {id, uniqueID, parentID}} = this.props;

    return (
        <Fragment>
          <div
              className={`kt-tab-inner-content kt-inner-tab-${id} kt-inner-tab${uniqueID}`}>
            <InnerBlocks templateLock={false}/>
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
  if (blocks.hasOwnProperty(category.slug + '/inclind-tabs') && blocks[category.slug + '/inclind-tabs']) {
    // Register the block.
    registerBlockType(category.slug + '/inclind-tab', {
          title: __('Tab (Bootstrap)', 'inclind-tab'),
          description: __('Single Tab element for Tabs creation.', 'inclind-tab'),
          category: 'inclind-blocks',
          parent: [category.slug + '/inclind-tabs'],
          keywords: [
            __('Tab', 'inclind-tab'),
            __('inclind', 'inclind-tab'),
            __('custom', 'inclind-tab'),
          ],

          attributes: {
            id: {
              type: 'number',
              default: 1,
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
          },
          // Render the block components.
          getEditWrapperProps(attributes) {
            return {'data-tab': attributes.id};
          },

          edit: InclindTab,

          save({attributes}) {
            const {id, uniqueID, parentID} = attributes;
            const backupAnchor = `${ parentID }-tab-${ ( id ) }`;
            const ref = `${ parentID }-tabcontent-${ ( id ) }`;
            const sel_tab = `${(id == 1 ? 'true' : 'false')}`;
            const sel_tab_class = `${(id == 1 ? 'show active' : '')}`;

            // Render the Tab on Front-end:
            return (
                <div className={`tab-pane fade ${sel_tab_class}`} id={`${ref}`} role="tabpanel"
                     aria-labelledby={`${backupAnchor}`}>
                  <InnerBlocks.Content/>
                </div>

                // <div
                //     className={`kt-tab-inner-content kt-inner-tab-${id} kt-inner-tab${uniqueID}`}>
                //   <div className={'kt-tab-inner-content-inner'}>
                //     <InnerBlocks.Content/>
                //   </div>
                // </div>
            );
          },
        }
    );
  }
}
