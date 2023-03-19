import { createLocalStorage } from './CreateStorage';

/**
 * @returns {object}
 */
function getUpdateByUserInSystem() {
  const storage = createLocalStorage('laptech');
  console.log(storage);
  return {
    updateBy: storage.get('user').name || 'system'
  };
}

export { getUpdateByUserInSystem };
