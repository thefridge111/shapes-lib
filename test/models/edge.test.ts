import { AdjacencyDefinition } from "../../src/lib/adjacency";
import Edge from "../../src/models/edge";

const coord1 = { x: 0, y: 0 }; 
const coord2 = { x: 7, y: 7 }; 

const pCoord1 = { x: 0, y: 2 };
const pCoord2 = { x: 7, y: 9 };

const coord3 = { x: 0, y: 7 }; 
const coord4 = { x: 7, y: 0 };

// Horizontal
const hCoord1 = { x: 5, y: 5 }; 
const hCoord2 = { x: 1, y: 5 }; 

const hCoord3 = { x: 5, y: 5 }; 
const hCoord4 = { x: 1, y: 5 }; 

// Vertical
const vCoord1 = { x: 3, y: 2 }; 
const vCoord2 = { x: 3, y: 8 };

const vCoord3 = { x: 7, y: 2 }; 
const vCoord4 = { x: 7, y: 8 };

test('Finds intersection, no adjacency', () => {
  let edge1 = new Edge(coord1, coord2);
  let edge2 = new Edge(coord3, coord4);

  expect(edge1.intersects(edge2)).toEqual(true);
  expect(edge1.getEdgeIntercept(edge2)).toEqual({ x: 3.5, y: 3.5 });
  expect(edge1.getAdjacency(edge2)).toEqual(AdjacencyDefinition.none);
});

test('No intersection, no adjacency, parallel', () => {
  let edge1 = new Edge(coord1, coord2);
  let edge2 = new Edge(pCoord1, pCoord2);

  expect(edge1.isParallel(edge2)).toEqual(true);
  expect(edge1.intersects(edge2)).toEqual(false);
  expect(edge1.getEdgeIntercept(edge2)).toEqual({ x: Infinity, y: Infinity });
  expect(edge1.getAdjacency(edge2)).toEqual(AdjacencyDefinition.none);
});

test('No intersection, proper adjacency, parallel', () => {
  let edge1 = new Edge(hCoord1, hCoord2);
  let edge2 = new Edge(hCoord3, hCoord4);

  expect(edge1.intersects(edge2)).toEqual(false);
  expect(edge1.getEdgeIntercept(edge2)).toEqual({ x: Infinity, y: 5 });
  expect(edge1.getAdjacency(edge2)).toEqual(AdjacencyDefinition.proper);
  expect(edge1.isParallel(edge2)).toEqual(true);
});