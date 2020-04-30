// Setup the block.
const {Component} = wp.element;

/**
 * Create an Icon Link wrapper Component.
 */
export default class IconLink extends Component {

  constructor(props) {
    super(...arguments);
  }

  render() {
    const {
      uniqueID,
    } = this.props.attributes;

    let className = 'wp-block-inclind-blocks-inclind-icon-link';

    if (this.props.className !== 'wp-block-inclind-blocks-inclind-icon-link') {
      className = className + ' ' + this.props.className;
    }
    return (
        <div id={`icon-link${uniqueID}`} className={className}>
          {this.props.children}
        </div>
    );
  }
}
