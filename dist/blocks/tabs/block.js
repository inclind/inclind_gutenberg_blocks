"use strict";

var _attributes = _interopRequireDefault(require("./attributes"));

var _classnames = _interopRequireDefault(require("classnames"));

var _times = _interopRequireDefault(require("lodash/times"));

var _edit = _interopRequireDefault(require("./edit"));

var _save = _interopRequireDefault(require("./save"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file
 * BLOCK: Inclind Tabs.
 */
// Import Attributes.
// Import Edit.
// Import Save.
// Internationalization
const __ = Drupal.t; // Internal block libraries.

const {
  sprintf
} = wp.i18n;
const {
  registerBlockType
} = wp.blocks;
const {
  Fragment
} = wp.element;
const {
  select,
  dispatch
} = wp.data;
const {
  InnerBlocks,
  RichText
} = wp.blockEditor;
/**
 * Strip alpha-numeric characters from a string.
 *
 * @param string
 *   The string to be stripped.
 *
 * @return {*}
 *   The transformed string.
 */

function stripStringRender(string) {
  return string.toLowerCase().replace(/[^0-9a-z-]/g, '');
} // Initialize a Category for the block.


const category = {
  slug: 'inclind-blocks',
  title: __('Custom Blocks')
}; // Grab the current categories and merge in the new category if not present.

const currentCategories = select('core/blocks').getCategories().filter(item => item.slug !== category.slug);
dispatch('core/blocks').setCategories([category, ...currentCategories]);
registerBlockType('inclind-blocks/inclind-tabs', {
  title: __('Tabs'),
  category: 'inclind-blocks',
  keywords: [__('tabs'), __('tab'), __('Inclind')],
  supports: {
    anchor: true
  },
  attributes: _attributes.default,

  /**
   * Implement getEditoorWrapperProps().
   *
   * @param blockAlignment
   *   Alignment property value.
   *
   * @return {{"data-align": *}}
   *   An object containing data attributes for the wrapper.
   */
  getEditWrapperProps({
    blockAlignment
  }) {
    if ('full' === blockAlignment || 'wide' === blockAlignment || 'center' === blockAlignment) {
      return {
        'data-align': blockAlignment
      };
    }
  },

  edit: _edit.default,
  save: _save.default // deprecated: [
  //   {
  //     attributes: {
  //       uniqueID: {
  //         type: 'string',
  //         default: '',
  //       },
  //       tabCount: {
  //         type: 'number',
  //         default: 3,
  //       },
  //       layout: {
  //         type: 'string',
  //         default: 'tabs',
  //       },
  //       mobileLayout: {
  //         type: 'string',
  //         default: 'inherit',
  //       },
  //       tabletLayout: {
  //         type: 'string',
  //         default: 'inherit',
  //       },
  //       currentTab: {
  //         type: 'number',
  //         default: 1,
  //       },
  //       minHeight: {
  //         type: 'number',
  //         default: '',
  //       },
  //       maxWidth: {
  //         type: 'number',
  //         default: '',
  //       },
  //       contentBgColor: {
  //         type: 'string',
  //         default: '',
  //       },
  //       contentBorderColor: {
  //         type: 'string',
  //         default: '',
  //       },
  //       contentBorder: {
  //         type: 'array',
  //         default: [ 1, 1, 1, 1 ],
  //       },
  //       contentBorderControl: {
  //         type: 'string',
  //         default: 'linked',
  //       },
  //       innerPadding: {
  //         type: 'array',
  //         default: [ 20, 20, 20, 20 ],
  //       },
  //       innerPaddingControl: {
  //         type: 'string',
  //         default: 'linked',
  //       },
  //       innerPaddingM: {
  //         type: 'array',
  //       },
  //       tabAlignment: {
  //         type: 'string',
  //         default: 'left',
  //       },
  //       blockAlignment: {
  //         type: 'string',
  //         default: 'none',
  //       },
  //       titles: {
  //         type: 'array',
  //         default: [ {
  //           text: __('Tab 1'),
  //           icon: '',
  //           iconSide: 'right',
  //           onlyIcon: false,
  //         }, {
  //           text: __('Tab 2'),
  //           icon: '',
  //           iconSide: 'right',
  //           onlyIcon: false,
  //         }, {
  //           text: __('Tab 3'),
  //           icon: '',
  //           iconSide: 'right',
  //           onlyIcon: false,
  //         } ],
  //       },
  //       iSize: {
  //         type: 'number',
  //         default: 14,
  //       },
  //       titleColor: {
  //         type: 'string',
  //       },
  //       titleColorHover: {
  //         type: 'string',
  //       },
  //       titleColorActive: {
  //         type: 'string',
  //       },
  //       titleBg: {
  //         type: 'string',
  //       },
  //       titleBgHover: {
  //         type: 'string',
  //       },
  //       titleBgActive: {
  //         type: 'string',
  //         default: '#ffffff',
  //       },
  //       titleBorder: {
  //         type: 'string',
  //       },
  //       titleBorderHover: {
  //         type: 'string',
  //       },
  //       titleBorderActive: {
  //         type: 'string',
  //       },
  //       titleBorderWidth: {
  //         type: 'array',
  //       },
  //       titleBorderControl: {
  //         type: 'string',
  //         default: 'individual',
  //       },
  //       titleBorderRadius: {
  //         type: 'array',
  //       },
  //       titleBorderRadiusControl: {
  //         type: 'string',
  //         default: 'individual',
  //       },
  //       titlePadding: {
  //         type: 'array',
  //       },
  //       titlePaddingControl: {
  //         type: 'string',
  //         default: 'individual',
  //       },
  //       titleMargin: {
  //         type: 'array',
  //       },
  //       titleMarginControl: {
  //         type: 'string',
  //         default: 'individual',
  //       },
  //       size: {
  //         type: 'number',
  //       },
  //       sizeType: {
  //         type: 'string',
  //         default: 'px',
  //       },
  //       lineHeight: {
  //         type: 'number',
  //       },
  //       lineType: {
  //         type: 'string',
  //         default: 'px',
  //       },
  //       tabSize: {
  //         type: 'number',
  //       },
  //       tabLineHeight: {
  //         type: 'number',
  //       },
  //       mobileSize: {
  //         type: 'number',
  //       },
  //       mobileLineHeight: {
  //         type: 'number',
  //       },
  //       letterSpacing: {
  //         type: 'number',
  //       },
  //       typography: {
  //         type: 'string',
  //         default: '',
  //       },
  //       googleFont: {
  //         type: 'boolean',
  //         default: false,
  //       },
  //       loadGoogleFont: {
  //         type: 'boolean',
  //         default: true,
  //       },
  //       fontSubset: {
  //         type: 'string',
  //         default: '',
  //       },
  //       fontVariant: {
  //         type: 'string',
  //         default: '',
  //       },
  //       fontWeight: {
  //         type: 'string',
  //         default: 'regular',
  //       },
  //       fontStyle: {
  //         type: 'string',
  //         default: 'normal',
  //       },
  //     },
  //     save: ({attributes}) => {
  //       const { tabCount, blockAlignment, currentTab, mobileLayout, layout, tabletLayout, uniqueID, titles, iSize, maxWidth, tabAlignment } = attributes;
  //       const layoutClass = (! layout ? 'tabs' : layout);
  //       const tabLayoutClass = (! tabletLayout ? 'inherit' : tabletLayout);
  //       const mobileLayoutClass = (! mobileLayout ? 'inherit' : mobileLayout);
  //       const accordionClass = ((mobileLayout && 'accordion' === mobileLayout) || (tabletLayout && 'accordion' === tabletLayout) ? 'kt-create-accordion' : '');
  //       const classId = (! uniqueID ? 'notset' : uniqueID);
  //       const classes = classnames(`align${ blockAlignment }`);
  //       const innerClasses = classnames(`kt-tabs-wrap kt-tabs-id${ classId } kt-tabs-has-${ tabCount }-tabs kt-active-tab-${ currentTab } kt-tabs-layout-${ layoutClass } kt-tabs-tablet-layout-${ tabLayoutClass } kt-tabs-mobile-layout-${ mobileLayoutClass } kt-tab-alignment-${ tabAlignment } ${ accordionClass }`);
  //       const renderTitles = (index) => {
  //         return (
  //           <Fragment>
  //             <li id={ `tab-${ ( titles[ index ] && titles[ index ].text ? stripStringRender( titles[ index ].text.toString() ) : stripStringRender( __( 'Tab' ) + ( 1 + index ) ) ) }` } className={ `kt-title-item kt-title-item-${ 1 + index } kt-tabs-svg-show-${ ( titles[ index ] && titles[ index ].onlyIcon ? 'only' : 'always' ) } kt-tabs-icon-side-${ ( titles[ index ] && titles[ index ].iconSide ? titles[ index ].iconSide : 'right' ) } kt-tab-title-${ ( 1 + index === currentTab ? 'active' : 'inactive' ) }` }>
  //               <a href={ `#tab-${ ( titles[ index ] && titles[ index ].text ? stripStringRender( titles[ index ].text.toString() ) : stripStringRender( __( 'Tab' ) + ( 1 + index ) ) ) }` } data-tab={ 1 + index } className={ `kt-tab-title kt-tab-title-${ 1 + index } ` } >
  //                 <RichText.Content
  //                   tagName="span"
  //                   value={ ( titles[ index ] && titles[ index ].text ? titles[ index ].text : sprintf( __( 'Tab %d' ), ( 1 + index ) ) ) }
  //                   className={ 'kt-title-text' }
  //                 />
  //               </a>
  //             </li>
  //           </Fragment>
  //         );
  //       };
  //       return (
  //         <div className={ classes } >
  //           <div className={ innerClasses } style={ {
  //             maxWidth: ( maxWidth ? maxWidth + 'px' : 'none' ),
  //           } }>
  //             <ul className="kt-tabs-title-list">
  //               { times( tabCount, n => renderTitles( n ) ) }
  //             </ul>
  //             <div className="kt-tabs-content-wrap">
  //               <InnerBlocks.Content />
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     },
  //   },
  // ],

});