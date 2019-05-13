import { Svg } from "../../dist/index"; // content of react-svg-map-colorizer npm package.
import * as React from "react";
import { Tooltip, TooltipProps } from "./Tooltip";
type StringDictionary = { [id: string]: string };
export function MainComponent()
{
	const [svgUrl, setSvgUrl] = React.useState<string>(null);
	const [selectedIds, updateSelection] = useSelectedIds();
	const [tooltipData, setTooltip, clearTooltip] = useSelectedIdTooltip(selectedIds);
	return (
		<div>
			{
				svgUrl
					? <Svg
						svgUrl={svgUrl}
						idColorMap={selectedIds}
						onPrimitiveClick={updateSelection}
						onPrimitiveMove={setTooltip}
						onPrimitiveLeave={clearTooltip}
					/>
					: <input type="file" onChange={e => setSvgUrl(URL.createObjectURL(e.target.files[0]))} />
			}
			{tooltipData && <Tooltip {...tooltipData}/>}
		</div>
	);
}

function useSelectedIdTooltip(selectedIds: StringDictionary): [TooltipProps, (id: string, event: React.MouseEvent<SVGElement, MouseEvent>) => void, () => void]
{
	const [tooltipInfo, setTooltipInfo] = React.useState(null);
	function setTooltip(id: string, event: React.MouseEvent<SVGElement, MouseEvent>)
	{
		setTooltipInfo({
			id,
			x: event.clientX,
			y: event.clientY
		});
	}

	function clearTooltip()
	{
		setTooltipInfo(null);
	}

	const tooltipData = tooltipInfo
	? {
		x: tooltipInfo.x,
		y: tooltipInfo.y,
		dataToRender: [
		{
			key: "Id",
			value: tooltipInfo.id,
		},
		{
			key: "Selected",
			value: (!!selectedIds[tooltipInfo.id]).toString()
		}
	]}
	: null;

	return [tooltipData, setTooltip, clearTooltip];
}

function useSelectedIds(): [StringDictionary, (id: string) => void]
{
	const [selectedIds, setSelectedIds] = React.useState<StringDictionary>({ "*": "lightgray" });

	function updateSelection(id: string)
	{
		const newIds = {};
		let hitId = false;
		Object.keys(selectedIds).forEach(sid =>
		{
			if (sid === id)
			{
				hitId = true;
			}
			else
			{
				newIds[sid] = selectedIds[sid];
			}
		});

		if (!hitId) // if it wasn't removed from the list of selected elements then indeed need to select
		{
			newIds[id] = getRandomColor();
		}

		setSelectedIds(newIds);

		function getRandomColor() // https://stackoverflow.com/a/1484514
		{
			var letters = '0123456789ABCDEF';
			var color = '#';
			for (var i = 0; i < 6; i++)
			{
				color += letters[Math.floor(Math.random() * 16)];
			}
			return color;
		}
	}

	return [selectedIds, updateSelection];
}