import * as React from "react";
import { SvgPrimitiveDesription } from "../ParserInterfaces";
import { SvgPrimitiveMetadata } from "../../SvgPrimitiveMetadata";
import { SvgPrimitiveEventHandlers } from "../../SvgPrimitiveEventHandlers";

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
	readonly initialColor: string;
	private readonly element: keyof React.ReactSVG;
	private readonly colorProp: SvgColor;
	private readonly fixedAttrs: React.SVGAttributes<SVGElement>;

	constructor(id: string,
		element: keyof React.ReactSVG,
		colorProp: SvgColor,
		initialColor: string,
		fixedAttrs: React.SVGAttributes<SVGElement>
	)
	{
		this.id = id;
		this.element = element;
		this.colorProp = colorProp;
		this.fixedAttrs = fixedAttrs;
		this.initialColor = initialColor;
	}

	createElement(color: string, eventHandlers: SvgPrimitiveEventHandlers): React.ReactSVGElement
	{
		const eventHandlersPropsPart = {};
		const reactEventHandlers = this.transformToReactPropsNames(eventHandlers);
		Object.keys(reactEventHandlers).forEach(k => {
			if (reactEventHandlers[k]) {
				eventHandlersPropsPart[k] = (e: React.MouseEvent<SVGElement>) => reactEventHandlers[k](this.id, e);
			}
		});

		return React.createElement(this.element, {
			...this.fixedAttrs,
			id: this.id,
			key: this.id,
			[this.colorProp]: color,
			...eventHandlersPropsPart,
		});
	}

	getMetadata(domElement: React.ReactSVGElement): SvgPrimitiveMetadata
	{
		return {
			id: this.id,
			color: domElement.props[this.colorProp]
		};
	}

	private getReactFunctionName(arg: keyof SvgPrimitiveEventHandlers): string
	{
		switch (arg)
		{
			case "onPrimitiveClick": return "onClick";
			case "onPrimitiveEnter": return "onMouseEnter";
			case "onPrimitiveLeave": return "onMouseLeave";
			case "onPrimitiveMove": return "onMouseMove";
			default: const _exhaustiveCheck: never = arg; // this way we sure to exhaustive cover props.
				return _exhaustiveCheck;
		}
	}
	private transformToReactPropsNames(props: SvgPrimitiveEventHandlers)
	{
		const returnProps = {}
		Object.keys(props).forEach((k: keyof SvgPrimitiveEventHandlers) =>
		{
			returnProps[this.getReactFunctionName(k)] = props[k];
		});

		return returnProps;
	}
}
