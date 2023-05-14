import makeService from '../common/makeService';
import makeCollapseService from '../common/makeCollapseService';
import { action } from '../../store/slice/product.slice';

const productService = makeService('products', action);
const productAccessoriesService = makeCollapseService(
  'products',
  'accessories'
);

export { productService, productAccessoriesService };
