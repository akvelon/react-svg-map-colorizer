/**
 * Describes the all event handlers which are supported for primitive.
 */
export interface SvgPrimitiveEventHandlers
{
    /**
     * Allows to specify on click handler for primitive.
     */
	onPrimitiveClick: (id: string, event: React.MouseEvent<SVGElement>) => any;
    /**
     * Allows to specitfy the onMouseEnter handler for primitive.
     */
	onPrimitiveEnter: (id: string, event: React.MouseEvent<SVGElement>) => any;
    /**
     * Allows to specitfy the onMouseLeave handler for primitive.
     */
	onPrimitiveLeave: (id: string, event: React.MouseEvent<SVGElement>) => any;
    /**
     * Allows to specitfy the onMouseMove handler for primitive.
     */
	onPrimitiveMove: (id: string, event: React.MouseEvent<SVGElement>) => any;
}

/**
 * All events handlers as optional.
 */
export type SvgPrimitiveEventHandlersPartial = {
	[P in keyof SvgPrimitiveEventHandlers]?: SvgPrimitiveEventHandlers[P];
}