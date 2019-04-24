import * as React from "react";
import { SvgPrimitiveDesription } from "../ParserInterfaces";
import { SvgPrimitiveMetadata } from "../../SvgPrimitiveMetadata";

/**
 * Contains the information describing the polygon with colorizer.
 */
class PolygonDescription implements SvgPrimitiveDesription
{
	readonly id: string;
	private readonly stroke: string;
	private readonly strokeWidth: string;
	private readonly points: string

	constructor(id: string, stroke: string, strokeWidth: string, points: string)
	{
		this.id = id;
		this.stroke = stroke;
		this.strokeWidth = strokeWidth;
		this.points = points;
	}

	createElement(color: string, onClickHandler: (id: string) => any): React.ReactSVGElement
	{
		return React.createElement("polygon", {
			id: this.id,
			stroke: this.stroke,
			strokeWidth: this.strokeWidth,
			fill: color,
			points: this.points,
			onClick: onClickHandler ? () => onClickHandler(this.id) : undefined
		});

	}

	getMetadata(domElement: React.ReactSVGElement): SvgPrimitiveMetadata
	{
		return {
			id: this.id,
			color: domElement.props.fill
		};
	}
}

/**
 * Attempts to parse svg element as polygon.
 * @param domElement potentially polygon element.
 */
function parsePolygon(domElement: SVGElement): SvgPrimitiveDesription
{
	if (!(domElement instanceof SVGPolygonElement))
	{
		return null;
	}

	const id = domElement.getAttribute("id");
	const stroke = domElement.getAttribute("stroke");
	const strokeWidth = domElement.getAttribute("stroke-width");
	const points = domElement.getAttribute("points");

	return new PolygonDescription(id, stroke, strokeWidth, points);
}

export
{
	parsePolygon
}