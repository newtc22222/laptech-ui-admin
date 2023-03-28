import makeService from './common/makeService';
import { action } from '../store/slice/role.slice';

const roleService = makeService('roles', action);

export default roleService;
