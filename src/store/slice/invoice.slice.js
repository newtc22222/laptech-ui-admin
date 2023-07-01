import makeSlice from '../common/makeSlice';

const invoiceSlice = makeSlice('invoice');

export const action = invoiceSlice.actions;
export default invoiceSlice.reducer;
