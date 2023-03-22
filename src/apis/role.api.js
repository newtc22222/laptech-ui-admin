import makeCallAPI from './helper/makeCallAPI';
import { action } from '../store/slice/role.slice';

const apiRole = makeCallAPI('roles', action);

export default apiRole;
