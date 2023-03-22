import makeCallAPI from '../helper/makeCallAPI';
import { action } from '../../store/slice/discount.slice';

const apiDiscount = makeCallAPI('discounts', action);

export default apiDiscount;
