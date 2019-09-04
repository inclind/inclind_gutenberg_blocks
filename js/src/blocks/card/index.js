// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import Card from './components/card';
import Icon from './components/icon';

// Internationalization
const __ = Drupal.t;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const { RichText, BlockControls, MediaUpload, URLInput } = wp.editor;

// Register components
const { IconButton } = wp.components;

const { dispatch, select } = wp.data;

class InclindCard extends Component {
    render() {

        // Setup the attributes.
        const {
            attributes: {
                buttonText,
                cardUrl,
                cardContent,
                cardSubtitle,
                cardTitle,
                cardImage,
                cardImageAlt,
                cardImageTitle,
                cardImageData,
                cardStyle
            }, isSelected, className, setAttributes } = this.props;

        const onSelectImage = (media, field) => {
            let mediaTitle = '';
            if (typeof media.title === 'string' || media.title instanceof String) {
                mediaTitle = media.title;
            }
            else {
                if (media.title.raw !== undefined && media.title.raw !== null) {
                    mediaTitle = media.title.raw;
                }
            }
            setAttributes({
                [field]: media.url,
                cardImageData: getMediaAttrs(media),
                cardImageTitle: mediaTitle,
                cardImageAlt: media.alt_text
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
            // Show the alignment toolbar on focus.
            <BlockControls key="controls">

            </BlockControls>,
            // Show the block controls on focus.
            <Inspector
                { ...this.props }
            />,
            // Show the block markup in the editor.
            <Card { ...this.props }>
                <MediaUpload
                    allowedTypes={ ['image'] }
                    onSelect={
                        media => onSelectImage(media, 'cardImage')
                    }
                    render={
                        ({ open }) => (
                        <IconButton
                            className="components-toolbar__control"
                            label={ __('Edit image') }
                            icon="edit" onClick={ open } />)
                    }
                />
                <img src={cardImage} { ...cardImageData } alt={ cardImageAlt } title={ cardImageTitle } />
                <RichText
                    tagName="h6"
                    placeholder={__("Card Subtitle", 'inclind-blocks')}
                    keepPlaceholderOnFocus
                    value={ cardSubtitle }
                    className={classnames(
                        'card-subtitle'
                    )}
                    onChange={ ( value ) => this.props.setAttributes( { cardSubtitle: value } ) }
                />
                <RichText
                    tagName="h3"
                    placeholder={__("Card Title...", 'inclind-blocks')}
                    keepPlaceholderOnFocus
                    value={ cardTitle }
                    className={classnames(
                        'card-title'
                    )}
                    onChange={ ( value ) => this.props.setAttributes( { cardTitle: value } ) }
                />
                <RichText
                    tagName="p"
                    placeholder={__("Card Content...", 'inclind-blocks')}
                    keepPlaceholderOnFocus
                    value={ cardContent }
                    className={classnames(
                        'card-text'
                    )}
                    onChange={ ( value ) => this.props.setAttributes( { cardContent: value } ) }
                />
                <RichText
                    tagName="p"
                    placeholder={__( 'Button Text...', 'inclind-blocks' )}
                    keepPlaceholderOnFocus
                    value={ buttonText }
                    formattingControls={ [] }
                    className={ classnames(
                        'btn',
                        'btn-secondary',
                        'btn-sm',
                        'icon',
                    ) }
                    onChange={ (value) => setAttributes( { buttonText: value } ) }
                />
            </Card>,
            isSelected && (
                <form
                key="form-link"
                onSubmit={ event => event.preventDefault() }>
                    <URLInput
                        className="button-url"
                        value={ cardUrl }
                        onChange={ ( value ) => setAttributes( { cardUrl: value } ) }
                    />
                </form>
            )
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
registerBlockType( category.slug+'/inclind-card', {
    title: __( 'Card', 'inclind-card' ),
    description: __( 'Description', 'inclind-blocks' ),
    category: 'inclind-blocks',
    keywords: [
        __( 'card', 'inclind-card' ),
        __( 'inclind', 'inclind-card' ),
    ],
    attributes: {
        cardTitle: {
            selector: '.card-title',
            type: 'string',
        },
        cardSubtitle: {
            selector: '.card-subtitle',
            type: 'string',
        },
        cardContent: {
            type: 'array',
            selector: '.card-text',
            source: 'children',
        },
        buttonText: {
            type: 'string',
        },
        cardUrl: {
            type: 'string',
            source: 'attribute',
            selector: '.card-link',
            attribute: 'href',
        },
        cardImage: {
            type: 'string'
        },
        cardImageData: {
            type: 'object',
            default: {},
        },
        cardStyle: {
            type: 'string',
            default: '',
        },
        cardImageTitle: {
            type: 'string'
        },
        cardImageAlt: {
            type: 'string'
        },
    },

    // Render the block components.
    edit: InclindCard,

    // Save the attributes and markup.
    save: function( props ) {

        const {
            buttonText,
            cardUrl,
            cardContent,
            cardSubtitle,
            cardTitle,
            cardImage,
            cardImageAlt,
            cardImageTitle,
            cardImageData,} = props.attributes;
        const arrow = '<svg viewBox="0 0 500 500"><path d="' + Icon['iconArrow'] + '"></path></svg>';

        // Save the block markup for the front end.
        return (
            <Card { ...props }>
                <a
                    href={ cardUrl }
                    className="img img-card"
                >
                    <img src={ cardImage } className={"card-img-top"} { ...cardImageData } alt={ cardImageAlt } title={ cardImageTitle }/>
                </a>
                <div class="card-body">
                {
                    cardSubtitle && (
                        <RichText.Content
                            tagName="h6"
                            className="card-subtitle"
                            value={'<a href="' + cardUrl + '" class="card-link">' + cardSubtitle + '</a>'}
                        />
                    )
                }
                {
                    cardTitle && (
                        <RichText.Content
                            tagName="h3"
                            className="card-title"
                            value={'<a href="' + cardUrl + '" class="card-link">' + cardTitle + '</a>'}
                        />
                    )
                }
                {
                    cardContent && (
                        <RichText.Content
                            tagName="p"
                            className="card-text"
                            value={cardContent}
                        />
                    )
                }
                {
                buttonText && (
                    <RichText.Content
                        tagName="a"
                        className="btn btn-primary btn-tn icon"
                        value={buttonText + '<span class="svgicon-default">' + arrow + '</span>'}
                        href={cardUrl}
                    />
                ) }
                </div>
            </Card>
        );
    },
} );
