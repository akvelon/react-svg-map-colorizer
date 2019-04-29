import * as React from "react";
import { SvgPrimitiveDesription } from "./Parser/ParserInterfaces";
import { SvgPrimitiveEventHandlers } from "./SvgPrimitiveEventHandlers"

/**
 * Describes props for svg primitives renderer.
 */
interface SvgPrimitiveRendererProps extends SvgPrimitiveEventHandlers
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
     * Map of selected ids. The one with 'true' value would be highlighted with fillSelected color.
     */
    selectedIds: { [id: string]: boolean };
}

/**
 * Helper component needed to update the base elements rendered inside the <g> element.
 */
function SvgPrimitiveRenderer(props: SvgPrimitiveRendererProps)
{
    return (
        <>
            {props.primitives.map((p, i) =>
                p.createElement(getColorForPrimitive(p.id, i), { // explicitly map over so that don't fill with excess props.
                    onPrimitiveClick: props.onPrimitiveClick,
                    onPrimitiveEnter: props.onPrimitiveEnter,
                    onPrimitiveLeave: props.onPrimitiveLeave,
                    onPrimitiveMove: props.onPrimitiveMove
                }))
            }
        </>
    );

    /**
     * Gets the color value for primitive with specified id.
     */
    function getColorForPrimitive(id: string, ind: number)
    {
        return props.selectedIds[id]
            ? props.fillSelected
            : props.primitives[ind].initialColor;
    }
}

export
{
    SvgPrimitiveRendererProps,
    SvgPrimitiveRenderer,
}