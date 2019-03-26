// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import DropCap from './components/dropcap';
import icons from './components/icons';

// Import CSS
// import './styles/style.scss';
// import './styles/editor.scss';

// Internationalization
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const {
    RichText,
    AlignmentToolbar,
    BlockControls,
    BlockAlignmentToolbar,
    MediaUpload,
} = wp.editor;

// Register components
const {
    Button,
    SelectControl,
} = wp.components;

// ********* Drupal Specific
const { dispatch, select } = data;
// const __ = Drupal.t;
// ********* End Drupal Specific

class ABDropCapBlock extends Component {
    render() {

        // Setup the attributes.
        const { attributes: { dropCapContent, dropCapAlignment, dropCapBackgroundColor, dropCapTextColor, dropCapFontSize, dropCapStyle }, isSelected, className, setAttributes } = this.props;

        return [
            // Show the alignment toolbar on focus.
            <BlockControls key="controls">
                <AlignmentToolbar
                    value={ dropCapAlignment }
                    onChange={ ( value ) => this.props.setAttributes( { dropCapAlignment: value } ) }
                />
            </BlockControls>,
            // Show the block controls on focus.
            <Inspector
                { ...this.props }
            />,
            // Show the block markup in the editor.
            <DropCap { ...this.props }>
                <RichText
                    tagName="div"
                    multiline="p"
                    placeholder={ __( 'Add paragraph text...', 'atomic-blocks' ) }
                    keepPlaceholderOnFocus
                    value={ dropCapContent }
                    formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link' ] }
                    className={ classnames(
                        'ab-drop-cap-text',
                        'ab-font-size-' + dropCapFontSize,
                    ) }
                    onChange={ ( value ) => this.props.setAttributes( { dropCapContent: value } ) }
                />
            </DropCap>
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
registerBlockType( category.slug+'/inclind-drop-cap', {
    title: __( 'Inclind Drop Cap', 'inclind-drop-cap' ),
    description: __( 'Add a styled drop cap to the beginning of your paragraph.', 'atomic-blocks' ),
    icon: 'format-quote',
    category: 'inclind-blocks',
    keywords: [
        __( 'drop cap', 'inclind-drop-cap' ),
        __( 'quote', 'inclind-drop-cap' ),
        __( 'atomic', 'inclind-drop-cap' ),
    ],
    attributes: {
        dropCapContent: {
            type: 'array',
            selector: '.ab-drop-cap-text',
            source: 'children',
        },
        dropCapAlignment: {
            type: 'string',
        },
        dropCapBackgroundColor: {
            type: 'string',
            default: '#f2f2f2'
        },
        dropCapTextColor: {
            type: 'string',
            default: '#32373c'
        },
        dropCapFontSize: {
            type: 'number',
            default: 3,
        },
        dropCapStyle: {
            type: 'string',
            default: 'drop-cap-letter',
        },
    },

    // Render the block components.
    edit: ABDropCapBlock,

    // Save the attributes and markup.
    save: function( props ) {

        const { dropCapContent, dropCapAlignment, dropCapBackgroundColor, dropCapTextColor, dropCapFontSize, dropCapStyle } = props.attributes;

        // Save the block markup for the front end.
        return (
            <DropCap { ...props }>
                {	// Check if there is text and output.
                    dropCapContent && (
                        <RichText.Content
                            tagName="div"
                            className="ab-drop-cap-text"
                            value={ dropCapContent }
                        />
                    ) }
            </DropCap>
        );
    },
} );
