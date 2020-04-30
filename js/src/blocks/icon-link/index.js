// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import IconLink from './components/icon-link';
import Icon from './components/icon';

// Internationalization
const __ = Drupal.t;

// Extend component
const {Component, Fragment} = wp.element;

// Register block
const {registerBlockType} = wp.blocks;

// Register editor components
const {
  RichText,
  BlockControls,
  URLInput,
} = wp.blockEditor;

// Register components
const {
  IconButton,
} = wp.components;

const {dispatch, select} = wp.data;

/**
 * This allows for checking to see if the block needs to generate a new ID.
 */
const iconLinkUniqueIDs = [];

class InclindIconLink extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      btnFocused: 'false',
      btnLink: false,
      user: 'admin',
      settings: {},
    };
  }

  componentDidMount() {
    if (!this.props.attributes.uniqueID) {

      this.props.setAttributes({
        uniqueID: '_' + this.props.clientId.substr(2, 9),
      });
      iconLinkUniqueIDs.push('_' + this.props.clientId.substr(2, 9));
    }
    else if (iconLinkUniqueIDs.includes(this.props.attributes.uniqueID)) {
      this.props.setAttributes({
        uniqueID: '_' + this.props.clientId.substr(2, 9),
      });
      iconLinkUniqueIDs.push('_' + this.props.clientId.substr(2, 9));
    }
    else {
      iconLinkUniqueIDs.push(this.props.attributes.uniqueID);
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.props.isSelected && prevProps.isSelected && this.state.btnFocused) {
      this.setState({
        btnFocused: 'false',
      });
    }
  }

  render() {

    // Setup the attributes.
    const {
      attributes: {
        itemContent,
        itemLink,
        level,
        target,
        uniqueID
      }, isSelected, className, setAttributes
    } = this.props;

    const onFocusBtn = () => {
      if ('txtlink' !== this.state.btnFocused) {
        this.setState({
          btnFocused: 'txtlink',
        });
      }
    };

    return (
        <Fragment>
          <BlockControls key="controls">
          </BlockControls>
          <Inspector
              {...this.props}
          />
          <IconLink {...this.props}>
            <RichText
                tagName="p"
                placeholder={__("Enter Text...", 'inclind-icon-link')}
                keepPlaceholderOnFocus
                value={itemContent}
                unstableOnFocus={() => {
                  onFocusBtn()
                }}
                className={classnames('icon-link')}
                onChange={(value) => setAttributes({itemContent: value})}
            />
          </IconLink>
          {isSelected && ((this.state.btnFocused && 'txtlink' === this.state.btnFocused) || (this.state.btnFocused && 'false' === this.state.btnFocused)) && (
              <form key={'form-link'}
                    onSubmit={(event) => event.preventDefault()}
                    className="blocks-button__inline-link">
                <URLInput
                    value={itemLink}
                    placeholder="Paste URL or leave it empty for no link."
                    onChange={(url, post) => {
                      setAttributes({
                        itemLink: url,
                      });
                    }}
                />
                <IconButton
                    icon={'editor-break'}
                    label={__('Apply', 'inclind-icon-link')}
                    type={'submit'}
                />
              </form>
          )}
        </Fragment>
    );
  }
}

//  Start Drupal Specific.
const category = {
  slug: 'inclind-blocks',
  title: __('Custom Blocks'),
};
// Grab the current categories and merge in the new category if not present.
const currentCategories = select('core/blocks').getCategories().filter(item => item.slug !== category.slug);
dispatch('core/blocks').setCategories([category, ...currentCategories]);
// End Drupal Specific.

if (drupalSettings && drupalSettings.editor.formats.gutenberg.editorSettings !== undefined) {
  const blocks = drupalSettings.editor.formats.gutenberg.editorSettings.allowedBlocks;
  if (blocks.hasOwnProperty(category.slug + '/inclind-icon-link') && blocks[category.slug + '/inclind-icon-link']) {
    // Register the block.
    registerBlockType(category.slug + '/inclind-icon-link', {
      title: __('Icon with Header or Link', 'inclind-icon-link'),
      description: __('Create a short heading (can be linked to a URL) preceded with an Icon.', 'inclind-blocks'),
      category: 'inclind-blocks',
      keywords: [
        __('icon', 'inclind-icon-link'),
        __('link', 'inclind-icon-link'),
        __('inclind', 'inclind-icon-link'),
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
          default: '',
        },
        target: {
          type: 'string',
          source: 'attribute',
          attribute: 'target',
          selector: '.icon-link',
          default: '_self',
        },
        uniqueID: {
          type: 'string',
          default: '',
        },
        level: {
          type: 'number',
          default: 0,
        },
      },

      // Render the block components.
      edit: InclindIconLink,

      // Save the attributes and markup.
      save: function (props) {
        const {
          itemContent,
          itemIcon,
          itemLink,
          target,
          level,
          uniqueID,
        } = props.attributes;
        const icon = ((itemIcon !== undefined && itemIcon !== '') && Icon[itemIcon] !== undefined) ? Icon[itemIcon] : '';
        const titleTagName = (level > 0) ? 'h' + level : 'div';

        // Save the block markup for the front end.
        return (
            <IconLink {...props}>
              {
                icon && (
                    <span className={classnames(
                        'svgicon-default',
                        'align-middle',
                        ' icon-link-el',
                        itemIcon
                    )}>
                      {icon}
                    </span>
                )
              }
              {
                itemContent.length && itemLink.length > 0 && (
                    <a href={itemLink}
                       target={('_blank' === target ? target : undefined)}
                       class="icon-link icon-link-el"
                       rel={('_blank' === target ? 'noopener noreferrer' : undefined)}>
                      <RichText.Content
                          className="icon-link-header"
                          tagName={titleTagName}
                          value={itemContent}
                      />
                    </a>
                )
              }
              {
                itemContent.length && itemLink.length == 0 && (
                    <RichText.Content
                        tagName={titleTagName}
                        className="icon-link-text"
                        value={itemContent}
                    />
                )
              }
            </IconLink>
        );
      },
    });
  }
}
