export const getPxPerRem = () => {
  const { fontSize } = getComputedStyle(document.body);
  return parseFloat(fontSize) || 16;
};
