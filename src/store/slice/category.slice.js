import makeSlice from '../common/makeSlice';

const categorySlice = makeSlice('category');

export const action = categorySlice.actions;
export default categorySlice.reducer;
