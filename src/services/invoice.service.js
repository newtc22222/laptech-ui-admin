import makeService from './common/makeService';
import { action } from '../store/slice/invoice.slice';

const invoiceService = makeService('invoices', action);

export default invoiceService;
