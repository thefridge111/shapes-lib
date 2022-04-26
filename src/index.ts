import { AdjacencyDefinition, detectQuadWithQuadAdjacency } from "./lib/adjacency";
import { ContainmentDefinition, detectQuadinQuadrilateralContainment } from "./lib/containment";
import { detectQuadwithQuadIntersection, IntersectionDefinition } from "./lib/intersection";
import { Quadrilateral, Shape } from "./models/shape";

export function detectIntersection(shape1: Quadrilateral, shape2: Quadrilateral): string {
  return detectQuadwithQuadIntersection(shape1, shape2).toString();
}

export function detectContainment(shape1: Quadrilateral, shape2: Quadrilateral) {
  return detectQuadinQuadrilateralContainment(shape1, shape2);
}

export function detectAdjacency(shape1: Quadrilateral, shape2: Quadrilateral) {
  return detectQuadWithQuadAdjacency(shape1, shape2);
}
