import { createLocalStorage } from '../../utils/createStorage';
import authService from '../auth/auth.service';

export default async function makeRefreshToken(err, dispatch, recall) {
  const storage = createLocalStorage('laptech');

  if (err.toString().includes('Invalid token!')) {
    const object = {
      refreshToken: storage.get('refreshToken')
    };
    await authService.refreshToken(dispatch, object, recall);
  }
}
