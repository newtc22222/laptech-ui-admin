import { createLocalStorage } from './CreateStorage';

/**
 * @returns {object}
 */
function getUpdateByUserInSystem() {
  const storage = createLocalStorage('laptech');
  return {
    updateBy: JSON.parse(storage.get('user')).name || 'system'
  };
}

export { getUpdateByUserInSystem };
