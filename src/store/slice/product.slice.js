import makeSlice from '../helpers/makeSlice';

const productSlice = makeSlice('product');

export const action = productSlice.actions;
export default productSlice.reducer;
