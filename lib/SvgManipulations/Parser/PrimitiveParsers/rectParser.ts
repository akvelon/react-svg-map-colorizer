import { SvgPrimitiveDesription } from "../ParserInterfaces";
import { basePrimitiveParser } from "./basePrimitiveParser";

/**
 * Attempts to parse svg element as rect.
 * @param domElement potentially rect element.
 */
function parseRect(domElement: SVGElement): SvgPrimitiveDesription
{
	if (!(domElement instanceof SVGRectElement))
	{
		return null;
	}

	return basePrimitiveParser(domElement, "rect", "fill", {
		stroke: "stroke",
		strokeWidth: "stroke-width",
		x: "x",
		y: "y",
		width: "width",
		height: "height",
		rx: "rx",
		ry: "ry",
	});
}

export
{
	parseRect
}