import makeCallAPI from '../helper/makeCallAPI';
import { action } from '../../store/slice/brand.slice';

const apiBrand = makeCallAPI('brands', action);

export default apiBrand;
