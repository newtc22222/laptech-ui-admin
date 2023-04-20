import makeService from '../common/makeService';
import { action } from '../../store/slice/discount.slice';

const discountService = makeService('discounts', action);

export default discountService;
