// Internationalization
const {__} = wp.i18n;

// Setup the block.
const {
  Component,
} = wp.element;

// Import block components.
const {
  SelectControl,
  PanelBody,
} = wp.components;

// Import Inspector components.
const {
  InspectorControls,
} = wp.blockEditor;

/**
 * Create an Inspector Controls wrapper Component.
 */
export default class Inspector extends Component {

  constructor(props) {
    super(...arguments);
  }

  render() {

    // Setup the attributes
    const {
      itemContent,
      itemIcon,
      itemLink,
      target,
      level,
    } = this.props.attributes;

    const iconOptions = [
      {value: '', label: __('None')},
      {value: 'ios-document', label: __('Document')},
      {value: 'ios-information', label: __('Information')},
      {value: 'ios-mail', label: __('Mail')},
      {value: 'ios-phone-portrait', label: __('Phone')},
      {value: 'clock', label: __('Clock')},
      {value: 'flame', label: __('Flame')},
      {value: 'snowflake', label: __('Snowflake')},
      {value: 'sun', label: __('Sun')},
      {value: 'switch', label: __('Switch')},
    ];

    return (
        <InspectorControls key="inspector">
          <PanelBody>
            <SelectControl
                label={__('Icon')}
                description={__('Choose the icon for this link.')}
                options={iconOptions}
                value={itemIcon}
                onChange={(value) => this.props.setAttributes({itemIcon: value})}
            />
          </PanelBody>
          <PanelBody title={__('Link settings')}>
            <SelectControl
                label={__('Link Target')}
                value={target}
                options={[
                  {value: '_self', label: __('Same Window')},
                  {value: '_blank', label: __('New Window')},
                ]}
                onChange={value => this.props.setAttributes({target: value})}
            />
            <SelectControl
                label={__('Heading Level')}
                value={level}
                options={[
                  {value: 0, label: __('-- Pick one --')},
                  {value: 2, label: __('H2')},
                  {value: 3, label: __('H3')},
                  {value: 4, label: __('H4')},
                  {value: 5, label: __('H5')},
                  {value: 6, label: __('H6')},
                ]}
                onChange={value => this.props.setAttributes({level: Number.parseInt(value)})}
            />
          </PanelBody>
        </InspectorControls>
    );
  }
}
