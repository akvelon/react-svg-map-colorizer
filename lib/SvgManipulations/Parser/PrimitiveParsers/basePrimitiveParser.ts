import { SvgPrimitiveDesription } from "../ParserInterfaces";
import { PrimitiveDescription, SvgColor } from "./PrimitiveDescription";

/**
 * Helper function needed to parse svg primitive generic way.
 */
export function basePrimitiveParser(
	domElement: SVGElement, // the dom element to parse
	element: keyof React.ReactSVG, // react type to create
	color: SvgColor, // element color prop
	fixedAttrsMap: { [key in keyof React.SVGAttributes<SVGElement>]: string }, // props to be populated for particular svg primitive.
): SvgPrimitiveDesription
{
	const fixedAttrs: React.SVGAttributes<SVGAElement> = {};

	Object.keys(fixedAttrsMap).forEach(k => fixedAttrs[k] = domElement.getAttribute(fixedAttrsMap[k]));
	const id = domElement.getAttribute("id");
	const initialColor = domElement.getAttribute(color);

	return new PrimitiveDescription(id, element, color, initialColor, fixedAttrs);
}
