import { createLocalStorage } from '../../helper/createStorage';
import apiAuth from '../auth';

export default function makeRefreshToken(err, dispatch) {
  const storage = createLocalStorage('laptech');

  if (err.toString().includes('Invalid token!')) {
    console.log(storage.get('refreshToken'));

    const object = {
      refreshToken: storage.get('refreshToken')
    };
    apiAuth.refreshToken(dispatch, object);
  }
}
