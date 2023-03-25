import makeCallAPI from '../helper/makeCallAPI';
import { action } from '../../store/slice/importProduct.slice';

const apiImport = makeCallAPI('imports', action);

export default apiImport;
