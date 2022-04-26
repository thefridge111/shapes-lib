import { AdjacencyDefinition } from "../lib/adjacency";
import Coordinate from "./coordinate";

export default class Edge {
  start: Coordinate;
  end: Coordinate;

  slope: number;
  xIntercept: number;
  yIntercept: number;
  length: number;

  constructor(point1: Coordinate, point2: Coordinate) {
    if (point1.x < point2.x) {
      this.start = point1;
      this.end = point2;
    } else {
      this.start = point2;
      this.end = point1;
    }

    // Slope can go to 
    // Infinity --> vertical line
    // 0 --> horizontal line
    this.slope = (this.end.y - this.start.y) / (this.end.x - this.start.x);
    // If yIntercept is -Infinity then it's a vertical line
    this.yIntercept = (this.start.y - (this.start.x * this.slope));
    // if xIntercept is Infinity then it's a horizontal line
    this.xIntercept = this.yIntercept === Infinity ? this.start.x : ((this.yIntercept * -1) / this.slope);
    this.length = this.findLength();
  }

  intersects = function(otherEdge: Edge): boolean {
    let edgeIntercept = this.getEdgeIntercept(otherEdge);

    // no intercept, at best overlapping lines - adjacent shapes possible
    if (edgeIntercept.x === Infinity || edgeIntercept.y === Infinity) {
      return false;
    }

    return true;
  }

  isAdjacent = function(otherEdge: Edge): boolean {
    let intersectionPoint = this.getEdgeIntercept(otherEdge);

    if (intersectionPoint.x === Infinity && intersectionPoint.y === Infinity && this.isParallel(otherEdge)) {
      // If either start or end exist on the other line then theyre adjacent
      return ((otherEdge.getYValueAtPoint(this.start.x) < Infinity) || otherEdge.getYValueAtPoint(this.end.x) < Infinity)
    }

    return false;
  }

  getAdjacency = function(otherEdge: Edge): AdjacencyDefinition {
    if (!this.isAdjacent(otherEdge)) {
      return AdjacencyDefinition.none;
    }

    let startDiff = {
      x: Math.sign((this.start.x - otherEdge.start.x)),
      y: Math.sign((this.start.y - otherEdge.start.y))
    }
    let endDiff = {
      x: Math.sign((this.end.x - otherEdge.end.x)),
      y: Math.sign((this.end.y - otherEdge.end.y))
    }

    if ((startDiff.x === 0 && startDiff.y === 0) && (endDiff.x === 0 && endDiff.y === 0)) {
      return AdjacencyDefinition.proper;
    } else if ((startDiff.x === endDiff.x || startDiff.y === endDiff.y)) {
      return AdjacencyDefinition.sub;
    } else {
      return AdjacencyDefinition.partial;
    }
  } 

  getEdgeIntercept = function(otherEdge: Edge): Coordinate {
    if (!this.isNear(otherEdge)) {
      return { x: Infinity, y: Infinity };
    }

    // Infinity / Infinity -> NaN --> one or both are vertical lines or parallel to eachother
    // Divided by 0 -> Infinity --> Both are horizontal lines
    let yEdgeIntercept = ((otherEdge.yIntercept - this.yIntercept) / (this.slope - otherEdge.slope)) + this.yIntercept;

    // Vertical line present
    if (Math.abs(yEdgeIntercept) === NaN) {
      // Other edge is vertical
      if (this.slope !== Infinity) {
        return { x: otherEdge.start.x, y: this.getYValueAtPoint(otherEdge.start.x) };
      // This edge is vertical
      } else if (otherEdge.slope !== Infinity) {
        return { x: this.start.x, y: otherEdge.getYValueAtPoint(this.start.x) };
      // overlapping vertical lines
      } else if (otherEdge.start.x === this.start.x) {
        return { x: this.start.x, y: Infinity }
      }
      
      // This could indicate no intersection or infinite intersection i.e. adjacency
      return { x: Infinity, y: Infinity };
    // Both are horizontal lines
    } else if (Math.abs(yEdgeIntercept) === Infinity) {
      // Horizontal lines overlap -> Infinite intersection aka adjacent
      if (otherEdge.start.x === this.start.x) {
        return { x: Infinity, y: this.start.y };
      }
      // No intersection, possible adjacency
      return { x: Infinity, y: Infinity };
    }

    return { x: this.getXValueAtPoint(yEdgeIntercept), y: yEdgeIntercept };
  }

  isNear = function(otherEdge: Edge): boolean {
    if (((this.start.x >= otherEdge.start.x && this.start.x <= otherEdge.end.x) ||
        (this.end.x >= this.start.x && this.end.x <= otherEdge.end.x)) &&
        ((this.start.y >= otherEdge.start.y && this.start.y <= otherEdge.end.y) ||
        (this.end.y >= this.start.y && this.end.y <= otherEdge.end.y))) {
      return true;
    }
    return false;
  }

  isParallel = function(otherEdge: Edge): boolean {
    return this.slope === otherEdge.slope;
  }

  getYValueAtPoint = function(x: number): number {
    if ((x < this.start.x) || (x > this.end.x)) {
      return NaN;
    }
    return ((this.slope * x) + this.yIntercept);
  }

  getXValueAtPoint = function(y: number): number {
    if ((y < this.start.y) || (y > this.end.y)) {
      return NaN;
    }

    return ((y - this.yIntercept) / this.slope);
  }

  private findLength = function() {
    let xSolution = ((this.end.x - this.start.x) ** 2);
    let ySolution = ((this.end.y - this.start.y) ** 2);

    return Math.sqrt(xSolution + ySolution);
  }
}