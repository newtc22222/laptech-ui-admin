import makeSlice from '../common/makeSlice';

const productSlice = makeSlice('product');

export const action = productSlice.actions;
export default productSlice.reducer;
