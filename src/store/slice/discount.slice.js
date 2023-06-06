import makeSlice from '../common/makeSlice';

const discountSlice = makeSlice('discount');

export const action = discountSlice.actions;
export default discountSlice.reducer;
