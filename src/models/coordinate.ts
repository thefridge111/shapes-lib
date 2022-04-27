export default interface Coordinate {
  x: number;
  y: number;
}

/**
 * Time inefficient bubble sort. Swaps elements in place to minimize memory cost. 
 * Time cost was not considered a factor given the relatively small number of coordinates 
 * being sorted for this use case. Would recommend refactoring this to use heap or quick sort
 * if support is added for n-sided polygons. 
 * @param coords List of coordinates to sort
 * @param coordAxis The axis we want to sort on
 * @returns List of sorted coordinates
 */
export function singleCoordinateSort(coords: Coordinate[], coordAxis: keyof Coordinate): Coordinate[] {
  if (coords.length <= 1) {
    return coords;
  }

  for (let i = 0; i < coords.length; i++) {
    for (let j = 0; j < coords.length - 1; j++) {
      if (coords[j][coordAxis] > coords[j + 1][coordAxis]) {
        swapCoordinates(coords, j, j + 1);
      }
    }
  }

  return coords;
}

/**
 * Time inefficient bubble sort. Swaps elements in place to minimize memory cost. 
 * Time cost was not considered a factor given the relatively small number of coordinates 
 * being sorted for this use case. Would recommend refactoring this to use heap or quick sort
 * if support is added for n-sided polygons.
 * 
 * Implemented in addition to single coordinate sort to account for ordering of points where a single axis
 * may be insufficient to correctly order the points for finding the correct order of corner coordinates.
 * This will better account for rotated quadrilaterals - still some holes though.. more robust sort required.
 * @param coords List of coordinates to sort in place
 * @param primeAxis Axis we should give priority to when considering sort
 * @param secondaryAxis Axis to sort when two prime axis are the same
 * @returns List of sorted coordinates
 */
export function doubleCoordinateSort(coords: Coordinate[], primeAxis: keyof Coordinate, secondaryAxis: keyof Coordinate): Coordinate[] {
  if (coords.length <= 1) {
    return coords;
  }

  for (let i = 0; i < coords.length; i++) {
    for (let j = 0; j < coords.length - 1; j++) {
      if ((coords[j][primeAxis] > coords[j + 1][primeAxis]) ||
        ((coords[j][primeAxis] === coords[j+1][primeAxis]) && (coords[j][secondaryAxis] > coords[j+1][secondaryAxis]))) {
        swapCoordinates(coords, j, j + 1);
      }
    }
  }

  return coords;
}

function swapCoordinates(coords: Coordinate[], index1: number, index2: number) {
  let temp: Coordinate = coords[index1];
  coords[index1] = coords[index2];
  coords[index2] = temp;
}
