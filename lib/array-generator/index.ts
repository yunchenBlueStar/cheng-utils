export const arrayGenerator = (length: number, content: any) => {
  return Array.from({ length }, () => {
    return content;
  });
};
