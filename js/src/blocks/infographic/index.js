// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import Infographic from './components/infographic';
import Icon from "../infobox/components/icon";
import Infobox from "../infobox/components/infobox";

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

class InclindInfographic extends Component {
    render() {

        // Setup the attributes.
        const {
            attributes: {
                itemTitle,
                itemContentTop,
                itemContentBottom,
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
            <Infographic { ...this.props }>
                <RichText
                    tagName="span"
                    placeholder={__("Item Title", 'inclind-blocks')}
                    keepPlaceholderOnFocus
                    value={ itemTitle }
                    className={classnames(
                        'infographic-title',
                        'h6',
                        'orange',
                    )}
                    onChange={ ( value ) => this.props.setAttributes( { itemTitle: value } ) }
                />
                <RichText
                    tagName="span"
                    placeholder={__("Item Content Top...", 'inclind-blocks')}
                    keepPlaceholderOnFocus
                    value={ itemContentTop }
                    className={classnames(
                        'infographic-content-top',
                        'h1',
                    )}
                    onChange={ ( value ) => this.props.setAttributes( { itemContentTop: value } ) }
                />
                <RichText
                    tagName="span"
                    placeholder={__("Item Content Bottom...", 'inclind-blocks')}
                    keepPlaceholderOnFocus
                    value={ itemContentBottom }
                    className={classnames(
                        'infographic-content-bottom',
                        'h4',
                    )}
                    onChange={ ( value ) => this.props.setAttributes( { itemContentBottom: value } ) }
                />
            </Infographic>,
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
  if (blocks.hasOwnProperty(category.slug + '/inclind-infographic') && blocks[category.slug + '/inclind-infographic']) {
    // Register the block.
    registerBlockType( category.slug+'/inclind-infographic', {
      title: __( 'Infographic', 'inclind-infographic' ),
      description: __( 'Description', 'inclind-blocks' ),
      category: 'inclind-blocks',
      keywords: [
        __( 'info', 'inclind-infographic' ),
        __( 'infogrpahic', 'inclind-infographic' ),
        __( 'inclind', 'inclind-infographic' ),
      ],
      attributes: {
        itemTitle: {
          selector: '.infographic-title',
          type: 'string',
        },
        itemContentTop: {
          selector: '.infographic-content-top',
          type: 'string',
        },
        itemContentBottom: {
          selector: '.infographic-content-bottoom',
          type: 'string',
        },
      },

      // Render the block components.
      edit: InclindInfographic,

      // Save the attributes and markup.
      save: function( props ) {
        const {
          itemTitle,
          itemContentTop,
          itemContentBottom,} = props.attributes;

        // Save the block markup for the front end.
        return (
            <Infographic { ...props }>
              <p>
                {
                  itemTitle && (
                      <RichText.Content
                          tagName="span"
                          className="h6 orange infographic-title"
                          value={ itemTitle }
                      />
                  )
                }
                <br />
                {
                  itemContentTop && (
                      <RichText.Content
                          tagName="span"
                          className="h1 infogrpahic-content-top"
                          value={ itemContentTop }
                      />
                  )
                }
              </p>
              <p>
                {
                  itemContentBottom && (
                      <RichText.Content
                          tagName="span"
                          className="h4 infogrpahic-content-bottom"
                          value={ itemContentBottom }
                      />
                  )
                }
              </p>
            </Infographic>
        );
      },
    } );
  }
}
