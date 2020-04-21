// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import AccordionItem from './components/accordion-item';
import Icon from './components/icon';
import Infobox from "../infobox/components/infobox";

// Internationalization
const __ = Drupal.t;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const { RichText, BlockControls, InnerBlocks } = wp.editor;

// Register components
const {} = wp.components;

const { dispatch, select } = wp.data;

class InclindAccordionItem extends Component {
    render() {

        // Setup the attributes.
        const {
            attributes: {
                itemTitle,
                itemContent,
                itemId,
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
            <AccordionItem { ...this.props }>
                <RichText
                    tagName="h5"
                    placeholder={__("Item Title", 'inclind-blocks')}
                    keepPlaceholderOnFocus
                    value={ itemTitle }
                    className={classnames(
                        'mb-0',
                        'accordion-item-title'
                    )}
                    onChange={ ( value ) => this.props.setAttributes( { itemTitle: value } ) }
                />
                <RichText
                    tagName="p"
                    placeholder={__("Item Content...", 'inclind-blocks')}
                    keepPlaceholderOnFocus
                    value={ itemContent }
                    className={classnames(
                        'accordion-item-content'
                    )}
                    onChange={ ( value ) => this.props.setAttributes( { itemContent: value } ) }
                />
                <InnerBlocks />
            </AccordionItem>,
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
  if (blocks.hasOwnProperty(category.slug + '/inclind-accordion') && blocks[category.slug + '/inclind-accordion']) {
    // Register the block.
    registerBlockType( category.slug+'/inclind-accordion-item', {
      title: __( 'Accordion Item', 'inclind-accordion-item' ),
      description: __( 'Description', 'inclind-blocks' ),
      category: 'inclind-blocks',
      keywords: [
        __( 'accordion', 'inclind-accordion-item' ),
        __( 'accordion item', 'inclind-accordion-item' ),
        __( 'inclind', 'inclind-accordion-item' ),
      ],
      attributes: {
        itemTitle: {
          selector: '.accordion-item-title',
          type: 'string',
        },
        itemContent: {
          selector: '.accordion-item-content',
          type: 'array',
          source: 'children',
        },
        itemId: {
          type: 'string',
          default: '',
        }
      },

      // Render the block components.
      edit: InclindAccordionItem,

      // Save the attributes and markup.
      save: function( props ) {
        const {
          itemTitle,
          itemContent,
          itemId,} = props.attributes;
        const addIcon = '<svg viewBox="0 0 500 500"><path d="' + Icon['iconAdd'] + '"></path></svg>';
        const removeIcon = '<svg viewBox="0 0 512 512"><path d="' + Icon['iconRemove'] + '"></path></svg>';

        // Save the block markup for the front end.
        // TODO: Unique ID on elements for JS functionality.
        return (
            <AccordionItem { ...props }>
              <div className="card-header" id={"header-" + itemId}>
                <h5 className="mb-0 accordion-item-title">
                  <button className="btn btn-link" data-toggle="collapse" data-target={"#collapse-" + itemId}>
                    { itemTitle }
                    <span
                        className="svgicon-default _ionicons_svg_ios-add"
                        dangerouslySetInnerHTML={{__html: addIcon}}>
                            </span>
                    <span
                        className="svgicon-default _ionicons_svg_ios-remove"
                        dangerouslySetInnerHTML={{__html: removeIcon}}>
                            </span>
                  </button>
                </h5>
              </div>
              <div id={"collapse-" + itemId} className="collapse">
                <div class="card-body">
                  {
                    itemContent && (
                        <RichText.Content
                            tagName="p"
                            className="accordion-item-content"
                            value={itemContent}
                        />
                    )
                  }
                  <InnerBlocks.Content/>
                </div>
              </div>
            </AccordionItem>
        );
      },
    } );
  }
}
