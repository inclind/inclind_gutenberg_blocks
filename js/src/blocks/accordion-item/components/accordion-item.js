// Setup the block.
const { Component } = wp.element;

/**
 * Create a Card wrapper Component.
 */
export default class AccordionItem extends Component {

    constructor( props ) {
        super( ...arguments );
    }

    makeId (length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    render() {
        if (this.props.attributes.itemId === undefined || this.props.attributes.itemId === '') {
            this.props.attributes.itemId = this.makeId(10);
        }
        let className = 'card';
        if (this.props.className !== 'wp-block-inclind-blocks-inclind-accordion-item') {
            className = className + ' ' + this.props.className
        }
        return (
            <div className={className}>
                { this.props.children }
            </div>
        );
    }
}
