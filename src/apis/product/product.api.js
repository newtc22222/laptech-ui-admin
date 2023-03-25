import makeCallAPI from '../helper/makeCallAPI';
import { action } from '../../store/slice/product.slice';

const apiProduct = makeCallAPI('products', action);

export default apiProduct;
