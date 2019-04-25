import { SvgPrimitiveDesription } from "../ParserInterfaces";
import { basePrimitiveParser } from "./basePrimitiveParser";

/**
 * Attempts to parse svg element as line.
 * @param domElement potentially line element.
 */
function parseLine(domElement: SVGElement): SvgPrimitiveDesription
{
	if (!(domElement instanceof SVGLineElement))
	{
		return null;
	}

	return basePrimitiveParser(domElement, "line", "stroke", {
		fill: "fill",
		strokeWidth: "stroke-width",
		x1: "x1",
		x2: "x2",
		y1: "y1",
		y2: "y2"
	});
}

export
{
	parseLine
}