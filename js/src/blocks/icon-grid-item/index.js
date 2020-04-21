// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import IconGridItem from './components/icon-grid-item';
import Icon from './components/icon';
import IconGridContainer
  from "../icon-grid-container/components/icon-grid-container";

// Internationalization
const __ = Drupal.t;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const { RichText, BlockControls } = wp.editor;

// Register components
const {} = wp.components;

const { dispatch, select } = wp.data;

class InclindIconGridItem extends Component {
    render() {

        // Setup the attributes.
        const {
            attributes: {
                itemContent,
                itemIcon,
            }, isSelected, className, setAttributes } = this.props;

        return [
            // Show the alignment toolbar on focus.
            <BlockControls key="controls">

            </BlockControls>,
            // Show the block controls on focus.
            <Inspector
                { ...this.props }
            />,
            // Show the block markup in the editor.
            <IconGridItem { ...this.props }>
                <RichText
                    tagName="p"
                    placeholder={__("Item Content...", 'inclind-blocks')}
                    keepPlaceholderOnFocus
                    value={ itemContent }
                    className={classnames(
                        'icon-grid-item-content'
                    )}
                    onChange={ ( value ) => this.props.setAttributes( { itemContent: value } ) }
                />
            </IconGridItem>,
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
    registerBlockType( category.slug+'/inclind-icon-grid-item', {
      title: __( 'Icon Grid Item', 'inclind-icon-grid-item' ),
      description: __( 'Description', 'inclind-blocks' ),
      category: 'inclind-blocks',
      keywords: [
        __( 'icon', 'inclind-icon-grid-item' ),
        __( 'grid', 'inclind-icon-grid-item' ),
        __( 'inclind', 'inclind-icon-grid-item' ),
      ],
      attributes: {
        itemIcon: {
          type: 'string',
          default: '',
        },
        itemContent: {
          selector: '.icon-grid-item-content',
          type: 'array',
          source: 'children',
        },
      },

      // Render the block components.
      edit: InclindIconGridItem,

      // Save the attributes and markup.
      save: function( props ) {
        const {
          itemContent,
          itemIcon,
        } = props.attributes;
        const icon = ((itemIcon !== undefined && itemIcon !== '') && Icon[itemIcon] !== undefined) ? Icon[itemIcon] : '';

        // Save the block markup for the front end.
        return (
            <IconGridItem { ...props }>
              {
                icon && (
                    <span className={classnames(
                        'svgicon-default',
                        itemIcon
                    )}>
                            { icon }
                        </span>
                )
              }
              {
                itemContent && (
                    <RichText.Content
                        tagName="p"
                        className="icon-grid-item-content"
                        value={itemContent}
                    />
                )
              }
            </IconGridItem>
        );
      },
    } );
  }
}
