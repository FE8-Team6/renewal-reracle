export const formatContent = (content: string) => {
  return content.split('\n').map((line, index) => (
    <p key={index} className="mb-2">
      {line}
    </p>
  ));
};
