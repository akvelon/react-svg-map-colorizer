import { Parser, SvgPrimitiveDesription } from "./ParserInterfaces";
import { parsePolygon } from "./PrimitiveParsers/polygonParser";
import { parseRect } from "./PrimitiveParsers/rectParser";
import { parseCircle } from "./PrimitiveParsers/circleParser";
import { parseEllipse } from "./PrimitiveParsers/ellipseParser";
import { parseLine } from "./PrimitiveParsers/lineParser";
import { parsePolyline } from "./PrimitiveParsers/polylineParser";

/**
 * Here we list all of supported parsers.
 */
const primitiveParsers: Parser[] = [
	parsePolygon,
	parseRect,
	parseCircle,
	parseEllipse,
	parseLine,
	parsePolyline,
];

/**
 * Parses children of passed group in order to create object describing these elements within app.
 * @param group svg <g> element to parse.
 */
function parseSvgGroup(group: SVGGElement): SvgPrimitiveDesription[]
{
	const primitives: SvgPrimitiveDesription[] = [];
	Array.from(group.children).forEach(domNode =>
	{
		if (domNode instanceof SVGElement)
		{
			for (let i = 0; i < primitiveParsers.length; i++)
			{
				const primitive = primitiveParsers[i](domNode);
				if (primitive !== null)
				{
					primitives.push(primitive);
					break;
				}
			}
		}
	});

	return primitives;
}

export
{
	parseSvgGroup
}