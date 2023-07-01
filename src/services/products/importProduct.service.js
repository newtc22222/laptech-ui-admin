import makeService from '../common/makeService';
import { action } from '../../store/slice/importProduct.slice';

const importService = makeService('imported', action);

export default importService;
