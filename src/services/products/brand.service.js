import makeService from '../common/makeService';
import { action } from '../../store/slice/brand.slice';

const brandService = makeService('brands', action);

export default brandService;
