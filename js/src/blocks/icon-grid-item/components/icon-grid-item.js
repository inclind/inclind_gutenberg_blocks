// Setup the block.
const { Component } = wp.element;

/**
 * Create a Icon Grid Item wrapper Component.
 */
export default class IconGridItem extends Component {

    constructor( props ) {
        super( ...arguments );
    }

    render() {
        let className = 'col-sm-12 col-md';
        if (this.props.className !== 'wp-block-inclind-blocks-inclind-icon-grid-item') {
            className = className + ' ' + this.props.className
        }
        return (
            <div className={className}>
                { this.props.children }
            </div>
        );
    }
}
