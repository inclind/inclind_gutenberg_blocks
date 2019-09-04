// Import block dependencies and components
import Accordion from "./components/accordion";

// Internationalization
const __ = Drupal.t;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const { InnerBlocks } = wp.editor;

// Register components
const {} = wp.components;

const { dispatch, select } = wp.data;

class InclindAccordion extends Component {
    render() {

        // Setup the attributes.
        const { isSelected, className, setAttributes } = this.props;

        return [
            // Show the block markup in the editor.
            <Accordion { ...this.props }>
                <InnerBlocks />
            </Accordion>
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

// Register the block.
registerBlockType( category.slug+'/inclind-accordion', {
    title: __( 'Accordion', 'inclind-accordion' ),
    description: __( 'Description', 'inclind-blocks' ),
    category: 'inclind-blocks',
    keywords: [
        __( 'accordion', 'inclind-accordion' ),
        __( 'inclind', 'inclind-accordion' ),
    ],
    attributes: {},

    // Render the block components.
    edit: InclindAccordion,

    // Save the attributes and markup.
    save: function( props ) {

        const {} = props.attributes;

        // Save the block markup for the front end.
        return (
            <Accordion { ...props }>
                <InnerBlocks.Content/>
            </Accordion>
        );
    },
} );
