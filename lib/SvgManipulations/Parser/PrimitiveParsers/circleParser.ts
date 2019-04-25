import { SvgPrimitiveDesription } from "../ParserInterfaces";
import { basePrimitiveParser } from "./basePrimitiveParser";

/**
 * Attempts to parse svg element as circle.
 * @param domElement potentially circle element.
 */
function parseCircle(domElement: SVGElement): SvgPrimitiveDesription
{
	if (!(domElement instanceof SVGCircleElement))
	{
		return null;
	}

	return basePrimitiveParser(domElement, "circle", "fill", {
		stroke: "stroke",
		strokeWidth: "stroke-width",
		cx: "cx",
		cy: "cy",
		r: "r"
	});
}

export
{
	parseCircle
}