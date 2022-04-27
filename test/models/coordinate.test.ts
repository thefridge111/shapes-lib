import { doubleCoordinateSort, singleCoordinateSort } from "../../src/models/coordinate";

const coord1 = { x: 1, y: 1 }; 
const coord2 = { x: 2, y: 2 }; 
const coord3 = { x: 7, y: 7 }; 
const coord4 = { x: 4, y: 4 }; 
const coord4Conflict = { x: 3, y: 4 }; 
const negCoord1 = { x: -5, y: -5 }; 
const negCoord2 = { x: -1, y: 3 }; 

test('Sorts coordinates based on one axis', () => {
  let coordinates = [ coord1, coord2, coord3, coord4, negCoord1, negCoord2 ];

  let xSorted = singleCoordinateSort(coordinates, 'x');
  expect(xSorted[0]).toBe(negCoord1);
  expect(xSorted[1]).toBe(negCoord2);
  expect(xSorted[5]).toBe(coord3);

  let ySorted = singleCoordinateSort(coordinates, 'y');
  expect(ySorted[0]).toBe(negCoord1);
  expect(ySorted[3]).toBe(negCoord2);
  expect(ySorted[5]).toBe(coord3);
});

test('Sorts non-conflicting coordinates based on two axis', () => {
  let coordinates = [ coord1, coord2, coord3, coord4, negCoord1, negCoord2 ];

  let xSorted = doubleCoordinateSort(coordinates, 'x', 'y');
  expect(xSorted[0]).toBe(negCoord1);
  expect(xSorted[1]).toBe(negCoord2);
  expect(xSorted[5]).toBe(coord3);

  let ySorted = doubleCoordinateSort(coordinates, 'y', 'x');
  expect(ySorted[0]).toBe(negCoord1);
  expect(ySorted[3]).toBe(negCoord2);
  expect(ySorted[5]).toBe(coord3);
});

test('Sorts prime-conflicting coordinates based on two axis', () => {
  let coordinates = [ coord1, coord4Conflict, coord2, coord3, coord4, negCoord1, negCoord2 ];

  let ySorted = doubleCoordinateSort(coordinates, 'y', 'x');
  expect(ySorted[0]).toBe(negCoord1);
  expect(ySorted[3]).toBe(negCoord2);
  expect(ySorted[4]).toBe(coord4Conflict);
  expect(ySorted[6]).toBe(coord3);
});