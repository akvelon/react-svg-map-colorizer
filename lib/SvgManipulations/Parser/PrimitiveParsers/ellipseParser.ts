import { SvgPrimitiveDesription } from "../ParserInterfaces";
import { basePrimitiveParser } from "./basePrimitiveParser";

/**
 * Attempts to parse svg element as ellipse.
 * @param domElement potentially ellipse element.
 */
function parseEllipse(domElement: SVGElement): SvgPrimitiveDesription
{
	if (!(domElement instanceof SVGEllipseElement))
	{
		return null;
	}

	return basePrimitiveParser(domElement, "ellipse", "fill", {
		stroke: "stroke",
		strokeWidth: "stroke-width",
		cx: "cx",
		cy: "cy",
		rx: "rx",
		ry: "ry"
	});
}

export
{
	parseEllipse
}