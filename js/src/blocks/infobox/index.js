// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import Infobox from './components/infobox';
import Icon from './components/icon';

// Internationalization
const __ = Drupal.t;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const { RichText, BlockControls } = wp.blockEditor;

// Register components
const {} = wp.components;

const { dispatch, select } = wp.data;

class InclindInfobox extends Component {
    render() {

        // Setup the attributes.
        const {
            attributes: {
                itemTitle,
                itemContent,
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
            <Infobox { ...this.props }>
                <RichText
                    tagName="h4"
                    placeholder={__("Item Title", 'inclind-blocks')}
                    keepPlaceholderOnFocus
                    value={ itemTitle }
                    className={classnames(
                        'infobox-heading'
                    )}
                    onChange={ ( value ) => this.props.setAttributes( { itemTitle: value } ) }
                />
                <RichText
                    tagName="p"
                    placeholder={__("Item Content...", 'inclind-blocks')}
                    keepPlaceholderOnFocus
                    value={ itemContent }
                    className={classnames(
                        'infobox-content'
                    )}
                    onChange={ ( value ) => this.props.setAttributes( { itemContent: value } ) }
                />
            </Infobox>,
        ];
    }
}

//  Start Drupal Specific.
const category = {
    slug: 'inclind-blocks',
    title: __('Inclind Blocks'),
};
// Grab the current categories and merge in the new category if not present.
const currentCategories = select('core/blocks').getCategories().filter(item => item.slug !== category.slug);
dispatch('core/blocks').setCategories([ category, ...currentCategories ]);
// End Drupal Specific.

if (drupalSettings && drupalSettings.editor.formats.gutenberg.editorSettings !== undefined) {
  const blocks =  drupalSettings.editor.formats.gutenberg.editorSettings.allowedBlocks;
  if (blocks.hasOwnProperty(category.slug + '/inclind-infobox-simple') && blocks[category.slug + '/inclind-infobox-simple']) {
    // Register the block.
    registerBlockType( category.slug+'/inclind-infobox-simple', {
      title: __( 'Infobox', 'inclind-infobox-simple' ),
      description: __( 'Description', 'inclind-blocks' ),
      category: 'inclind-blocks',
      keywords: [
        __( 'info', 'inclind-infobox-simple' ),
        __( 'infobox', 'inclind-infobox-simple' ),
        __( 'inclind', 'inclind-infobox-simple' ),
      ],
      attributes: {
        itemTitle: {
          selector: '.infobox-heading',
          type: 'string',
        },
        itemContent: {
          selector: '.infobox-content',
          type: 'array',
          source: 'children',
        },
      },

      // Render the block components.
      edit: InclindInfobox,

      // Save the attributes and markup.
      save: function( props ) {
        const {
          itemTitle,
          itemContent,} = props.attributes;
        const iconHelp = '<svg viewBox="0 0 500 500"><path d="' + Icon['iconHelp'] + '"></path></svg>';

        // Save the block markup for the front end.
        return (
            <Infobox { ...props }>
              <div className="col-lg-10">
                {
                  itemTitle && (
                      <RichText.Content
                          tagName="h4"
                          className="infobox-heading"
                          value={ itemTitle }
                      />
                  )
                }
                {
                  itemContent && (
                      <RichText.Content
                          tagName="p"
                          className="infobox-content"
                          value={ itemContent }
                      />
                  )
                }
              </div>
              <div className="col-lg-2 text-center">
                    <span
                        className="svgicon-default _ionicons_svg_ios-help-circle"
                        dangerouslySetInnerHTML={{__html: iconHelp}}>
                    </span>
              </div>
            </Infobox>
        );
      },
    } );
  }
}
