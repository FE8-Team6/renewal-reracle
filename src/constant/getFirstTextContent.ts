export const getFirstTextContent = (content: { text?: string; image?: string; video?: string }[]) => {
  for (const item of content) {
    if (item.text) {
      return item.text;
    }
  }
  return '요약 내용이 없습니다.';
};
