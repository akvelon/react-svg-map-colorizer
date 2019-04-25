import * as React from "react";
import { SvgPrimitiveDesription } from "../ParserInterfaces";
import { SvgPrimitiveMetadata } from "../../SvgPrimitiveMetadata";

/**
 * The prop name interpreted as color.
 */
export type SvgColor = "fill"|"stroke";

/**
 * Contains the information describing how to work with primitive.
 */
export class PrimitiveDescription implements SvgPrimitiveDesription
{
	readonly id: string;
	private readonly element: keyof React.ReactSVG;
	private readonly colorProp: SvgColor;
	private readonly fixedAttrs: React.SVGAttributes<SVGElement>;

	constructor(id: string,
		element: keyof React.ReactSVG,
		colorProp: SvgColor,
		fixedAttrs: React.SVGAttributes<SVGElement>
	)
	{
		this.id = id;
		this.element = element;
		this.colorProp = colorProp;
		this.fixedAttrs = fixedAttrs;
	}

	createElement(color: string, onClickHandler: (id: string) => any): React.ReactSVGElement
	{
		return React.createElement(this.element, {
			...this.fixedAttrs,
			id: this.id,
			onClick: onClickHandler ? () => onClickHandler(this.id) : undefined,
			[this.colorProp]: color,
		});
	}

	getMetadata(domElement: React.ReactSVGElement): SvgPrimitiveMetadata
	{
		return {
			id: this.id,
			color: domElement.props[this.colorProp]
		};
	}
}