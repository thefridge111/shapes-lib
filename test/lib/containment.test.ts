import { ContainmentDefinition, detectQuadinQuadrilateralContainment } from "../../src/lib/containment";
import Rectangle from "../../src/models/rectangle";

const coord1 = { x: 1, y: 5 }; // top left
const coord2 = { x: 1, y: 1 }; // bottom left
const coord3 = { x: 5, y: 5 }; // top right
const coord4 = { x: 5, y: 1 }; // bottom right

const coord5 = { x: 2, y: 4 }; // top left
const coord6 = { x: 2, y: 2 }; // bottom left
const coord7 = { x: 4, y: 4 }; // top right
const coord8 = { x: 4, y: 2 }; // bottom right

const coord9 = { x: 1, y: 4 }; // top left
const coord10 = { x: 1, y: 2 }; // bottom left

const coord11 = { x: -5, y: 4 }; // top right
const coord12 = { x: -5, y: 2 }; // bottom right
const coord13 = { x: -1, y: 4 }; // top right
const coord14 = { x: -1, y: 2 }; // bottom right

test('Contained rectangle', () => {
  let container = new Rectangle(coord1, coord2, coord3, coord4);
  let contained = new Rectangle(coord5, coord6, coord7, coord8);
  expect(detectQuadinQuadrilateralContainment(contained, container)).toBe(ContainmentDefinition.complete);
});

test('Edge intersection - contained rectangle', () => {
  let container = new Rectangle(coord1, coord2, coord3, coord4);
  let contained = new Rectangle(coord9, coord10, coord7, coord8);
  expect(detectQuadinQuadrilateralContainment(contained, container)).toBe(ContainmentDefinition.complete);
});

test('Not contained rectangle', () => {
  let container = new Rectangle(coord1, coord2, coord3, coord4);
  let contained = new Rectangle(coord11, coord12, coord13, coord14);
  expect(detectQuadinQuadrilateralContainment(contained, container)).toBe(ContainmentDefinition.none);
});