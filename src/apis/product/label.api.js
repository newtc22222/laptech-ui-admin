import makeCallAPI from '../helper/makeCallAPI';
import { action } from '../../store/slice/label.slice';

const apiLabel = makeCallAPI('labels', action);

export default apiLabel;
