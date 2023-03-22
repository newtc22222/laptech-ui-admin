import makeSlice from '../helpers/makeSlice';

const invoiceSlice = makeSlice('invoice');

export const action = invoiceSlice.actions;
export default invoiceSlice.reducer;
