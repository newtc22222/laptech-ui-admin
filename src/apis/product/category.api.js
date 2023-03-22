import makeCallAPI from '../helper/makeCallAPI';
import { action } from '../../store/slice/category.slice';

const apiCategory = makeCallAPI('categories', action);

export default apiCategory;
