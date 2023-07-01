import { createLocalStorage } from './createStorage';

/**
 * @returns {object}
 */
function getUpdateByUserInSystem() {
  const storage = createLocalStorage('laptech');
  return {
    updateBy: storage.get('user').name || 'system'
  };
}

export { getUpdateByUserInSystem };
