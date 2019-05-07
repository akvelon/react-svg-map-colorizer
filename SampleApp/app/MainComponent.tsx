import { Svg } from "../../dist/index"; // content of react-svg-map-colorizer npm package.
import * as React from "react";
type StringDictionary = { [id: string]: string };
export function MainComponent()
{
	const [svgUrl, setSvgUrl] = React.useState<string>(null);
	const [selectedIds, updateSelection] = useSelectedIds();
	return (
		<div>
			{
				svgUrl
					? <Svg
						svgUrl={svgUrl}
						idColorMap={selectedIds}
						onPrimitiveClick={updateSelection}
					/>
					: <input type="file" onChange={e => setSvgUrl(URL.createObjectURL(e.target.files[0]))} />
			}
		</div>
	);
}

function useSelectedIds(): [StringDictionary, (id: string) => void]
{
	const [selectedIds, setSelectedIds] = React.useState<StringDictionary>({"*": "lightgray"});

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
			newIds[id] =  getRandomColor();
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