import makeService from '../common/makeService';
import { action } from '../../store/slice/label.slice';
import makeCollapseService from '../common/makeCollapseService';

const labelService = makeService('labels', action);
const productLabelService = makeCollapseService('products', 'labels');

export { labelService, productLabelService };
