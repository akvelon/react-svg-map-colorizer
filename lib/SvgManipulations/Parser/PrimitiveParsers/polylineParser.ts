import { SvgPrimitiveDesription } from "../ParserInterfaces";
import { basePrimitiveParser } from "./basePrimitiveParser";

/**
 * Attempts to parse svg element as polyline.
 * @param domElement potentially polyline element.
 */
function parsePolyline(domElement: SVGElement): SvgPrimitiveDesription
{
	if (!(domElement instanceof SVGPolylineElement))
	{
		return null;
	}

	return basePrimitiveParser(domElement, "polyline", "stroke", {
		fill: "fill",
		strokeWidth: "stroke-width",
		points: "points"
	});
}

export
{
	parsePolyline
}