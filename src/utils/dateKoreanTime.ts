/**
 * @description 날짜를 한국 시간으로 변환하는 함수입니다.
 * @param date
 * @returns
 */
export const formatDateToKoreanTime = (date: Date) => {
  if (!date) return '알 수 없는 시간';
  return date.toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};
