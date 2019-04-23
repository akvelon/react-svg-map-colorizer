import { Svg } from "../../dist/index"; // content of react-svg-map-colorizer npm package.
import * as React from "react";

export function MainComponent() {
	const [svgUrl, setSvgUrl] = React.useState<string>(null);
	const [selectedIds, updateSelection] = useSelectedIds();
	return (
		<div>
			{
				svgUrl
				? <Svg
						svgUrl={svgUrl}
						selectedIds={selectedIds}
						selectedColor="red"
						defaultColor ="white"
						onPolygonClick={updateSelection}
					/>
				: <input type="file" onChange={e => setSvgUrl(URL.createObjectURL(e.target.files[0]))} />
			}
		</div>
	);
}

function useSelectedIds(): [string[], (id: string) => void]
{
	const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

	function updateSelection(id: string)
	{
		const newIds = [];
		let hitId = false;
		selectedIds.forEach(sid => {
			if (sid === id)
			{
				hitId = true;
			}
			else
			{
				newIds.push(sid);
			}
		});

		if (!hitId) // if it wasn't removed from the list of selected elements then indeed need to select
		{
			newIds.push(id);
		}

		setSelectedIds(newIds);
	}

	return [selectedIds, updateSelection];
}