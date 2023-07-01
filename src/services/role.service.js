import makeService from './common/makeService';
import { action } from '../store/slice/role.slice';
import makeCollapseService from './common/makeCollapseService';

const roleService = makeService('roles', action);
const userRoleService = makeCollapseService('users', 'roles');

export { roleService, userRoleService };
