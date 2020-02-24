// Setup the block.
const {Component} = wp.element;

/**
 * Create a AdvancedBtn wrapper Component.
 */
export default class AdvancedBtn extends Component {

  constructor(props) {
    super(...arguments);
  }

  render() {
    let className = '';
    if (this.props.className !== 'wp-block-inclind-blocks-inclind-advanced-btn') {
      className = className + ' ' + this.props.className
    }
    return (
        <div className={className}>
          {this.props.children}
        </div>
    );
  }
}
