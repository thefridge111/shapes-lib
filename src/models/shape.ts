import Coordinate from "./coordinate";
import Edge from "./edge";

export interface Shape {}

export interface Quadrilateral extends Shape {
  topLeft: Coordinate;
  topRight: Coordinate;
  bottomLeft: Coordinate;
  bottomRight: Coordinate;

  leftEdge: Edge;
  topEdge: Edge;
  rightEdge: Edge;
  bottomEdge: Edge;

  area: number;
}