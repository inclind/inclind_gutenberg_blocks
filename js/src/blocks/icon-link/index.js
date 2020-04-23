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
const {} = wp.components;

const {dispatch, select} = wp.data;

class InclindIconLink extends Component {
  render() {

    // Setup the attributes.
    const {
      attributes: {
        itemContent,
        itemLink,
        level,
        target
      }, isSelected, className, setAttributes
    } = this.props;

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
                placeholder={__("Link Text...", 'inclind-blocks')}
                keepPlaceholderOnFocus
                value={itemContent}
                className={classnames(
                    'icon-link'
                )}
                onChange={(value) => setAttributes({itemContent: value})}
            />
          </IconLink>
          <URLInput
              value={itemLink}
              onChange={(url, post) => {
                setAttributes({
                  itemLink: url,
                  text: (post && post.title) || 'Click here'
                });
              }}
          />
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
                itemContent.length && itemLink.length && (
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
                itemContent.length && !itemLink.length && (
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
