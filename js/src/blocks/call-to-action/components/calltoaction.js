// Setup the block.
const { Component } = wp.element;

/**
 * Create a Infobox wrapper Component.
 */
export default class CallToAction extends Component {

    constructor( props ) {
        super( ...arguments );
    }

    render() {
        let className = 'call-to-action';
        if (this.props.className !== 'wp-block-inclind-blocks-inclind-call-to-action') {
            className = className + ' ' + this.props.className
        }
        return (
            <div className={className}>
                { this.props.children }
            </div>
        );
    }
}
