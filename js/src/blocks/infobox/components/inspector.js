// Setup the block.
const { Component } = wp.element;

// Import block components.
const { PanelBody } = wp.components;

// Import Inspector components.
const { InspectorControls } = wp.blockEditor;

/**
 * Create an Inspector Controls wrapper Component.
 */
export default class Inspector extends Component {

    constructor( props ) {
        super( ...arguments );
    }

    render() {
        return (
            <InspectorControls key="inspector">
                <PanelBody>
                </PanelBody>
            </InspectorControls>
        );
    }
}
