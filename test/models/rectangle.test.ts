import Rectangle from '../../src/models/rectangle';

const coord1 = { x: 1, y: 4 }; // top left
const coord2 = { x: 1, y: 2 }; // bottom left
const coord3 = { x: 3, y: 4 }; // top right
const coord4 = { x: 3, y: 2 }; // bottom right

const negCoord1 = { x: -1, y: 4 }; // bottom right
const negCoord2 = { x: -1, y: 2 }; // bottom right

test('Properly assigns ordered corners', () => {
  let rectangle = new Rectangle(coord1, coord2, coord3, coord4);
  expect(rectangle.topLeft).toBe(coord1);
  expect(rectangle.bottomLeft).toBe(coord2);
  expect(rectangle.topRight).toBe(coord3);
  expect(rectangle.bottomRight).toBe(coord4);
});

test('Properly assigns unordered corners', () => {
  let rectangle = new Rectangle(coord4, coord2, coord1, coord3);
  expect(rectangle.topLeft).toBe(coord1);
  expect(rectangle.bottomLeft).toBe(coord2);
  expect(rectangle.topRight).toBe(coord3);
  expect(rectangle.bottomRight).toBe(coord4);
});

test('Properly assigns corners with negative values', () => {
  let rectangle = new Rectangle(coord3, coord4, negCoord1, negCoord2);
  expect(rectangle.topLeft).toBe(negCoord1);
  expect(rectangle.bottomLeft).toBe(negCoord2);
  expect(rectangle.topRight).toBe(coord3);
  expect(rectangle.bottomRight).toBe(coord4);
});

test('Calculates area correctly', () => {
  let rectangle = new Rectangle(coord1, coord2, coord3, coord4);

  expect(rectangle.area).toEqual(4);
});