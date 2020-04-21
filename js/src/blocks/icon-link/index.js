// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import IconLink from './components/icon-link';
import Icon from './components/icon';
import Infobox from "../infobox/components/infobox";

// Internationalization
const __ = Drupal.t;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const { RichText, BlockControls, URLInput } = wp.editor;

// Register components
const {} = wp.components;

const { dispatch, select } = wp.data;

class InclindIconLink extends Component {
    render() {

        // Setup the attributes.
        const {
            attributes: {
                itemContent,
                itemIcon,
                itemLink,
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
            <IconLink { ...this.props }>
                <RichText
                    tagName="p"
                    placeholder={__("Link Text...", 'inclind-blocks')}
                    keepPlaceholderOnFocus
                    value={ itemContent }
                    className={classnames(
                        'icon-link'
                    )}
                    onChange={ ( value ) => this.props.setAttributes( { itemContent: value } ) }
                />
            </IconLink>,
            <form
                key="form-link"
                onSubmit={ event => event.preventDefault() }>
                <URLInput
                    value={ itemLink }
                    onChange={ ( value ) => setAttributes( { itemLink: value } ) }
                />
            </form>
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
  if (blocks.hasOwnProperty(category.slug + '/inclind-icon-link') && blocks[category.slug + '/inclind-icon-link']) {
    // Register the block.
    registerBlockType( category.slug+'/inclind-icon-link', {
      title: __( 'Icon Link', 'inclind-icon-link' ),
      description: __( 'Description', 'inclind-blocks' ),
      category: 'inclind-blocks',
      keywords: [
        __( 'icon', 'inclind-icon-link' ),
        __( 'link', 'inclind-icon-link' ),
        __( 'inclind', 'inclind-icon-link' ),
      ],
      attributes: {
        itemIcon: {
          type: 'string',
          default: '',
        },
        itemContent: {
          type: 'string',
          default: '',
        },
        itemLink: {
          type: 'string',
          source: 'attribute',
          selector: '.icon-link',
          attribute: 'href',
        },
      },

      // Render the block components.
      edit: InclindIconLink,

      // Save the attributes and markup.
      save: function( props ) {
        const {
          itemContent,
          itemIcon,
          itemLink,
        } = props.attributes;
        const icon = ((itemIcon !== undefined && itemIcon !== '') && Icon[itemIcon] !== undefined) ? Icon[itemIcon] : '';

        // Save the block markup for the front end.
        return (
            <IconLink { ...props }>
              {
                icon && (
                    <span className={classnames(
                        'svgicon-default',
                        'align-middle',
                        itemIcon
                    )}>
                            { icon }
                        </span>
                )
              }
              {
                itemContent && itemLink && (
                    <RichText.Content
                        tagName="a"
                        href={itemLink}
                        className="icon-link"
                        value={itemContent}
                    />
                )
              }
            </IconLink>
        );
      },
    } );
  }
}
