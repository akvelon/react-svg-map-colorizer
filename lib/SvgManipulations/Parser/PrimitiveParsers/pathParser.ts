import { SvgPrimitiveDesription } from "../ParserInterfaces";
import { SvgColor } from "./PrimitiveDescription";
import { basePrimitiveParser } from "./basePrimitiveParser";

/**
 * Attempts to parse svg element as path.
 * @param domElement potentially path element.
 */
function parsePath(domElement: SVGElement): SvgPrimitiveDesription
{
	if (!(domElement instanceof SVGPathElement))
	{
		return null;
	}

	// Decide what is color for path.
	const fillProp = domElement.getAttribute("fill");
	let colorProp: SvgColor;
	let nonColorProp: SvgColor;
	if (!fillProp || fillProp === "transparent" || fillProp === "none"){

		colorProp = "stroke";
		nonColorProp = "fill";
	}
	else
	{
		colorProp = "fill";
		nonColorProp = "stroke";
	}


	return basePrimitiveParser(domElement, "path", colorProp, {
		[nonColorProp]: nonColorProp,
		strokeWidth: "stroke-width",
		d: "d",
	});
}

export
{
	parsePath
}