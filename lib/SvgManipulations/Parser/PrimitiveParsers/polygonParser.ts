import { SvgPrimitiveDesription } from "../ParserInterfaces";
import { basePrimitiveParser } from "./basePrimitiveParser";

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

	return basePrimitiveParser(domElement, "polygon", "fill", {
		stroke: "stroke",
		strokeWidth: "stroke-width",
		points: "points"
	});
}

export
{
	parsePolygon
}