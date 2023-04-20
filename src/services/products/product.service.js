import makeService from '../common/makeService';
import { action } from '../../store/slice/product.slice';

const productService = makeService('products', action);

export default productService;
