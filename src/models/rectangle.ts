import Coordinate, { doubleCoordinateSort, singleCoordinateSort } from "./coordinate";
import Edge from "./edge";
import { Quadrilateral } from "./shape";

/**
 * This defines a Rectangle as a Quadrilateral whose sides are parallel to the grid lines.
 * Rectangles that have been rotated will break assumptions and are intended to be implemented
 * as a separate 'Diamond' class. 
 */
export default class Rectangle implements Quadrilateral {
  topLeft: Coordinate;
  topRight: Coordinate;
  bottomLeft: Coordinate;
  bottomRight: Coordinate;

  leftEdge: Edge;
  topEdge: Edge;
  rightEdge: Edge;
  bottomEdge: Edge;
  
  area: number;

  constructor(corner1: Coordinate, corner2: Coordinate, corner3: Coordinate, corner4: Coordinate) {
    let sortedCorners = doubleCoordinateSort([corner1, corner2, corner3, corner4], 'y', 'x');
    this.bottomLeft = sortedCorners[0];
    this.bottomRight = sortedCorners[1];
    this.topLeft = sortedCorners[2];
    this.topRight = sortedCorners[3];

    this.leftEdge = new Edge(this.bottomLeft, this.topLeft);
    this.topEdge = new Edge(this.topLeft, this.topRight);
    this.rightEdge = new Edge(this.topRight, this.bottomRight);
    this.bottomEdge = new Edge(this.bottomRight, this.bottomLeft);

    this.area = this.leftEdge.length * this.topEdge.length;
  }
}