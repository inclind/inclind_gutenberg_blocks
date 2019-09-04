// Setup the block.
const { Component } = wp.element;

/**
 * Create a Accordion wrapper Component.
 */
export default class Accordion extends Component {

    constructor(props) {
        super( ...arguments );
    }

    render() {
        let className = 'accordion';
        if (this.props.className !== 'wp-block-inclind-blocks-inclind-accordion') {
            className = className + ' ' + this.props.className
        }
        return (
            <div className={className}>
                { this.props.children }
            </div>
        );
    }
}
