import * as React from "react";

/**
 * Defines the contract for data row to be rendered in the tooltip.
 */
export interface TooltipDataItem
{
    /**
     * Key to be rendered on left, expected to be consistent for similar elements.
     */
    key: string;
    /**
     * Value to be rendered on right, expected to be distinguished.
     */
    value: string
}

/**
 * Props for Tooltip component.
 */
export interface TooltipProps
{
    /**
     * The X pointer position for which tooltip needs to be rendered.
     */
    x: number;
    /**
     * The Y pointer position for which tooltip needs to be rendered.
     */
    y: number;
    /**
     * Describes data need to be rendered in the tooltip.
     */
    dataToRender: TooltipDataItem[];
}

/**
 * Just some value which looks great with default pointer.
 */
const PRETTY_OFFSET = 15;

/**
 * Component representing tooltip.
 */
export function Tooltip(props: TooltipProps)
{
    const totalX = document.body.clientWidth;
    const totalY = document.body.clientHeight;
    // X and Y are calculated the way so that tooltip was visible. So it:
    // 1) Right to the pointer if the pointer left to the pivot, left to the pointer otherwise.
    // 2) Bottom to the pointer if the pointer above the middle, top otherwise.
    // 2/3 seems to be efficient to cover most of the cases with right-and-bottom-to-pointer tooltip.
    const pivotX = totalX * 2 / 3;
    const pivotY = totalY * 2 / 3;
    const xPos = props.x < pivotX ? { left: props.x + PRETTY_OFFSET } : { right: totalX - props.x + PRETTY_OFFSET };
    const yPos = props.y < pivotY ? { top: props.y + PRETTY_OFFSET } : { bottom: totalY - props.y + PRETTY_OFFSET };
    return (
        <table
            style={{
                position: "absolute",
                background: "gray",
                color: "white",
                boxShadow: "10px 10px 5px 0 darkgray",
                padding: PRETTY_OFFSET,
                ...xPos,
                ...yPos
            }}
        >
            <tbody>
                {
                    props.dataToRender.map(element =>
                        <tr key={element.key}>
                            <td style={{ fontWeight: 600 }}>{element.key}:</td>
                            <td>{element.value}</td>
                        </tr>)
                }
            </tbody>
        </table>
    );
}