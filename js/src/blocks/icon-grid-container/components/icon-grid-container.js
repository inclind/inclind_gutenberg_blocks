// Setup the block.
const { Component } = wp.element;

/**
 * Create a Icon Grid wrapper Component.
 */
export default class IconGridContainer extends Component {

    constructor(props) {
        super( ...arguments );
    }

    render() {
        let className = 'icon-grid-with-text';
        if (this.props.className !== 'wp-block-inclind-blocks-inclind-icon-grid-container') {
            className = className + ' ' + this.props.className
        }
        return (
            <div className={className}>
                { this.props.children }
            </div>
        );
    }
}
