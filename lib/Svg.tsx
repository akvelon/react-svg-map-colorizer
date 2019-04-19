import * as React from "react";
import { SvgRendererProps as SvgProps, SvgRenderer } from "./SvgRenderer";

/**
 * The client ready Svg component, it takes care to remount underlying component in case Svg changed so that ensure robust behaviour.
 */
const Svg = (props: SvgProps) => <SvgRenderer {...props} key={props.svgUrl} />;

export
{
    SvgProps,
    Svg
}