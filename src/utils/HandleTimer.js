function getBackTime(time) {
  const today = Date.now();
  const inputTime = new Date(time).getTime();
  // const outTime = 1000 * 60 * 60 * 11; // mySQL time
  return today - inputTime;
}

function getStringBackTime(time) {
  const seconds = getBackTime(time) / 1000;

  const minutes = Math.floor(seconds / 60),
    hours = Math.floor(seconds / (60 * 60)),
    days = Math.floor(seconds / (24 * 60 * 60)),
    months = Math.floor(seconds / (30 * 24 * 60 * 60));

  if (months > 0) {
    return months + ' tháng trước';
  }
  if (days > 0) {
    return days + ' ngày trước';
  }
  if (hours > 0) {
    return hours + ' giờ trước';
  }
  if (minutes > 0) {
    return minutes + ' phút trước';
  }
  return seconds.toFixed(0) + 'giây trước';
}

function formatDateTime(datetimeString) {
  let datetimeFormat = new Date(datetimeString);
  return datetimeFormat.toLocaleString('vi');
}

export { getStringBackTime, formatDateTime };
