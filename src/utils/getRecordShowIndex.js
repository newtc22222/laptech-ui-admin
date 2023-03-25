/**
 *
 * @param {number} currentPage
 * @param {number} recordsInPage item's amount show in page
 * @param {number} recordsShow "data input" length
 * @returns {number[]} [idx_start, idx_end]
 */
function getRecordShowIndex(currentPage, recordsInPage, recordsShow) {
  const idx_start = (currentPage - 1) * recordsInPage;
  const idx_end =
    currentPage * recordsInPage < recordsShow
      ? currentPage * recordsInPage
      : recordsShow;
  return [idx_start, idx_end];
}

export default getRecordShowIndex;
