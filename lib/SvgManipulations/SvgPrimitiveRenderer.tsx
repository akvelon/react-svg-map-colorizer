import * as React from "react";
import { SvgPrimitiveDesription } from "./Parser/ParserInterfaces";

/**
 * Describes props for svg primitives renderer.
 */
interface SvgPrimitiveRendererProps
{
    /**
     * Metadata describing primitives to render, doesn't expected to change.
     */
    primitives: SvgPrimitiveDesription[];
    /**
     * Color to fill the elements with IDs from selectedIds collection.
     */
    fillSelected: string;
    /**
     * Color to fill the elements with ID which are not listed in selectedIds collection.
     */
    fillNonSelected: string;
    /**
     * Map of selected ids. The one with 'true' value would be highlighted with fillSelected color.
     */
    selectedIds: { [id: string]: boolean };
    /**
     * Allows to specify on click handler for primitive element.
     */
    onPrimitiveClick?: (id: string) => any;
}

/**
 * Helper component needed to update the base elements rendered inside the <g> element.
 */
class SvgPrimitiveRenderer extends React.Component<SvgPrimitiveRendererProps, {}>
{
    /**
     * Used as perf tweak, we expect only color changes and onPrimitiveClick so reuse React elements whenewer possible.
     * This way both reducing memory footprint and GC overhead and help with reconciliation.
     */
    private primitivesCollection: React.ReactSVGElement[];
    private prevOnPrimitiveClick: (id: string) => any;

    render = () => <>{this.getPrimitives()}</>

    /**
     * The function which supplies us with elements we want to return in render.
     */
    private getPrimitives()
    {
        const prevUndefined = !this.prevOnPrimitiveClick;
        const currentUndefined = !this.props.onPrimitiveClick;
        const bothNotDefined = prevUndefined && currentUndefined; // A
        const areFunctionsTheSame = this.prevOnPrimitiveClick === this.props.onPrimitiveClick; // B
        const collectionEmpty = !this.primitivesCollection; // C
        const needFillPrimitivesFromScratch = collectionEmpty || !(bothNotDefined || areFunctionsTheSame); // Truth table simplification to y= C + (A + B)`

        this.prevOnPrimitiveClick = this.props.onPrimitiveClick;

        return needFillPrimitivesFromScratch
        ? this.fillPrimitives()
        : this.getUpdatedPrimitives();
    }

    /**
     * Tweaks collection of elements rendered into DOM based on expected color value.
     */
    private getUpdatedPrimitives()
    {
        // we assume that primitives order, count and position never change, if it is(in case another SVG loaded)
        // then this should be handled on level above by creating new renderer.
        for (let i = 0; i < this.primitivesCollection.length; i++)
        {
            const primitive = this.primitivesCollection[i];
            const primitiveDescription = this.props.primitives[i];
            const meta = primitiveDescription.getMetadata(primitive);
            const newColor = this.getColorForPrimitive(meta.id);
            if (newColor !== meta.color)
            {
                this.primitivesCollection[i] = primitiveDescription.createElement(newColor, this.props.onPrimitiveClick);
            }
        }

        return this.primitivesCollection;
    }

    /**
     * Fill the whole collection without reuse.
     */
    private fillPrimitives()
    {
        return this.primitivesCollection = this.props.primitives
            .map(p => p.createElement(this.getColorForPrimitive(p.id), this.props.onPrimitiveClick));
    }

    /**
     * Gets the color value for primitive with specified id.
     */
    private getColorForPrimitive = (id: string) =>
        this.props.selectedIds[id]
            ? this.props.fillSelected
            : this.props.fillNonSelected;
}

export
{
    SvgPrimitiveRendererProps,
    SvgPrimitiveRenderer,
}