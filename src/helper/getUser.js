/**
 * @returns {object}
 */
function getUpdateByUserInSystem() {
  return {
    updateBy: JSON.parse(localStorage.getItem('laptechUser')).name || 'system'
  };
}

export { getUpdateByUserInSystem };
