// Setup the block.
const {Component} = wp.element;

/**
 * Create a Pane wrapper Component.
 */
export default class Pane extends Component {

  constructor(props) {
    super(...arguments);
  }

  render() {
    let className = '';

    // if (this.props.className !== 'wp-block-inclind-blocks-inclind-pane') {
    //   className = className + ' card ' + this.props.className
    // }

    return (
        <div className={className}>
          {this.props.children}
        </div>
    );
  }
}
