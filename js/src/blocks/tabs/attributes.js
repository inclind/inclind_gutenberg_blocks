/**
 * @file
 * BLOCK: Inclind Tabs Attributes.
 */

// Internationalization.
const __ = Drupal.t;
const attributes = {
  uniqueID: {
    type: 'string',
    default: '',
  },
  tabCount: {
    type: 'number',
    default: 3,
  },
  layout: {
    type: 'string',
    default: 'tabs',
  },
  mobileLayout: {
    type: 'string',
    default: 'inherit',
  },
  tabletLayout: {
    type: 'string',
    default: 'inherit',
  },
  currentTab: {
    type: 'number',
    default: 1,
  },
  minHeight: {
    type: 'number',
    default: '',
  },
  maxWidth: {
    type: 'number',
    default: '',
  },
  contentBgColor: {
    type: 'string',
    default: '',
  },
  contentBorderColor: {
    type: 'string',
    default: '',
  },
  contentBorder: {
    type: 'array',
    default: [ 1, 1, 1, 1 ],
  },
  contentBorderControl: {
    type: 'string',
    default: 'linked',
  },
  innerPadding: {
    type: 'array',
    default: [ 20, 20, 20, 20 ],
  },
  innerPaddingControl: {
    type: 'string',
    default: 'linked',
  },
  innerPaddingM: {
    type: 'array',
  },
  tabAlignment: {
    type: 'string',
    default: 'left',
  },
  blockAlignment: {
    type: 'string',
    default: 'none',
  },
  titles: {
    type: 'array',
    default: [ {
      text: __('Tab 1'),
      icon: '',
      iconSide: 'right',
      onlyIcon: false,
      subText: '',
      anchor: '',
    }, {
      text: __('Tab 2'),
      icon: '',
      iconSide: 'right',
      onlyIcon: false,
      subText: '',
      anchor: '',
    }, {
      text: __('Tab 3'),
      icon: '',
      iconSide: 'right',
      onlyIcon: false,
      subText: '',
      anchor: '',
    } ],
  },
  iSize: {
    type: 'number',
    default: 14,
  },
  titleColor: {
    type: 'string',
  },
  titleColorHover: {
    type: 'string',
  },
  titleColorActive: {
    type: 'string',
  },
  titleBg: {
    type: 'string',
  },
  titleBgHover: {
    type: 'string',
  },
  titleBgActive: {
    type: 'string',
    default: '#ffffff',
  },
  titleBorder: {
    type: 'string',
  },
  titleBorderHover: {
    type: 'string',
  },
  titleBorderActive: {
    type: 'string',
  },
  titleBorderWidth: {
    type: 'array',
  },
  titleBorderControl: {
    type: 'string',
    default: 'individual',
  },
  titleBorderRadius: {
    type: 'array',
  },
  titleBorderRadiusControl: {
    type: 'string',
    default: 'individual',
  },
  titlePadding: {
    type: 'array',
  },
  titlePaddingControl: {
    type: 'string',
    default: 'individual',
  },
  titleMargin: {
    type: 'array',
  },
  titleMarginControl: {
    type: 'string',
    default: 'individual',
  },
  size: {
    type: 'number',
  },
  sizeType: {
    type: 'string',
    default: 'px',
  },
  lineHeight: {
    type: 'number',
  },
  lineType: {
    type: 'string',
    default: 'px',
  },
  tabSize: {
    type: 'number',
  },
  tabLineHeight: {
    type: 'number',
  },
  mobileSize: {
    type: 'number',
  },
  mobileLineHeight: {
    type: 'number',
  },
  letterSpacing: {
    type: 'number',
  },
  typography: {
    type: 'string',
    default: '',
  },
  googleFont: {
    type: 'boolean',
    default: false,
  },
  loadGoogleFont: {
    type: 'boolean',
    default: true,
  },
  fontSubset: {
    type: 'string',
    default: '',
  },
  fontVariant: {
    type: 'string',
    default: '',
  },
  fontWeight: {
    type: 'string',
    default: 'regular',
  },
  fontStyle: {
    type: 'string',
    default: 'normal',
  },
  startTab: {
    type: 'number',
    default: '',
  },
  showPresets: {
    type: 'bool',
    default: false,
  },
  subtitleFont: {
    type: 'array',
    default: [ {
      size: [ '', '', '' ],
      sizeType: 'px',
      lineHeight: [ '', '', '' ],
      lineType: 'px',
      letterSpacing: '',
      textTransform: '',
      family: '',
      google: false,
      style: '',
      weight: '',
      variant: '',
      subset: '',
      loadGoogle: true,
      padding: [ 0, 0, 0, 0 ],
      paddingControl: 'linked',
      margin: [ 0, 0, 0, 0 ],
      marginControl: 'linked',
    } ],
  },
  enableSubtitle: {
    type: 'bool',
    default: false,
  },
  widthType: {
    type: 'string',
    default: 'normal',
  },
  tabWidth: {
    type: 'array',
    default: [ 4, '', '' ],
  },
  gutter: {
    type: 'array',
    default: [ 10, '', '' ],
  },
};
export default attributes;
