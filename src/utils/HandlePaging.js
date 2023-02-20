/**
 *
 * @param {number} current_page
 * @param {number} range_in_page item's amount show in page
 * @param {number} list_length data input length
 * @returns {number[]} [idx_start, idx_end]
 */
function getPagingIndex(current_page, range_in_page, list_length) {
  if (list === undefined || list === null) return;

  const idx_start = (current_page - 1) * range_in_page;
  const idx_end =
    current_page * range_in_page < list_length
      ? current_page * range_in_page
      : list_length;
  return [idx_start, idx_end];
}

export default getPagingIndex;
