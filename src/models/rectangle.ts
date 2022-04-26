import Coordinate, { singleCoordinateSort } from "./coordinate";
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
    let sortedCorners = this.sortCorners([corner1, corner2, corner3, corner4]);
    this.topLeft = sortedCorners[0];
    this.topRight = sortedCorners[1];
    this.bottomLeft = sortedCorners[2];
    this.bottomRight = sortedCorners[3];

    this.leftEdge = new Edge(this.bottomLeft, this.topLeft);
    this.topEdge = new Edge(this.topLeft, this.topRight);
    this.rightEdge = new Edge(this.topRight, this.bottomRight);
    this.bottomEdge = new Edge(this.bottomRight, this.bottomLeft);

    this.area = this.leftEdge.length * this.topEdge.length;
  }

  // This is brittle and also makes assumptions that the rectangle conforms to the grid - i.e. no rotated rectangled (diamonds)
  private sortCorners = function(corners: Coordinate[]): Coordinate[] {
    let ySorted: Coordinate[] = singleCoordinateSort(corners, 'y');
    let bottom: Coordinate[] = singleCoordinateSort(ySorted.slice(0, 2), 'x');
    let top: Coordinate[] = singleCoordinateSort(ySorted.slice(2), 'x');

    return top.concat(bottom);
  } 
}