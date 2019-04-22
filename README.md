# What is the react-svg-map-colorizer?
This is React component which allows to use SVG maps. 

SVG maps are special SVG images which consists of polygons with provided id, so when loaded to DOM as `<svg>` element it possible to select the particular polygon and set it `fill` property to highlight this polygon on resulted image.

The `react-svg-map-colorizer` not just hide DOM manipulations on SVG element within beauty Component interface but indeed utilizes React for rendering the entire DOM subtree, so benefit from power of VDOM and batched DOM updates which the React does.

# When to use this component?
1. If you have React based app, you likely want just declare you layout and not worry about underlying DOM manipulations like loading SVG not to `<img>` but to `<svg>` which support per element changes.
2. If you image contains a lot of polygons and it expected to update a lot doing this directly per element basis could be slow. The component can do batched updates, so works good enough even when updating thousands of polygons. So it might worth to include the component (and React dependencies) for such task even to non React app, so that avoid mess of manually tackling with diffs and batch updates.

# What are the limitations?
1. Currently there is support for highlighting the specified polygons with one color and filling left with another color.

2. Implementation requires the place for `mounting` the React tree. So SVG image format is restricted to one, where all polygons which need updates should be included into `<g id="data">` svg group. It also expected that aforementioned group will contain only polygons.

# How to use the component?
### Within React app
```tsx
import * as React from "react";
import { Svg } from "react-svg-map-colorizer";


function MyComponentNeedSvg {
	const svgProps = {
		svgUrl: "svgUrl",
		selectedColor : "red",
		defaultColor : "white",
		selectedIds : ["polygonId1", "polygonId2"]
	};

	return  <Svg {...svgProps} />;
}
```
### Within non React app

```ts
import * as ReactDom from "react-dom";
import * as React from "react";
import { Svg } from "react-svg-map-colorizer";

// The place for rendering react svg component.
const svgContainer = document.getElementById("containerId");

// To mount and update component.
function RenderColoredSvg {
	const svgProps = {
		svgUrl: "svgUrl",
		selectedColor : "red"
		defaultColor : "white"
		selectedIds : ["polygonId1", "polygonId2"]
	};


	// it fine to call this each time update needed.
	ReactDom.render(React.createElement(Svg, svgProps), svgContainer);
}

// When you done with svg and need remove container this 
// method should be called to properly cleanup.
function unmountSvgComponent () {
	ReactDom.unmountComponentAtNode(svgContainer);
}
```

### Svg Props description
| Property | Description |
|----------| ----------- |
|`svgUrl`  | The url to svg image. If you have file, you can create one with ` URL.createObjectUrl(file);`, please note to keep the url same for the same image, otherwise new component would created inside which would cause performance degradation for render.|
|`selectedColor`| The fill color for polygons with ids listed in `selectedIds`|
|`defaultColor`| The fill color for polygons which are not in the list of `selectedIds`|
|`selectedIds`| Array of polygon ids to be filled with `selectedColor`, polygons which are not listed here would be filled with `defaultColor`.