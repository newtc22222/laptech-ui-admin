import makeService from '../common/makeService';
import { action } from '../../store/slice/discount.slice';
import makeCollapseService from '../common/makeCollapseService';

const discountService = makeService('discounts', action);
const productDiscountService = makeCollapseService('products', 'discounts');

export { discountService, productDiscountService };
