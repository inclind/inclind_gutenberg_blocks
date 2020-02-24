import PropTypes from 'prop-types';
import Ico from "./svgicons";

const {createElement} = wp.element;

const walkChildren = (children) => {
  return children.map((child, idx) => {
    const {nE, aBs: attribsMap, children: gchildren = null} = child;

    //fill, stroke
    const attribs = Object.keys(attribsMap)
        .filter(key => key !== 'fill' && key !== 'stroke' && attribsMap[key] !== 'none')
        .reduce((partial, key) => {

          //partial[camelcase(key)] = attribsMap[key];
          partial[key] = attribsMap[key];
          return partial;
        }, {});
    //special case, it has fill and stroke at the same time
    let merge = {};
    if (attribsMap.fill === 'none' && attribsMap.stroke) {
      merge = {fill: 'none', stroke: 'currentColor'};
    }
    return createElement(nE, {key: idx, ...attribs, ...merge}, gchildren === null ? gchildren : walkChildren(gchildren));
  });
};

export const GenIcon = (props) => {
  const {style, className, icon, name, htmltag, ...others} = props;
  const type = name.substring(0, 2);
  const lineIcon = (type && 'fe' == type ? true : false);
  const fill = (lineIcon ? 'none' : 'currentColor');
  const strokeWidth = (lineIcon ? props.strokeWidth : undefined);
  const stroke = (lineIcon ? 'currentColor' : undefined);
  const strokeLinecap = (lineIcon ? 'round' : undefined);
  const strokeLinejoin = (lineIcon ? 'round' : undefined);
  const HtmlTagOut = (htmltag ? htmltag : 'div');


  const strokeWidth2 = ('bb' === type ? props.strokeWidth : undefined);

  if ('si' === type) {
    return (
        <HtmlTagOut style={{
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center', ...style
        }} className={className}>
          {icon}
        </HtmlTagOut>
    );
  }
  else if ('bb' === type) {
    return (
        <HtmlTagOut style={{
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center', ...style
        }} className={className}>
          <svg width="12px" height="18px" viewBox="0 0 12 18" version="1.1"
               xmlns="http://www.w3.org/2000/svg"
               xmlns:xlink="http://www.w3.org/1999/xlink">
            <g stroke="none" stroke-width="1" fill-rule="evenodd">
              <g transform="translate(-261.000000, -20.000000)">
                <g transform="translate(0.724974, 0.500000)">
                  <g transform="translate(0.511719, 0.000000)">
                    <g transform="translate(260.436180, 19.500000)">
                      <path
                          d="M10.0999102,8.0925637 L2.13967405,0.420412253 C1.66099873,-0.0409395785 0.882900332,-0.0409395785 0.404302242,0.420412253 C-0.0742958467,0.881764085 -0.0743730773,1.63170273 0.404302242,2.09298012 L7.50048237,8.93234611 L0.404302242,15.7717121 C-0.0743730773,16.2330639 -0.0743730773,16.9830026 0.404302242,17.44428 C0.882977562,17.9055574 1.66107596,17.9056318 2.13967405,17.44428 L10.0999102,9.77451046 C10.3428777,9.54033607 10.4607316,9.23515012 10.4582603,8.93465361 C10.4582603,8.6272346 10.3404063,8.32435615 10.0999102,8.0925637 Z"></path>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </HtmlTagOut>
    );
  }
  else {
    return (
        <HtmlTagOut style={{
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center', ...style
        }} className={className}>
          <svg style={{display: 'inline-block', verticalAlign: 'middle'}}
               viewBox={(!props.icon ? '0 0 24 24' : props.icon.vB)}
               height={props.size} width={props.size} fill={fill}
               stroke={stroke} xmlns={props.xmlns} stroke-width={strokeWidth}
               stroke-linecap={strokeLinecap} stroke-linejoin={strokeLinejoin}>
            {props.title ? <title>{props.title}</title> : null}
            {props.icon && (
                walkChildren(props.icon.cD)
            )}
          </svg>
        </HtmlTagOut>
    );
  }
};

GenIcon.defaultProps = {
  size: 24,
  xmlns: 'http://www.w3.org/2000/svg',
  strokeWidth: 2,
  htmltag: 'div',
};

GenIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object,
  className: PropTypes.string,
};

export default GenIcon;