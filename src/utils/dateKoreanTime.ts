/**
 * @description 날짜를 한국 시간으로 변환하는 함수입니다.
 * @description null, undefined 체크와 유효하지 않은 날짜 모두 확인합니다.
 * @param date
 * @returns
 */
export const formatDateToKoreanTime = (date: Date) => {
  if (!date || isNaN(date.getTime())) return '알 수 없는 시간';
  return date.toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};
