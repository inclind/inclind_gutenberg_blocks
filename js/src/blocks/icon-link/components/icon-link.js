// Setup the block.
const { Component } = wp.element;

/**
 * Create a Icon Link wrapper Component.
 */
export default class IconLink extends Component {

    constructor( props ) {
        super( ...arguments );
    }

    render() {
        let className = '';
        if (this.props.className !== 'wp-block-inclind-blocks-inclind-icon-link') {
            className = className + '' + this.props.className
        }
        return (
            <div className={className}>
                { this.props.children }
            </div>
        );
    }
}
