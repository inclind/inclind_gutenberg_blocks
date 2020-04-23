// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import CallToAction from './components/calltoaction';
import Icon from "../infobox/components/icon";
import Infobox from "../infobox/components/infobox";

// Internationalization
const __ = Drupal.t;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const { RichText, BlockControls, URLInput } = wp.blockEditor;

// Register components
const {} = wp.components;

const { dispatch, select } = wp.data;

class InclindCallToAction extends Component {
    render() {

        // Setup the attributes.
        const {
            attributes: {
                itemTitle,
                itemContent,
                itemButtonText,
                itemButtonLink,
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
            <CallToAction { ...this.props }>
                <RichText
                    tagName="h2"
                    placeholder={__("Item Title", 'inclind-blocks')}
                    keepPlaceholderOnFocus
                    value={ itemTitle }
                    className={classnames(
                        'item-title',
                        'text-center',
                        'col-sm-12',
                        'emb-center'
                    )}
                    onChange={ ( value ) => this.props.setAttributes( { itemTitle: value } ) }
                />
                <RichText
                    tagName="p"
                    placeholder={__("Item Content...", 'inclind-blocks')}
                    keepPlaceholderOnFocus
                    value={ itemContent }
                    className={classnames(
                        'lead'
                    )}
                    onChange={ ( value ) => this.props.setAttributes( { itemContent: value } ) }
                />
                <RichText
                    tagName="p"
                    placeholder={__( 'Button Text...', 'inclind-blocks' )}
                    keepPlaceholderOnFocus
                    value={ itemButtonText }
                    formattingControls={ [] }
                    className={ classnames(
                        'btn',
                        'btn-lg',
                        'btn-secondary'
                    ) }
                    onChange={ (value) => setAttributes( { itemButtonText: value } ) }
                />
            </CallToAction>,
            isSelected && (
                <form
                    key="form-link"
                    onSubmit={ event => event.preventDefault() }>
                    <URLInput
                        className="item-button-link"
                        value={ itemButtonLink }
                        onChange={ ( value ) => setAttributes( { itemButtonLink: value } ) }
                    />
                </form>
            )
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
  if (blocks.hasOwnProperty(category.slug + '/inclind-call-to-action') && blocks[category.slug + '/inclind-call-to-action']) {
    // Register the block.
    registerBlockType( category.slug+'/inclind-call-to-action', {
      title: __( 'Call To Action', 'inclind-call-to-action' ),
      description: __( 'Description', 'inclind-blocks' ),
      category: 'inclind-blocks',
      keywords: [
        __( 'action', 'inclind-call-to-action' ),
        __( 'call to action', 'inclind-call-to-action' ),
        __( 'inclind', 'inclind-call-to-action' ),
      ],
      attributes: {
        itemTitle: {
          selector: '.item-title',
          type: 'string',
        },
        itemContent: {
          selector: '.lead',
          type: 'array',
          source: 'children',
        },
        itemButtonText: {
          type: 'string',
        },
        itemButtonLink: {
          type: 'string',
          source: 'attribute',
          selector: '.item-button-link',
          attribute: 'href',
        },
      },

      // Render the block components.
      edit: InclindCallToAction,

      // Save the attributes and markup.
      save: function( props ) {
        const {
          itemTitle,
          itemContent,
          itemButtonText,
          itemButtonLink,} = props.attributes;

        // Save the block markup for the front end.
        return (
            <CallToAction { ...props }>
              <div className="row text-center">
                {
                  itemTitle && (
                      <RichText.Content
                          tagName="h2"
                          className="item-title text-center col-sm-12 emb-center"
                          value={ itemTitle }
                      />
                  )
                }
                <div className="col-sm-12">
                  {
                    itemContent && (
                        <RichText.Content
                            tagName="p"
                            className="lead"
                            value={ itemContent }
                        />
                    )
                  }
                </div>
                {
                  itemButtonText && (
                      <RichText.Content
                          tagName="a"
                          className="btn btn-lg btn-secondary item-button-link"
                          value={itemButtonText}
                          href={itemButtonLink}
                      />
                  ) }
              </div>
            </CallToAction>
        );
      },
    } );
  }
}
