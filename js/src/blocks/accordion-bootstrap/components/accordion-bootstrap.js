// Setup the block.
const {Component} = wp.element;

/**
 * Create a AccordionBootstrap wrapper Component.
 */
export default class AccordionBootstrap extends Component {

  constructor(props) {
    super(...arguments);
  }

  render() {
    let className = '';
    if (this.props.className !== 'wp-block-inclind-blocks-accordion-bootstrap') {
      className = className + ' ' + this.props.className
    }
    return (
        <div className={className}>
          {this.props.children}
        </div>
    );
  }
}
