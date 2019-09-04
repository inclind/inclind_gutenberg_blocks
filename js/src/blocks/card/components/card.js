// Setup the block.
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';

/**
 * Create a Card wrapper Component.
 */
export default class Card extends Component {

    constructor( props ) {
        super( ...arguments );
    }

    render() {
        const { cardStyle } = this.props.attributes;
        let className = 'card ' + cardStyle;
        if (this.props.className !== 'wp-block-inclind-blocks-inclind-card') {
            className = className + ' ' + this.props.className
        }
        return (
            <div className={className}>
                { this.props.children }
            </div>
        );
    }
}
