import makeService from '../common/makeService';
import { action } from '../../store/slice/category.slice';

const categoryService = makeService('categories', action);

export default categoryService;
