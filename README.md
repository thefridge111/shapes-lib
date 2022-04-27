# Shape Library
This is a shape library intended to be used to help work with geometric shapes. Currently only Rectangles are supported with limited work done to support 
quadrilaterals in general in the near future. There is also limited support for detecting rotated rectangle containment. 

This is intended to be published and consumed as an NPM package with limited dependencies - at time of writing there are no third party dependencies required 
to be packaged and only minimal requirements for contributing. 

## Useful commands
- `npm run test` - run the Jest tests
- `npm run build` - compiles TS into JS for distribution

## How to Use
### Install via NPM
As this is not currently published to NPM please use [NPM Link](https://docs.npmjs.com/cli/v8/commands/npm-link) after cloning the repo to your local machine.

### Use
There are 3 main methods included in [`index.js`](./src/index.js) that provide the main interface to determine adjacency, intersection and containment of rectangles. Additional all models are contained within the `models` dir. These classes provide a number of utility functions as well to supplement your use case. 

You'll first need to instantiate `Rectangle`s in order to work with any of the methods mentioned in `index.js`.