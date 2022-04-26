import { Quadrilateral } from "../models/shape";

export enum IntersectionDefinition {
  intersect = 'Intersection',
  none = 'No intersection'
}

export function detectQuadwithQuadIntersection(shape1: Quadrilateral, shape2: Quadrilateral): IntersectionDefinition {
  let leftIntersect = shape1.leftEdge.intersects(shape2.topEdge) || shape1.leftEdge.intersects(shape2.bottomEdge);
  let topIntersect = shape1.topEdge.intersects(shape2.leftEdge) || shape1.topEdge.intersects(shape2.rightEdge);
  let rightIntersect = shape1.rightEdge.intersects(shape2.topEdge) || shape1.rightEdge.intersects(shape2.bottomEdge);
  let bottomIntersect = shape1.bottomEdge.intersects(shape2.leftEdge) || shape1.bottomEdge.intersects(shape2.rightEdge);

  if (leftIntersect || topIntersect || rightIntersect || bottomIntersect) {
    return IntersectionDefinition.intersect;
  }

  return IntersectionDefinition.none
}