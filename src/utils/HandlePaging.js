/**
 *
 * @param {number} current_page
 * @param {number} range_in_page item's amount show in page
 * @param {object[]} list data input
 * @returns {number[]} [idx_start, idx_end]
 */
function getPagingIndex(current_page, range_in_page, list) {
  if (list === undefined || list === null) return;

  const idx_start = (current_page - 1) * range_in_page;
  const idx_end =
    current_page * range_in_page < list.length
      ? current_page * range_in_page
      : list.length;
  return [idx_start, idx_end];
}

export default getPagingIndex;
