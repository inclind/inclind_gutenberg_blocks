// Setup the block.
const {Component} = wp.element;

/**
 * Create a Tab wrapper Component.
 */
export default class Tab extends Component {

  constructor(props) {
    super(...arguments);
  }

  render() {
    let className = '';

    if (this.props.className !== 'wp-block-inclind-blocks-inclind-tab') {
      className = className + ' ' + this.props.className
    }

    return (
        <div className={className}>
          {this.props.children}
        </div>
    );
  }
}
