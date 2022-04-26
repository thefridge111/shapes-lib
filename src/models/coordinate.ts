export default interface Coordinate {
  x: number;
  y: number;
}

/**
 * Inefficient bubble sort.
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

function swapCoordinates(coords: Coordinate[], index1: number, index2: number) {
  let temp: Coordinate = coords[index1];
  coords[index1] = coords[index2];
  coords[index2] = temp;
}
