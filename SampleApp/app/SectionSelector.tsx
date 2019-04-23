import * as React from "react";

interface SectionSelectorProps
{
	count: number;
	selectedIds: number[];
	updateSelection: (id: number) => void
}

function SectionSelector(props: SectionSelectorProps)
{
	const items = [];
	for (let i = 0; i < props.count; i++)
	{
		items.push(
			<div key={i}>
				<label>{i+1}</label>
				<input
					type="checkbox"
					checked={props.selectedIds.includes(i)}
					onChange={() => props.updateSelection(i)}
				/>
			</div>
		)
	}
	return (
		<div style={{display: "grid", gridTemplateColumns: "40px 40px", transform: "scale(3)", transformOrigin: "60% 0"}}>
			{ items }
		</div>
	);
}

export
{
	SectionSelectorProps,
	SectionSelector
}