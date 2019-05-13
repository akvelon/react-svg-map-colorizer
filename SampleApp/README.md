# Sample app
The sample app demonstrates how we can create app which uses the component.

# How to build the app
1. Build the package content itself by calling `npx tsc` followed by `npm i` in the repo root
   1. In reality you will use the `react-svg-map-colorizer` npm package, but this demo app utilizes the result of build for the package itself so that ensure the correct version being used.
2. Build the app itself
   1. Go to SampleApp root
   2. Restore packages for the sample app with `npm i` in
   3. Execute `npx webpack --config webpack.config.js`

# Run the app
1. Once built, go to SampleApp root and double click on `index.html` so that open it in the browser.
2. Then select `SvgSample.svg` at the SampleApp root. 
3. You now can click on elements so that toggle color.
    1. Checkbox at the top allows override default color for elements which are not selected.