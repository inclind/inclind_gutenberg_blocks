// Setup the block.
const {Component} = wp.element;

/**
 * Create a LinkCards wrapper Component.
 */
export default class LinkCards extends Component {

  constructor(props) {
    super(...arguments);
  }

  render() {
    let className = '';
    if (this.props.className !== 'wp-block-inclind-blocks-inclind-link-cards') {
      className = className + ' ' + this.props.className
    }
    return (
        <div className={className}>
          {this.props.children}
        </div>
    );
  }
}
