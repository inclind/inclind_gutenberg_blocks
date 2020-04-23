// Setup the block.
const { Component } = wp.element;

// Import Inspector components.
const { InspectorControls } = wp.blockEditor;

// Import block components.
const { PanelBody } = wp.components;

/**
 * Create an Inspector Controls wrapper Component.
 */
export default class Inspector extends Component {

    constructor( props ) {
        super( ...arguments );
    }

    render() {

        // Setup the attributes
        const {} = this.props.attributes;

        return (
            <InspectorControls key="inspector">
                <PanelBody>
                </PanelBody>
            </InspectorControls>
        );
    }
}
