import makeService from '../common/makeService';
import { action } from '../../store/slice/label.slice';

const labelService = makeService('labels', action);

export default labelService;
