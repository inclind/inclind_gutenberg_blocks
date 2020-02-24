"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _times = _interopRequireDefault(require("lodash/times"));

var _genicon = _interopRequireDefault(require("../../genicon"));

var _svgicons = _interopRequireDefault(require("../../svgicons"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file
 * BLOCK: Inclind Tabs.
 */
// Internationalization
const __ = Drupal.t; // Internal block libraries.

const {
  sprintf
} = wp.i18n;
const {
  Component,
  Fragment
} = wp.element;
const {
  InnerBlocks,
  RichText
} = wp.blockEditor;

class InclindTabsSave extends Component {
  /**
   * Strip alpha-numeric characters from a string.
   *
   * @param string
   *   The string to be stripped.
   *
   * @return {*}
   *   The transformed string.
   */
  stripStringRender(string) {
    return string.toLowerCase().replace(/[^0-9a-z-]/g, '');
  }
  /**
   * Render Callback for the save process.
   *
   * @return {*}
   */


  render() {
    const {
      attributes: {
        tabCount,
        blockAlignment,
        currentTab,
        mobileLayout,
        layout,
        tabletLayout,
        uniqueID,
        titles,
        iSize,
        maxWidth,
        tabAlignment,
        startTab,
        enableSubtitle,
        widthType,
        tabWidth
      }
    } = this.props;
    const layoutClass = !layout ? 'tabs' : layout;
    const tabLayoutClass = !tabletLayout ? 'inherit' : tabletLayout;
    const mobileLayoutClass = !mobileLayout ? 'inherit' : mobileLayout;
    const accordionClass = mobileLayout && 'accordion' === mobileLayout || tabletLayout && 'accordion' === tabletLayout ? 'kt-create-accordion' : '';
    const classId = !uniqueID ? 'notset' : uniqueID;
    const classes = (0, _classnames.default)(`align${blockAlignment}`);
    const activeTab = startTab ? startTab : currentTab;
    const innerClasses = (0, _classnames.default)(`tabs-wrap tabs-id${classId} layout-${layoutClass} alignment-${tabAlignment} ${accordionClass}`);

    const renderTitles = index => {
      // const backupAnchor = `tabs-${ classId }-tab-${ ( titles[ index ] &&
      // titles[ index ].text ? this.stripStringRender( titles[ index
      // ].text.toString() ) : this.stripStringRender( __( 'Tab' ) + ( 1 +
      // index ) ) ) }`; const ref = `${ ( titles[ index ] && titles[ index
      // ].anchor ? titles[ index ].anchor : backupAnchor ) }`;
      const backupAnchor = `tabs${classId}-tab-${1 + index}`;
      const ref = `tabs${classId}-tabcontent-${1 + index}`;
      const sel_tab = `${index == 0 ? 'true' : 'false'}`;
      const sel_tab_class = `${index == 0 ? 'active' : ''}`;
      return React.createElement(Fragment, null, React.createElement("li", {
        className: "nav-item"
      }, React.createElement("a", {
        className: `nav-link ${sel_tab_class}`,
        id: backupAnchor,
        "data-toggle": "tab",
        href: `#${ref}`,
        role: "tab",
        "aria-controls": `${ref}`,
        "aria-selected": `${sel_tab}`
      }, titles[index] && titles[index].icon && 'right' !== titles[index].iconSide && React.createElement(_genicon.default, {
        className: `kt-tab-svg-icon kt-tab-svg-icon-${titles[index].icon} kt-title-svg-side-${titles[index].iconSide}`,
        name: titles[index].icon,
        size: !iSize ? '14' : iSize,
        icon: 'fa' === titles[index].icon.substring(0, 2) ? FaIco[titles[index].icon] : _svgicons.default[titles[index].icon],
        htmltag: "span"
      }), (!enableSubtitle || undefined !== titles[index] && undefined === titles[index].subText || undefined !== titles[index] && undefined !== titles[index].subText && '' === titles[index].subText) && React.createElement(RichText.Content, {
        tagName: "span",
        value: titles[index] && titles[index].text ? titles[index].text : sprintf(__('Tab %d'), 1 + index),
        className: 'kt-title-text'
      }), enableSubtitle && titles[index] && undefined !== titles[index].subText && '' !== titles[index].subText && React.createElement("div", {
        className: "kb-tab-titles-wrap"
      }, React.createElement(RichText.Content, {
        tagName: "span",
        value: titles[index] && titles[index].text ? titles[index].text : sprintf(__('Tab %d'), 1 + index),
        className: 'kt-title-text'
      }), React.createElement(RichText.Content, {
        tagName: "span",
        value: titles[index].subText,
        className: 'kt-title-sub-text'
      })), titles[index] && titles[index].icon && 'right' === titles[index].iconSide && React.createElement(_genicon.default, {
        className: `kt-tab-svg-icon kt-tab-svg-icon-${titles[index].icon} kt-title-svg-side-${titles[index].iconSide}`,
        name: titles[index].icon,
        size: !iSize ? '14' : iSize,
        icon: 'fa' === titles[index].icon.substring(0, 2) ? FaIco[titles[index].icon] : _svgicons.default[titles[index].icon],
        htmltag: "span"
      }))));
    };

    return React.createElement("div", {
      className: classes
    }, 'vtabs' === layout && React.createElement("div", {
      className: innerClasses,
      style: {
        maxWidth: maxWidth ? maxWidth + 'px' : 'none'
      }
    }, React.createElement("div", {
      class: "row"
    }, React.createElement("div", {
      className: "col-sm-12 col-md-3"
    }, React.createElement("ul", {
      className: "nav nav-justified nav-tabs",
      id: `tabs-list-${classId}`,
      role: "tablist",
      "aria-orientation": "vertical"
    }, (0, _times.default)(tabCount, n => renderTitles(n)))), React.createElement("div", {
      className: "col"
    }, React.createElement("div", {
      className: "tab-content",
      id: `tabs-content-${classId}`
    }, React.createElement(InnerBlocks.Content, null))))), 'vtabs' !== layout && React.createElement("div", {
      className: innerClasses,
      style: {
        maxWidth: maxWidth ? maxWidth + 'px' : 'none'
      }
    }, React.createElement("ul", {
      className: "nav nav-justified nav-tabs",
      id: `tabs-list-${classId}`,
      role: "tablist"
    }, (0, _times.default)(tabCount, n => renderTitles(n))), React.createElement("div", {
      className: "tab-content",
      id: `tabs-content-${classId}`
    }, React.createElement(InnerBlocks.Content, null))));
  }

}

var _default = InclindTabsSave;
exports.default = _default;