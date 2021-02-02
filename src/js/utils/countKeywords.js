export default function countKeywords(keywords) {
  return keywords.reduce((accum, currentItem) => {
    accum[currentItem] = accum[currentItem] + 1 || 1;
    return accum;
  }, {});
}
