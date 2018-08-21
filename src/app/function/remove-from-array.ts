export function removeFromArray<T>(array: Array<T>, element: T) {
  const index = array.indexOf(element);
  if (index >= 0) {
    array.splice(index, 1);
  }
}
