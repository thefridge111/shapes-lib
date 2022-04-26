import { Quadrilateral } from "../models/shape";

export enum AdjacencyDefinition {
  proper = 'Adjacent (Proper)',
  sub = 'Adjacent (Sub-line)',
  partial = 'Adjacent (Partial)',
  none = 'Not adjacent'
}

export function detectQuadWithQuadAdjacency(shape1: Quadrilateral, shape2: Quadrilateral): AdjacencyDefinition {
  let definitionValues = [ AdjacencyDefinition.none, AdjacencyDefinition.partial, AdjacencyDefinition.sub, AdjacencyDefinition.proper ];

  let adjacencies: AdjacencyDefinition[] = [];
  adjacencies.push(shape1.leftEdge.getAdjacency(shape2.rightEdge));
  adjacencies.push(shape1.topEdge.getAdjacency(shape2.bottomEdge));
  adjacencies.push(shape1.rightEdge.getAdjacency(shape2.leftEdge));
  adjacencies.push(shape1.bottomEdge.getAdjacency(shape2.topEdge));

  let currAdjValue: number = 0;
  let indexValue: number;

  // Find 'highest' adjacent value
  for(let i = 0; i < adjacencies.length; i++) {
    indexValue = definitionValues.indexOf(adjacencies[i]);

    if (indexValue > currAdjValue) {
      currAdjValue = indexValue;
    }
  }

  return definitionValues[indexValue];
}
