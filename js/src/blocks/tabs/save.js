/**
 * @file
 * BLOCK: Inclind Tabs.
 */

import classnames from 'classnames';
import times from 'lodash/times';
import GenIcon from '../../genicon';
import Ico from '../../svgicons';

// Internationalization
const __ = Drupal.t;

// Internal block libraries.
const {sprintf} = wp.i18n;
const {
  Component,
  Fragment,
} = wp.element;
const {
  InnerBlocks,
  RichText,
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
    const {attributes: {tabCount, blockAlignment, currentTab, mobileLayout, layout, tabletLayout, uniqueID, titles, iSize, maxWidth, tabAlignment, startTab, enableSubtitle, widthType, tabWidth}} = this.props;

    const layoutClass = (!layout ? 'tabs' : layout);
    const tabLayoutClass = (!tabletLayout ? 'inherit' : tabletLayout);
    const mobileLayoutClass = (!mobileLayout ? 'inherit' : mobileLayout);
    const accordionClass = ((mobileLayout && 'accordion' === mobileLayout) || (tabletLayout && 'accordion' === tabletLayout) ? 'kt-create-accordion' : '');
    const classId = (!uniqueID ? 'notset' : uniqueID);
    const classes = classnames(`align${blockAlignment}`);
    const activeTab = (startTab ? startTab : currentTab);
    const innerClasses = classnames(`tabs-wrap tabs-id${classId} layout-${layoutClass} alignment-${tabAlignment} ${accordionClass}`);

    const renderTitles = (index) => {
      // const backupAnchor = `tabs-${ classId }-tab-${ ( titles[ index ] &&
      // titles[ index ].text ? this.stripStringRender( titles[ index
      // ].text.toString() ) : this.stripStringRender( __( 'Tab' ) + ( 1 +
      // index ) ) ) }`; const ref = `${ ( titles[ index ] && titles[ index
      // ].anchor ? titles[ index ].anchor : backupAnchor ) }`;
      const backupAnchor = `tabs${classId}-tab-${(1 + index)}`;
      const ref = `tabs${classId}-tabcontent-${(1 + index)}`;
      const sel_tab = `${(index == 0 ? 'true' : 'false')}`;
      const sel_tab_class = `${(index == 0 ? 'active' : '')}`;

      return (
          <Fragment>
            <li className="nav-item">
              <a className={`nav-link ${sel_tab_class}`} id={(backupAnchor)}
                 data-toggle="tab"
                 href={`#${ref}`} role="tab" aria-controls={`${ref}`}
                 aria-selected={`${sel_tab}`}>

                {titles[index] && titles[index].icon && 'right' !== titles[index].iconSide && (
                    <GenIcon
                        className={`kt-tab-svg-icon kt-tab-svg-icon-${titles[index].icon} kt-title-svg-side-${titles[index].iconSide}`}
                        name={titles[index].icon} size={(!iSize ? '14' : iSize)}
                        icon={('fa' === titles[index].icon.substring(0, 2) ? FaIco[titles[index].icon] : Ico[titles[index].icon])}
                        htmltag="span"/>
                )}
                {(!enableSubtitle || (undefined !== titles[index] && undefined === titles[index].subText) || (undefined !== titles[index] && undefined !== titles[index].subText && '' === titles[index].subText)) && (
                    <RichText.Content
                        tagName="span"
                        value={(titles[index] && titles[index].text ? titles[index].text : sprintf(__('Tab %d'), (1 + index)))}
                        className={'kt-title-text'}
                    />
                )}
                {enableSubtitle && titles[index] && undefined !== titles[index].subText && '' !== titles[index].subText && (
                    <div className="kb-tab-titles-wrap">
                      <RichText.Content
                          tagName="span"
                          value={(titles[index] && titles[index].text ? titles[index].text : sprintf(__('Tab %d'), (1 + index)))}
                          className={'kt-title-text'}
                      />
                      <RichText.Content
                          tagName="span"
                          value={titles[index].subText}
                          className={'kt-title-sub-text'}
                      />
                    </div>
                )}
                {titles[index] && titles[index].icon && 'right' === titles[index].iconSide && (
                    <GenIcon
                        className={`kt-tab-svg-icon kt-tab-svg-icon-${titles[index].icon} kt-title-svg-side-${titles[index].iconSide}`}
                        name={titles[index].icon} size={(!iSize ? '14' : iSize)}
                        icon={('fa' === titles[index].icon.substring(0, 2) ? FaIco[titles[index].icon] : Ico[titles[index].icon])}
                        htmltag="span"/>
                )}
              </a>
            </li>


            {/*<li id={ ( titles[ index ] && titles[ index ].anchor ? titles[ index ].anchor : backupAnchor ) } className={ `kt-title-item kt-title-item-${ 1 + index } kt-tabs-svg-show-${ ( titles[ index ] && titles[ index ].onlyIcon ? 'only' : 'always' ) } kt-tabs-icon-side-${ ( titles[ index ] && titles[ index ].iconSide ? titles[ index ].iconSide : 'right' ) } kt-tab-title-${ ( 1 + index === activeTab ? 'active' : 'inactive' ) }${ ( enableSubtitle ? ' kb-tabs-have-subtitle' : '' ) }` }>*/}
            {/*<a href={ `#${ ( titles[ index ] && titles[ index ].anchor ? titles[ index ].anchor : backupAnchor ) }` } data-tab={ 1 + index } className={ `kt-tab-title kt-tab-title-${ 1 + index } ` } >*/}
            {/*{ titles[ index ] && titles[ index ].icon && 'right' !== titles[ index ].iconSide && (*/}
            {/*<GenIcon className={ `kt-tab-svg-icon kt-tab-svg-icon-${ titles[ index ].icon } kt-title-svg-side-${ titles[ index ].iconSide }` } name={ titles[ index ].icon } size={ ( ! iSize ? '14' : iSize ) } icon={ ( 'fa' === titles[ index ].icon.substring( 0, 2 ) ? FaIco[ titles[ index ].icon ] : Ico[ titles[ index ].icon ] ) } htmltag="span" />*/}
            {/*) }*/}
            {/*{ ( ! enableSubtitle || ( undefined !== titles[ index ] && undefined === titles[ index ].subText ) || ( undefined !== titles[ index ] && undefined !== titles[ index ].subText && '' === titles[ index ].subText ) ) && (*/}
            {/*<RichText.Content*/}
            {/*tagName="span"*/}
            {/*value={ ( titles[ index ] && titles[ index ].text ? titles[ index ].text : sprintf( __( 'Tab %d' ), ( 1 + index ) ) ) }*/}
            {/*className={ 'kt-title-text' }*/}
            {/*/>*/}
            {/*) }*/}
            {/*{ enableSubtitle && titles[ index ] && undefined !== titles[ index ].subText && '' !== titles[ index ].subText && (*/}
            {/*<div className="kb-tab-titles-wrap">*/}
            {/*<RichText.Content*/}
            {/*tagName="span"*/}
            {/*value={ ( titles[ index ] && titles[ index ].text ? titles[ index ].text : sprintf( __( 'Tab %d' ), ( 1 + index ) ) ) }*/}
            {/*className={ 'kt-title-text' }*/}
            {/*/>*/}
            {/*<RichText.Content*/}
            {/*tagName="span"*/}
            {/*value={ titles[ index ].subText }*/}
            {/*className={ 'kt-title-sub-text' }*/}
            {/*/>*/}
            {/*</div>*/}
            {/*) }*/}
            {/*{ titles[ index ] && titles[ index ].icon && 'right' === titles[ index ].iconSide && (*/}
            {/*<GenIcon className={ `kt-tab-svg-icon kt-tab-svg-icon-${ titles[ index ].icon } kt-title-svg-side-${ titles[ index ].iconSide }` } name={ titles[ index ].icon } size={ ( ! iSize ? '14' : iSize ) } icon={ ( 'fa' === titles[ index ].icon.substring( 0, 2 ) ? FaIco[ titles[ index ].icon ] : Ico[ titles[ index ].icon ] ) } htmltag="span" />*/}
            {/*) }*/}
            {/*</a>*/}
            {/*</li>*/}
          </Fragment>
      );
    };
    return (
        <div className={classes}>
          {'vtabs' === layout && (
              <div className={innerClasses}
                   style={{maxWidth: (maxWidth ? maxWidth + 'px' : 'none'),}}>
                <div class="row">
                  <div className="col-sm-12 col-md-3">
                    <ul className="nav nav-justified nav-tabs"
                        id={`tabs-list-${classId}`}
                        role="tablist"
                        aria-orientation="vertical">
                      {times(tabCount, n => renderTitles(n))}
                    </ul>
                  </div>
                  <div className="col">
                    <div className="tab-content" id={`tabs-content-${classId}`}>
                      <InnerBlocks.Content/>
                    </div>
                  </div>
                </div>
              </div>
          )}
          {'vtabs' !== layout && (
              <div className={innerClasses}
                   style={{maxWidth: (maxWidth ? maxWidth + 'px' : 'none'),}}>
                <ul className="nav nav-justified nav-tabs"
                    id={`tabs-list-${classId}`}
                    role="tablist">
                  {times(tabCount, n => renderTitles(n))}
                </ul>
                <div className="tab-content" id={`tabs-content-${classId}`}>
                  <InnerBlocks.Content/>
                </div>
              </div>
          )}
          {/*<ul className={ `kt-tabs-title-list${ ( 'tabs' === layout && widthType === 'percent' ? ' kb-tabs-list-columns kb-tab-title-columns-' + tabWidth[ 0 ] : '' ) }` }>*/}
          {/*{ times( tabCount, n => renderTitles( n ) ) }*/}
          {/*</ul>*/}
          {/*<div className="kt-tabs-content-wrap">*/}
          {/*<InnerBlocks.Content />*/}
          {/*</div>*/}
        </div>
    );
  }
}

export default InclindTabsSave;
