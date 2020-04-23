// Import block dependencies and components
import IconGridContainer from "./components/icon-grid-container";
import classnames from "classnames";
import Icon from "../infobox/components/icon";
import Infobox from "../infobox/components/infobox";

// Internationalization
const __ = Drupal.t;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const { RichText, InnerBlocks, MediaUpload } = wp.blockEditor;

// Register components
const { IconButton } = wp.components;

const { dispatch, select } = wp.data;

class InclindIconGridContainer extends Component {
    render() {

        // Setup the attributes.
        const { attributes: {
            itemTitle,
            itemImage,
            itemImageData,
        },
        isSelected, className, setAttributes } = this.props;
        const ALLOWED_BLOCKS = [ 'inclind-blocks/inclind-icon-grid-item' ];

        const onSelectImage = (media, field) => {
            setAttributes({
                [field]: media.url,
                [`${field}Data`]: getMediaAttrs(media),
            });
        };

        function getMediaAttrs (media) {
            if(media && media.data) {
                return Object.keys(media.data).reduce((d, key) => {
                    d[`data-${key.toLowerCase().replace(/[^a-z0-9]/g, '-')}`] = media.data[key];
                    return d;
                }, {});
            }
            return {};
        }

        return [
            // Show the block markup in the editor.
            <IconGridContainer { ...this.props }>
                <RichText
                    tagName="h2"
                    placeholder={__("Item Title", 'inclind-blocks')}
                    keepPlaceholderOnFocus
                    value={ itemTitle }
                    className={classnames(
                        'item-title',
                        'emb-center'
                    )}
                    onChange={ ( value ) => this.props.setAttributes( { itemTitle: value } ) }
                />
                <MediaUpload
                    allowedTypes={ ['image'] }
                    onSelect={
                        media => onSelectImage(media, 'itemImage')
                    }
                    render={
                        ({ open }) => (
                            <IconButton
                                className="components-toolbar__control"
                                label={ __('Edit image') }
                                icon="edit" onClick={ open } />)
                    }
                />
                <img src={itemImage} {...itemImageData} />
                <InnerBlocks
                    allowedBlocks={ ALLOWED_BLOCKS }
                />
            </IconGridContainer>
        ];
    }
}

//  Start Drupal Specific.
const category = {
    slug: 'inclind-blocks',
    title: __('Custom Blocks'),
};
// Grab the current categories and merge in the new category if not present.
const currentCategories = select('core/blocks').getCategories().filter(item => item.slug !== category.slug);
dispatch('core/blocks').setCategories([ category, ...currentCategories ]);
// End Drupal Specific.

if (drupalSettings && drupalSettings.editor.formats.gutenberg.editorSettings !== undefined) {
  const blocks =  drupalSettings.editor.formats.gutenberg.editorSettings.allowedBlocks;
  if (blocks.hasOwnProperty(category.slug + '/inclind-icon-grid-container') && blocks[category.slug + '/inclind-icon-grid-container']) {
    // Register the block.
    registerBlockType( category.slug+'/inclind-icon-grid-container', {
      title: __( 'Icon Grid Container', 'inclind-icon-grid-container' ),
      description: __( 'Description', 'inclind-blocks' ),
      category: 'inclind-blocks',
      keywords: [
        __( 'icon', 'inclind-icon-grid-container' ),
        __( 'inclind', 'inclind-icon-grid-container' ),
        __( 'grid container', 'inclind-icon-grid-container' ),
      ],
      attributes: {
        itemTitle: {
          selector: '.item-title',
          type: 'string',
        },
        itemImage: {
          type: 'string'
        },
        itemImageData: {
          type: 'object',
          default: {},
        },
      },

      // Render the block components.
      edit: InclindIconGridContainer,

      // Save the attributes and markup.
      save: function( props ) {

        const {
          itemTitle,
          itemImage,
          itemImageData,
        } = props.attributes;

        // Save the block markup for the front end.
        return (
            <IconGridContainer { ...props }>
              <div className="container">
                <div className="row text-center">
                  {
                    itemTitle && (
                        <RichText.Content
                            tagName="h2"
                            className="item-title emb-center"
                            value={ itemTitle }
                        />
                    )
                  }
                  <InnerBlocks.Content/>
                </div>
                <div className="img img-bg">
                  <img src={ itemImage } className={"card-img-top"} { ...itemImageData } />
                </div>
              </div>
            </IconGridContainer>
        );
      },
    } );
  }
}
