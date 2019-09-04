// Setup the block.
const { Component } = wp.element;

/**
 * Create a Infobox wrapper Component.
 */
export default class Infobox extends Component {

    constructor( props ) {
        super( ...arguments );
    }

    render() {
        let className = 'infobox mb-0 row';
        if (this.props.className !== 'wp-block-inclind-blocks-inclind-infobox') {
            className = className + ' ' + this.props.className
        }
        return (
            <div className={className}>
                { this.props.children }
            </div>
        );
    }
}
