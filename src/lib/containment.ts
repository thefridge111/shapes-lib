import { Quadrilateral } from "../models/shape";

export enum ContainmentDefinition {
  none = 'No containment',
  complete = 'Containment',
  
}

export function detectQuadinQuadrilateralContainment(quadToBeContained: Quadrilateral, containingQuad: Quadrilateral): ContainmentDefinition {
  if (quadToBeContained.area > containingQuad.area) {
    return ContainmentDefinition.none;
  }

  // Simple case... both quads align perfectly to the grid
  // This does not guarentee containment detection if either have been rotated at all
  if ((quadToBeContained.topLeft.x < containingQuad.topLeft.x) || 
      (quadToBeContained.bottomLeft.x < containingQuad.bottomLeft.x) ||
      (quadToBeContained.topRight.x > containingQuad.topRight.x) ||
      (quadToBeContained.bottomRight.x > containingQuad.bottomRight.x)) {
    return ContainmentDefinition.none;
  }

  if ((quadToBeContained.topLeft.y > containingQuad.topLeft.y) || 
      (quadToBeContained.bottomLeft.y < containingQuad.bottomLeft.y) ||
      (quadToBeContained.topRight.y > containingQuad.topRight.y) ||
      (quadToBeContained.bottomRight.y < containingQuad.bottomRight.y)) {
    return ContainmentDefinition.none;
  }

  return ContainmentDefinition.complete;
}