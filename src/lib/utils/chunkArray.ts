/**
 * @description 배열을 chunkSize 크기로 나누어주는 함수입니다.
 * @param array
 * @param chunkSize
 */
export const chunkArray = <T>(array: T[], chunkSize: number): T[][] => {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunkedArray.push(array.slice(i, i + chunkSize));
  }
  return chunkedArray;
};
