import * as React from "react";
import { PolygonDef } from "./PolygonDef";

/**
 * Describes props for polygon renderer.
 */
interface PolygonsRendererProps
{
    /**
     * Metadata describing initial state of polygons, doesn't expected to change.
     */
    polygons: PolygonDef[];
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
}

/**
 * Helper component needed to update the polygons rendered inside the <g> element.
 */
class PolygonsRenderer extends React.Component<PolygonsRendererProps, {}>
{
    /**
     * Used as perf tweak, we expect only color changes so reuse React elements whenewer possible.
     * This way both reducing memory footprint and GC overhead and help with reconciliation.
     */
    private polygonsCollection: React.ReactSVGElement[];

    render = () => <>{this.getPolygons()}</>

    /**
     * The function which supplies us with elements we want to return in render.
     */
    private getPolygons = () => this.polygonsCollection
        ? this.getUpdatedPolygons()
        : this.fillPolygonsInitially(); // First render.

    /**
     * Tweaks collection of elements rendered into DOM based on expected color value.
     */
    private getUpdatedPolygons()
    {
        // we assume that polygons order, count and position never change, if it is(in case another SVG loaded)
        // then this should be handled on level above by creating new renderer.
        for (let i = 0; i < this.polygonsCollection.length; i++)
        {
            const polygon = this.polygonsCollection[i];
            const { id: pid, points: ppoints, fill: pfill } = polygon.props;
            const fill = this.getFillValueForPolygon(pid);
            if (fill !== pfill)
            {
                this.polygonsCollection[i] = this.createPolygonMetadata(pid, ppoints, fill);
            }
        }

        return this.polygonsCollection;
    }

    /**
     * Nothing to tweak, so we just fill polygons collection for first render.
     */
    private fillPolygonsInitially()
    {
        return this.polygonsCollection = this.props.polygons.map(def =>
            this.createPolygonMetadata(def.id, def.points, this.getFillValueForPolygon(def.id))
        );
    }

    /**
     * Helper function used to unify creation of polygons definition for React VDOM.
     * @param id polygon id.
     * @param points polygon points.
     * @param fill polygon fill color.
     */
    private createPolygonMetadata(id: string, points: string, fill: string): React.ReactSVGElement
    {
        return React.createElement("polygon", { // doesn't work with tsx for some reason
            id,
            key: id,
            points,
            stroke: "black",
            fill
        });
    }

    /**
     * Gets the fill value for polygon with specified if.
     */
    private getFillValueForPolygon = (id: string) =>
        this.props.selectedIds[id]
            ? this.props.fillSelected
            : this.props.fillNonSelected;
}

export
{
    PolygonsRendererProps,
    PolygonsRenderer,
}