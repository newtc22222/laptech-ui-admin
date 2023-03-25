import makeCallAPI from './helper/makeCallAPI';
import { action } from '../store/slice/invoice.slice';

const apiInvoice = makeCallAPI('invoices', action);

export default apiInvoice;
