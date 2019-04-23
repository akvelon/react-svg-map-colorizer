import { Svg } from "../../dist/index"; // content of react-svg-map-colorizer npm package.
import * as React from "react";
import { SectionSelector } from "./SectionSelector";

export function MainComponent() {
	const [svgUrl, setSvgUrl] = React.useState<string>(null);
	const [selectedIds, updateSelection] = useSelectedIds();
	return (
		<div style={{display: "flex", alignItems: "flex-start", justifyContent: "space-around", width: "50vw", marginLeft: "25vw"}}>
			{
				svgUrl
				? <>
						<Svg svgUrl={svgUrl} selectedIds={selectedIds.map(i => i.toString())} selectedColor={"red"} defaultColor = "white"/>
						<SectionSelector selectedIds={selectedIds} count={6} updateSelection={updateSelection}/>
					</>
				: <input type="file" onChange={e => setSvgUrl(URL.createObjectURL(e.target.files[0]))} />
			}
		</div>
	);
}

function useSelectedIds(): [number[], (id: number) => void]
{
	const [selectedIds, setSelectedIds] = React.useState<number[]>([]);

	function updateSelection(id: number)
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

		if (!hitId) // if not hit then need to select
		{
			newIds.push(id);
		}

		setSelectedIds(newIds);
	}

	return [selectedIds, updateSelection];
}